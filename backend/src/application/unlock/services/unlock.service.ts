import {
  Injectable,
  Logger,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountLockEntity } from '../../../domain/entities/account-lock.entity';
import { UserEntity } from '../../../domain/entities/user.entity';
import { MailerRepository } from 'src/application/Common/interfaces/mailer.repository';
import * as crypto from 'crypto';

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
    email: string,
    cedula: string,
    reason: string,
    ipAddress?: string,
    userAgent?: string,
  ) {
    try {
      this.logger.debug('Buscando usuario con credenciales:', { 
        email, 
        cedula,
        reason 
      });

      const user = await this.userRepository.findOne({ 
        where: { 
          email,
          cedula 
        } 
      });
      
      if (!user) {
        this.logger.warn('Usuario no encontrado:', { email, cedula });
        throw new NotFoundException('Usuario no encontrado o credenciales inválidas');
      }

      this.logger.debug('Usuario encontrado:', { 
        userId: user.id, 
        email: user.email 
      });

      // Verificar si ya existe un código válido
      const existingLock = await this.accountLockRepository.findOne({
        where: { user: { id: user.id }, isActive: true },
      });

      if (existingLock && existingLock.unlockCode) {
        const now = new Date();
        if (existingLock.unlockCodeExpiresAt && existingLock.unlockCodeExpiresAt > now) {
          this.logger.warn('Código de desbloqueo existente y válido:', {
            userId: user.id,
            expiresAt: existingLock.unlockCodeExpiresAt
          });
          throw new BadRequestException('Ya existe un código de desbloqueo válido');
        }
      }

      // Generar nuevo código y fechas
      const unlockCode = this.generateUnlockCode();
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + this.CONFIG.CODE_EXPIRY);

      const lockDuration = new Date();
      lockDuration.setMinutes(lockDuration.getMinutes() + this.CONFIG.LOCK_DURATION);

      this.logger.debug('Generando nuevo código de desbloqueo:', {
        userId: user.id,
        expiresAt,
        lockDuration
      });

      // Crear o actualizar el bloqueo
      const accountLock = this.accountLockRepository.create({
        user: { id: user.id },
        reason,
        unlockCode,
        unlockCodeExpiresAt: expiresAt,
        expiresAt: lockDuration,
        ipAddress,
        userAgent,
        attempts: 0,
        isActive: true,
        metadata: {
          deviceInfo: userAgent,
          location: ipAddress,
          notes: `Solicitud de desbloqueo con validación de cédula - ${new Date().toISOString()}`
        }
      });

      await this.accountLockRepository.save(accountLock);

      // Registrar intento en el historial del usuario
      await this.userRepository.update(user.id, {
        lastFailedLogin: new Date(),
        lockExpirationDate: lockDuration,
        isLocked: true
      });

      this.logger.debug('Estado de usuario actualizado, enviando notificación');

      // Enviar email con el código
      await this.mailerRepository.sendAccountLockNotification({
        id: user.id,
        nombres: `${user.nombres} ${user.apellidos}`,
        email: user.email,
        tokenOrPassword: unlockCode,
        date: new Date(),
        ip: ipAddress,
        userAgent,
      });

      this.logger.log(`Código de desbloqueo generado exitosamente para usuario: ${user.id}`);

      return {
        success: true,
        message: 'Código de desbloqueo enviado',
        expiresAt,
        remainingAttempts: this.CONFIG.MAX_ATTEMPTS
      };
    } catch (error) {
      this.logger.error('Error en generateAndSendUnlockCode:', {
        errorType: error.constructor.name,
        message: error.message,
        email,
        cedula,
        stack: error.stack
      });
      
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      
      throw new BadRequestException(
        'Error al generar código de desbloqueo. Por favor, intente nuevamente.'
      );
    }
  }

  async validateUnlockCode(
    email: string,
    code: string,
    ipAddress?: string,
    userAgent?: string,
  ) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
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
        throw new BadRequestException('Has excedido el número máximo de intentos');
      }

      // Incrementar contador de intentos
      lock.attempts += 1;
      await this.accountLockRepository.save(lock);

      // Verificar código
      if (lock.unlockCode !== code.toUpperCase()) {
        throw new BadRequestException('Código de desbloqueo inválido');
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
    } catch (error) {
      this.logger.error(`Error validando código de desbloqueo: ${error.message}`);
      throw error;
    }
  }

  async getLockStatus(email: string) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      const lock = await this.accountLockRepository.findOne({
        where: { user: { id: user.id }, isActive: true },
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
    } catch (error) {
      this.logger.error(`Error obteniendo estado de bloqueo: ${error.message}`);
      throw error;
    }
  }

  async forceUnlock(userId: string, adminId: string) {
    try {
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

      await this.userRepository.update(userId, {
        isLocked: false,
        failedLoginAttempts: 0,
        lastFailedLogin: null,
      });

      return {
        success: true,
        message: 'Cuenta desbloqueada exitosamente por administrador',
      };
    } catch (error) {
      this.logger.error(`Error en desbloqueo forzado: ${error.message}`);
      throw error;
    }
  }
}