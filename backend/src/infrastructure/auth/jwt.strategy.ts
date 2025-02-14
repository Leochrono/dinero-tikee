import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(private configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET');
    
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
      throw new UnauthorizedException();
    }

    this.logger.debug(`Validando token para usuario: ${payload.email}`);
    return {
      id: payload.sub,
      email: payload.email,
      nombres: payload.nombres,
      apellidos: payload.apellidos,
      requiresPasswordChange: payload.requiresPasswordChange || false
    };
  }
}