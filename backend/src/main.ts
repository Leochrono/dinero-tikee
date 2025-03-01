import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, { logger: ["error", "warn"] });

  const configService = app.get(ConfigService);

  app.enableCors({
    origin: ['http://localhost:5173', 'https://dinero-tikee.vercel.app', 'http://172.212.86.190:8430', 'https://172.212.86.190:8430'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'Cache-Control',
      'X-Requested-With',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Headers',
    ],
  });
  app.use(express.json({ limit: "100mb" }));
  app.use(express.urlencoded({ extended: false, limit: "100mb" }));

  const jwtSecret = configService.get<string>('JWT_SECRET');
  if (!jwtSecret) {
    logger.error('Error crítico: La aplicación no puede iniciarse debido a una configuración faltante.');
    process.exit(1);
  }

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.setGlobalPrefix('api');

  const port = configService.get('PORT') || 3000;
  await app.listen(port);

  logger.log(`🚀 La aplicación está corriendo en: ${await app.getUrl()}`);
  logger.log(
    `📁 Archivos estáticos disponibles en: ${await app.getUrl()}/uploads`,
  );
  logger.log(`🌐 URL del frontend: ${configService.get('FRONTEND_URL')}`);
}

bootstrap();
