import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Logger,
  Ip,
  Headers,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import { UnlockService } from '../../application/unlock/services/unlock.service';
import {
  RequestUnlockDto,
  ValidateUnlockCodeDto,
  UnlockResponseDto,
  UnlockHistoryDto,
} from '../../application/unlock/dto/unlock.dto';

@Controller('unlock')
export class UnlockController {
  private readonly logger = new Logger(UnlockController.name);

  constructor(private readonly unlockService: UnlockService) {}

  @Post('request')
  @HttpCode(HttpStatus.OK)
  async requestUnlock(
    @Body() data: RequestUnlockDto,
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent: string,
  ) {
    try {
      // Log detallado de los datos recibidos
      this.logger.debug(
        'Datos completos recibidos:',
        JSON.stringify(data, null, 2),
      );

      const result = await this.unlockService.generateAndSendUnlockCode(
        data.email,
        data.cedula,
        'temporary_lock',
        ipAddress,
        userAgent,
      );

      return {
        success: true,
        message: 'Código de desbloqueo enviado exitosamente',
        data: {
          expiresAt: result.expiresAt,
        },
      };
    } catch (error) {
      this.logger.error('Error detallado:', {
        datos_recibidos: data,
        mensaje_error: error.message,
        stack: error.stack,
      });

      throw new BadRequestException(error.message);
    }
  }

  @Post('validate')
  @HttpCode(HttpStatus.OK)
  async validateUnlockCode(
    @Body(new ValidationPipe({ transform: true })) data: ValidateUnlockCodeDto,
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent: string,
  ): Promise<UnlockResponseDto> {
    try {
      this.logger.log(
        `Validando código de desbloqueo para email: ${data.email}`,
      );

      const result = await this.unlockService.validateUnlockCode(
        data.email,
        data.unlockCode,
        ipAddress,
        userAgent,
      );

      return {
        success: true,
        message: 'Código validado exitosamente',
        ...result,
      };
    } catch (error) {
      this.logger.error(`Error en validación de código: ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  @Get('status/:email')
  @HttpCode(HttpStatus.OK)
  async getLockStatus(
    @Param('email') email: string,
  ): Promise<{ success: boolean; data: Record<string, any> }> {
    try {
      this.logger.log(`Verificando estado de bloqueo para email: ${email}`);

      const lockStatus = await this.unlockService.getLockStatus(email);

      return {
        success: true,
        data: lockStatus,
      };
    } catch (error) {
      this.logger.error(`Error al obtener estado de bloqueo: ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  @Post('force')
  @HttpCode(HttpStatus.OK)
  async forceUnlock(
    @Body(new ValidationPipe({ transform: true }))
    data: {
      userId: string;
      adminId: string;
    },
  ): Promise<UnlockResponseDto> {
    try {
      this.logger.log(`Desbloqueo forzado para usuario: ${data.userId}`);

      const result = await this.unlockService.forceUnlock(
        data.userId,
        data.adminId,
      );

      return {
        success: true,
        message: 'Cuenta desbloqueada exitosamente',
        ...result,
      };
    } catch (error) {
      this.logger.error(`Error en desbloqueo forzado: ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }
}
