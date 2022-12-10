import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiSecurity, ApiTags } from '@nestjs/swagger';
import {
  AuthTenant,
  AuthTenantRequest,
} from '../shared/decorators/auth-tenant.decorator';
import { AuthGuard } from '../shared/guards/auth.guard';
import {
  imageFileTypeRegex,
  imageMaxSize,
  multerImageStorage,
} from '../shared/utils/multer';
import { CompleteRegistrationDTO } from './dtos/complete-registration.dto';
import { CreateTenantDTO } from './dtos/create-tenant.dto';
import { ForgotPasswordDTO } from './dtos/forgot-password.dto';
import { LoginTenantDTO } from './dtos/login-tenant.dto';
import { RestorePasswordDTO } from './dtos/restore-password.dto';
import { UpdateStoreSocialDTO } from './dtos/update-store-social';
import { UpdateStoreDTO } from './dtos/update-store.dto';
import { UpdateTenantDTO } from './dtos/update-tenant.dto';
import { TenantService } from './tenant.service';

@ApiTags('Tenant')
@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  /* Tenant Auth Endpoints*/

  @HttpCode(HttpStatus.CREATED)
  @Post('/auth/signup')
  async signUp(@Body() dto: CreateTenantDTO) {
    return this.tenantService.signUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/auth/login')
  async login(@Body() dto: LoginTenantDTO) {
    return this.tenantService.login(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/auth/password/forgot')
  async forgotPassword(@Body() dto: ForgotPasswordDTO) {
    return this.tenantService.forgotPassword(dto);
  }

  @Get('/auth/password/verify-code/:code')
  async verifyForgotPasswordCode(@Param('code') code: string) {
    return this.tenantService.verifyForgotPasswordCode(code);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/auth/password/restore')
  async restorePassword(@Body() dto: RestorePasswordDTO) {
    return this.tenantService.restorePassword(dto);
  }

  @UseGuards(AuthGuard)
  @ApiSecurity('bearer')
  @HttpCode(HttpStatus.OK)
  @Post('/auth/complete-registration')
  async completeRegistration(
    @Body() dto: CompleteRegistrationDTO,
    @AuthTenantRequest() tenant: AuthTenant,
  ) {
    const { tenant_id } = tenant;
    return this.tenantService.completeRegistration(dto, tenant_id);
  }

  /* Tenant Endpoints */
  @UseGuards(AuthGuard)
  @ApiSecurity('bearer')
  @Get('/information')
  async getInformation(@AuthTenantRequest() tenant: AuthTenant) {
    return this.tenantService.getTenantInformation(tenant.tenant_id);
  }

  @UseGuards(AuthGuard)
  @ApiSecurity('bearer')
  @Put('/information')
  async updateInformation(
    @AuthTenantRequest() tenant: AuthTenant,
    @Body() dto: UpdateTenantDTO,
  ) {
    return this.tenantService.updateTenantInformation(dto, tenant.tenant_id);
  }

  @UseGuards(AuthGuard)
  @ApiSecurity('bearer')
  @Post('/upload/image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        img: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('img', {
      storage: multerImageStorage,
    }),
  )
  async uploadImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: imageFileTypeRegex,
        })
        .addMaxSizeValidator({
          maxSize: imageMaxSize,
        })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    return this.tenantService.uploadImage(file);
  }

  /* Tenant Store Endpoints*/

  @Get('/store/domain/:domain')
  async getStoreByDomain(@Param('domain') domain: string | undefined) {
    return this.tenantService.getStoreByDomain(domain);
  }

  @Get('/store/domain/:domain/check')
  async getStoreDomainAvaibility(@Param('domain') domain: string | undefined) {
    return this.tenantService.getStoreDomainAvaibility(domain);
  }

  @UseGuards(AuthGuard)
  @ApiSecurity('bearer')
  @Get('/store/information')
  async getStoreInformation(@AuthTenantRequest() tenant: AuthTenant) {
    return this.tenantService.getStoreInformation(tenant.store_id);
  }

  @UseGuards(AuthGuard)
  @ApiSecurity('bearer')
  @Put('/store/information')
  async updateStoreInformation(
    @AuthTenantRequest() tenant: AuthTenant,
    @Body() dto: UpdateStoreDTO,
  ) {
    return this.tenantService.updateStoreInformation(dto, tenant.store_id);
  }

  @UseGuards(AuthGuard)
  @ApiSecurity('bearer')
  @Get('/store/social')
  async getStoreSocial(@AuthTenantRequest() tenant: AuthTenant) {
    return this.tenantService.getStoreSocial(tenant.store_id);
  }

  @UseGuards(AuthGuard)
  @ApiSecurity('bearer')
  @Put('/store/social')
  async updateStoreSocial(
    @AuthTenantRequest() tenant: AuthTenant,
    @Body() dto: UpdateStoreSocialDTO,
  ) {
    return this.tenantService.updateStoreSocial(dto, tenant.store_id);
  }
}
