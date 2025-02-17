import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  BadRequestException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { UserService } from '../../application/user/services/user.service';
import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
} from '../../application/user/dto/user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return {
        success: true,
        data: user,
        message: 'Usuario creado exitosamente',
      };
    } catch (error) {
      if (error.message.includes('ya existe')) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error al crear usuario');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async getProfile(@Request() req) {
    try {
      const user = await this.userService.findOne(req.user.id);
      return {
        success: true,
        data: user,
      };
    } catch (error) {
      throw new BadRequestException('Error al obtener perfil');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('search-history')
  @HttpCode(HttpStatus.OK)
  async getSearchHistory(@Request() req) {
    try {
      const searchHistory = await this.userService.getSearchHistory(
        req.user.id,
      );
      return {
        success: true,
        data: searchHistory || [],
      };
    } catch (error) {
      throw new BadRequestException('Error al obtener historial de búsqueda');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.userService.findOne(id);
      return {
        success: true,
        data: user,
      };
    } catch (error) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userService.update(id, updateUserDto);
      return {
        success: true,
        data: user,
        message: 'Usuario actualizado exitosamente',
      };
    } catch (error) {
      throw new BadRequestException('Error al actualizar usuario');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/credits')
  @HttpCode(HttpStatus.OK)
  async getUserCredits(@Param('id') id: string) {
    try {
      const user = await this.userService.findOne(id);
      return {
        success: true,
        data: user.credits || [],
      };
    } catch (error) {
      throw new BadRequestException('Error al obtener créditos del usuario');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/validate-status')
  @HttpCode(HttpStatus.OK)
  async validateStatus(@Param('id') id: string) {
    try {
      const statusValidation = await this.userService.validateUserStatus(id);
      return {
        success: true,
        data: {
          isValid: statusValidation.isValid,
          message: statusValidation.error || 'Usuario activo',
        },
      };
    } catch (error) {
      throw new BadRequestException('Error al validar estado del usuario');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/login-stats')
  @HttpCode(HttpStatus.OK)
  async updateLoginStats(
    @Param('id') id: string,
    @Body() data: { successful: boolean },
  ) {
    try {
      await this.userService.updateLoginStats(id, data.successful);
      return {
        success: true,
        message: 'Estadísticas de login actualizadas',
      };
    } catch (error) {
      throw new BadRequestException(
        'Error al actualizar estadísticas de login',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/lock-status')
  @HttpCode(HttpStatus.OK)
  async updateLockStatus(
    @Param('id') id: string,
    @Body() data: { isLocked: boolean; expirationDate?: Date },
  ) {
    try {
      await this.userService.updateLockStatus(
        id,
        data.isLocked,
        data.expirationDate,
      );
      return {
        success: true,
        message: data.isLocked ? 'Usuario bloqueado' : 'Usuario desbloqueado',
      };
    } catch (error) {
      throw new BadRequestException('Error al actualizar estado de bloqueo');
    }
  }

  @Post('verify-credentials')
  @HttpCode(HttpStatus.OK)
  async verifyCredentials(@Body() data: { email: string }) {
    try {
      const result = await this.userService.verifyUserCredentials(data.email);
      return {
        success: true,
        data: {
          isValid: !result.error,
          message: result.error || 'Credenciales válidas',
        },
      };
    } catch (error) {
      throw new BadRequestException('Error al verificar credenciales');
    }
  }

  @Get('verify/:cedula')
  @HttpCode(HttpStatus.OK)
  async verifyUserByCedula(@Param('cedula') cedula: string) {
    try {
      const user = await this.userService.findByCedula(cedula);
      return {
        success: true,
        data: {
          exists: !!user,
          email: user?.email,
        },
      };
    } catch (error) {
      throw new BadRequestException('Error al verificar usuario');
    }
  }
}
