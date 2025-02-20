// src/core/services/settings.service.ts
import axiosInstance from '../config/axios.config';
import {
  UserPersonalInfo,
  UserSettingsResponse,
  UpdatePreferencesRequest,
  UpdatePersonalInfoResponse
} from '../types/settings-user.types';

export const settingsService = {
  updatePersonalInfo: async (
    data: UserPersonalInfo
  ): Promise<UpdatePersonalInfoResponse> => {
    try {
      const response = await axiosInstance.put('/users/profile', data);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error || 'Error al actualizar información personal'
      );
    }
  },

  getSecurityPreferences: async (): Promise<UserSettingsResponse> => {
    try {
      const response = await axiosInstance.get('/users/security/preferences');
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error || 'Error al obtener preferencias de seguridad'
      );
    }
  },

  updateSecurityPreferences: async (
    preferences: UpdatePreferencesRequest
  ): Promise<UserSettingsResponse> => {
    try {
      const response = await axiosInstance.put(
        '/users/security/preferences',
        preferences
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error || 'Error al actualizar preferencias de seguridad'
      );
    }
  }
};