import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsDate,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
export class CreateCreditDto {
  @IsNumber()
  @IsNotEmpty({ message: 'El monto es requerido' })
  @Type(() => Number)
  readonly amount: number;
  @IsNumber()
  @IsNotEmpty({ message: 'El plazo es requerido' })
  @Type(() => Number)
  readonly term: number;
  @IsNumber()
  @IsNotEmpty({ message: 'El ingreso es requerido' })
  @Type(() => Number)
  readonly income: number;
  @IsString()
  @IsNotEmpty({ message: 'La ubicación es requerida' })
  readonly location: string;
  @IsString()
  @IsNotEmpty({ message: 'El email es requerido' })
  readonly email: string;
  @IsString()
  @IsNotEmpty({ message: 'El documento es requerido' })
  readonly document: string;
  @IsBoolean()
  @IsNotEmpty({ message: 'Debe aceptar los términos y condiciones' })
  readonly termsAccepted: boolean;
  @IsString()
  @IsOptional()
  readonly institutionId?: string;
  @IsString()
  @IsOptional()
  readonly status: string = 'PENDING';
}
export class InstitutionResponseDto {
  @IsString()
  readonly id: string;
  @IsString()
  readonly name: string;
  @IsString()
  readonly type: string;
  @IsString()
  readonly logo: string;
  @IsNumber()
  readonly minRate: number;
}
export class CreditResponseDto {
  @IsString()
  readonly id: string;

  @IsNumber()
  readonly amount: number;

  @IsNumber()
  readonly term: number;

  @IsNumber()
  readonly income: number;

  @IsString()
  readonly status: string;

  @IsDate()
  @Type(() => Date)
  readonly createdAt: Date;

  @IsNumber()
  @IsOptional()
  readonly monthlyPayment: number;

  @IsNumber()
  @IsOptional()
  readonly totalPayment: number;

  @IsOptional()
  readonly institution?: InstitutionResponseDto;
}
export class SearchCreditDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly amount?: number;
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly term?: number;
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly income?: number;
  @IsEnum(['bank', 'cooperative'], {
    message: 'El tipo debe ser bank o cooperative',
  })
  @IsOptional()
  readonly type?: 'bank' | 'cooperative';
}

export class CreditHistoryDto {
  @IsString()
  readonly id: string;
  @IsNumber()
  readonly amount: number;
  @IsNumber()
  readonly term: number;
  @IsNumber()
  readonly income: number;
  @IsString()
  readonly status: string;
  @IsDate()
  readonly createdAt: Date;
}
// Tipo de estado de crédito
export type CreditStatus =
  | 'PENDING'
  | 'INSTITUTION_SELECTED'
  | 'DOCUMENTS_SUBMITTED'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'REJECTED';
// DTOs adicionales para operaciones específicas
export class UpdateCreditDto {
  @IsString()
  @IsOptional()
  readonly institutionId?: string;
  @IsEnum([
    'PENDING',
    'INSTITUTION_SELECTED',
    'DOCUMENTS_SUBMITTED',
    'UNDER_REVIEW',
    'APPROVED',
    'REJECTED',
  ])
  @IsOptional()
  readonly status?: CreditStatus;
}
// DTO para respuestas de API
export interface ApiCreditResponse {
  success: boolean;
  data?: CreditResponseDto;
  error?: string;
  message?: string;
}
export interface ApiCreditsResponse {
  success: boolean;
  data?: CreditResponseDto[];
  error?: string;
  message?: string;
}
