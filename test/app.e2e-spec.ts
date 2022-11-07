import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import http from 'http';
import { AppModule } from './../src/app.module';
import { EnvironmentArranger } from './persistence/EnvironmentArranger';
import { TypeOrmEnvironmentArranger } from './persistence/TypeOrmEnvironmentArranger';

let app: INestApplication;
let server: http.Server;
let environmentArranger: EnvironmentArranger;

beforeAll(async () => {
  environmentArranger = new TypeOrmEnvironmentArranger();
  await environmentArranger.arrange();
});

beforeEach(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = moduleRef.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  await app.init();

  server = app.getHttpServer();
});

afterEach(async () => {
  await app.close();
  server.close();
});

afterAll(async () => {
  await environmentArranger.close();
});

describe('App', () => {
  it('should be defined', () => {
    if (!app) throw new Error('The app is not initialized');
  });
});

export { app, server };
