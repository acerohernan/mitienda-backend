import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { CreateTenantDTO } from './dtos/create-tenant.dto';
import { TenantService } from './tenant.service';

@Controller('tenant')
export class TenantController {
  constructor(
    private readonly tenantService: TenantService,
    private config: ConfigService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/auth/signup')
  async signUp(@Body() createTenantDTO: CreateTenantDTO) {
    return await this.tenantService.signUp(createTenantDTO);
  }
}
