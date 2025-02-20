import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsUUID,
  IsBoolean,
  IsNumber,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export class RequestUnlockDto {
  @IsEmail({}, { message: 'El email debe ser válido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;
}

export class ValidateUnlockCodeDto {
  @IsEmail({}, { message: 'El email debe ser válido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'El código de desbloqueo es requerido' })
  unlockCode: string;
}

export class UnlockResponseDto {
  @IsBoolean()
  success: boolean;

  @IsString()
  message: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  expiresAt?: Date;

  @IsOptional()
  @IsNumber()
  remainingAttempts?: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  cooldownUntil?: Date;
}

export class UnlockHistoryDto {
  @IsUUID()
  userId: string;

  @IsString()
  unlockCode: string;

  @IsNumber()
  attempts: number;

  @IsBoolean()
  isValid: boolean;

  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @IsDate()
  @Type(() => Date)
  expiresAt: Date;

  @IsOptional()
  @IsString()
  ipAddress?: string;

  @IsOptional()
  @IsString()
  userAgent?: string;

  @IsOptional()
  @IsString()
  reason?: string;
}

export class GenerateUnlockCodeDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsString()
  @IsOptional()
  ipAddress?: string;

  @IsString()
  @IsOptional()
  userAgent?: string;
}

export class AccountLockStatusDto {
  @IsBoolean()
  isLocked: boolean;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  expiresAt?: Date;

  @IsOptional()
  @IsNumber()
  attempts?: number;

  @IsOptional()
  @IsNumber()
  maxAttempts?: number;

  @IsOptional()
  @IsNumber()
  remainingAttempts?: number;
}

export class ForceUnlockDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  adminId: string;

  @IsOptional()
  @IsString()
  reason?: string;
}