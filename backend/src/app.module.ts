import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './infrastructure/config/database.config';

// Módulos
import { AuthModule } from './application/auth/auth.module';
import { PasswordModule } from './application/password/password.module';
import { HttpModule } from './interface/http.module';
import { CreditModule } from './application/credit/credit.module';
import { InstitutionModule } from './application/institution/institution.module';
import { VerificationModule } from './application/verification/verification.module';
import { IHttpService } from './infrastructure/Common/Http/IHttpService';
import { HttpService } from './infrastructure/Common/Http/HttpService';
import { MailerModule } from './infrastructure/mailer/mailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: false,
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService}),
    AuthModule,
    PasswordModule,
    HttpModule,
    CreditModule,
    InstitutionModule,
    VerificationModule,
    MailerModule,
  ],
  providers: [
    { provide: IHttpService, useClass: HttpService, },
  ]
})
export class AppModule {}
