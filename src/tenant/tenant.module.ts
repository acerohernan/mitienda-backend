import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { ForgotPasswordRequest } from './entities/forgot-password.entity';
import { StoreSocial } from './entities/store-social.entity';
import { Store } from './entities/store.entity';
import { Tenant } from './entities/tenant.entity';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Tenant,
      Store,
      StoreSocial,
      ForgotPasswordRequest,
    ]),
    SharedModule,
  ],
  controllers: [TenantController],
  providers: [TenantService],
})
export class TenantModule {}
