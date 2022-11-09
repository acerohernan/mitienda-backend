import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateTenantDTO } from './dtos/create-tenant.dto';
import { LoginTenantDTO } from './dtos/login-tenant.dto';
import { Tenant } from './entities/tenant.entity';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant) private tenantRepository: Repository<Tenant>,
  ) {}

  async signUp(dto: CreateTenantDTO): Promise<void> {
    const { email, password, phone } = dto;

    const exists = await this.tenantRepository.findOneBy({ email });

    if (exists)
      throw new BadRequestException(
        `The email ${email} is invalid or is already registered`,
      );

    const hashedPassword = this.hashString(password);

    const tenant = this.tenantRepository.create({
      email,
      password: hashedPassword,
      phone,
    });

    await this.tenantRepository.save(tenant);
  }

  async login(dto: LoginTenantDTO): Promise<string> {
    return dto.email;
  }

  private hashString(string: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(string, salt);
  }
}
