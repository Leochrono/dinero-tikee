import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpCode,
  HttpStatus,
  Ip,
  Headers,
} from '@nestjs/common';
import { VerificationService } from 'src/application/verification/services/verification.service';
import {
  SendVerificationCodeDto,
  VerifyEmailDto,
  ResendVerificationCodeDto,
} from 'src/application/verification/dto/verify.dto';

@Controller('verification')
export class VerificationController {
  constructor(private verificationService: VerificationService) {}

  @Post('send')
  @HttpCode(HttpStatus.OK)
  async sendVerificationCode(
    @Body() dto: SendVerificationCodeDto,
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent: string,
  ) {
    return this.verificationService.sendVerificationEmail(
      dto.email,
      dto.nombres || dto.email.split('@')[0], // Asegurar que siempre haya un nombre
      ipAddress,
      userAgent,
    );
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  async verifyEmail(
    @Body() dto: VerifyEmailDto,
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent: string,
  ) {
    return this.verificationService.verifyEmail(dto);
  }

  @Post('resend')
  @HttpCode(HttpStatus.OK)
  async resendCode(
    @Body() dto: ResendVerificationCodeDto,
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent: string,
  ) {
    return this.verificationService.sendVerificationEmail(
      dto.email,
      ipAddress,
      userAgent,
    );
  }

  @Get('status/:email')
  @HttpCode(HttpStatus.OK)
  async checkStatus(
    @Param('email') email: string,
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent: string,
  ) {
    return this.verificationService.checkVerificationStatus(email);
  }
}
