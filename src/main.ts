import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { NestjsRedoxModule } from 'nestjs-redox';
import { GlobalExceptionFilter } from './utils/filters/exception.filters';
import { TransformInterceptor } from './utils/interceptors/transform.interceptors';
import { ValidationPipe } from '@nestjs/common';
import { version } from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  if (process.env.ENABLE_SWAGGER === '1') {
    const { SwaggerModule, DocumentBuilder } = await import('@nestjs/swagger');

    const options = new DocumentBuilder()
      .setTitle('NestJS API Boilerplate')
      .setDescription('NestJS API Boilerplate with Swagger')
      .setVersion(version)
      .addTag('Utility - Health Check API')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
    NestjsRedoxModule.setup('redoc', app, document, {
      standalone: true,
    });
  }

  if (process.env.GLOBAL_CORS === '1') {
    app.enableCors({
      origin: '*',
      credentials: true,
    });
  } else {
    app.enableCors({
      origin: process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(',')
        : '*',
      credentials: true,
    });
  } 


  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  if (process.env.NODE_ENV === 'development') {
    await app.listen(3000);
  } else {
    await app.listen(3000, '0.0.0.0');
  }
}
bootstrap();
