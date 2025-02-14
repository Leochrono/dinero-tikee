import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/services/user.service';
import { PasswordService } from '../password/services/password.service';
import { MailerRepository } from '../Common/interfaces/mailer.repository';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
    private readonly mailRepository: MailerRepository,
  ) {}

  async validateUser(
    email: string,
    password: string,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<any> {
    try {
      const { user, error } = await this.userService.verifyUserCredentials(email);
      
      if (error) {
        throw new UnauthorizedException(error);
      }

      const isValidPassword = await this.passwordService.validateUserPassword(user, password);
      if (!isValidPassword) {
        await this.userService.updateLoginStats(user.id, false);
        throw new UnauthorizedException('La contraseña es incorrecta');
      }

      await this.userService.updateLoginStats(user.id, true);
      
      const { password: _, ...result } = user;
      return result;
    } catch (error) {
      this.logger.error(`Error en validación de usuario: ${error.message}`);
      throw error;
    }
  }

  async login(credentials: { email: string; password: string }, ipAddress?: string, userAgent?: string) {
    try {
      this.logger.log(`Intento de login para email: ${credentials.email}`);
      
      const user = await this.validateUser(
        credentials.email,
        credentials.password,
        ipAddress,
        userAgent
      );
  
      const payload = {
        email: user.email,
        sub: user.id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        profile: `/api/users/${user.id}/profile`  // Agregar ruta del perfil
      };
  
      return {
        success: true,
        data: {
          user,
          accessToken: this.jwtService.sign(payload),
          redirect: '/perfil'  // Agregar ruta de redirección
        }
      };
    } catch (error) {
      this.logger.error(`Error en login: ${error.message}`);
      throw error;
    }
  }

  async register(userData: any) {
    try {
      const validation = await this.passwordService.validatePasswordStrength(userData.password);
      if (!validation.isValid) {
        throw new BadRequestException(validation.errors.join(', '));
      }

      const hashedPassword = await this.passwordService.hashPassword(userData.password);
      const user = await this.userService.create({
        ...userData,
        password: hashedPassword
      });

      const payload = {
        sub: user.id,
        email: user.email
      };

      const token = this.jwtService.sign(payload);

      return {
        success: true,
        data: {
          user,
          accessToken: token
        }
      };
    } catch (error) {
      this.logger.error('Error en registro:', error);
      throw error;
    }
  }

  async recoverPassword(email: string, ipAddress?: string, userAgent?: string) {
    try {
      const { user, error } = await this.userService.verifyUserCredentials(email);
      if (error) {
        throw new NotFoundException(error);
      }

      const result = await this.passwordService.handlePasswordRecovery(user.id, {
        ipAddress,
        userAgent
      });

      if (!result.success) {
        throw new BadRequestException(result.error);
      }

      await this.mailRepository.sendPasswordRecovery({
        id: user.id,
        nombres: `${user.nombres} ${user.apellidos}`,
        email: user.email,
        tokenOrPassword: result.tempPassword,
        date: new Date(),
        ip: ipAddress,
        userAgent
      });

      return {
        success: true,
        message: 'Se ha enviado una contraseña temporal a tu correo electrónico'
      };
    } catch (error) {
      this.logger.error('Error en recuperación de contraseña:', error);
      throw error;
    }
  }

  // En AuthService (auth.service.ts)
async recoverUser(cedula: string) {
  try {
    // Validar formato de cédula (ej: 10 dígitos)
    if (!cedula || cedula.length !== 10 || !/^\d+$/.test(cedula)) {
      throw new BadRequestException('La cédula debe tener 10 dígitos numéricos');
    }

    const user = await this.userService.findByCedula(cedula);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Enviar correo
    await this.mailRepository.sendUserRecoveryNotification({
      id: user.id,
      nombres: `${user.nombres} ${user.apellidos}`,
      email: user.email,
      date: new Date(),
    });

    return { success: true, message: 'Se ha enviado la información al correo registrado' };
  } catch (error) {
    this.logger.error('Error en recuperación de usuario:', error);
    throw error;
  }
}
}