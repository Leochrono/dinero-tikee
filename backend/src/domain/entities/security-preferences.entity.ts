import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('security_preferences')
export class SecurityPreferencesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.securityPreferences)
  user: UserEntity;

  @Column({ type: 'json', nullable: true })
  trustedDevices: Array<{
    deviceId: string;
    deviceType: string;
    lastUsed: Date;
    isTrusted: boolean;
  }>;

  @Column({ type: 'json', nullable: true })
  trustedLocations: Array<{
    ipAddress: string;
    location: string;
    lastUsed: Date;
  }>;

  @Column({ default: true })
  notifyOnNewLogin: boolean;

  @Column({ default: true })
  notifyOnPasswordChange: boolean;

  @Column({ default: true })
  requireLocationValidation: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
