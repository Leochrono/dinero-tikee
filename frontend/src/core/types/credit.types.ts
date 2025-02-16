import { ApiResponse } from "./auth.types";

// Enums
export enum InstitutionType {
  BANK = "bank",
  COOPERATIVE = "cooperative",
}

export enum DocumentType {
  ID = 'id',
  PAYROLL = 'payroll',
  SERVICES = 'services'
}

export enum FileType {
  PDF = "application/pdf",
  JPEG = "image/jpeg",
  PNG = "image/png",
}

export interface Credit {
  id: string;
  amount: number;
  term: number;
  income: number;
  status: string;
  createdAt: Date;
  institution: {
    id: string;
    name: string;
    type: string;
    logo: string;
    minRate: number;
    email?: string; 
  };
}

export interface CreditFormData {
  amount: number;
  term: number;
  income: number;
  location: string;
  email: string;
  document: string;
  termsAccepted: boolean;
  status?: string;
  institutionId?: string;
}

export interface CreditResponse {
  id: string;
  amount: number;
  term: number;
  income: number;
  status: string;
  createdAt: Date;
  institution?: {
    id: string;
    name: string;
    type: string;
    logo: string;
    minRate: number;
  };
  documents?: CreditDocument[];
}

export interface CreateCreditDTO {
  amount: number;
  term: number;
  income: number;
  location: string;
  email: string;
  document: string;
  termsAccepted: boolean;
  status?: string;
  institutionId?: string;
}

export interface UserCredit {
  id: string;
  amount: number;
  term: number;
  income: number;
  status: string;
  institution: {
    id: string;
    name: string;
    logo: string;
    minRate: number;
    email?: string;
  };
  monthlyPayment: number;
  totalPayment: number;
  documents?: CreditDocument[]; // Agregamos esta línea
}

export interface SearchHistory {
  id: string;
  amount: number;
  term: number;
  income: number;
  createdAt: Date;
}

export interface CreditContextValue {
  formData: {
    email: string;
    document: string;
  };
  loading: boolean;
  error: string | null;
  creditId: string;
  onSubmit: (data: any) => Promise<void>;
  onSelect: (institutionId: string) => Promise<void>;
  onBack: () => void;
  onApply: () => Promise<void>;
  onNewSearch: () => void;
  selectedInstitutionId: string;
}

// Interfaces relacionadas con instituciones
export interface ProductLoan {
  minAmount: number;
  maxAmount: number;
  minTerm: number;
  maxTerm: number;
  minRate: number;
  maxRate: number;
  requirements: string[];
  features: string[];
  description: string;
}

export interface Products {
  personalLoan: ProductLoan;
}

export interface Institution {
  id: string;
  name: string;
  type: InstitutionType;
  logo: string;
  minRate: number;
  maxRate: number;
  creditCount?: number;
  products: Products;
}

export interface CreateInstitutionDto {
  name: string;
  type: InstitutionType;
  logo: string;
  minRate: number;
  maxRate: number;
  products: Products;
}

export interface UpdateInstitutionDto {
  name?: string;
  logo?: string;
  minRate?: number;
  maxRate?: number;
  products?: Products;
}

export interface InstitutionFilterDto {
  type?: InstitutionType;
  minRate?: number;
  maxRate?: number;
}

export interface InstitutionResponse extends ApiResponse<Institution> {}
export interface InstitutionsResponse extends ApiResponse<Institution[]> {}

export interface BestRatesResponse
  extends ApiResponse<{
    institutions: Institution[];
    averageRate: number;
    recommendedAmount?: number;
  }> {}

export interface InstitutionSearchResponse
  extends ApiResponse<{
    results: Institution[];
    total: number;
    filters: InstitutionFilterDto;
  }> {}

// Interfaces relacionadas con documentos
export interface DocumentMetadata {
  originalName: string;
  mimeType: string;
  dimensions?: {
    width: number;
    height: number;
  };
  hash?: string;
  verificationDetails?: {
    verifiedAt: Date;
    verifiedBy: string;
    comments: string;
  };
}

export interface CreditDocument {
  id: string;
  documentType: DocumentType;
  fileName: string;
  fileUrl: string;
  fileType: FileType;
  fileSize: number;
  isVerified: boolean;
  createdAt: Date;
  metadata?: DocumentMetadata;
}

export interface VerifyDocumentDto {
  verified: boolean;
  comments?: string;
}

export interface DocumentResponseDto extends ApiResponse<CreditDocument> {}

// Hooks y métodos relacionados con créditos
export interface CreditHookReturn {
  loading: boolean;
  error: string | null;
  creditId: string;
  status: string;
  createCredit: (
    creditData: CreateCreditDTO
  ) => Promise<ApiResponse<CreditResponse>>;
  uploadDocument: (
    creditId: string,
    documentType: DocumentType,
    file: File,
    onProgress?: (progress: number) => void
  ) => Promise<DocumentResponseDto>;
  uploadCreditFiles: (
    creditId: string,
    formData: FormData,
    onProgress?: (progress: number) => void
  ) => Promise<ApiResponse<any>>;
  updateStatus: (
    creditId: string,
    status: string
  ) => Promise<ApiResponse<CreditResponse>>;
  searchCredits: (params: {
    amount: number;
    term: number;
    income: number;
    type?: "bank" | "cooperative";
  }) => Promise<ApiResponse<CreditResponse[]>>;
  getDetails: (creditId: string) => Promise<ApiResponse<CreditResponse>>;
  updateCredit: (
    creditId: string,
    updateData: { institutionId?: string; status?: string }
  ) => Promise<ApiResponse<CreditResponse>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  contextValue: CreditContextValue;
}
