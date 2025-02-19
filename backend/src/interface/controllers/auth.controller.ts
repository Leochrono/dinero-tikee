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
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from '../../application/auth/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateUserDto } from '../../application/user/dto/user.dto';
import { RateLimit } from '../../infrastructure/guards/rate-limit.decorator';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post('login')
@HttpCode(HttpStatus.OK)
async login(
  @Body() loginDto: { email: string; password: string },
  @Ip() ipAddress: string,
  @Headers('user-agent') userAgent: string,
) {
  try {
    const response = await this.authService.login(
      loginDto,
      ipAddress,
      userAgent,
    );
    return response;
  } catch (error) {
    throw new BadRequestException(error.message);
  }
}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    try {
      return {
        success: true,
        data: req.user,
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
      const result = await this.authService.register(createUserDto);
      return result;
    } catch (error) {
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
            email: req.user.email,
          },
        },
      };
    } catch (error) {
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
      const response = await this.authService.recoverPassword(
        data.email,
        ipAddress,
        userAgent,
      );
      return response;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('recover-user')
  @HttpCode(HttpStatus.OK)
  @RateLimit(3, 3600, 7200) // 3 intentos/hora, bloqueo 2h
  async recoverUser(@Body() data: { cedula: string }) {
    try {
      const response = await this.authService.recoverUser(data.cedula);
      return response;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
