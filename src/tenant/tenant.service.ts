import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { omit, pick } from 'lodash';
import randomstring from 'randomstring';
import { Repository } from 'typeorm';
import { v4 as uuid, validate as validateUuid } from 'uuid';
import { CloudinaryService } from '../shared/services/cloudinary.service';
import { EmailService } from '../shared/services/email.service';
import { COUNTRIES } from './constants/tenant.constans';
import { CompleteRegistrationDTO } from './dtos/complete-registration.dto';
import { CreateTenantDTO } from './dtos/create-tenant.dto';
import { ForgotPasswordDTO } from './dtos/forgot-password.dto';
import { LoginTenantDTO } from './dtos/login-tenant.dto';
import { RestorePasswordDTO } from './dtos/restore-password.dto';
import { UpdateStoreSocialDTO } from './dtos/update-store-social';
import { UpdateStoreDTO } from './dtos/update-store.dto';
import { UpdateTenantDTO } from './dtos/update-tenant.dto';
import { ForgotPasswordRequest } from './entities/forgot-password.entity';
import { StoreSocial } from './entities/store-social.entity';
import { Store } from './entities/store.entity';
import { Tenant } from './entities/tenant.entity';
import { TenantCountry, TenantStatus } from './types/tenant.types';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant) private tenantRepository: Repository<Tenant>,
    @InjectRepository(Store) private storeRepository: Repository<Store>,
    @InjectRepository(StoreSocial)
    private storeSocialRepository: Repository<StoreSocial>,
    @InjectRepository(ForgotPasswordRequest)
    private forgotPasswordRequestRepository: Repository<ForgotPasswordRequest>,
    private emailService: EmailService,
    private cloudinaryService: CloudinaryService,
    private config: ConfigService,
  ) {}

  async signUp(dto: CreateTenantDTO): Promise<void> {
    const { email, password, phone, country_code } = dto;

    /* Verify if the email is registered */

    const exists = await this.tenantRepository.findOneBy({ email });

    if (exists)
      throw new BadRequestException(
        `The email ${email} is invalid or is already registered`,
      );

    /* Hashes the password */

    const hashedPassword = this.hashString(password);

    /* Get the tenant country */

    const country = this.getTenantCountryByCode(country_code);

    /* Create the tenant entity */

    const tenant = this.tenantRepository.create({
      id: uuid(),
      status: TenantStatus.IN_REGISTRATION,
      email,
      password: hashedPassword,
      phone,
      name: null,
      surname: null,
      store_id: null,
      expiration_date: new Date(),
      country: country.code,
    });

    /* Create the store entity */

    const random_store_name = this.getRandomStoreName();

    const store = this.storeRepository.create({
      tenant_id: tenant.id,
      name: random_store_name,
      domain: random_store_name,
      whatsapp: tenant.phone,
      telephone: tenant.phone,
      category: 'Moda y belleza',
      country: country.code,
      currency: country.currency_symbol,
      banner_img: null,
      logo_img: null,
      description: null,
      team_description: null,
      team_img: null,
    });

    /* Saves the entities */
    await this.tenantRepository.save(tenant);
    await this.storeRepository.save(store);

    /* Save the new store id in the user */
    await this.tenantRepository.update(
      { id: tenant.id },
      { store_id: store.id },
    );

    /* Create the store social */
    const social = this.storeSocialRepository.create({
      store_id: store.id,
    });
    await this.storeSocialRepository.save(social);
  }

  async login(dto: LoginTenantDTO): Promise<{
    token: string;
    tenant: Partial<Tenant>;
    store: Partial<Store>;
  }> {
    const { email, password } = dto;

    /* Verify is the email is registered */
    const tenant = await this.tenantRepository.findOneBy({ email });

    if (!tenant) throw new BadRequestException('Wrong credentials');

    /* Verify is the password is correct */
    const matches_password = this.compareHash(password, tenant.password);

    if (!matches_password) throw new BadRequestException('Wrong credentials');

    /* Creates the authorization token */
    const payload = {
      sub: tenant.id,
      store: tenant.store_id,
    };

    const token = jwt.sign(payload, this.config.get('JWT_SECRET'), {
      algorithm: 'HS256',
      expiresIn: this.config.get('JWT_EXPIRATION'),
    });

    /* Setup tenant information */
    const tenantPrivateFields: Array<keyof Tenant> = ['password'];

    const tenantToShare = omit(tenant, tenantPrivateFields);

    /* Setup store information */
    const store = await this.storeRepository.findOneBy({
      tenant_id: tenant.id,
    });

    if (!store)
      throw new NotFoundException(
        `The store from tenant <${tenant.id}> not exists`,
      );

    const storePrivateFields: Array<keyof Store> = ['tenant_id'];

    const storeToShare = omit(store, storePrivateFields);

    return { token, tenant: tenantToShare, store: { ...storeToShare } };
  }

  async forgotPassword(dto: ForgotPasswordDTO): Promise<any> {
    const { email, code } = dto;

    /* Find the user with the email */
    const tenant = await this.tenantRepository.findOneBy({ email });

    /* If the user not exists, we send a ok response for secury reasons */
    if (!tenant) return;

    /* Create the request to restore the password */
    let forgot_request_id = uuid();

    if (code && this.IsAValidUuid(code)) forgot_request_id = code;

    const forgot_request = this.forgotPasswordRequestRepository.create({
      id: forgot_request_id,
      tenant_id: tenant.id,
    });

    await this.forgotPasswordRequestRepository.save(forgot_request);

    /* Send the restore password link in the user email */
    await this.emailService.sendForgotPasswordEmail({
      tenant,
      code: forgot_request_id,
    });
    //TODO
  }

  async verifyForgotPasswordCode(code: string): Promise<void> {
    if (!code || !this.IsAValidUuid(code))
      throw new BadRequestException('The code is invalid');

    const forgotRequest = await this.forgotPasswordRequestRepository.findOneBy({
      id: code,
    });

    if (!forgotRequest) throw new BadRequestException('The code is invalid');
  }

  async restorePassword(dto: RestorePasswordDTO): Promise<void> {
    const { code, password } = dto;

    /* Get the forgot password request */
    const forgotRequest = await this.forgotPasswordRequestRepository.findOneBy({
      id: code,
    });

    if (!forgotRequest) throw new BadRequestException('The code is invalid');

    /* Updates the new password */
    const newPasswordHashed = this.hashString(password);

    await this.tenantRepository.update(
      { id: forgotRequest.tenant_id },
      { password: newPasswordHashed },
    );

    /* Remove the forgot password request */
    await this.forgotPasswordRequestRepository.delete({ id: forgotRequest.id });
  }

  async getStoreDomainAvaibility(domain: string | undefined): Promise<void> {
    if (!domain) throw new BadRequestException('The store domain is invalid');

    if (domain.length < 6 || domain.length > 20)
      throw new BadRequestException(
        'The store domain must have minimum 6 characters and maximun 20 characters',
      );

    const isTaken = await this.storeRepository.findOneBy({
      domain,
    });

    if (isTaken)
      throw new BadRequestException(
        'The store domain is taken, please choose another.',
      );
  }

  async getStoreByDomain(domain: string | undefined): Promise<{ store: any }> {
    if (!domain) throw new BadRequestException('The store domain is invalid');

    if (domain.length < 6 || domain.length > 20)
      throw new BadRequestException(
        'The store domain must have minimum 6 characters and maximun 20 characters',
      );

    const store = await this.storeRepository.findOneBy({
      domain,
    });

    if (!store)
      throw new NotFoundException(
        `The store with domain <${domain}> not exists`,
      );

    const privateFields = [];

    const storeToSend = omit(store, privateFields);
    const social = await this.storeSocialRepository.findOneBy({
      store_id: store.id,
    });

    return {
      store: {
        ...storeToSend,
        social,
      },
    };
  }

  async completeRegistration(dto: CompleteRegistrationDTO, tenant_id: string) {
    const {
      tenant_name,
      tenant_surname,
      store_category,
      store_domain,
      store_name,
    } = dto;

    /* Verify if the store domain is taken */
    const domainIsTaken = await this.storeRepository.findOneBy({
      domain: store_domain,
    });

    if (domainIsTaken)
      throw new BadRequestException(
        `The store domain <${store_domain}> is taken, please choose another.`,
      );

    /* Get the tenant */

    const tenant = await this.tenantRepository.findOneBy({ id: tenant_id });

    if (!tenant)
      throw new NotFoundException(
        'Not found tenant information, the token is malformed',
      );

    /* Verify if the tenant is in registration */

    if (tenant.status !== TenantStatus.IN_REGISTRATION)
      throw new BadRequestException(
        "You've already complete your registration",
      );

    /* Updates the store information */

    await this.storeRepository.update(
      { id: tenant.store_id },
      {
        domain: store_domain,
        name: store_name,
        category: store_category,
      },
    );

    /* Updates tenant information an change his status to "active"*/

    await this.tenantRepository.update(
      { id: tenant.id },
      {
        name: tenant_name,
        surname: tenant_surname,
        status: TenantStatus.ACTIVE,
      },
    );
  }

  async uploadImage(
    file: Express.Multer.File | null,
  ): Promise<{ url: string }> {
    if (!file)
      throw new UnprocessableEntityException(
        'The max size of the image is 1mb and the extension must be .jpg,.jpge and .png',
      );

    try {
      const { url } = await this.cloudinaryService.uploadImage(file);
      return { url };
    } catch (err) {
      throw new UnprocessableEntityException('The image cannot be uploaded');
    }
  }

  async getTenantInformation(
    tenant_id: string,
  ): Promise<{ tenant: Partial<Tenant> }> {
    const tenant = await this.tenantRepository.findOneBy({ id: tenant_id });

    if (!tenant) throw new NotFoundException('The tenant not exists');

    const privateFields = ['password'];

    const tenantToShare = omit(tenant, privateFields);

    return { tenant: tenantToShare };
  }

  async getStoreInformation(
    store_id: string,
  ): Promise<{ store: Partial<Store> }> {
    const store = await this.storeRepository.findOneBy({ id: store_id });

    if (!store) throw new NotFoundException('The store not exists');

    const privateFields = [];

    const storeToShare = omit(store, privateFields);

    return { store: storeToShare };
  }

  async updateTenantInformation(
    dto: UpdateTenantDTO,
    tenant_id: string,
  ): Promise<void> {
    /* Only pick all the editable fields from dto*/
    const editableFields: Array<keyof UpdateTenantDTO> = [
      'name',
      'phone',
      'surname',
      'profile_img',
    ];

    const dataToUpdate = pick(dto, editableFields);

    /* Update the tenant */
    await this.tenantRepository.update({ id: tenant_id }, dataToUpdate);
  }

  async updateStoreInformation(
    dto: UpdateStoreDTO,
    store_id: string,
  ): Promise<void> {
    /* Only pick all the editable fields from dto*/
    const editableFields: Array<keyof UpdateStoreDTO> = [
      'name',
      'whatsapp',
      'telephone',
      'category',
      'currency',
      'logo_img',
      'banner_img',
      'description',
      'team_img',
      'team_description',
    ];

    const dataToUpdate = pick(dto, editableFields);

    /* Update the store */
    await this.storeRepository.update({ id: store_id }, dataToUpdate);
  }

  async updateStoreSocial(
    dto: UpdateStoreSocialDTO,
    store_id: string,
  ): Promise<void> {
    /* Pick only the editable fields */
    const editableFields: Array<keyof UpdateStoreSocialDTO> = [
      'facebook',
      'instagram',
      'pinterest',
      'tiktok',
      'twitter',
      'youtube',
    ];

    const dataToSave = pick(dto, editableFields);

    /* Save the information */
    await this.storeSocialRepository.update({ store_id }, dataToSave);
  }

  async getStoreSocial(
    store_id: string,
  ): Promise<{ social: Partial<StoreSocial> }> {
    const social = await this.storeSocialRepository.findOneBy({ store_id });

    if (!social)
      throw new NotFoundException('The social of the store not exists');

    return { social };
  }
  /* Utils */
  private hashString(string: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(string, salt);
  }

  private compareHash(candidateString: string, hash: string): boolean {
    return bcrypt.compareSync(candidateString, hash);
  }

  private getRandomStoreName(): string {
    return randomstring.generate({
      length: 6,
      charset: 'alphabetic',
    });
  }

  private getTenantCountryByCode(code: string): TenantCountry {
    let country = COUNTRIES.find((country) => country.code == code);

    if (!country) country = COUNTRIES[0];

    return country;
  }

  private IsAValidUuid(uuid: string): boolean {
    return validateUuid(uuid);
  }
}
