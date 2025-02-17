import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { routesWebpage } from "@/webpage/components/contants/routes";
import { verificationService } from "@/src/core/services/verification.service";
import { useUserProfile } from "@/src/core/hooks/api/use-user-profile";

export interface VerifyFormData {
  email: string;
  verificationCode: string;
}

export interface FormErrors {
  verificationCode?: string;
}

export const useVerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useUserProfile();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<VerifyFormData>({
    email: location.state?.email || "",
    verificationCode: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60);
  const [isExpired, setIsExpired] = useState(false);
  const [resendCooldown, setResendCooldown] = useState<number>(0);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (!location.state?.email) {
      navigate(routesWebpage.registro);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsExpired(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [location.state?.email, navigate]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const cooldownTimer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(cooldownTimer);
    }
  }, [resendCooldown]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0) return;

    try {
      setIsResending(true);
      const response = await verificationService.resendCode(formData.email);

      if (response.success) {
        toast.success("Código reenviado exitosamente");
        setTimeLeft(15 * 60);
        setIsExpired(false);
        setResendCooldown(60);
        setFormData((prev) => ({ ...prev, verificationCode: "" }));
        setErrors({});
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Error al reenviar el código"
      );
    } finally {
      setIsResending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "verificationCode") {
      formattedValue = value.toUpperCase();
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isExpired) {
      toast.error("El código ha expirado. Por favor, solicita uno nuevo.");
      return;
    }

    try {
      setIsLoading(true);
      const verificationResponse = await verificationService.verifyCode(
        formData.email,
        formData.verificationCode
      );

      if (verificationResponse.success) {
        if (location.state?.isRegistration) {
          const registrationData = sessionStorage.getItem("registrationData");

          if (registrationData) {
            const userData = JSON.parse(registrationData);
            await register(userData);
            sessionStorage.removeItem("registrationData");
            toast.success("¡Registro completado exitosamente!");
          }
        }

        navigate(routesWebpage.login);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Código de verificación inválido o expirado";

      setErrors({
        verificationCode: errorMessage,
      });
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    const confirmBack = window.confirm(
      "¿Estás seguro que deseas volver? Perderás el progreso actual."
    );
    if (confirmBack) {
      sessionStorage.removeItem("registrationData");
      navigate(routesWebpage.registro);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    timeLeft,
    isExpired,
    resendCooldown,
    isResending,
    formatTime,
    handleResendCode,
    handleChange,
    handleSubmit,
    handleBack,
    email: location.state?.email,
  };
};
