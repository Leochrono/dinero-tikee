import { ApiResponse } from "./auth.types";

export interface UnlockAccountRequest {
  email: string;
  unlockCode: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface UnlockAccountResponse
  extends ApiResponse<{
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

export interface AccountLockStatusResponse
  extends ApiResponse<AccountLockStatus> {}
