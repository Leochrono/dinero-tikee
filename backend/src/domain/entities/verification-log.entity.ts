import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('verification_logs')
export class VerificationLogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, { nullable: true })
  user: UserEntity;

  @Column()
  email: string;

  @Column()
  verificationCode: string;

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  verifiedAt: Date;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: 0 })
  attempts: number;

  // Nuevos campos
  @Column({ default: 5 })
  remainingAttempts: number;

  @Column({ type: 'timestamp', nullable: true })
  cooldownUntil: Date;

  @Column({ nullable: true })
  ipAddress: string;

  @Column({ nullable: true })
  userAgent: string;

  @Column('json', { nullable: true })
  metadata: {
    deviceInfo?: string;
    location?: string;
    status?: string;
  };
}
