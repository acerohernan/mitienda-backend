import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  AuthUser,
  AuthUserRequest,
} from '../shared/decorators/auth-user.decorator';
import { AuthGuard } from '../shared/guards/auth.guard';
import { CompleteRegistrationDTO } from './dtos/complete-registration.dto';
import { CreateTenantDTO } from './dtos/create-tenant.dto';
import { ForgotPasswordDTO } from './dtos/forgot-password.dto';
import { LoginTenantDTO } from './dtos/login-tenant.dto';
import { RestorePasswordDTO } from './dtos/restore-password.dto';
import { TenantService } from './tenant.service';

@ApiTags('tenant')
@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

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

  @Get('/store/domain/check')
  async getStoreDomainAvaibility(@Query('domain') domain: string | undefined) {
    return this.tenantService.getStoreDomainAvaibility(domain);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/auth/complete-registration')
  async completeRegistration(
    @Body() dto: CompleteRegistrationDTO,
    @AuthUserRequest() user: AuthUser,
  ) {
    const { user_id } = user;
    return this.tenantService.completeRegistration(dto, user_id);
  }
}
