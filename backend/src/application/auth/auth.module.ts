import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../../infrastructure/auth/jwt.strategy';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserService } from '../user/services/user.service';
import { AuthController } from '../../interface/controllers/auth.controller';
import { PasswordModule } from '../password/password.module';
import { CreditModule } from '../credit/credit.module';
import { MailerModule } from '../../infrastructure/mailer/mailer.module';

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
    TypeOrmModule.forFeature([UserEntity]),
    PasswordModule,
    CreditModule,
    MailerModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
