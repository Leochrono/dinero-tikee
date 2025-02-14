// src/application/security/security.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityController } from '../../interface/controllers/security.controller';
import { SecurityService } from './services/security.service';
import { SecurityLogEntity } from '../../domain/entities/security-log.entity';
import { UserEntity } from '../../domain/entities/user.entity';
import { SecurityPreferencesEntity } from '../../domain/entities/security-preferences.entity';
import { MailerModule } from '../../infrastructure/mailer/mailer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SecurityLogEntity,
      UserEntity,
      SecurityPreferencesEntity
    ]),
    MailerModule
  ],
  controllers: [SecurityController],
  providers: [SecurityService],
  exports: [SecurityService]
})
export class SecurityModule {}