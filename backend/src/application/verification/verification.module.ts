// src/application/verification/verification.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { VerificationLogEntity } from '../../domain/entities/verification-log.entity';
import { VerificationService } from './services/verification.service';
import { VerificationController } from '../../interface/controllers/verification.controller';
import { MailerModule } from '../../infrastructure/mailer/mailer.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, VerificationLogEntity]),
    MailerModule 
  ],
  controllers: [VerificationController],
  providers: [VerificationService],
  exports: [VerificationService]
})
export class VerificationModule {}