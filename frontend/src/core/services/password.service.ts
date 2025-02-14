import axiosInstance from '../config/axios.config';
import { ApiResponse } from '../types/auth.types';

export const passwordService = {
 validatePassword: async (password: string): Promise<ApiResponse<any>> => {
   const response = await axiosInstance.post('/password/validate', { password });
   return response.data;
 },

 changePassword: async (currentPassword: string, newPassword: string, reason: string = 'user_request'): Promise<ApiResponse<any>> => {
  const response = await axiosInstance.post('/password/change', {
    currentPassword,
    newPassword,
    reason
  });
  return response.data;
},

changePasswordAfterRecovery: async (email: string, tempCode: string, newPassword: string): Promise<ApiResponse<any>> => {
  const response = await axiosInstance.post('/password/change-recovery', {
    email,
    tempCode,
    newPassword
  });
  return response.data;
},

  validateRecoveryCode: async (email: string, code: string): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.post('/password/validate-recovery', {
        email,
        code
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Error al validar código');
    }
  },

 recoverPassword: async (email: string): Promise<ApiResponse<any>> => {
   const response = await axiosInstance.post('/password/recover', { email });
   return response.data;
 },

 checkRecoveryStatus: async (email: string): Promise<ApiResponse<any>> => {
   const response = await axiosInstance.get(`/password/recovery-status/${email}`);
   return response.data;
 },

 checkExpiration: async (): Promise<ApiResponse<any>> => {
   const response = await axiosInstance.get('/password/check-expiration');
   return response.data;
 },

 getPasswordHistory: async (): Promise<ApiResponse<any>> => {
   const response = await axiosInstance.get('/password/history');
   return response.data;
 }
};