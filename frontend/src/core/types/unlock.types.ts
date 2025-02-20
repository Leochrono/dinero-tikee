import { ApiResponse } from "./auth.types";

export interface UnlockAccountRequest {
  email: string;
  cedula: string;
  unlockCode: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface UnlockAccountResponse extends ApiResponse<{
  message: string;
  success: boolean;
  remainingAttempts?: number;
  cooldownUntil?: Date;
}> {}

export interface AccountLockStatus {
  isLocked: boolean;
  reason?: string;
  expiresAt?: Date;
  remainingAttempts?: number;
  cooldownUntil?: Date;
}

export interface AccountLockStatusResponse extends ApiResponse<AccountLockStatus> {}

export interface UnlockResponse {
  success: boolean;
  message: string;
  data?: {
    expiresAt?: Date;
    remainingAttempts?: number;
  };
}
  
export interface UnlockStatusResponse {
  success: boolean;
  message: string;
  data?: {
    isLocked: boolean;
    remainingAttempts?: number;
  };
}
