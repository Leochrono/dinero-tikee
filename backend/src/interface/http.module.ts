import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

// Entities
import { UserEntity } from 'src/domain/entities/user.entity';
import { InstitutionEntity } from 'src/domain/entities/institution.entity';
import { PasswordHistoryEntity } from 'src/domain/entities/password-history.entity';
import { SecurityEventEntity } from 'src/domain/entities/security-event.entity';
import { AccountLockEntity } from 'src/domain/entities/account-lock.entity';
import { SecurityLogEntity } from 'src/domain/entities/security-log.entity';
import { SecurityPreferencesEntity } from 'src/domain/entities/security-preferences.entity';
import { CreditEntity } from 'src/domain/entities/credit.entity';
import { CreditDocumentEntity } from 'src/domain/entities/credit-document.entity';
import { VerificationLogEntity } from 'src/domain/entities/verification-log.entity';

// Controllers
import { UserController } from './controllers/user.controller';
import { CreditController } from './controllers/credit.controller';
import { InstitutionController } from './controllers/institution.controller';
import { CreditDocumentController } from './controllers/credit-document.controller';
import { AuthController } from './controllers/auth.controller';
import { PasswordController } from './controllers/password.controller';
import { SecurityController } from './controllers/security.controller';
import { UnlockController } from './controllers/unlock.controller';

// Services
import { UserService } from 'src/application/user/services/user.service';
import { CreditService } from 'src/application/credit/services/credit.service';
import { InstitutionService } from 'src/application/institution/services/institution.service';
import { CreditDocumentService } from 'src/application/credit/services/credit-document.service';
import { AuthService } from 'src/application/auth/auth.service';
import { PasswordService } from 'src/application/password/services/password.service';
import { SecurityService } from 'src/application/security/services/security.service';
import { EmailService } from 'src/infrastructure/services/email.service';
import { UnlockService } from 'src/application/unlock/services/unlock.service';

// Other Modules
import { MailerModule } from 'src/infrastructure/mailer/mailer.module';



@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION', '24h'),
        },
      }),
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      CreditEntity,
      InstitutionEntity,
      PasswordHistoryEntity,
      SecurityEventEntity,
      AccountLockEntity,
      SecurityLogEntity,
      SecurityPreferencesEntity,
      CreditDocumentEntity,
      VerificationLogEntity,
    ]),
    MailerModule,
  ],
  controllers: [
    UserController,
    CreditController,
    InstitutionController,
    CreditDocumentController,
    AuthController,
    PasswordController,
    SecurityController,
    UnlockController, // Añadido UnlockController
  ],
  providers: [
    UserService,
    CreditService,
    InstitutionService,
    CreditDocumentService,
    AuthService,
    PasswordService,
    SecurityService,
    EmailService,
    UnlockService, // Añadido UnlockService
  ],
  exports: [
    UserService,
    CreditService,
    InstitutionService,
    CreditDocumentService,
    AuthService,
    PasswordService,
    SecurityService,
    JwtModule,
    EmailService,
    UnlockService, // Añadido a las exportaciones
  ],
})
export class HttpModule {}
