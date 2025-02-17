import axiosInstance from "../config/axios.config";
import { ApiResponse } from "../types/auth.types";
import { Credit, SearchHistory, UserCredit } from "../types/credit.types";
import { RegisterUserData, UserProfile } from "../types/user.types";

export const userService = {
  findByDocument: async (
    document: string
  ): Promise<ApiResponse<{ email: string }>> => {
    try {
      const response = await axiosInstance.get(`/users/verify/${document}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return { success: false, data: { email: "" } };
      }
      throw new Error(error.response?.data?.error || "Error al buscar usuario");
    }
  },

  getProfile: async (): Promise<ApiResponse<UserProfile>> => {
    try {
      const response = await axiosInstance.get<ApiResponse<UserProfile>>(
        "/users/profile"
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Error al obtener perfil");
    }
  },

  getCredits: async (): Promise<ApiResponse<Credit[]>> => {
    try {
      const response = await axiosInstance.get<ApiResponse<Credit[]>>(
        "/credits/user-credits"
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error || "Error al obtener créditos"
      );
    }
  },

  getSearchHistory: async (): Promise<ApiResponse<SearchHistory[]>> => {
    try {
      const response = await axiosInstance.get<ApiResponse<SearchHistory[]>>(
        "/users/search-history"
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error || "Error al obtener historial"
      );
    }
  },

  updateProfile: async (
    profileData: Partial<UserProfile>
  ): Promise<ApiResponse<UserProfile>> => {
    try {
      const response = await axiosInstance.put<ApiResponse<UserProfile>>(
        "/auth/profile",
        profileData
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error || "Error al actualizar perfil"
      );
    }
  },

  register: async (userData: RegisterUserData): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.post("/auth/register", userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Error en el registro");
    }
  },

  recoverUser: async (cedula: string): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.post("/auth/recover-user", {
        cedula,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error || "Error al recuperar usuario"
      );
    }
  },

  verifyEmail: async (
    email: string,
    code: string
  ): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.post("/auth/verify-email", {
        email,
        code,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error || "Error al verificar email"
      );
    }
  },

  unlockAccount: async (
    email: string,
    code: string
  ): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.post("/auth/unlock-account", {
        email,
        code,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error || "Error al desbloquear cuenta"
      );
    }
  },

  getCredit: async (creditId: string): Promise<ApiResponse<UserCredit>> => {
    try {
      const response = await axiosInstance.get<ApiResponse<UserCredit>>(
        `/credits/${creditId}/details`
      );
      return response.data;
    } catch (error: any) {
      console.error(
        `[userService] Error al obtener detalles del crédito ${creditId}:`,
        error
      );
      throw new Error(
        error.response?.data?.error || "Error al obtener detalles del crédito"
      );
    }
  },
};
