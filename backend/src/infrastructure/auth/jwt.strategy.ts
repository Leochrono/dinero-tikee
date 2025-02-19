import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWT_SECRET } from "../../config.json";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(private configService: ConfigService) {
    const secret = JWT_SECRET;
    
    if (!secret) {
      throw new Error('JWT_SECRET no está definido en las variables de entorno');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });

    this.logger.log('JwtStrategy inicializado correctamente');
  }

  async validate(payload: any) {
    if (!payload) {
      this.logger.error('Token inválido: payload vacío');
      throw new UnauthorizedException();
    }

    this.logger.debug(`Validando token para usuario: ${payload.email}`);
    
    return {
      id: payload.sub,
      email: payload.email,
      nombres: payload.nombres,
      apellidos: payload.apellidos,
      status: payload.status || 'active',
      isEmailVerified: payload.isEmailVerified || false,
      requiresPasswordChange: payload.requiresPasswordChange || false
    };
  }
}