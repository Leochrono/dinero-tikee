import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CreditEntity } from './credit.entity';
import { PasswordHistoryEntity } from './password-history.entity';
import { SecurityEventEntity } from './security-event.entity';
import { AccountLockEntity } from './account-lock.entity';
import { SecurityLogEntity } from './security-log.entity';
import { VerificationLogEntity } from './verification-log.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombres: string;

  @Column()
  apellidos: string;

  @Column({ unique: true })
  cedula: string;

  @Column({ unique: true })
  email: string;

  @Column()
  telefono: string;

  @Column()
  direccion: string;

  @Column()
  password: string;

  // Control de fechas
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  passwordUpdatedAt: Date;

  // Estado y verificación
  @Column({ default: false })
  requiresPasswordChange: boolean;

  @Column({
    type: 'enum',
    enum: ['pending_verification', 'active', 'inactive'],
    default: 'pending_verification',
  })
  status: string;

  @Column({ nullable: true })
  verificationCode: string;

  @Column({ type: 'timestamp', nullable: true })
  verificationCodeExpires: Date;

  @Column({ default: false })
  isEmailVerified: boolean;

  // Relaciones con otras entidades
  @OneToMany(() => CreditEntity, (credit) => credit.user)
  credits: CreditEntity[];

  @OneToMany(
    () => PasswordHistoryEntity,
    (passwordHistory) => passwordHistory.user,
  )
  passwordHistory: PasswordHistoryEntity[];

  @OneToMany(() => SecurityEventEntity, (securityEvent) => securityEvent.user)
  securityEvents: SecurityEventEntity[];

  @OneToMany(() => AccountLockEntity, (accountLock) => accountLock.user)
  accountLocks: AccountLockEntity[];

  @OneToMany(() => SecurityLogEntity, (securityLog) => securityLog.user)
  securityLogs: SecurityLogEntity[];

  @OneToMany(() => VerificationLogEntity, (log) => log.user)
  verificationLogs: VerificationLogEntity[];

  // Seguridad: Control de intentos y bloqueos
  @Column({ default: 0 })
  failedLoginAttempts: number;

  @Column({ type: 'timestamp', nullable: true })
  lastFailedLogin: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastSuccessfulLogin: Date;

  @Column({ default: 0 })
  passwordResetAttempts: number;

  @Column({ type: 'timestamp', nullable: true })
  lastPasswordResetAttempt: Date;

  @Column({ type: 'boolean', default: false })
  isLocked: boolean;

  @Column({ type: 'timestamp', nullable: true })
  lockExpirationDate: Date;

  // Seguridad: Registro de actividad y preferencias
  @Column({ type: 'json', nullable: true })
  lastKnownLocations: {
    ipAddress: string;
    location: string;
    timestamp: Date;
    userAgent: string;
  }[];

  @Column({ type: 'json', nullable: true })
  trustedDevices: {
    deviceId: string;
    deviceType: string;
    lastUsed: Date;
    isTrusted: boolean;
  }[];

  @Column({ type: 'json', nullable: true })
  securityPreferences: {
    notifyOnNewLogin: boolean;
    notifyOnPasswordChange: boolean;
    requireLocationValidation: boolean;
    trusted_ips?: string[];
    trusted_locations?: string[];
  };
  @Column('json', { nullable: true })
  searchHistory: {
    id: string;
    amount: number;
    term: number;
    income: number;
    createdAt: Date;
  }[];
}
