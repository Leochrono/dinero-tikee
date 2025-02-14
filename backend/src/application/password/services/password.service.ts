import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PasswordHistoryEntity } from '../../../domain/entities/password-history.entity';
import { UserEntity } from '../../../domain/entities/user.entity';
import { MailerRepository } from 'src/application/Common/interfaces/mailer.repository';

interface PasswordChangeMetadata {
  ipAddress?: string;
  userAgent?: string;
  isRecovery?: boolean;
}

@Injectable()
export class PasswordService {
  private readonly logger = new Logger(PasswordService.name);

  private readonly CONFIG = {
    TEMP_PASSWORD_DURATION: 24,    // horas que dura una contraseña temporal
    PASSWORD_HISTORY_LIMIT: 5,     // últimas contraseñas a recordar
    MIN_PASSWORD_AGE: 1,          // días mínimos entre cambios
    MAX_PASSWORD_AGE: 90,         // días máximos antes de forzar cambio
  };

  constructor(
    @InjectRepository(PasswordHistoryEntity)
    private passwordHistoryRepository: Repository<PasswordHistoryEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private configService: ConfigService,
    private readonly mailerRepository: MailerRepository  
  ) {}

  async validatePasswordStrength(password: string): Promise<{ isValid: boolean; errors: string[] }> {
    const errors = [];
    if (password.length < 8) {
      errors.push('La contraseña debe tener al menos 8 caracteres');
    }
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  async generateTemporaryPassword(): Promise<string> {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
   
    // Asegurar al menos un número
    password += chars.slice(26)[Math.floor(Math.random() * 10)];
    
    // Completar con 5 caracteres alfanuméricos aleatorios
    while (password.length < 6) {
      password += chars[Math.floor(Math.random() * chars.length)];
    }
   
    // Mezclar los caracteres
    return password.split('').sort(() => Math.random() - 0.5).join('');
   }

  async validateAgainstHistory(userId: string, newPassword: string): Promise<boolean> {
    const recentPasswords = await this.passwordHistoryRepository.find({
      where: { user: { id: userId } },
      order: { changedAt: 'DESC' },
      take: this.CONFIG.PASSWORD_HISTORY_LIMIT
    });

    for (const historicPassword of recentPasswords) {
      if (await bcrypt.compare(newPassword, historicPassword.hashedPassword)) {
        return false;
      }
    }
    return true;
  }

  async addToHistory(userId: string, password: string, metadata: {
    changedBy: string;
    reason: string;
    ipAddress?: string;
    userAgent?: string;
    isTemporary?: boolean;
  }): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const passwordHistory = this.passwordHistoryRepository.create({
      user: { id: userId },
      hashedPassword,
      ...metadata
    });

    await this.passwordHistoryRepository.save(passwordHistory);
  }

  async getPasswordHistory(userId: string): Promise<PasswordHistoryEntity[]> {
    return this.passwordHistoryRepository.find({
      where: { user: { id: userId } },
      order: { changedAt: 'DESC' },
      take: 10
    });
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async isTemporaryPasswordExpired(passwordUpdatedAt: Date): Promise<boolean> {
    if (!passwordUpdatedAt) return false;
    
    const now = new Date().getTime();
    const updatedAt = new Date(passwordUpdatedAt).getTime();
    const hoursDiff = (now - updatedAt) / (1000 * 60 * 60);
    
    return hoursDiff > this.CONFIG.TEMP_PASSWORD_DURATION;
  }

  // Métodos adicionales del AuthService
  async validateUserPassword(user: UserEntity, password: string): Promise<boolean> {
    if (!user || !password) return false;
    return this.comparePasswords(password, user.password);
  }

  async changePassword(
    userId: string, 
    currentPassword: string, 
    newPassword: string,
    metadata: PasswordChangeMetadata 
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      // Validar fortaleza de la nueva contraseña
      const validation = await this.validatePasswordStrength(newPassword);
      if (!validation.isValid) {
        return { success: false, error: validation.errors.join(', ') };
      }

      // Validar que no esté en el historial
      const isUnique = await this.validateAgainstHistory(userId, newPassword);
      if (!isUnique) {
        return { success: false, error: 'No puedes reutilizar una contraseña reciente' };
      }

      // Si es cambio normal, validar contraseña actual
      if (!user.requiresPasswordChange) {
        const isCurrentPasswordValid = await this.validateUserPassword(user, currentPassword);
        if (!isCurrentPasswordValid) {
          return { success: false, error: 'La contraseña actual es incorrecta' };
        }
      }

      // Verificar expiración de contraseña temporal
      if (user.requiresPasswordChange && user.passwordUpdatedAt) {
        const isExpired = await this.isTemporaryPasswordExpired(user.passwordUpdatedAt);
        if (isExpired) {
          return { 
            success: false, 
            error: 'La contraseña temporal ha expirado. Por favor, solicita una nueva.' 
          };
        }
      }

      // Realizar el cambio
      const hashedPassword = await this.hashPassword(newPassword);
      await this.userRepository.update(userId, {
        password: hashedPassword,
        passwordUpdatedAt: new Date(),
        requiresPasswordChange: false
      });

      // Registrar en historial
      await this.addToHistory(userId, newPassword, {
        changedBy: 'user',
        reason: user.requiresPasswordChange ? 'temporary_change' : 'user_request',
        ...metadata
      });

      return { success: true };
    } catch (error) {
      this.logger.error(`Error changing password: ${error.message}`);
      return { success: false, error: 'Error al cambiar la contraseña' };
    }
  }

  async handlePasswordRecovery(
    userId: string,
    metadata: {
      ipAddress?: string;
      userAgent?: string;
    }
  ): Promise<{ success: boolean; tempPassword?: string; error?: string }> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        return { success: false, error: 'Usuario no encontrado' };
      }
  
      const tempPassword = await this.generateTemporaryPassword();
      const hashedPassword = await this.hashPassword(tempPassword);
  
      await this.userRepository.update(userId, {
        password: hashedPassword,
        passwordUpdatedAt: new Date(),
        requiresPasswordChange: true
      });
  
      await this.addToHistory(userId, tempPassword, {
        changedBy: 'system',
        reason: 'reset',
        isTemporary: true,
        ...metadata
      });
  
      // Añadir el envío de correo
      await this.mailerRepository.sendPasswordRecovery({
        id: userId,
        nombres: `${user.nombres} ${user.apellidos}`,
        email: user.email,
        tokenOrPassword: tempPassword,
        date: new Date(),
        ip: metadata.ipAddress,
        userAgent: metadata.userAgent
      });
  
      return { 
        success: true, 
        tempPassword 
      };
    } catch (error) {
      this.logger.error(`Error in password recovery: ${error.message}`);
      return { 
        success: false, 
        error: 'Error en el proceso de recuperación de contraseña' 
      };
    }
  }

  async validateRecoveryCode(
    user: UserEntity, 
    recoveryCode: string
  ): Promise<{ isValid: boolean; error?: string }> {
    try {
      if (!user.requiresPasswordChange) {
        return { isValid: false, error: 'No hay una solicitud de recuperación activa' };
      }

      const isCodeValid = await this.comparePasswords(recoveryCode, user.password);
      if (!isCodeValid) {
        return { isValid: false, error: 'Código de recuperación inválido' };
      }

      const isExpired = await this.isTemporaryPasswordExpired(user.passwordUpdatedAt);
      if (isExpired) {
        return { isValid: false, error: 'El código de recuperación ha expirado' };
      }

      return { isValid: true };
    } catch (error) {
      this.logger.error(`Error validating recovery code: ${error.message}`);
      return { isValid: false, error: 'Error al validar código de recuperación' };
    }
  }
}