// src/core/hooks/api/settings-user.ts
import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { settingsService } from '../../services/settings.service';
import {
  SettingsState,
  UserPersonalInfo,
  SecurityPreferences,
  UpdatePreferencesRequest
} from '../../types/settings-user.types';

export const useSettingsUser = () => {
  const [state, setState] = useState<SettingsState>({
    loading: false,
    error: null,
    securityPreferences: null,
  });

  const updateState = useCallback((newState: Partial<SettingsState>) => {
    setState(prev => ({ ...prev, ...newState }));
  }, []);

  const handleError = useCallback((error: any, defaultMessage: string) => {
    const errorMessage = error.message || defaultMessage;
    updateState({ error: errorMessage });
    toast.error(errorMessage);
    return null;
  }, [updateState]);

  const updatePersonalInfo = useCallback(async (data: UserPersonalInfo) => {
    try {
      updateState({ loading: true, error: null });
      const response = await settingsService.updatePersonalInfo(data);
      
      if (response.success) {
        toast.success('Información personal actualizada exitosamente');
        return response.data;
      }
      
      throw new Error(response.error || 'Error al actualizar información');
    } catch (error) {
      return handleError(error, 'Error al actualizar información personal');
    } finally {
      updateState({ loading: false });
    }
  }, [updateState, handleError]);

  const getSecuritySettings = useCallback(async () => {
    try {
      updateState({ loading: true, error: null });
      const response = await settingsService.getSecurityPreferences();
      
      if (response.success) {
        updateState({ securityPreferences: response.data });
        return response.data;
      }
      
      throw new Error(response.error || 'Error al obtener configuraciones');
    } catch (error) {
      return handleError(error, 'Error al obtener configuraciones de seguridad');
    } finally {
      updateState({ loading: false });
    }
  }, [updateState, handleError]);

  const updateSecuritySettings = useCallback(async (preferences: UpdatePreferencesRequest) => {
    try {
      updateState({ loading: true, error: null });
      const response = await settingsService.updateSecurityPreferences(preferences);
      
      if (response.success) {
        updateState({ 
          securityPreferences: {
            ...state.securityPreferences,
            ...preferences
          } as SecurityPreferences 
        });
        toast.success('Preferencias de seguridad actualizadas');
        return response.data;
      }
      
      throw new Error(response.error || 'Error al actualizar preferencias');
    } catch (error) {
      return handleError(error, 'Error al actualizar preferencias de seguridad');
    } finally {
      updateState({ loading: false });
    }
  }, [updateState, handleError, state.securityPreferences]);

  const refresh = useCallback(async () => {
    await getSecuritySettings();
  }, [getSecuritySettings]);

  return {
    ...state,
    updatePersonalInfo,
    getSecuritySettings,
    updateSecuritySettings,
    refresh,
    setError: (error: string | null) => updateState({ error }),
  };
};