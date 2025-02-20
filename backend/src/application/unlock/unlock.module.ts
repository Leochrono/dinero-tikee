import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UnlockService } from './services/unlock.service';
import { AccountLockEntity } from '../../domain/entities/account-lock.entity';
import { UserEntity } from '../../domain/entities/user.entity';
import { UnlockController } from '../../interface/controllers/unlock.controller';
import { MailerModule } from '../../infrastructure/mailer/mailer.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([AccountLockEntity, UserEntity]),
    MailerModule,
  ],
  controllers: [UnlockController],
  providers: [UnlockService],
  exports: [UnlockService],
})
export class UnlockModule {}