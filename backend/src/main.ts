import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';
import { createLogger, format, transports } from 'winston';

const winstonLogger = createLogger({
  level: 'error',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),

    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
});

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  const jwtSecret = configService.get<string>('JWT_SECRET');
  if (!jwtSecret) {
    winstonLogger.error('La variable JWT_SECRET no está definida.');

    logger.error(
      'Error crítico: La aplicación no puede iniciarse debido a una configuración faltante.',
    );
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

  app.enableCors({
    origin: ['http://localhost:5173'],
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
    exposedHeaders: ['Content-Disposition'],
  });

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
