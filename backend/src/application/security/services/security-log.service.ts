import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SecurityLogEntity } from '../../../domain/entities/security-log.entity';
import { UserEntity } from '../../../domain/entities/user.entity';
import { EmailService } from '../../../infrastructure/services/email.service';
import axios from 'axios';

interface IpApiResponse {
  country_name: string;
  city: string;
  latitude: number;
  longitude: number;
  region: string;
  ip: string;
  timezone: string;
}

@Injectable()
export class SecurityLogService {
  private readonly logger = new Logger(SecurityLogService.name);

  constructor(
    @InjectRepository(SecurityLogEntity)
    private securityLogRepository: Repository<SecurityLogEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private emailService: EmailService,
  ) {}

  async logSecurityEvent(data: {
    userId: string;
    eventType: string;
    ipAddress: string;
    userAgent?: string;
    details?: string;
    metadata?: any;
  }) {
    try {
      // Obtener información de geolocalización
      const locationInfo = await this.getLocationInfo(data.ipAddress);

      // Obtener información del dispositivo
      const deviceInfo = this.parseUserAgent(data.userAgent);

      // Calcular nivel de riesgo
      const riskLevel = await this.calculateRiskLevel({
        userId: data.userId,
        eventType: data.eventType,
        ipAddress: data.ipAddress,
        location: locationInfo,
        deviceInfo,
      });

      const securityLog = this.securityLogRepository.create({
        user: { id: data.userId },
        eventType: data.eventType,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
        location: locationInfo,
        deviceInfo,
        riskLevel: riskLevel.level,
        details: data.details,
        metadata: {
          ...data.metadata,
          riskScore: riskLevel.score,
        },
      });

      await this.securityLogRepository.save(securityLog);

      // Si el nivel de riesgo es alto, manejar el evento
      if (riskLevel.level === 'HIGH' || riskLevel.level === 'CRITICAL') {
        await this.handleHighRiskEvent(data.userId, securityLog);
      }

      return securityLog;
    } catch (error) {
      this.logger.error(
        `Error al registrar evento de seguridad: ${error.message}`,
      );
      throw error;
    }
  }

  private async getLocationInfo(ipAddress: string) {
    try {
      const response = await axios.get<IpApiResponse>(
        `https://ipapi.co/${ipAddress}/json/`,
      );
      return {
        country: response.data.country_name,
        city: response.data.city,
        latitude: response.data.latitude,
        longitude: response.data.longitude,
        accuracyRadius: 100,
      };
    } catch (error) {
      this.logger.warn(
        `No se pudo obtener información de localización: ${error.message}`,
      );
      return null;
    }
  }

  private parseUserAgent(userAgent: string) {
    if (!userAgent) return null;

    const browserMatch = userAgent.match(
      /(chrome|safari|firefox|edge|ie)\/([\d.]+)/i,
    );
    const osMatch = userAgent.match(
      /(windows|mac|linux|android|ios)\s*([\d.]+)?/i,
    );

    return {
      browser: browserMatch ? browserMatch[1] : 'unknown',
      os: osMatch ? osMatch[1] : 'unknown',
      deviceType: userAgent.toLowerCase().includes('mobile')
        ? 'mobile'
        : 'desktop',
    };
  }

  private async calculateRiskLevel(data: {
    userId: string;
    eventType: string;
    ipAddress: string;
    location: any;
    deviceInfo: any;
  }) {
    let riskScore = 0;
    const user = await this.userRepository.findOne({
      where: { id: data.userId },
    });

    // Obtener últimos logs del usuario
    const recentLogs = await this.securityLogRepository.find({
      where: { user: { id: data.userId } },
      order: { timestamp: 'DESC' },
      take: 10,
    });

    // Verificar cambio de ubicación
    if (recentLogs.length > 0) {
      const lastLog = recentLogs[0];
      if (lastLog.location && data.location) {
        const distance = this.calculateDistance(
          lastLog.location.latitude,
          lastLog.location.longitude,
          data.location.latitude,
          data.location.longitude,
        );

        // Si la distancia es mayor a 500km, aumentar el riesgo
        if (distance > 500) riskScore += 30;
      }
    }

    // Verificar eventos fallidos recientes
    const recentFailedEvents = recentLogs.filter(
      (log) =>
        log.eventType === 'LOGIN_FAILED' &&
        new Date().getTime() - new Date(log.timestamp).getTime() < 3600000,
    );
    riskScore += recentFailedEvents.length * 10;

    // Verificar si el dispositivo es conocido
    const isKnownDevice = user.trustedDevices?.some(
      (device) => device.deviceType === data.deviceInfo?.deviceType,
    );
    if (!isKnownDevice) riskScore += 20;

    // Determinar nivel basado en el score
    let level = 'LOW';
    if (riskScore > 70) level = 'CRITICAL';
    else if (riskScore > 50) level = 'HIGH';
    else if (riskScore > 30) level = 'MEDIUM';

    return { level, score: riskScore };
  }

  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371; // Radio de la Tierra en km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  private async handleHighRiskEvent(
    userId: string,
    securityLog: SecurityLogEntity,
  ) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) return;

    // Actualizar últimas ubicaciones conocidas
    const lastKnownLocations = user.lastKnownLocations || [];
    lastKnownLocations.push({
      ipAddress: securityLog.ipAddress,
      location: `${securityLog.location?.city}, ${securityLog.location?.country}`,
      timestamp: new Date(),
      userAgent: securityLog.userAgent,
    });

    // Mantener solo las últimas 5 ubicaciones
    if (lastKnownLocations.length > 5) {
      lastKnownLocations.shift();
    }

    // Activar bloqueo temporal si es necesario
    if (securityLog.riskLevel === 'CRITICAL') {
      const lockExpirationDate = new Date();
      lockExpirationDate.setHours(lockExpirationDate.getHours() + 24);

      await this.userRepository.update(userId, {
        isLocked: true,
        lockExpirationDate,
        lastKnownLocations,
      });

      // Enviar notificación de bloqueo
      await this.emailService.sendAccountLockNotification(
        user.email,
        user.nombres,
        {
          reason: 'Actividad sospechosa detectada',
          duration: '24 horas',
          unlockCode: null, // Si decides implementar desbloqueo manual
        },
      );
    } else {
      // Solo actualizar ubicaciones y enviar alerta
      await this.userRepository.update(userId, { lastKnownLocations });

      // Enviar alerta de actividad sospechosa
      await this.emailService.sendSuspiciousLoginAlert(
        user.email,
        user.nombres,
        {
          date: new Date(),
          ipAddress: securityLog.ipAddress,
          location: `${securityLog.location?.city}, ${securityLog.location?.country}`,
          deviceInfo:
            securityLog.deviceInfo?.deviceType || 'Dispositivo desconocido',
        },
      );
    }
  }

  async getUserSecurityLogs(userId: string, page = 1, limit = 10) {
    const [logs, total] = await this.securityLogRepository.findAndCount({
      where: { user: { id: userId } },
      order: { timestamp: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      logs,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }
}
