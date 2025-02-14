import { useState, useCallback } from "react";
import { verificationService } from "../../services/verification.service";
import { toast } from "react-hot-toast";
export const useVerification = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<{
    isVerified: boolean;
    expiresAt?: Date;
    remainingAttempts?: number;
  }>({
    isVerified: false,
  });

  const sendVerificationCode = useCallback(
    async (email: string): Promise<boolean> => {
      try {
        setLoading(true);
        setError(null);
        const response = await verificationService.sendVerificationCode(email);

        if (response.success) {
          toast.success("Código de verificación enviado");
          setVerificationStatus({
            isVerified: false,
            expiresAt: response.data?.expiresAt,
            remainingAttempts: response.data?.remainingAttempts,
          });
          return true;
        }

        throw new Error(
          response.message || "Error al enviar código de verificación"
        );
      } catch (error: any) {
        const errorMessage =
          error.message || "Error al enviar código de verificación";
        setError(errorMessage);
        toast.error(errorMessage);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const verifyCode = useCallback(
    async (email: string, code: string): Promise<boolean> => {
      try {
        setLoading(true);
        setError(null);
        const response = await verificationService.verifyCode(email, code);

        if (response.success) {
          toast.success("Email verificado exitosamente");
          setVerificationStatus({
            isVerified: response.data?.isVerified || false,
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

  const resendVerificationCode = useCallback(
    async (email: string): Promise<boolean> => {
      try {
        setLoading(true);
        setError(null);
        const response = await verificationService.resendCode(email);

        if (response.success) {
          toast.success("Nuevo código de verificación enviado");
          setVerificationStatus({
            isVerified: false,
            expiresAt: response.data?.expiresAt,
            remainingAttempts: response.data?.remainingAttempts,
          });
          return true;
        }

        throw new Error(response.message || "Error al reenviar código");
      } catch (error: any) {
        const errorMessage = error.message || "Error al reenviar código";
        setError(errorMessage);
        toast.error(errorMessage);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const checkVerificationStatus = useCallback(
    async (email: string): Promise<boolean> => {
      try {
        setLoading(true);
        setError(null);
        const response = await verificationService.checkStatus(email);

        if (response.success) {
          setVerificationStatus({
            isVerified: response.data?.isVerified || false,
          });
          return response.data?.isVerified || false;
        }

        throw new Error(response.message || "Error al verificar estado");
      } catch (error: any) {
        const errorMessage = error.message || "Error al verificar estado";
        setError(errorMessage);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const resetVerificationStatus = useCallback(() => {
    setVerificationStatus({
      isVerified: false,
    });
    setError(null);
  }, []);

  return {
    loading,
    error,
    verificationStatus,
    sendVerificationCode,
    verifyCode,
    resendVerificationCode,
    checkVerificationStatus,
    resetVerificationStatus,
    setError,
  };
};
