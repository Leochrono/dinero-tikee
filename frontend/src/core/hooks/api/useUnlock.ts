import { useState, useCallback } from "react";
import { unlockService } from "../../services/unlock.service";
import { toast } from "react-hot-toast";

export const useUnlock = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unlockStatus, setUnlockStatus] = useState<{
    isLocked: boolean;
    expiresAt?: Date;
    remainingAttempts?: number;
  }>({
    isLocked: false,
  });

  const sendUnlockCode = useCallback(
    async (email: string): Promise<boolean> => {
      try {
        setLoading(true);
        setError(null);
        const response = await unlockService.sendUnlockCode(email);

        if (response.success) {
          toast.success("Código de desbloqueo enviado");
          setUnlockStatus({
            isLocked: true,
            expiresAt: response.data?.expiresAt,
            remainingAttempts: response.data?.remainingAttempts,
          });
          return true;
        }

        throw new Error(
          response.message || "Error al enviar código de desbloqueo"
        );
      } catch (error: any) {
        const errorMessage =
          error.message || "Error al enviar código de desbloqueo";
        setError(errorMessage);
        toast.error(errorMessage);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const validateUnlockCode = useCallback(
    async (email: string, code: string): Promise<boolean> => {
      try {
        setLoading(true);
        setError(null);
        const response = await unlockService.validateUnlockCode(email, code);

        if (response.success) {
          toast.success("Cuenta desbloqueada exitosamente");
          setUnlockStatus({
            isLocked: false,
            remainingAttempts: response.data?.remainingAttempts,
          });
          return true;
        }

        throw new Error(response.message || "Error al verificar código");
      } catch (error: any) {
        const errorMessage = error.message || "Error al verificar código";
        setError(errorMessage);
        toast.error(errorMessage);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const checkLockStatus = useCallback(
    async (email: string): Promise<boolean> => {
      try {
        setLoading(true);
        setError(null);
        const response = await unlockService.checkLockStatus(email);

        if (response.success) {
          setUnlockStatus({
            isLocked: response.data?.isLocked || false,
            remainingAttempts: response.data?.remainingAttempts,
          });
          return response.data?.isLocked || false;
        }

        throw new Error(response.message || "Error al verificar estado de bloqueo");
      } catch (error: any) {
        const errorMessage = error.message || "Error al verificar estado de bloqueo";
        setError(errorMessage);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const resetUnlockStatus = useCallback(() => {
    setUnlockStatus({
      isLocked: false,
    });
    setError(null);
  }, []);

  return {
    loading,
    error,
    unlockStatus,
    sendUnlockCode,
    validateUnlockCode,
    checkLockStatus,
    resetUnlockStatus,
    setError,
  };
};