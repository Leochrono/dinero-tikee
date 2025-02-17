import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PasswordService } from './services/password.service';
import { PasswordController } from '../../interface/controllers/password.controller';
import { PasswordHistoryEntity } from '../../domain/entities/password-history.entity';
import { UserEntity } from '../../domain/entities/user.entity';
import { MailerModule } from '../../infrastructure/mailer/mailer.module';
import { JwtStrategy } from '../../infrastructure/auth/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
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
    TypeOrmModule.forFeature([PasswordHistoryEntity, UserEntity]),
    MailerModule,
  ],
  controllers: [PasswordController],
  providers: [PasswordService, JwtStrategy],
  exports: [PasswordService],
})
export class PasswordModule {}
