import { ApiResponse } from './auth.types';

export interface UserPersonalInfo {
  telefono?: string;
  direccion?: string;
}

export interface SecurityPreferences {
  notifyOnNewLogin: boolean;
  notifyOnPasswordChange: boolean;
  requireLocationValidation: boolean;
}

export interface SettingsState {
  loading: boolean;
  error: string | null;
  securityPreferences: SecurityPreferences | null;
}

export interface UserSettingsResponse extends ApiResponse<SecurityPreferences> {}

export interface UpdatePersonalInfoResponse extends ApiResponse<UserPersonalInfo> {}

export interface UpdatePreferencesRequest {
  notifyOnNewLogin?: boolean;
  notifyOnPasswordChange?: boolean;
  requireLocationValidation?: boolean;
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UpdatePasswordResponse extends ApiResponse<{
  message: string;
  success: boolean;
}> {}