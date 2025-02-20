import { useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import { unlockService } from "../../services/unlock.service";
import { UnlockResponse, UnlockStatusResponse, UnlockAccountRequest } from "../../types/unlock.types";

interface RequestUnlockParams {
  email: string;
  cedula: string;
}

export const useUnlock = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestUnlock = useCallback(async ({ email, cedula }: RequestUnlockParams): Promise<UnlockResponse> => {
    try {
      setLoading(true);
      setError(null);
      const response = await unlockService.requestUnlock(email, cedula);
      
      if (response.success) {
        toast.success("Código de desbloqueo enviado. Por favor revisa tu correo.");
      }
      
      return response;
    } catch (error: any) {
      const errorMessage = error.message || "Error al solicitar desbloqueo";
      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const validateUnlockCode = useCallback(async (data: UnlockAccountRequest): Promise<UnlockResponse> => {
    try {
      setLoading(true);
      setError(null);
      const response = await unlockService.validateUnlockCode(data);
      
      if (response.success) {
        toast.success("Cuenta desbloqueada exitosamente");
      }
      
      return response;
    } catch (error: any) {
      const errorMessage = error.message || "Error al validar código";
      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const checkLockStatus = useCallback(async (email: string): Promise<UnlockStatusResponse> => {
    try {
      setLoading(true);
      setError(null);
      return await unlockService.checkLockStatus(email);
    } catch (error: any) {
      const errorMessage = error.message || "Error al verificar estado";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    requestUnlock,
    validateUnlockCode,
    checkLockStatus,
    setError: (error: string | null) => setError(error)
  };
};