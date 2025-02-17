export type InstitutionType = "bank" | "cooperative";

export interface PersonalLoanProduct {
  minAmount: number;
  maxAmount: number;
  minTerm: number;
  maxTerm: number;
  minRate: number;
  maxRate: number;
  requirements: string[];
  features: string[];
  description: string;
  locations: string[];
}

export interface Products {
  personalLoan: PersonalLoanProduct;
}

export interface BaseInstitution {
  id: string;
  name: string;
  type: InstitutionType;
  logo: string;
  minRate: number;
  maxRate: number;
  products: Products;
}

export interface Institution extends BaseInstitution {}

export interface InstitutionResponse extends BaseInstitution {}

export interface InstitutionFilters {
  type?: InstitutionType;
  amount?: number;
  term?: number;
  rateFilter?: "min" | "max";
  location?: string;
}

export interface BestRatesParams {
  amount: number;
  term: number;
  rateFilter?: "min" | "max";
}
