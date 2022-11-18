import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* This line enables the dto validation in all the endpoints */
  app.useGlobalPipes(new ValidationPipe());

  /* This is a library to improve the server security */
  app.use(helmet());

  /* Manage the cors */
  app.enableCors({
    origin: '*',
  });

  app.use(json());
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  /* This is the nest integration with swagger */
  const config = new DocumentBuilder()
    .setTitle('MiTienda API')
    .setDescription('This is the documentation for MiTienda API.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
