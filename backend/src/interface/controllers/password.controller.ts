import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Ip,
  Headers,
  BadRequestException,
} from '@nestjs/common';
import { PasswordService } from '../../application/password/services/password.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RateLimit } from '../../infrastructure/guards/rate-limit.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/domain/entities/user.entity';

@Controller('password')
export class PasswordController {
  constructor(
    private readonly passwordService: PasswordService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  @Post('validate')
  @HttpCode(HttpStatus.OK)
  async validatePassword(@Body() data: { password: string }) {
    return this.passwordService.validatePasswordStrength(data.password);
  }

  @Post('change')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @Request() req,
    @Body() data: { currentPassword: string; newPassword: string },
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent: string,
  ) {
    const user = await this.userRepository.findOne({
      where: { id: req.user.id },
    });

    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }

    const result = await this.passwordService.changePassword(
      user.id,
      data.currentPassword,
      data.newPassword,
      { ipAddress, userAgent, isRecovery: false }
    );

    if (!result.success) {
      throw new BadRequestException(result.error);
    }

    return {
      success: true,
      message: 'Contraseña actualizada exitosamente',
    };
  }

  @Post('change-recovery')
  @HttpCode(HttpStatus.OK)
  async changePasswordAfterRecovery(
    @Body() data: { email: string; tempCode: string; newPassword: string },
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent: string,
  ) {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }

    const result = await this.passwordService.changePassword(
      user.id,
      data.tempCode,
      data.newPassword,
      { ipAddress, userAgent, isRecovery: true }
    );

    if (!result.success) {
      throw new BadRequestException(result.error);
    }

    return {
      success: true,
      message: 'Contraseña actualizada exitosamente',
    };
  }

  @Post('recover')
  @HttpCode(HttpStatus.OK)
  @RateLimit(3, 3600, 7200) // 3 intentos/hora, bloqueo 2h
  async recoverPassword(
    @Body() data: { email: string },
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent: string,
  ) {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }

    const result = await this.passwordService.handlePasswordRecovery(user.id, {
      ipAddress,
      userAgent,
    });

    if (!result.success) {
      throw new BadRequestException(result.error);
    }

    return {
      success: true,
      message: 'Se ha enviado una contraseña temporal a tu correo electrónico',
    };
  }

  @Post('validate-recovery')
  @HttpCode(HttpStatus.OK)
  async validateRecoveryCode(@Body() data: { email: string; code: string }) {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }

    const result = await this.passwordService.validateRecoveryCode(
      user,
      data.code,
    );

    if (!result.isValid) {
      throw new BadRequestException(result.error);
    }

    return {
      success: true,
      message: 'Código de recuperación válido',
    };
  }

  @Get('history')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getPasswordHistory(@Request() req) {
    const user = await this.userRepository.findOne({
      where: { id: req.user.id },
    });

    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }

    const history = await this.passwordService.getPasswordHistory(user.id);
    return {
      success: true,
      data: history,
    };
  }

  @Post('temporary')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @RateLimit(2, 3600, 7200) // 2 intentos/hora, bloqueo 2h
  async generateTemporary(
    @Request() req,
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent: string,
  ) {
    const user = await this.userRepository.findOne({
      where: { id: req.user.id },
    });

    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }

    const result = await this.passwordService.handlePasswordRecovery(user.id, {
      ipAddress,
      userAgent,
    });

    if (!result.success) {
      throw new BadRequestException(result.error);
    }

    return {
      success: true,
      data: {
        temporaryPassword: result.tempPassword,
      },
    };
  }

  @Get('check-expiration')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async checkPasswordExpiration(@Request() req) {
    const user = await this.userRepository.findOne({
      where: { id: req.user.id },
    });

    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }

    const isExpired = await this.passwordService.isTemporaryPasswordExpired(
      user.passwordUpdatedAt,
    );

    return {
      success: true,
      data: {
        isExpired,
        requiresChange: user.requiresPasswordChange,
      },
    };
  }
}