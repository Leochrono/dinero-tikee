import axiosInstance from '../config/axios.config';
import { ResendVerificationResponse, VerificationResponse } from '../types/user.types';


export const verificationService = {
  sendVerificationCode: async (email: string, nombres?: string): Promise<VerificationResponse> => {
    try {
      const response = await axiosInstance.post<VerificationResponse>(
        '/verification/send',
        { 
          email,
          nombres
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al enviar código de verificación');
    }
  },


verifyCode: async (email: string, code: string): Promise<VerificationResponse> => {
  try {
    const response = await axiosInstance.post<VerificationResponse>(
      '/verification/verify',  // Cambiado de /auth/verify-email
      {
        email,
        verificationCode: code
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al verificar código');
  }
},

  resendCode: async (email: string): Promise<ResendVerificationResponse> => {
    try {
      const response = await axiosInstance.post<ResendVerificationResponse>(
        '/verification/resend',
        { email }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al reenviar código de verificación');
    }
  },

  checkStatus: async (email: string): Promise<VerificationResponse> => {
    try {
      const response = await axiosInstance.get<VerificationResponse>(
        `/verification/status/${email}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al verificar estado');
    }
  }
};