import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { mkdirSync } from 'fs';

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

// Interfaz para tipar el request
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
      InstitutionEntity
    ]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        storage: diskStorage({
          destination: (req: RequestWithParams, file, callback) => {
            try {
              // Validación de parámetros
              const creditId = req.params.creditId;
              const documentType = req.body.documentType;

              if (!creditId) {
                throw new Error('CreditId es requerido');
              }

              if (!documentType) {
                throw new Error('DocumentType es requerido');
              }

              // Construir y crear directorios
              const baseDir = join(process.cwd(), 'uploads', 'credits');
              const uploadPath = join(baseDir, creditId, documentType);

              console.log('Verificando/creando directorio:', {
                baseDir,
                uploadPath,
                creditId,
                documentType
              });

              // Crear estructura de carpetas de forma recursiva
              mkdirSync(uploadPath, { recursive: true });

              // Verificar permisos de escritura
              try {
                const testFile = join(uploadPath, '.test');
                mkdirSync(testFile, { recursive: true });
                callback(null, uploadPath);
              } catch (error) {
                console.error('Error de permisos en el directorio:', error);
                callback(new Error('Error de permisos en el directorio de carga'), null);
              }

            } catch (error) {
              console.error('Error en destination:', error);
              callback(error as Error, null);
            }
          },
          filename: (req: RequestWithParams, file, callback) => {
            try {
              // Validación del tipo de documento
              const documentType = req.body.documentType;
              if (!documentType) {
                throw new Error('DocumentType es requerido para el nombre del archivo');
              }

              // Generar nombre único y seguro para el archivo
              const timestamp = Date.now();
              const randomString = Math.random().toString(36).substring(2, 15);
              const safeDocType = documentType.replace(/[^a-z0-9]/gi, '_').toLowerCase();
              const fileExtension = extname(file.originalname).toLowerCase();
              
              // Validar extensión
              if (!['.jpg', '.jpeg', '.png', '.pdf'].includes(fileExtension)) {
                throw new Error('Extensión de archivo no permitida');
              }

              const fileName = `${safeDocType}-${timestamp}-${randomString}${fileExtension}`;
              
              console.log('Generando nombre de archivo:', {
                originalName: file.originalname,
                generatedName: fileName,
                documentType: safeDocType
              });

              callback(null, fileName);
            } catch (error) {
              console.error('Error en filename:', error);
              callback(error as Error, null);
            }
          }
        }),
        fileFilter: (req, file, callback) => {
          try {
            // Validar tipo MIME
            const allowedMimes = [
              'image/jpeg',
              'image/png',
              'application/pdf'
            ];

            if (!allowedMimes.includes(file.mimetype)) {
              return callback(
                new Error(
                  `Tipo de archivo no permitido. Se permite: ${allowedMimes.join(', ')}`
                ),
                false
              );
            }

            // Validar extensión
            const ext = extname(file.originalname).toLowerCase();
            if (!['.jpg', '.jpeg', '.png', '.pdf'].includes(ext)) {
              return callback(
                new Error('Extensión de archivo no permitida'),
                false
              );
            }

            // Validar tamaño antes de procesar
            if (parseInt(req.headers['content-length']) > 5 * 1024 * 1024) {
              return callback(
                new Error('El archivo excede el tamaño máximo permitido (5MB)'),
                false
              );
            }

            callback(null, true);
          } catch (error) {
            console.error('Error en fileFilter:', error);
            callback(error as Error, false);
          }
        },
        limits: {
          fileSize: 5 * 1024 * 1024, // 5MB
          files: 1, // Máximo 1 archivo por solicitud
          fields: 5 // Máximo 5 campos en el formulario
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [
    CreditController,
    CreditDocumentController
  ],
  providers: [
    CreditService,
    CreditDocumentService,
    {
      provide: 'UPLOAD_PATH',
      useValue: join(process.cwd(), 'uploads', 'credits')
    }
  ],
  exports: [
    CreditService,
    CreditDocumentService
  ]
})
export class CreditModule {}