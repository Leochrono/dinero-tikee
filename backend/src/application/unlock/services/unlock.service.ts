import {
  Injectable,
  Logger,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountLockEntity } from '../../../domain/entities/account-lock.entity';
import { UserEntity } from '../../../domain/entities/user.entity';
import * as crypto from 'crypto';
import { MailerRepository } from 'src/application/Common/interfaces/mailer.repository';

@Injectable()
export class UnlockService {
  private readonly logger = new Logger(UnlockService.name);
  private readonly CONFIG = {
    CODE_LENGTH: 8,
    CODE_EXPIRY: 30, // minutos
    MAX_ATTEMPTS: 3,
    LOCK_DURATION: 24 * 60, // 24 horas en minutos
  };

  constructor(
    @InjectRepository(AccountLockEntity)
    private accountLockRepository: Repository<AccountLockEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly mailerRepository: MailerRepository,
  ) {}

  private generateUnlockCode(): string {
    return crypto.randomBytes(4).toString('hex').toUpperCase();
  }

  async generateAndSendUnlockCode(
    userId: string,
    email: string,
    reason: string,
    ipAddress?: string,
    userAgent?: string,
  ) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }

    const existingLock = await this.accountLockRepository.findOne({
      where: { user: { id: userId }, isActive: true },
    });

    if (existingLock && existingLock.unlockCode) {
      // Si ya existe un código válido, verificar si expiró
      const now = new Date();
      if (
        existingLock.unlockCodeExpiresAt &&
        existingLock.unlockCodeExpiresAt > now
      ) {
        throw new BadRequestException(
          'Ya existe un código de desbloqueo válido',
        );
      }
    }

    const unlockCode = this.generateUnlockCode();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + this.CONFIG.CODE_EXPIRY);

    const lockDuration = new Date();
    lockDuration.setMinutes(
      lockDuration.getMinutes() + this.CONFIG.LOCK_DURATION,
    );

    const accountLock = this.accountLockRepository.create({
      user: { id: userId },
      reason,
      unlockCode,
      unlockCodeExpiresAt: expiresAt,
      expiresAt: lockDuration,
      ipAddress,
      userAgent,
      attempts: 0,
      isActive: true,
    });

    await this.accountLockRepository.save(accountLock);

    // Enviar email con el código
    await this.mailerRepository.sendAccountLockNotification({
      id: user.id,
      nombres: `${user.nombres} ${user.apellidos}`,
      email: email,
      tokenOrPassword: unlockCode,
      date: new Date(),
      ip: ipAddress,
      userAgent: userAgent,
    });

    return {
      success: true,
      message: 'Código de desbloqueo enviado',
      expiresAt,
    };
  }

  async validateUnlockCode(
    email: string,
    code: string,
    ipAddress?: string,
    userAgent?: string,
  ) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const lock = await this.accountLockRepository.findOne({
      where: { user: { id: user.id }, isActive: true },
    });

    if (!lock) {
      throw new BadRequestException('No hay bloqueos activos para esta cuenta');
    }

    if (!lock.unlockCode || !lock.unlockCodeExpiresAt) {
      throw new BadRequestException('No hay código de desbloqueo generado');
    }

    // Verificar expiración
    const now = new Date();
    if (lock.unlockCodeExpiresAt < now) {
      throw new BadRequestException('El código de desbloqueo ha expirado');
    }

    // Verificar intentos
    if (lock.attempts >= this.CONFIG.MAX_ATTEMPTS) {
      throw new BadRequestException(
        'Has excedido el número máximo de intentos',
      );
    }

    // Incrementar contador de intentos
    lock.attempts += 1;

    // Verificar código
    if (lock.unlockCode !== code.toUpperCase()) {
      await this.accountLockRepository.save(lock);
      throw new UnauthorizedException('Código de desbloqueo inválido');
    }

    // Desbloquear cuenta
    lock.isActive = false;
    lock.unlockedAt = now;
    lock.unlockedBy = 'user';
    await this.accountLockRepository.save(lock);

    // Resetear estado de bloqueo del usuario
    await this.userRepository.update(user.id, {
      isLocked: false,
      failedLoginAttempts: 0,
      lastFailedLogin: null,
    });

    return {
      success: true,
      message: 'Cuenta desbloqueada exitosamente',
    };
  }

  async getLockStatus(userId: string) {
    const lock = await this.accountLockRepository.findOne({
      where: { user: { id: userId }, isActive: true },
    });

    if (!lock) {
      return {
        isLocked: false,
      };
    }

    return {
      isLocked: true,
      reason: lock.reason,
      expiresAt: lock.expiresAt,
      attempts: lock.attempts,
      maxAttempts: this.CONFIG.MAX_ATTEMPTS,
      remainingAttempts: this.CONFIG.MAX_ATTEMPTS - (lock.attempts || 0),
    };
  }

  async forceUnlock(userId: string, adminId: string) {
    const lock = await this.accountLockRepository.findOne({
      where: { user: { id: userId }, isActive: true },
    });

    if (!lock) {
      throw new BadRequestException('No hay bloqueos activos para esta cuenta');
    }

    const now = new Date();
    lock.isActive = false;
    lock.unlockedAt = now;
    lock.unlockedBy = 'admin';
    await this.accountLockRepository.save(lock);

    // Resetear estado de bloqueo del usuario
    await this.userRepository.update(userId, {
      isLocked: false,
      failedLoginAttempts: 0,
      lastFailedLogin: null,
    });

    this.logger.log(
      `Cuenta desbloqueada por admin ${adminId} para usuario ${userId}`,
    );

    return {
      success: true,
      message: 'Cuenta desbloqueada exitosamente por administrador',
    };
  }
}
