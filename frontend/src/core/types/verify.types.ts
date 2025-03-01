import { ApiResponse } from "./auth.types";
import { CreditDocument } from "./credit.types";

export interface VerificationServiceResponse {
  success: boolean;
  data?: {
    expiresAt?: Date;
    remainingAttempts?: number;
    isVerified?: boolean;
  };
  message?: string;
  error?: string;
}

export interface VerificationResponse {
  success: boolean;
  message: string;
  data?: {
    isVerified: boolean;
    expiresAt?: Date;
    remainingAttempts?: number;
    cooldownUntil?: Date;
  };
}

export interface ResendVerificationResponse {
  success: boolean;
  message: string;
  data?: {
    expiresAt: Date;
    remainingAttempts: number;
  };
}

export interface VerifyDocumentDto {
  verified: boolean;
  comments?: string;
}

export interface DocumentResponseDto extends ApiResponse<CreditDocument> {}
