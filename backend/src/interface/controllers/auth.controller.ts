import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Logger,
  Ip,
  Headers,
  BadRequestException
} from '@nestjs/common';
import { AuthService } from '../../application/auth/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateUserDto } from '../../application/user/dto/user.dto';
import { RateLimit } from '../../infrastructure/guards/rate-limit.decorator';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private authService: AuthService
  ) {}

  @Post('login')
@HttpCode(HttpStatus.OK)
@RateLimit(5, 300, 900)
async login(
  @Body() loginDto: { email: string; password: string },
  @Ip() ipAddress: string,
  @Headers('user-agent') userAgent: string,
) {
  try {
    this.logger.log(`Intento de login para email: ${loginDto.email}`);
    const response = await this.authService.login(
      loginDto,
      ipAddress,
      userAgent
    );

      this.logger.log(`Login exitoso para: ${loginDto.email}`);
      return {
        ...response,
        data: {
          ...response.data,
          profile: {
            id: response.data.user.id,
            email: response.data.user.email,
            nombres: response.data.user.nombres,
            apellidos: response.data.user.apellidos
          }
        }
      };
    } catch (error) {
      this.logger.error(`Error en login: ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  @Get('profile')
@UseGuards(JwtAuthGuard)
async getProfile(@Request() req) {
  try {
    return {
      success: true,
      data: req.user
    };
  } catch (error) {
    throw new BadRequestException('Error al obtener perfil');
  }
}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() createUserDto: CreateUserDto,
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent: string,
  ) {
    try {
      this.logger.log('Iniciando registro de usuario');
      const result = await this.authService.register(createUserDto);
      this.logger.log('Registro exitoso');
      return result;
    } catch (error) {
      this.logger.error(`Error en registro: ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  @Post('verify-token')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async verifyToken(@Request() req) {
    try {
      return {
        success: true,
        data: {
          isValid: true,
          user: {
            id: req.user.id,
            email: req.user.email
          }
        }
      };
    } catch (error) {
      this.logger.error(`Error al verificar token: ${error.message}`);
      throw new BadRequestException('Token inválido');
    }
  }

  @Post('recover-password')
  @HttpCode(HttpStatus.OK)
  @RateLimit(3, 3600, 7200) // 3 intentos/hora, bloqueo 2h
  async recoverPassword(
    @Body() data: { email: string },
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent: string,
  ) {
    try {
      this.logger.log(`Solicitud de recuperación de contraseña para: ${data.email}`);
      const response = await this.authService.recoverPassword(
        data.email,
        ipAddress,
        userAgent
      );
      this.logger.log(`Recuperación de contraseña procesada para: ${data.email}`);
      return response;
    } catch (error) {
      this.logger.error(`Error en recuperación de contraseña: ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  @Post('recover-user')
  @HttpCode(HttpStatus.OK)
  @RateLimit(3, 3600, 7200) // 3 intentos/hora, bloqueo 2h
  async recoverUser(@Body() data: { cedula: string }) {
    try {
      this.logger.log(`Solicitud de recuperación de usuario`);
      const response = await this.authService.recoverUser(data.cedula);
      this.logger.log(`Recuperación de usuario procesada`);
      return response;
    } catch (error) {
      this.logger.error(`Error en recuperación de usuario: ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }
}

