import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { routesWebpage } from "@/webpage/components/contants/routes";
import { useAuth } from "@/src/core/hooks/api/useAuth";
import { usePassword } from "@/src/core/hooks/api/use-password";
import { useUnlock } from "@/src/core/hooks/api/useUnlock";

export type RecoveryType = "password" | "unlock"; 

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
  const { requestUnlock, loading: unlockLoading } = useUnlock();

  const [recoveryType, setRecoveryType] = useState<RecoveryType | "">("");
  const [formData, setFormData] = useState<RecoverFormData>({
    email: "",
    cedula: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const loading = authLoading || passwordLoading || unlockLoading;

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

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es requerido";
    }

    if (recoveryType === "unlock") {
      if (!formData.cedula.trim()) {
        newErrors.cedula = "La cédula es requerida";
      } else if (!/^\d{10}$/.test(formData.cedula)) {
        newErrors.cedula = "La cédula debe tener 10 dígitos numéricos";
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

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

        case "unlock":
          const unlockResponse = await requestUnlock({
            email: formData.email,
            cedula: formData.cedula
          });
          if (unlockResponse.success) {
            toast.success(
              "Se ha enviado un código de desbloqueo a tu correo electrónico.",
              {
                duration: 4000,
              }
            );
            navigate(routesWebpage.desbloquearCuenta, {
              state: { 
                email: formData.email,
                cedula: formData.cedula
              }
            });
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