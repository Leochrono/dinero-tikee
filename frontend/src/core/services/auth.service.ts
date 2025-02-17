import axiosInstance from "../config/axios.config";
import {
  LoginResponseDto,
  ApiResponse,
  AuthResponse,
} from "../types/auth.types";

export const authService = {
  login: async (credentials: {
    email: string;
    password: string;
  }): Promise<LoginResponseDto> => {
    try {
      const response = await axiosInstance.post<LoginResponseDto>(
        "/auth/login",
        credentials
      );
      if (response.data.data?.requirePasswordChange) {
        throw new Error("Código temporal no válido para inicio de sesión");
      }
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error || "Error en el inicio de sesión"
      );
    }
  },

  verifyToken: async (): Promise<ApiResponse<AuthResponse>> => {
    try {
      const response = await axiosInstance.post<ApiResponse<AuthResponse>>(
        "/auth/verify-token"
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Error de sesión");
    }
  },

  logout: async (): Promise<ApiResponse<void>> => {
    try {
      const response = await axiosInstance.post<ApiResponse<void>>(
        "/auth/logout"
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Error al cerrar sesión");
    }
  },
};
