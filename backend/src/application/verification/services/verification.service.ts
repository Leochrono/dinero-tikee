import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { UserEntity } from 'src/domain/entities/user.entity';
import {
  VerifyEmailDto,
  ResendVerificationCodeDto,
  VerifyEmailResponse,
} from '../dto/verify.dto';
import { VerificationLogEntity } from 'src/domain/entities/verification-log.entity';
import { MailerRepository } from 'src/application/Common/interfaces/mailer.repository';

@Injectable()
export class VerificationService {
  private readonly logger = new Logger(VerificationService.name);
  private readonly VERIFICATION_CODE_EXPIRY = 15; // minutos
  private readonly MAX_ATTEMPTS = 5;
  private readonly COOLDOWN_DURATION = 15; // minutos
  private readonly CODE_LENGTH = 6;

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(VerificationLogEntity)
    private readonly verificationLogRepository: Repository<VerificationLogEntity>,
    private readonly mailerRepository: MailerRepository,
  ) {}

  private generateSecureVerificationCode(): string {
    const digits = '0123456789';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';

    // Generar 2 dígitos
    for (let i = 0; i < 2; i++) {
      code += digits[Math.floor(Math.random() * digits.length)];
    }

    // Generar el resto de caracteres alfabéticos
    for (let i = code.length; i < this.CODE_LENGTH; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }

    // Mezclar el código
    return code
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
  }

  async sendVerificationEmail(
    email: string,
    nombres: string,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<VerifyEmailResponse> {
    try {
      // Verificar que el email no esté ya registrado
      const existingUser = await this.userRepository.findOne({
        where: { email },
      });
      if (existingUser) {
        throw new BadRequestException('El correo ya está registrado');
      }

      // Verificar cooldown de intentos previos
      const existingLog = await this.verificationLogRepository.findOne({
        where: {
          email,
          cooldownUntil: LessThan(new Date()),
        },
        order: { createdAt: 'DESC' },
      });

      if (
        existingLog?.cooldownUntil &&
        existingLog.cooldownUntil > new Date()
      ) {
        throw new BadRequestException(
          'Demasiados intentos. Espere antes de solicitar un nuevo código.',
        );
      }

      // Generar nuevo código y tiempo de expiración
      const verificationCode = this.generateSecureVerificationCode();
      const expirationTime = new Date();
      expirationTime.setMinutes(
        expirationTime.getMinutes() + this.VERIFICATION_CODE_EXPIRY,
      );

      // Crear registro de verificación
      const verificationLog = this.verificationLogRepository.create({
        email,
        verificationCode,
        expiresAt: expirationTime,
        ipAddress,
        userAgent,
        remainingAttempts: this.MAX_ATTEMPTS,
        metadata: {
          deviceInfo: userAgent,
          status: 'registration_verification',
        },
      });

      // Guardar registro de verificación
      const savedLog =
        await this.verificationLogRepository.save(verificationLog);

      // Enviar email con código de verificación
      await this.mailerRepository.sendVerifyEmail({
        id: savedLog.id,
        nombres: nombres,
        email: email,
        tokenOrPassword: verificationCode,
        date: new Date(),
        ip: ipAddress,
        userAgent: userAgent,
      });

      return {
        success: true,
        message: 'Código de verificación enviado',
        expiresAt: expirationTime,
        remainingAttempts: this.MAX_ATTEMPTS,
      };
    } catch (error) {
      this.logger.error(
        `Error enviando código de verificación: ${error.message}`,
      );
      throw error;
    }
  }

  async verifyEmail(dto: VerifyEmailDto): Promise<VerifyEmailResponse> {
    try {
      const verificationLog = await this.verificationLogRepository.findOne({
        where: { email: dto.email },
        order: { createdAt: 'DESC' },
      });

      if (!verificationLog) {
        throw new BadRequestException(
          'No hay código de verificación pendiente',
        );
      }

      if (
        verificationLog.cooldownUntil &&
        verificationLog.cooldownUntil > new Date()
      ) {
        throw new BadRequestException(
          'Demasiados intentos. Intente más tarde.',
        );
      }

      if (verificationLog.remainingAttempts <= 0) {
        verificationLog.cooldownUntil = new Date();
        verificationLog.cooldownUntil.setMinutes(
          verificationLog.cooldownUntil.getMinutes() + this.COOLDOWN_DURATION,
        );
        await this.verificationLogRepository.save(verificationLog);

        throw new BadRequestException(
          `Demasiados intentos. Intente después de ${this.COOLDOWN_DURATION} minutos.`,
        );
      }

      if (verificationLog.expiresAt < new Date()) {
        throw new BadRequestException('El código de verificación ha expirado');
      }

      if (verificationLog.verificationCode !== dto.verificationCode) {
        verificationLog.remainingAttempts -= 1;
        await this.verificationLogRepository.save(verificationLog);

        throw new BadRequestException('Código de verificación inválido');
      }

      // Actualizar registro como verificado
      verificationLog.isVerified = true;
      verificationLog.verifiedAt = new Date();
      verificationLog.remainingAttempts = this.MAX_ATTEMPTS;
      verificationLog.metadata = {
        ...verificationLog.metadata,
        status: 'verified',
      };
      await this.verificationLogRepository.save(verificationLog);

      return {
        success: true,
        message: 'Email verificado exitosamente',
        isVerified: true,
        remainingAttempts: this.MAX_ATTEMPTS,
      };
    } catch (error) {
      this.logger.error(`Error verificando email: ${error.message}`);
      throw error;
    }
  }

  async resendVerificationCode(
    dto: ResendVerificationCodeDto,
  ): Promise<VerifyEmailResponse> {
    try {
      return await this.sendVerificationEmail(
        dto.email,
        dto.nombres || dto.email.split('@')[0],
        undefined,
        undefined,
      );
    } catch (error) {
      this.logger.error(`Error reenviando código: ${error.message}`);
      throw error;
    }
  }

  async checkVerificationStatus(email: string): Promise<VerifyEmailResponse> {
    try {
      const verificationLog = await this.verificationLogRepository.findOne({
        where: { email },
        order: { createdAt: 'DESC' },
      });

      if (!verificationLog) {
        return {
          success: true,
          message: 'Email no verificado',
          isVerified: false,
        };
      }

      return {
        success: true,
        message: verificationLog.isVerified
          ? 'Email verificado'
          : 'Email no verificado',
        isVerified: verificationLog.isVerified,
      };
    } catch (error) {
      this.logger.error(`Error verificando estado: ${error.message}`);
      throw error;
    }
  }
}
