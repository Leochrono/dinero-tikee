import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { routesWebpage } from "@/webpage/components/contants/routes";
import { useUserProfile } from "@/src/core/hooks/api/use-user-profile";
import { verificationService } from "@/src/core/services/verification.service";
import { validations } from "@/src/utils/validations";
import { RegisterFormData, FormErrors } from "@/src/core/types/registerTypes";

export const useRegisterSubmit = (
  formData: RegisterFormData,
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>
) => {
  const navigate = useNavigate();
  const { register } = useUserProfile();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};

    if (!formData.nombres || !formData.apellidos) {
      newErrors.nombres = "Nombres y apellidos son requeridos";
    }

    if (!validations.validateCedula(formData.cedula)) {
      newErrors.cedula = "Cédula inválida";
    }

    if (!validations.validatePhone(formData.telefono)) {
      newErrors.telefono = "Número de teléfono inválido";
    }

    if (!validations.validateEmail(formData.email)) {
      newErrors.email = "Correo electrónico inválido";
    }

    if (!formData.direccion) {
      newErrors.direccion = "Dirección es requerida";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Por favor, corrija los errores antes de continuar");
      return;
    }

    try {
      setIsLoading(true);

      const registrationData = {
        nombres: formData.nombres.trim(),
        apellidos: formData.apellidos.trim(),
        cedula: formData.cedula,
        email: formData.email.toLowerCase(),
        telefono: formData.telefono,
        direccion: formData.direccion.trim(),
        password: formData.password,
      };

      sessionStorage.setItem(
        "registrationData",
        JSON.stringify(registrationData)
      );

      const verificationResponse =
        await verificationService.sendVerificationCode(
          registrationData.email,
          `${registrationData.nombres} ${registrationData.apellidos}`
        );

      if (!verificationResponse.success) {
        throw new Error(
          verificationResponse.message ||
            "Error al enviar código de verificación"
        );
      }

      navigate(routesWebpage.verificarEmail, {
        state: {
          email: registrationData.email,
          isRegistration: true,
          expiresAt: verificationResponse.data?.expiresAt,
          remainingAttempts: verificationResponse.data?.remainingAttempts ?? 5,
        },
      });
    } catch (error: any) {
      console.error("Error en registro:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error en el proceso de registro";

      toast.error(errorMessage);
      setErrors({});
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit, isLoading };
};
