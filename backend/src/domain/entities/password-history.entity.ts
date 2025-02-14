import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    ManyToOne, 
    CreateDateColumn,
    Index
  } from 'typeorm';
  import { UserEntity } from './user.entity';
  
  @Entity('password_history')
  @Index(['user', 'changedAt']) 
  export class PasswordHistoryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => UserEntity, user => user.passwordHistory)
    user: UserEntity;
  
    @Column()
    hashedPassword: string;
  
    @CreateDateColumn()
    changedAt: Date;
  
    @Column({
      type: 'enum',
      enum: ['user', 'admin', 'system'],
      default: 'user'
    })
    changedBy: string;
  
    @Column({
      type: 'enum',
      enum: ['reset', 'expired', 'user_request', 'security_policy', 'temporary', 'temporary_change'],
      default: 'user_request'
    })
    reason: string;
  
    @Column({ nullable: true })
    ipAddress: string;
  
    @Column({ nullable: true })
    userAgent: string;
  
    @Column({ type: 'boolean', default: false })
    isTemporary: boolean;
  
    @Column({ nullable: true })
    expiresAt: Date;
  
    @Column('json', { nullable: true })
    metadata: {
      previousPasswordAge?: number;  
      deviceInfo?: string;          
      location?: string;            
      successful?: boolean;         
      attempts?: number;            
    };
  }