import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { passwordService } from "../../services/password.service";
import { routesWebpage } from "@/webpage/components/contants/routes";
import { ApiResponse } from "@/src/core/types/auth.types";

export const usePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const validatePassword = async (password: string) => {
    try {
      setLoading(true);
      if (password.length < 8) {
        return {
          success: false,
          error: "La contraseña debe tener al menos 8 caracteres",
        };
      }
      return await passwordService.validatePassword(password);
    } catch (error: any) {
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string,
    reason?: string
  ) => {
    try {
      setLoading(true);

      if (newPassword.length < 8) {
        toast.error("La contraseña debe tener al menos 8 caracteres");
        return {
          success: false,
          error: "La contraseña debe tener al menos 8 caracteres",
        };
      }

      let response;

      if (reason === "recovery") {
        const email = window.history.state?.usr?.email;
        response = await passwordService.changePasswordAfterRecovery(
          email,
          currentPassword,
          newPassword
        );
      } else {
        const mappedReason =
          reason === "recovery"
            ? "reset"
            : reason === "temporary_change"
            ? "temporary_change"
            : "user_request";

        response = await passwordService.changePassword(
          currentPassword,
          newPassword,
          mappedReason
        );
      }

      if (response.success) {
        toast.success("Contraseña actualizada exitosamente");
        navigate(routesWebpage.login);
      } else if (response.error) {
        toast.error(response.error);
      }

      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message;
      setError(errorMessage);
      toast.error(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  const validateRecoveryCode = async (email: string, code: string) => {
    try {
      setLoading(true);
      const response = await passwordService.validateRecoveryCode(email, code);

      if (response.success) {
        navigate(routesWebpage.cambiarPassword, {
          state: {
            email,
            tempCode: code,
            isRecoveryFlow: true,
          },
          replace: true,
        });
        return response;
      }

      toast.error(response.error || "Error validando código");
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message;
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Error in validateRecoveryCode:", error);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  const recoverPassword = async (email: string) => {
    try {
      setLoading(true);
      const response = await passwordService.recoverPassword(email);
      if (response.success) {
        toast.success(
          "Se ha enviado una contraseña temporal a tu correo electrónico"
        );
        return true;
      }
      throw new Error(response.error || "Error al recuperar contraseña");
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message;
      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    validatePassword,
    changePassword,
    validateRecoveryCode,
    recoverPassword,
    setError: (error: string | null) => setError(error),
  };
};
