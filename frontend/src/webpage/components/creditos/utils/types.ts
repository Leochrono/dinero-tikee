export interface CreditFormData {
  amount: number;
  term: number;
  income: number;
  location: string;
  email: string;
  document: string;
  termsAccepted: boolean;
}

export interface CreditResponse {
  id: string;
  amount: number;
  term: number;
  income: number;
  location: string;
  email: string;
  status: string;
  createdAt: Date;
  institutionId?: string;
  user?: {
    // Define la estructura del objeto `user` aquí
    id: string;
    name: string; 
    // otras propiedades...
  };
}

// Interfaces para opciones y detalles de crédito
export interface CreditOption {
  bankLogo: string;
  monthlyPayment: number;
  interestRate: number;
  totalPayment: number;
  isHighlighted?: boolean;
  description: string;
}

export interface Institution {
  id: string;
  name: string;
  type: "bank" | "cooperative";
  logo: string;
  minRate: number;
  maxRate: number;
  products: {
    personalLoan: {
      minAmount: number;
      maxAmount: number;
      minTerm: number;
      maxTerm: number;
      minRate: number;
      maxRate: number;
      requirements: string[];
      features: string[];
      description: string;
    };
  };
}

export interface CreditDetails {
  id: string;
  amount: number;
  term: number;
  income: number;
  monthlyPayment: number;
  interestRate: number;
  totalPayment: number;
  insuranceRate: number;
  statementFee: number;
  institution: Institution;
  status: string;
  documents?: CreditDocument[];
  requirements: Array<{ name: string; id: string }>;
}

export interface CreditDocument {
  id: string;
  documentType: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  isVerified: boolean;
  createdAt: Date;
  metadata?: {
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
  };
}

// Interfaces para respuestas API y errores
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface FormErrors {
  amount?: string;
  term?: string;
  income?: string;
  location?: string;
  document?: string;
  email?: string;
  termsAccepted?: string;
}

// Types para estados y pasos
export type CreditStep = "form" | "results" | "details" | "success";

export type CreditStatus =
  | "PENDING"
  | "INSTITUTION_SELECTED"
  | "DOCUMENTS_SUBMITTED"
  | "UNDER_REVIEW"
  | "APPROVED"
  | "REJECTED";

// Interfaces para props de componentes
export interface CreditFormProps {
  onSubmit: (data: CreditFormData) => void;
  initialData: CreditFormData;
}

interface CreditResultsProps {
  formData: CreditFormData;
  onSelect: (institutionId: string) => void;
  onBack: () => void;
}

export interface CreditDetailsProps {
  formData: CreditFormData;
  onBack: () => void;
  onApply: () => void;
  institutionId: string;
  creditId: string;
}

export interface CreditSuccessProps {
  onNewSearch: () => void;
}

// Tipo para el contexto compartido
export interface CreditContextType {
  formData: CreditFormData;
  initialData: CreditFormData;
  onSubmit: (data: CreditFormData) => void;
  onSelect: (institutionId: string) => void;
  onBack: () => void;
  onApply: () => void;
  onNewSearch: () => void;
  selectedInstitutionId: string;
  creditId: string;
}

export interface ValidFields {
  email: boolean;
  document: boolean;
  location: boolean;
}

