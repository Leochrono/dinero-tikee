import { IsString, IsEmail, IsNotEmpty, Length, IsOptional } from 'class-validator';

// Nuevo DTO para el envío inicial
export class SendVerificationCodeDto {
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @IsString({ message: 'El nombre debe ser texto' })
  @IsOptional()
  nombres?: string;
}

export class VerifyEmailDto {
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'El código de verificación es requerido' })
  @Length(6, 6, { message: 'El código debe tener 6 caracteres' })
  verificationCode: string;
}

export class ResendVerificationCodeDto {
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @IsString({ message: 'El nombre debe ser texto' })
  @IsOptional()
  nombres?: string; // Agregar también aquí para el reenvío
}

export class VerifyEmailResponse {
  success: boolean;
  message: string;
  isVerified?: boolean;
  expiresAt?: Date;
  remainingAttempts?: number;
  cooldownUntil?: Date;
}

export interface VerificationTokenPayload {
  email: string;
  code: string;
  expiresAt: Date;
  remainingAttempts?: number;
}