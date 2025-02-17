import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsOptional,
  ValidateNested,
  IsArray,
  Min,
  Max,
  IsPositive,
  IsObject,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  InstitutionType,
  PersonalLoanProduct,
} from '../../../domain/entities/institution.entity';

export class PersonalLoanProductDto implements PersonalLoanProduct {
  @IsNumber()
  @IsPositive()
  @Min(500)
  @Max(100000)
  minAmount: number;

  @IsNumber()
  @IsPositive()
  @Min(500)
  @Max(100000)
  maxAmount: number;

  @IsNumber()
  @IsPositive()
  @Min(3)
  @Max(72)
  minTerm: number;

  @IsNumber()
  @IsPositive()
  @Min(3)
  @Max(72)
  maxTerm: number;

  @IsNumber()
  @Min(1)
  @Max(30)
  minRate: number;

  @IsNumber()
  @Min(1)
  @Max(30)
  maxRate: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  minIncome?: number;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  requirements: string[];

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  features: string[];

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  locations: string[];
}

export class CreateInstitutionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(InstitutionType)
  @IsNotEmpty()
  type: InstitutionType;

  @IsString()
  @IsNotEmpty()
  logo: string;

  @IsNumber()
  @Min(1)
  @Max(30)
  minRate: number;

  @IsNumber()
  @Min(1)
  @Max(30)
  maxRate: number;

  @ValidateNested()
  @Type(() => PersonalLoanProductDto)
  @IsObject()
  products: {
    personalLoan: PersonalLoanProductDto;
  };
}

export class UpdateInstitutionDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsEnum(InstitutionType)
  type?: InstitutionType;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  logo?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(30)
  minRate?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(30)
  maxRate?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => PersonalLoanProductDto)
  @IsObject()
  products?: {
    personalLoan: PersonalLoanProductDto;
  };
}

export class FilterInstitutionsDto {
  @IsOptional()
  @IsEnum(InstitutionType)
  type?: InstitutionType;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(500)
  @Max(100000)
  @ValidateIf((o) => o.amount !== undefined)
  amount?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(3)
  @Max(72)
  @ValidateIf((o) => o.term !== undefined)
  term?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ValidateIf((o) => o.income !== undefined)
  income?: number;

  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.location !== undefined)
  location?: string;

  @IsOptional()
  @IsEnum(['min', 'max'], {
    message: 'rateFilter debe ser "min" o "max"',
  })
  rateFilter?: 'min' | 'max';
}

export class InstitutionResponseDto {
  id: string;
  name: string;
  type: InstitutionType;
  logo: string;
  minRate: number;
  maxRate: number;
  products: {
    personalLoan: PersonalLoanProductDto;
  };
}
