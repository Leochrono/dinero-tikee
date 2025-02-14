import { IsString, IsEmail, MinLength, IsNotEmpty, IsOptional, IsBoolean, IsDate, IsUUID, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { CreditResponseDto } from 'src/application/credit/dto/credit.dto';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString()
  readonly nombres: string;

  @IsNotEmpty({ message: 'Los apellidos son requeridos' })
  @IsString()
  readonly apellidos: string;

  @IsNotEmpty({ message: 'La cédula es requerida' })
  @IsString()
  readonly cedula: string;

  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'El email debe ser válido' })
  readonly email: string;

  @IsNotEmpty({ message: 'El teléfono es requerido' })
  @IsString()
  readonly telefono: string;

  @IsNotEmpty({ message: 'La dirección es requerida' })
  @IsString()
  readonly direccion: string;

  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  readonly password: string;

  @IsOptional()
  @IsDate()
  readonly passwordUpdatedAt?: Date;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  nombres?: string;

  @IsOptional()
  @IsString()
  apellidos?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password?: string;

  @IsOptional()
  @IsBoolean()
  requiresPasswordChange?: boolean;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  passwordUpdatedAt?: Date;
}

export class UserCreditDto {
  @IsUUID()
  readonly id: string;

  @IsNotEmpty()
  readonly amount: number;

  @IsNotEmpty()
  readonly term: number;

  @IsString()
  readonly status: string;

  @IsDate()
  readonly createdAt: Date;

  @IsOptional()
  @ValidateNested()
  readonly institution?: {
    id: string;
    name: string;
    type: string;
    logo: string;
  };
}

export class UserResponseDto {
  @IsUUID()
  id: string;

  @IsString()
  nombres: string;

  @IsString()
  apellidos: string;

  @IsString()
  cedula: string;

  @IsEmail()
  email: string;

  @IsString()
  telefono: string;

  @IsString()
  direccion: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  @IsBoolean()
  requiresPasswordChange?: boolean;

  @IsOptional()
  @IsDate()
  passwordUpdatedAt?: Date;

  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  lastSuccessfulLogin?: Date;

  @IsString()
  status: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreditResponseDto)
  credits?: CreditResponseDto[];
}