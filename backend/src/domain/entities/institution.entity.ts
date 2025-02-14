import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  JoinColumn
} from 'typeorm';
import {
  IsString,
  IsEnum,
  IsNumber,
  ValidateNested,
  IsArray,
  IsOptional,
  Min,
  Max,
  IsNotEmpty
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreditEntity } from 'src/domain/entities/credit.entity';

export enum InstitutionType {
  BANK = 'bank',
  COOPERATIVE = 'cooperative'
}

export class PersonalLoanProduct {
  @IsNumber()
  @Min(500)
  @Max(100000)
  minAmount: number;

  @IsNumber()
  @Min(500)
  @Max(100000)
  maxAmount: number;

  @IsNumber()
  @Min(3)
  @Max(72)
  minTerm: number;

  @IsNumber()
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

@Entity('institutions')
export class InstitutionEntity {
  @PrimaryColumn('varchar', { length: 50 })
  @IsString()
  id: string;

  @Column()
  @IsString()
  name: string;

  @Column({
    type: 'enum',
    enum: InstitutionType
  })
  @IsEnum(InstitutionType)
  type: InstitutionType;

  @Column()
  @IsString()
  logo: string;

  @Column('decimal', {
    precision: 5,
    scale: 2,
    default: 0
  })
  @IsNumber()
  @Min(0)
  @Max(30)
  minRate: number;

  @Column('decimal', {
    precision: 5,
    scale: 2,
    default: 0
  })
  @IsNumber()
  @Min(0)
  @Max(30)
  maxRate: number;

  @Column('json')
  @ValidateNested()
  @Type(() => PersonalLoanProduct)
  products: {
    personalLoan: PersonalLoanProduct
  };

  @OneToMany(() => CreditEntity, credit => credit.institution, {
    cascade: true,
    eager: false
  })
  @JoinColumn()
  @IsOptional()
  credits: CreditEntity[];

  // Métodos auxiliares para acceder a los datos del préstamo personal
  get minAmount(): number {
    return this.products.personalLoan.minAmount;
  }

  get maxAmount(): number {
    return this.products.personalLoan.maxAmount;
  }

  get minTerm(): number {
    return this.products.personalLoan.minTerm;
  }

  get maxTerm(): number {
    return this.products.personalLoan.maxTerm;
  }

  // Método para verificar si un monto y plazo están dentro de los rangos permitidos
  isValidLoanRequest(amount: number, term: number): boolean {
    return (
      amount >= this.minAmount &&
      amount <= this.maxAmount &&
      term >= this.minTerm &&
      term <= this.maxTerm
    );
  }
}