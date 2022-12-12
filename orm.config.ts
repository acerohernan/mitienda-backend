/* This configuration is for the typeorm cli, to generate migrations */

import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config({ path: '.env.production' });

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('TYPEORM_HOST'),
  port: configService.get('TYPEORM_PORT'),
  username: configService.get('TYPEORM_USERNAME'),
  password: configService.get('TYPEORM_PASSWORD'),
  database: configService.get('TYPEORM_DATABASE'),
  entities: [__dirname + '/src/**/entities/*{.js,.ts}'],
  migrations: [__dirname + '/src/migrations/*{.js,.ts}'],
  synchronize: configService.get('NODE_ENV') !== 'production',
});
