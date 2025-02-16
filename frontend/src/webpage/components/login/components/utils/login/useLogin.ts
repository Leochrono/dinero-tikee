import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { routesWebpage } from "@/webpage/components/contants/routes";
import { useAuth } from "@/src/core/hooks/api/useAuth";
import { usePassword } from "@/src/core/hooks/api/use-password";

export interface LoginFormData {
  email: string;
  password: string;
}

export const useLogin = () => {
  const navigate = useNavigate();
  const {
    login,
    loading,
    error,
    setError,
    navigateToPublic,
    checkAuth,
    isAuthenticated,
  } = useAuth();
  const { validateRecoveryCode } = usePassword();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  // Combinado useEffect para autenticación inicial y redirección
  useEffect(() => {
    let isMounted = true;
    const initialCheck = async () => {
      try {
        await checkAuth();
        
        // Redirección si está autenticado
        if (isMounted && isAuthenticated) {
          const timer = setTimeout(() => {
            navigate(routesWebpage.perfil, { replace: true });
          }, 100);
          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error("Initial auth check failed:", error);
      } finally {
        if (isMounted) {
          setTimeout(() => {
            setIsLoading(false);
          }, 300);
        }
      }
    };

    initialCheck();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, navigate, checkAuth]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) {
      setError(null);
    }
  }, [error, setError]);

  const handleTogglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;

    try {
      // Manejo de código temporal
      if (formData.password.length === 6 && /^[0-9A-Z]+$/.test(formData.password)) {
        const response = await validateRecoveryCode(formData.email, formData.password);
        
        if (response?.success) {
          navigate(routesWebpage.cambiarPassword, {
            state: {
              email: formData.email,
              tempCode: formData.password,
              isRecoveryFlow: true,
            },
            replace: true,
          });
          return;
        }
        
        setError("Código temporal inválido");
        setFormData((prev) => ({ ...prev, password: "" }));
        return;
      }

      // Login normal
      const loginSuccess = await login(formData.email, formData.password);
      
      if (loginSuccess) {
        const authCheck = await checkAuth();
        
        if (authCheck) {
          console.log("User is authenticated, waiting for state update...");
        }
      } else {
        setFormData((prev) => ({ ...prev, password: "" }));
      }
    } catch (err) {
      console.error("Error:", err);
      setFormData((prev) => ({ ...prev, password: "" }));
    }
  };

  const navigateToRecovery = useCallback(() => {
    navigateToPublic(routesWebpage.recuperarPassword);
  }, [navigateToPublic]);

  const navigateToRegister = useCallback(() => {
    navigateToPublic(routesWebpage.registro);
  }, [navigateToPublic]);

  return {
    formData,
    showPassword,
    loading,
    error,
    isLoading,
    handleChange,
    handleSubmit,
    handleTogglePassword,
    navigateToRecovery,
    navigateToRegister,
  };
};