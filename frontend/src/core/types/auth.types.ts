import { routesWebpage } from "@/components/contants/routes";
import { User } from "./user.types";

// Base Response (compartido con otros archivos)
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Interfaces relacionadas con autenticación básica
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
  user: User  ;
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