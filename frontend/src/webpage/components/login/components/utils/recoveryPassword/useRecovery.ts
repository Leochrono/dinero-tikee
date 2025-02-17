import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { routesWebpage } from "@/webpage/components/contants/routes";
import { useAuth } from "@/src/core/hooks/api/useAuth";
import { usePassword } from "@/src/core/hooks/api/use-password";
import { useUserProfile } from "@/src/core/hooks/api/use-user-profile";

export type RecoveryType = "password" | "user" | "both";

export interface RecoverFormData {
  email: string;
  cedula: string;
}

export interface FormErrors {
  email?: string;
  cedula?: string;
}

export const useRecovery = () => {
  const navigate = useNavigate();
  const { loading: authLoading } = useAuth();
  const { recoverPassword, loading: passwordLoading } = usePassword();
  const { recoverUser, loading: userLoading } = useUserProfile();

  const [recoveryType, setRecoveryType] = useState<RecoveryType | "">("");
  const [formData, setFormData] = useState<RecoverFormData>({
    email: "",
    cedula: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const loading = authLoading || passwordLoading || userLoading;

  const handleTypeSelection = (type: RecoveryType) => {
    setRecoveryType(type);
    setFormData({ email: "", cedula: "" });
    setErrors({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    try {
      switch (recoveryType) {
        case "password":
          const passwordResponse = await recoverPassword(formData.email);
          if (passwordResponse) {
            toast.success(
              "Se ha enviado una contraseña temporal a tu correo electrónico. Úsala para iniciar sesión y establecer una nueva contraseña.",
              {
                duration: 6000,
              }
            );
            navigate(routesWebpage.login);
          }
          break;

        case "user":
          const userResponse = await recoverUser(formData.cedula);
          if (userResponse) {
            toast.success(
              "Se ha enviado la información a tu correo registrado"
            );
            navigate(routesWebpage.login);
          }
          break;

        case "both":
          const [recoverPwdRes, recoverUserRes] = await Promise.all([
            recoverPassword(formData.email),
            recoverUser(formData.cedula),
          ]);

          if (recoverPwdRes && recoverUserRes) {
            toast.success(
              "Se ha enviado la información a tu correo registrado"
            );
            navigate(routesWebpage.login);
          }
          break;

        default:
          toast.error("Selecciona un tipo de recuperación");
          return;
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Ocurrió un error. Por favor intenta nuevamente";

      if (error.response?.status === 429) {
        toast.error(
          "Demasiados intentos. Por favor espera unos minutos antes de intentar nuevamente.",
          {
            duration: 8000,
          }
        );
      } else {
        toast.error(errorMessage);
      }
    }
  };

  return {
    recoveryType,
    formData,
    errors,
    loading,
    handleTypeSelection,
    handleChange,
    handleSubmit,
  };
};
