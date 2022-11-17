import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  AuthTenant,
  AuthTenantRequest,
} from '../shared/decorators/auth-tenant.decorator';
import { AuthGuard } from '../shared/guards/auth.guard';
import { CompleteRegistrationDTO } from './dtos/complete-registration.dto';
import { CreateTenantDTO } from './dtos/create-tenant.dto';
import { ForgotPasswordDTO } from './dtos/forgot-password.dto';
import { LoginTenantDTO } from './dtos/login-tenant.dto';
import { RestorePasswordDTO } from './dtos/restore-password.dto';
import { UpdateTenantDTO } from './dtos/update-tenant.dto';
import { TenantService } from './tenant.service';

@ApiTags('tenant')
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
    const { token } = await this.tenantService.login(dto);
    return { token };
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
  @Get('/information')
  async getInformation(@AuthTenantRequest() tenant: AuthTenant) {
    return this.tenantService.getTenantInformation(tenant.tenant_id);
  }

  @UseGuards(AuthGuard)
  @Put('/information')
  async updateInformation(
    @AuthTenantRequest() tenant: AuthTenant,
    @Body() dto: UpdateTenantDTO,
  ) {
    return this.tenantService.updateTenantInformation(dto, tenant.tenant_id);
  }

  /* Tenant Store Endpoints*/

  @UseGuards(AuthGuard)
  @Get('/store/information')
  async getStoreInformation(@AuthTenantRequest() tenant: AuthTenant) {
    return this.tenantService.getStoreInformation(tenant.store_id);
  }

  @Get('/store/domain/check')
  async getStoreDomainAvaibility(@Query('domain') domain: string | undefined) {
    return this.tenantService.getStoreDomainAvaibility(domain);
  }
}
