import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { mkdirSync } from 'fs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UserService } from './services/user.service';
import { UserController } from '../../interface/controllers/user.controller';
import { UserEntity } from '../../domain/entities/user.entity';
import { MailerModule } from '../../infrastructure/mailer/mailer.module';
import { PasswordModule } from '../password/password.module';

// Extender el tipo Request para incluir el usuario
interface RequestWithUser extends Request {
  user?: {
    id: string;
    [key: string]: any;
  };
}

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserEntity]),
    MailerModule,
    PasswordModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        storage: diskStorage({
          destination: (req: RequestWithUser, file, callback) => {
            try {
              const baseDir = './uploads/users';
              
              const userId = req.user?.id;
              if (!userId) {
                throw new Error('ID de usuario no encontrado');
              }

              const uploadPath = join(baseDir, userId);
              console.log('Creando directorio de usuario:', uploadPath);
              
              mkdirSync(uploadPath, { recursive: true });
              callback(null, uploadPath);
            } catch (error) {
              callback(error as Error, '');
            }
          },
          filename: (req, file, callback) => {
            try {
              const uniqueName = uuidv4();
              const fileExtension = extname(file.originalname);
              const fileName = `${uniqueName}${fileExtension}`;
              
              console.log('Nombre de archivo generado:', fileName);
              callback(null, fileName);
            } catch (error) {
              callback(error as Error, '');
            }
          }
        }),
        fileFilter: (req, file, callback) => {
          if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)) {
            return callback(
              new Error('Solo se permiten archivos jpg, jpeg, png y pdf'),
              false
            );
          }
          callback(null, true);
        },
        limits: {
          fileSize: 5 * 1024 * 1024, // 5MB
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UPLOAD_PATH',
      useValue: './uploads/users'
    }
  ],
  exports: [UserService]
})
export class UserModule {}