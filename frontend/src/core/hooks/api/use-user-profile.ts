import { useState, useCallback } from "react";
import { userService } from "../../services/user.service";
import { toast } from "react-hot-toast";
import { RegisterUserData, UserProfile, UserProfileState } from "../../types/user.types";
import { ApiResponse } from "../../types/auth.types";
import { Credit } from "../../types/credit.types";


export const useUserProfile = () => {
  const [state, setState] = useState<UserProfileState>({
    loading: false,
    error: null,
    profile: null,
    credits: [],
    searchHistory: [],
  });

  const updateState = useCallback((newState: Partial<UserProfileState>) => {
    setState((prev) => ({ ...prev, ...newState }));
  }, []);

  const handleError = useCallback(
    (error: any, defaultMessage: string) => {
      const errorMessage = error.message || defaultMessage;
      updateState({ error: errorMessage });
      toast.error(errorMessage);
      return null;
    },
    [updateState]
  );

  const getUserProfile = useCallback(async (): Promise<ApiResponse<UserProfile>> => {
    try {
      updateState({ loading: true, error: null });
      const response = await userService.getProfile();
      return response;
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error al obtener perfil',
        data: undefined  // Cambiado de null a undefined
      };
    } finally {
      updateState({ loading: false });
    }
  }, [updateState, handleError]);

  const getUserCredits = useCallback(async (): Promise<ApiResponse<Credit[]>> => {
    try {
      updateState({ loading: true, error: null });
      const response = await userService.getCredits();
      return response;
    } catch (error) {
      return { 
        success: false, 
        data: [],
        error: error instanceof Error ? error.message : 'Error al obtener créditos' 
      };
    } finally {
      updateState({ loading: false });
    }
  }, [updateState, handleError]);

  const getSearchHistory = useCallback(async () => {
    try {
      updateState({ loading: true, error: null });
      const response = await userService.getSearchHistory();

      const history = response.success ? response.data || [] : [];
      updateState({ searchHistory: history });
      return history;
    } catch (error) {
      return handleError(error, "Error al obtener historial");
    } finally {
      updateState({ loading: false });
    }
  }, [updateState, handleError]);

  const updateProfile = useCallback(
    async (profileData: Partial<UserProfile>) => {
      try {
        updateState({ loading: true, error: null });
        const response = await userService.updateProfile(profileData);

        if (!response.success) {
          throw new Error(response.error || "Error al actualizar perfil");
        }

        updateState({ profile: response.data });
        toast.success("Perfil actualizado exitosamente");
        return true;
      } catch (error) {
        return handleError(error, "Error al actualizar perfil");
      } finally {
        updateState({ loading: false });
      }
    },
    [updateState, handleError]
  );

  const register = useCallback(async (userData: RegisterUserData) => {
    try {
      updateState({ loading: true, error: null });
      const response = await userService.register(userData);

      if (!response.success || !response.data) {
        throw new Error(response.error || "Error en el registro");
      }

      toast.success("Registro exitoso");
      return true;
    } catch (error) {
      return handleError(error, "Error en el registro");
    } finally {
      updateState({ loading: false });
    }
  }, [updateState, handleError]);

  const recoverUser = useCallback(async (cedula: string) => {
    try {
      updateState({ loading: true, error: null });
      const response = await userService.recoverUser(cedula);

      if (!response.success) {
        throw new Error(response.error || "Error al recuperar usuario");
      }

      toast.success("Se ha enviado tu información al correo registrado");
      return true;
    } catch (error) {
      return handleError(error, "Error al recuperar usuario");
    } finally {
      updateState({ loading: false });
    }
  }, [updateState, handleError]);

  const verifyDocument = useCallback(
    async (document: string) => {
      try {
        updateState({ loading: true, error: null });
        const response = await userService.findByDocument(document);

        if (!response.success) {
          throw new Error(response.error || "Error al verificar documento");
        }

        return response;
      } catch (error) {
        handleError(error, "Error al verificar documento");
        return { success: false, data: { email: "" } } as ApiResponse<{
          email: string;
        }>;
      } finally {
        updateState({ loading: false });
      }
    },
    [updateState, handleError]
  );

  const verifyEmail = useCallback(async (email: string, code: string) => {
    try {
      updateState({ loading: true, error: null });
      const response = await userService.verifyEmail(email, code);
      if (!response.success) {
        throw new Error(response.message || "Error al verificar email");
      }
      return true;
    } catch (error) {
      return handleError(error, "Error al verificar email");
    } finally {
      updateState({ loading: false });
    }
  }, [updateState, handleError]);

  const unlockAccount = useCallback(async (email: string, code: string) => {
    try {
      updateState({ loading: true });
      const response = await userService.unlockAccount(email, code);
      if (!response.success) {
        throw new Error(response.data?.message || "Error al desbloquear cuenta");
      }
      return true;
    } catch (error) {
      return handleError(error, "Error al desbloquear cuenta");
    } finally {
      updateState({ loading: false });
    }
  }, [updateState, handleError]);

  const refresh = useCallback(async () => {
    await Promise.all([getUserProfile(), getUserCredits(), getSearchHistory()]);
  }, [getUserProfile, getUserCredits, getSearchHistory]);

  return {
    // Estado
    loading: state.loading,
    error: state.error,
    profile: state.profile,
    credits: state.credits,
    searchHistory: state.searchHistory,

    // Métodos principales
    getUserProfile,
    getUserCredits,
    getSearchHistory,
    updateProfile,
    verifyDocument,
    register,
    recoverUser,
    verifyEmail,
    unlockAccount,
    refresh,

    // Utilidades
    setError: (error: string | null) => updateState({ error }),
  };
};