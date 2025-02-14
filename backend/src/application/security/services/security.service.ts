import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SecurityLogEntity } from '../../../domain/entities/security-log.entity';
import { UserEntity } from '../../../domain/entities/user.entity';
import { GetSecurityEventsDto } from '../dto/security.dto';
import { MailerRepository } from 'src/application/Common/interfaces/mailer.repository';

@Injectable()
export class SecurityService {
 private readonly logger = new Logger(SecurityService.name);

 private readonly CONFIG = {
   MAX_FAILED_ATTEMPTS: 5,    
   LOCK_DURATION: 30,        
 };

 constructor(
  @InjectRepository(SecurityLogEntity)
  private securityLogRepository: Repository<SecurityLogEntity>,
  @InjectRepository(UserEntity)
  private userRepository: Repository<UserEntity>,
  private readonly mailerRepository: MailerRepository
) {}

 async recordSecurityEvent(userId: string, eventData: {
   eventType: string;
   status: string;
   details?: string;
   ipAddress: string;
   userAgent?: string;
   severity: 'low' | 'medium' | 'high' | 'critical';
 }): Promise<void> {
   try {
     const securityEvent = new SecurityLogEntity();
     securityEvent.user = { id: userId } as UserEntity;
     securityEvent.eventType = eventData.eventType;
     securityEvent.status = eventData.status;
     securityEvent.details = 'Evento de seguridad'; // Mensaje genérico
     securityEvent.ipAddress = eventData.ipAddress;
     securityEvent.userAgent = eventData.userAgent;
     securityEvent.severity = eventData.severity;
     
     await this.securityLogRepository.save(securityEvent);
   } catch (error) {
     this.logger.error('Error al registrar evento');
     throw error;
   }
 }

 async handleFailedAttempt(userId: string, ipAddress: string, userAgent?: string): Promise<void> {
   try {
     const user = await this.userRepository.findOne({ where: { id: userId } });
     if (!user) return;

     user.failedLoginAttempts += 1;
     user.lastFailedLogin = new Date();

     if (user.failedLoginAttempts >= this.CONFIG.MAX_FAILED_ATTEMPTS) {
       const lockExpiration = new Date();
       lockExpiration.setMinutes(lockExpiration.getMinutes() + this.CONFIG.LOCK_DURATION);

       user.isLocked = true;
       user.lockExpirationDate = lockExpiration;
     }

     await this.userRepository.save(user);
   } catch (error) {
     this.logger.error('Error al procesar intento fallido');
     throw error;
   }
 }

 async resetFailedAttempts(userId: string): Promise<void> {
   await this.userRepository.update(userId, {
     failedLoginAttempts: 0,
     lastFailedLogin: null,
     isLocked: false,
     lockExpirationDate: null
   });
 }

 async isAccountLocked(userId: string): Promise<boolean> {
   const user = await this.userRepository.findOne({ where: { id: userId } });
   if (!user || !user.isLocked) return false;

   if (user.lockExpirationDate && user.lockExpirationDate < new Date()) {
     await this.resetFailedAttempts(userId);
     return false;
   }

   return true;
 }

 async getSecurityEvents(userId: string, filters: GetSecurityEventsDto = {
   page: 1,
   limit: 10
 }) {
   const { page, limit, eventType, startDate, endDate } = filters;
   
   const queryBuilder = this.securityLogRepository.createQueryBuilder('securityLog')
     .where('securityLog.userId = :userId', { userId })
     .orderBy('securityLog.timestamp', 'DESC')
     .skip((page - 1) * limit)
     .take(limit);

   if (eventType) {
     queryBuilder.andWhere('securityLog.eventType = :eventType', { eventType });
   }

   if (startDate) {
     queryBuilder.andWhere('securityLog.timestamp >= :startDate', { startDate });
   }

   if (endDate) {
     queryBuilder.andWhere('securityLog.timestamp <= :endDate', { endDate });
   }

   const [logs, total] = await queryBuilder.getManyAndCount();

   return {
     data: logs,
     total,
     page,
     limit,
     totalPages: Math.ceil(total / limit)
   };
 }
}