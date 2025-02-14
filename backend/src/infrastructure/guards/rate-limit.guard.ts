import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

interface RateLimit {
  points: number;      // Número máximo de intentos
  duration: number;    // Período de tiempo en segundos
  blockDuration: number; // Duración del bloqueo en segundos
}

const rateLimitStore = new Map<string, { points: number; lastReset: number; blockedUntil?: number }>();

@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rateLimit = this.reflector.get<RateLimit>('rateLimit', context.getHandler());
    if (!rateLimit) return true;

    const request = context.switchToHttp().getRequest();
    const key = this.generateKey(request);
    
    const now = Date.now();
    const store = rateLimitStore.get(key) || { points: rateLimit.points, lastReset: now };

    // Verificar si está bloqueado
    if (store.blockedUntil && store.blockedUntil > now) {
      const remainingTime = Math.ceil((store.blockedUntil - now) / 1000);
      throw new HttpException({
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
        message: `Demasiados intentos. Intenta nuevamente en ${remainingTime} segundos.`,
        remainingTime
      }, HttpStatus.TOO_MANY_REQUESTS);
    }

    // Resetear puntos si ha pasado el período
    if (now - store.lastReset >= rateLimit.duration * 1000) {
      store.points = rateLimit.points;
      store.lastReset = now;
      store.blockedUntil = undefined;
    }

    // Verificar puntos disponibles
    if (store.points <= 0) {
      store.blockedUntil = now + (rateLimit.blockDuration * 1000);
      rateLimitStore.set(key, store);
      throw new HttpException({
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
        message: `Demasiados intentos. Intenta nuevamente en ${rateLimit.blockDuration} segundos.`,
        remainingTime: rateLimit.blockDuration
      }, HttpStatus.TOO_MANY_REQUESTS);
    }

    // Reducir puntos disponibles
    store.points -= 1;
    rateLimitStore.set(key, store);

    // Agregar headers de rate limit
    const response = context.switchToHttp().getResponse();
    response.header('X-RateLimit-Limit', rateLimit.points);
    response.header('X-RateLimit-Remaining', store.points);
    response.header('X-RateLimit-Reset', Math.ceil(store.lastReset / 1000) + rateLimit.duration);

    return true;
  }

  private generateKey(request: any): string {
    return `${request.ip}-${request.originalUrl}`;
  }
}