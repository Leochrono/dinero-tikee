import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsUUID,
  Matches
} from 'class-validator';

export class RequestUnlockDto {
  @IsEmail({}, { message: 'El email debe ser válido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @IsString({ message: 'La cédula debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La cédula es requerida' })
  @Matches(/^\d{10}$/, { message: 'La cédula debe tener 10 dígitos numéricos' })
  cedula: string;
}

export class ValidateUnlockCodeDto {
  @IsEmail({}, { message: 'El email debe ser válido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @IsString({ message: 'La cédula debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La cédula es requerida' })
  @Matches(/^\d{10}$/, { message: 'La cédula debe tener 10 dígitos numéricos' })
  cedula: string;

  @IsString()
  @IsNotEmpty({ message: 'El código de desbloqueo es requerido' })
  unlockCode: string;
}

export class UnlockResponseDto {
  success: boolean;
  message: string;
  expiresAt?: Date;
  remainingAttempts?: number;
}

export class UnlockHistoryDto {
  userId: string;
  unlockCode: string;
  attempts: number;
  isValid: boolean;
  createdAt: Date;
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
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
