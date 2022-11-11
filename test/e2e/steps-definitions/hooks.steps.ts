import { AfterAll, BeforeAll } from '@cucumber/cucumber';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { EnvironmentArranger } from '../persistence/EnvironmentArranger';
import { TypeOrmEnvironmentArranger } from '../persistence/TypeOrmEnvironmentArranger';

let application: INestApplication;
let environmentArranger: EnvironmentArranger;

BeforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  application = moduleFixture.createNestApplication();
  application.useGlobalPipes(new ValidationPipe());
  await application.init();

  environmentArranger = new TypeOrmEnvironmentArranger();
  await environmentArranger.arrange();
});

AfterAll(async () => {
  await application.close();
  await environmentArranger.close();
});

export { application };
