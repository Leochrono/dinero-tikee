import { ApiResponse } from "./auth.types";

// Interfaces relacionadas con bloqueo y desbloqueo de cuentas
export interface UnlockAccountRequest {
    email: string;
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