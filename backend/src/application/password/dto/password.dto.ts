import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty({ message: 'La contraseña actual es requerida' })
  @IsString()
  currentPassword: string;

  @IsNotEmpty({ message: 'La nueva contraseña es requerida' })
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(128, {
    message: 'La contraseña no puede exceder los 128 caracteres',
  })
  @Matches(/[A-Z]/, {
    message: 'La contraseña debe contener al menos una letra mayúscula',
  })
  @Matches(/[a-z]/, {
    message: 'La contraseña debe contener al menos una letra minúscula',
  })
  @Matches(/[0-9]/, {
    message: 'La contraseña debe contener al menos un número',
  })
  @Matches(/[!@#$%^&*(),.?":{}|<>]/, {
    message: 'La contraseña debe contener al menos un carácter especial',
  })
  newPassword: string;

  @IsNotEmpty({ message: 'La confirmación de contraseña es requerida' })
  @IsString()
  passwordConfirmation: string;
}

export class ResetPasswordDto {
  @IsNotEmpty({ message: 'El token de reset es requerido' })
  @IsString()
  resetToken: string;

  @IsNotEmpty({ message: 'La nueva contraseña es requerida' })
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(128, {
    message: 'La contraseña no puede exceder los 128 caracteres',
  })
  @Matches(/[A-Z]/, {
    message: 'La contraseña debe contener al menos una letra mayúscula',
  })
  @Matches(/[a-z]/, {
    message: 'La contraseña debe contener al menos una letra minúscula',
  })
  @Matches(/[0-9]/, {
    message: 'La contraseña debe contener al menos un número',
  })
  @Matches(/[!@#$%^&*(),.?":{}|<>]/, {
    message: 'La contraseña debe contener al menos un carácter especial',
  })
  newPassword: string;

  @IsNotEmpty({ message: 'La confirmación de contraseña es requerida' })
  @IsString()
  passwordConfirmation: string;
}

export class UnlockAccountDto {
  @IsNotEmpty({ message: 'El código de desbloqueo es requerido' })
  @IsString()
  unlockCode: string;
}

export class PasswordHistoryResponseDto {
  id: string;
  changedAt: Date;
  changedBy: string;
  reason: string;
  isTemporary: boolean;
  ipAddress?: string;
}

export class SecurityEventResponseDto {
  id: string;
  eventType: string;
  status: string;
  timestamp: Date;
  ipAddress: string;
  details?: string;
  severity?: string;
}

export class AccountLockResponseDto {
  id: string;
  reason: string;
  createdAt: Date;
  expiresAt: Date;
  isActive: boolean;
  unlockedAt?: Date;
  unlockedBy?: string;
}
