import { SetMetadata, UseGuards } from '@nestjs/common';
import { RateLimitGuard } from './rate-limit.guard';

export function RateLimit(points: number, duration: number, blockDuration: number = duration) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    SetMetadata('rateLimit', { points, duration, blockDuration })(target, key, descriptor);
    UseGuards(RateLimitGuard)(target, key, descriptor);
  };
}