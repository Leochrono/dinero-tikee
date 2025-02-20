import axiosInstance from "../config/axios.config";
import { UnlockResponse, UnlockStatusResponse, UnlockAccountRequest } from "../types/unlock.types";

export const unlockService = {
  requestUnlock: async (email: string, cedula: string): Promise<UnlockResponse> => {
    try {
      const response = await axiosInstance.post("/unlock/request", { email, cedula });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Error al solicitar desbloqueo");
    }
  },
  validateUnlockCode: async (data: UnlockAccountRequest): Promise<UnlockResponse> => {
    try {
      const response = await axiosInstance.post("/unlock/validate", data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Error al validar código");
    }
  },

  checkLockStatus: async (email: string): Promise<UnlockStatusResponse> => {
    try {
      const response = await axiosInstance.get(`/unlock/status/${email}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Error al verificar estado");
    }
  }
};