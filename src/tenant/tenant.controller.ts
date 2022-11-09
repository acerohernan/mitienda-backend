import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { ApiTags } from '@nestjs/swagger';
import { CreateTenantDTO } from './dtos/create-tenant.dto';
import { LoginTenantDTO } from './dtos/login-tenant.dto';
import { TenantService } from './tenant.service';

@ApiTags('tenant')
@Controller('tenant')
export class TenantController {
  constructor(
    private readonly tenantService: TenantService,
    private config: ConfigService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/auth/signup')
  async signUp(@Body() createTenantDTO: CreateTenantDTO) {
    return this.tenantService.signUp(createTenantDTO);
  }

  @Post('/auth/login')
  async login(@Body() loginTenantDTO: LoginTenantDTO) {
    return this.tenantService.login(loginTenantDTO);
  }
}
