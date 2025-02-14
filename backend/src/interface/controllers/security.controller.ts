import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Request,
    HttpCode,
    HttpStatus,
    Query,
    Logger,
    BadRequestException
  } from '@nestjs/common';
  import { SecurityService } from '../../application/security/services/security.service';
  import { JwtAuthGuard } from '../guards/jwt-auth.guard';
  import { RateLimit } from '../../infrastructure/guards/rate-limit.decorator';
  import { GetSecurityEventsDto } from '../../application/security/dto/security.dto';
  
  @Controller('security')
  @UseGuards(JwtAuthGuard)
  export class SecurityController {
    private readonly logger = new Logger(SecurityController.name);
  
    constructor(private readonly securityService: SecurityService) {}
  
    @Get('events')
    @HttpCode(HttpStatus.OK)
    async getSecurityEvents(
      @Request() req,
      @Query() query: GetSecurityEventsDto
    ) {
      try {
        const events = await this.securityService.getSecurityEvents(req.user.id, query);
        return {
          success: true,
          data: events
        };
      } catch (error) {
        this.logger.error(`Error fetching security events: ${error.message}`);
        throw new BadRequestException('Error al obtener eventos de seguridad');
      }
    }
  
    @Post('record-event')
    @HttpCode(HttpStatus.OK)
    async recordSecurityEvent(
      @Request() req,
      @Body() eventData: {
        eventType: string;
        status: string;
        details?: string;
        ipAddress: string;
        userAgent?: string;
        severity: 'low' | 'medium' | 'high' | 'critical';
      }
    ) {
      try {
        await this.securityService.recordSecurityEvent(req.user.id, eventData);
        return {
          success: true,
          message: 'Evento registrado exitosamente'
        };
      } catch (error) {
        this.logger.error(`Error recording security event: ${error.message}`);
        throw new BadRequestException('Error al registrar evento de seguridad');
      }
    }
  
    @Get('account-status')
    @HttpCode(HttpStatus.OK)
    async checkAccountLock(@Request() req) {
      try {
        const isLocked = await this.securityService.isAccountLocked(req.user.id);
        return {
          success: true,
          data: {
            isLocked
          }
        };
      } catch (error) {
        this.logger.error(`Error checking account lock: ${error.message}`);
        throw new BadRequestException('Error al verificar estado de la cuenta');
      }
    }
  }