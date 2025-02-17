import { ApiResponse } from "./auth.types";

// Interfaces relacionadas con seguridad
export interface SecurityPreferences {
  notifyOnNewLogin: boolean;
  notifyOnPasswordChange: boolean;
  requireLocationValidation: boolean;
  trusted_ips?: string[];
  trusted_locations?: string[];
}

export interface SecurityEvent {
  id: string;
  eventType: string;
  status: string;
  timestamp: Date;
  ipAddress: string;
  details?: string;
  severity?: "low" | "medium" | "high" | "critical";
}

export interface SecurityLogResponse
  extends ApiResponse<{
    logs: SecurityEvent[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  }> {}

// Interfaces relacionadas con bloqueo y desbloqueo de cuenta
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
