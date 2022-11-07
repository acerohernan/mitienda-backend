import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantModule } from './tenant/tenant.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('TYPEORM_HOST'),
        port: config.get('TYPEORM_PORT'),
        username: config.get('TYPEORM_USERNAME'),
        password: config.get('TYPEORM_PASSWORD'),
        database: config.get('TYPEORM_DATABASE'),
        entities: [__dirname + '/**/entities/*{.js,.ts}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    TenantModule,
  ],
})
export class AppModule {}
