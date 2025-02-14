import { IsOptional, IsNumber, Min, Max, IsString, IsDateString, IsEnum } from 'class-validator';

export class GetSecurityEventsDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  eventType?: string;

  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  @IsDateString()
  endDate?: Date;
}

export enum SecurityEventSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export class LogSecurityEventDto {
  @IsString()
  eventType: string;

  @IsString()
  @IsOptional()
  details?: string;

  @IsString()
  ipAddress: string;

  @IsString()
  @IsOptional()
  userAgent?: string;

  @IsEnum(SecurityEventSeverity)
  severity: SecurityEventSeverity;
}

