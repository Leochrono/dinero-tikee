import { routesWebpage } from "@/components/contants/routes";
import { SearchHistory, UserCredit } from "./credit.types";
import { ApiResponse } from "./auth.types";


// Interfaces relacionadas con usuarios
export interface User {
    id: string;
    email: string;
    cedula: string;
    nombres: string;
    apellidos: string;
    telefono: string;
    direccion: string;
    requiresPasswordChange: boolean;
    passwordUpdatedAt?: Date;
    status: 'pending_verification' | 'active' | 'inactive';
    createdAt: Date;
    lastSuccessfulLogin?: Date;
    isEmailVerified?: boolean;
  }
  
  export interface UserProfileState {
    loading: boolean;
    error: string | null;
    profile: UserProfile | null;
    credits: UserCredit[];
    searchHistory: SearchHistory[];
  }
  
  export interface UserProfile {
    id: string;
    nombres: string;
    apellidos: string;
    email: string;
  }
  
  export interface RegisterUserData {
    nombres: string;
    apellidos: string;
    cedula: string;
    email: string;
    telefono: string;
    direccion: string;
    password: string;
  }
  
  export interface SecurityPreferences {
    notifyOnNewLogin: boolean;
    notifyOnPasswordChange: boolean;
    requireLocationValidation: boolean;
    trusted_ips?: string[];
    trusted_locations?: string[];
  }
  
  // Interfaces relacionadas con autenticación
  export interface AuthMethods {
    login: (email: string, password: string, redirect?: boolean) => Promise<boolean>;
    logout: () => void;
    checkAuth: () => Promise<boolean>;
    setError: (error: string | null) => void;
    navigateToPublic: (route: PublicRoute) => void;
  }
  
  export type PublicRoute =
    | "/login"
    | "/registro"
    | "/recuperar-password"
    | "/verificar-email"
    | "/desbloquear-cuenta"
    | typeof routesWebpage.login
    | typeof routesWebpage.registro
    | typeof routesWebpage.recuperarPassword
    | typeof routesWebpage.verificarEmail
    | typeof routesWebpage.desbloquearCuenta;
  
  export interface AuthData {
    accessToken: string;
    user: User;
  }
  
  export interface Tokens {
    accessToken: string;
    refreshToken?: string;
  }
  
  export interface AuthResponse {
    user: User;
    accessToken: string;
    requirePasswordChange?: boolean;
    passwordExpired?: boolean;
    isEmailVerified?: boolean;
  }
  
  export interface AuthHookState extends AuthState {
    initialCheckDone: boolean;
  }
  
  export interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    checkAuth: () => Promise<boolean>;
    login: (email: string, password: string, redirect?: boolean) => Promise<boolean>;
    logout: () => void;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    requirePasswordChange?: boolean;
    passwordExpired?: boolean;
    isEmailVerified?: boolean;
  }
  
  // Interfaces relacionadas con respuestas específicas de autenticación
  export interface LoginResponseDto extends ApiResponse<AuthResponse> {
    requirePasswordChange?: boolean;
    passwordExpired?: boolean;
    isLocked?: boolean;
    lockDuration?: string;
    remainingAttempts?: number;
  }
  
  export interface RegisterResponseDto extends ApiResponse<AuthResponse> {
    verificationRequired?: boolean;
    verificationSent?: boolean;
  }
  
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
  
  // Interfaces relacionadas con gestión de contraseñas y recuperación
  export interface PasswordChangeResponse extends ApiResponse<{
    message: string;
    requirePasswordChange: boolean;
    passwordUpdatedAt?: Date;
  }> {}
  
  export interface RecoverPasswordRequest {
    email: string;
    ipAddress?: string;
    userAgent?: string;
  }
  
  export interface PasswordRecoveryResponse extends ApiResponse<{
    message: string;
    expiresAt: Date;
    requirePasswordChange: boolean;
    temporaryPassword?: boolean;
    remainingAttempts?: number;
    cooldownUntil?: Date;
  }> {}
  
  export interface TemporaryPasswordError {
    expired: boolean;
    message: string;
    expirationDate?: Date;
  }
  
  export interface RecoveryStatus {
    isValid: boolean;
    expiresAt?: Date;
    remainingAttempts?: number;
    cooldownUntil?: Date;
  }
  
  export interface RecoveryStatusResponse extends ApiResponse<RecoveryStatus> {}
  
  // Interfaces relacionadas con verificación de email
  export interface ResendVerificationResponse {
    success: boolean;
    message: string;
    data?: {
      expiresAt: Date;
      remainingAttempts: number;
    };
  }
  
  // Interfaces relacionadas con seguridad
  export interface SecurityEvent {
    id: string;
    eventType: string;
    status: string;
    timestamp: Date;
    ipAddress: string;
    details?: string;
    severity?: 'low' | 'medium' | 'high' | 'critical';
  }
  
  export interface SecurityLogResponse extends ApiResponse<{
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
  
  // Interfaces relacionadas con métodos de usuario y contraseña
  export interface PasswordMethods {
    validatePassword: (password: string) => Promise<boolean>;
    changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
    validateRecoveryCode: (email: string, code: string) => Promise<boolean>;
    recoverPassword: (email: string) => Promise<boolean>;
  }
  
  export interface UserMethods {
    register: (userData: RegisterUserData) => Promise<boolean>;
    recoverUser: (cedula: string) => Promise<boolean>;
    verifyEmail: (email: string, code: string) => Promise<boolean>;
    unlockAccount: (email: string, code: string) => Promise<boolean>;
    getUserProfile: () => Promise<ApiResponse<UserProfile>>;
    updateProfile: (profileData: Partial<UserProfile>) => Promise<boolean>;
    verifyDocument: (document: string) => Promise<ApiResponse<{ email: string }>>;
  }