import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('security_logs')
@Index(['userId', 'eventType'])
@Index(['timestamp', 'eventType'])
export class SecurityLogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.securityLogs)
  user: UserEntity;

  @Column()
  userId: string;

  @Column({
    type: 'enum',
    enum: [
      'LOGIN_SUCCESS',
      'LOGIN_FAILED',
      'PASSWORD_CHANGED',
      'PASSWORD_RESET_REQUESTED',
      'PASSWORD_RESET_COMPLETED',
      'ACCOUNT_LOCKED',
      'ACCOUNT_UNLOCKED',
      'SUSPICIOUS_ACTIVITY',
      'LOCATION_CHANGE',
      'DEVICE_CHANGE',
    ],
  })
  eventType: string;

  @Column({
    type: 'enum',
    enum: ['success', 'failure', 'warning', 'info'],
    default: 'info',
  })
  status: string;

  @CreateDateColumn()
  timestamp: Date;

  @Column()
  ipAddress: string;

  @Column({ nullable: true })
  userAgent: string;

  @Column({ type: 'json', nullable: true })
  location: {
    country?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
    accuracyRadius?: number;
  };

  @Column({ type: 'json', nullable: true })
  deviceInfo: {
    browser?: string;
    os?: string;
    device?: string;
    deviceType?: string;
  };

  @Column({ type: 'json', nullable: true })
  metadata: {
    previousIp?: string;
    previousLocation?: string;
    distanceFromLastLogin?: number;
    timeSinceLastLogin?: number;
    failedAttempts?: number;
    riskScore?: number;
    errorCode?: string;
    errorMessage?: string;
    deviceInfo?: string;
    browserInfo?: string;
    platform?: string;
    attemptCount?: number;
    relatedEventId?: string;
  };

  @Column({
    type: 'enum',
    enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
    default: 'LOW',
  })
  riskLevel: string;

  @Column({
    type: 'enum',
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'low',
  })
  severity: string;

  @Column({ nullable: true })
  details: string;

  @Column({ default: false })
  requiresAction: boolean;

  @Column({ nullable: true })
  actionTaken: string;
}
