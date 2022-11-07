import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateTenantDTO } from './dtos/create-tenant.dto';
import { TenantService } from './tenant.service';

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/auth/signup')
  async signUp(@Body() createTenantDTO: CreateTenantDTO) {
    return await this.tenantService.signUp(createTenantDTO);
  }
}
