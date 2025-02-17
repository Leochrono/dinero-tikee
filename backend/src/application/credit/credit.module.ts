import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { join } from 'path';
import * as path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Request } from 'express';

// Entidades
import { CreditEntity } from '../../domain/entities/credit.entity';
import { CreditDocumentEntity } from '../../domain/entities/credit-document.entity';
import { UserEntity } from '../../domain/entities/user.entity';
import { InstitutionEntity } from '../../domain/entities/institution.entity';

// Servicios
import { CreditService } from './services/credit.service';
import { CreditDocumentService } from './services/credit-document.service';

// Controladores
import { CreditController } from '../../interface/controllers/credit.controller';
import { CreditDocumentController } from '../../interface/controllers/credit-document.controller';

interface RequestWithParams extends Request {
  params: {
    creditId?: string;
  };
  body: {
    documentType?: string;
  };
}

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      CreditEntity,
      CreditDocumentEntity,
      UserEntity,
      InstitutionEntity,
    ]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        storage: memoryStorage(),
        fileFilter: (req, file, callback) => {
          const allowedMimes = ['image/jpeg', 'image/png', 'application/pdf'];
          if (!allowedMimes.includes(file.mimetype)) {
            return callback(
              new Error(
                'Tipo de archivo no permitido. Solo se permiten JPG, PNG y PDF',
              ),
              false,
            );
          }

          const ext = path.extname(file.originalname).toLowerCase();
          if (!['.jpg', '.jpeg', '.png', '.pdf'].includes(ext)) {
            return callback(
              new Error('Extensión de archivo no permitida'),
              false,
            );
          }

          callback(null, true);
        },
        limits: {
          fileSize: 5 * 1024 * 1024,
          files: 1,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [CreditController, CreditDocumentController],
  providers: [
    CreditService,
    CreditDocumentService,
    {
      provide: 'UPLOAD_PATH',
      useValue: join(process.cwd(), 'uploads', 'credits'),
    },
  ],
  exports: [CreditService, CreditDocumentService],
})
export class CreditModule {}
