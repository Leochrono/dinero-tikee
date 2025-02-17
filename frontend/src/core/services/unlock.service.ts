import axiosInstance from "../config/axios.config";
import {
  UnlockResponse,
  UnlockStatusResponse,
} from "../types/unlock.types";

export const unlockService = {
  sendUnlockCode: async (
    email: string
  ): Promise<UnlockResponse> => {
    try {
      const response = await axiosInstance.post<UnlockResponse>(
        "/unlock/request",
        { email }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          "Error al enviar código de desbloqueo"
      );
    }
  },

  validateUnlockCode: async (
    email: string,
    code: string
  ): Promise<UnlockResponse> => {
    try {
      const response = await axiosInstance.post<UnlockResponse>(
        "/unlock/validate",
        { email, unlockCode: code }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Error al verificar código de desbloqueo"
      );
    }
  },

  checkLockStatus: async (
    email: string
  ): Promise<UnlockStatusResponse> => {
    try {
      const response = await axiosInstance.get<UnlockStatusResponse>(
        `/unlock/status/${email}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Error al verificar estado de bloqueo"
      );
    }
  },
};