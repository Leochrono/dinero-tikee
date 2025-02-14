import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  ManyToOne, 
  CreateDateColumn 
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('account_locks')
export class AccountLockEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, user => user.accountLocks)
  user: UserEntity;

  @Column({
    type: 'enum',
    enum: [
      'too_many_login_attempts',
      'too_many_password_reset_attempts',
      'suspicious_activity',
      'security_policy',
      'administrative',
      'user_requested'
    ]
  })
  reason: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  unlockedAt: Date;

  @Column({ nullable: true })
  unlockedBy: string;

  @Column({ nullable: true })
  unlockCode: string;

  @Column({ type: 'timestamp', nullable: true })
  unlockCodeExpiresAt: Date;

  @Column({ default: 0 })
  attempts: number;

  @Column()
  ipAddress: string;

  @Column({ nullable: true })
  userAgent: string;

  @Column('json', { nullable: true })
  metadata: {
    deviceInfo?: string;
    location?: string;
    relatedEventId?: string;
    notes?: string;
  };

  @Column({ default: false })
  notificationSent: boolean;

  @Column({ nullable: true })
  notificationSentAt: Date;
}