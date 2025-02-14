import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    ManyToOne, 
    CreateDateColumn,
    Index 
  } from 'typeorm';
  import { UserEntity } from './user.entity';
  
  @Entity('security_events')
  @Index(['user', 'timestamp']) // Índice compuesto para consultas eficientes
  @Index(['eventType', 'timestamp']) // Índice para análisis de eventos
  export class SecurityEventEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => UserEntity, user => user.securityEvents)
    user: UserEntity;
  
    @Column({
      type: 'enum',
      enum: [
        'login_attempt',
        'password_change',
        'password_reset_request',
        'password_reset_complete',
        'account_locked',
        'account_unlocked',
        'temporary_password_generated',
        'suspicious_activity',
        'force_password_change'
      ]
    })
    eventType: string;
  
    @Column({
      type: 'enum',
      enum: ['success', 'failure', 'warning', 'info'],
      default: 'info'
    })
    status: string;
  
    @Column({ nullable: true })
    details: string;
  
    @Column()
    ipAddress: string;
  
    @Column({ nullable: true })
    userAgent: string;
  
    @CreateDateColumn()
    timestamp: Date;
  
    @Column('json', { nullable: true })
    metadata: {
      errorCode?: string;
      errorMessage?: string;
      deviceInfo?: string;
      location?: string;
      browserInfo?: string;
      platform?: string;
      attemptCount?: number;
      relatedEventId?: string;
    };
  
    @Column({ nullable: true })
    severity: 'low' | 'medium' | 'high' | 'critical';
  }