import axiosInstance from "../config/axios.config";
import {
  LoginResponseDto,
  ApiResponse,
  AuthResponse,
} from "../types/auth.types";
import { User } from "../types/user.types";

export const authService = {
  login: async (credentials: {
    email: string;
    password: string;
}): Promise<LoginResponseDto> => {
    try {
        // Si es un código temporal (6 caracteres alfanuméricos)
        if (credentials.password.length === 6 && /^[0-9A-Z]+$/.test(credentials.password)) {
            const response = await axiosInstance.post<ApiResponse<any>>(
                "/password/validate-recovery",
                {
                    email: credentials.email,
                    code: credentials.password,
                }
            );

            if (response.data.success) {
                // Crear un usuario temporal con información mínima
                const tempUser: User = {
                    id: '',
                    email: credentials.email,
                    cedula: '',
                    nombres: '',
                    apellidos: '',
                    telefono: '',
                    direccion: '',
                    requiresPasswordChange: true,
                    status: 'active',
                    createdAt: new Date(),
                    isEmailVerified: true
                };

                return {
                    success: true,
                    data: {
                        requirePasswordChange: true,
                        accessToken: '',
                        user: tempUser,
                        email: credentials.email,
                        tempCode: credentials.password
                    }
                };
            }
        }

        // Login normal
        const response = await axiosInstance.post<LoginResponseDto>(
            "/auth/login",
            credentials
        );
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
