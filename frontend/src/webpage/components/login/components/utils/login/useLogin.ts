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

  useEffect(() => {
    let isMounted = true;
    const initialCheck = async () => {
      try {
        await checkAuth();
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

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (error) {
        setError(null);
      }
    },
    [error, setError]
  );

  const handleTogglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;

    try {
        // Si es un código temporal (6 caracteres alfanuméricos)
        if (formData.password.length === 6 && /^[0-9A-Z]+$/.test(formData.password)) {
            console.log("Código temporal detectado");
            navigate(routesWebpage.cambiarPassword, {
                state: {
                    email: formData.email,
                    tempCode: formData.password,
                    isRecoveryFlow: true
                },
                replace: true
            });
            return;
        }

        const loginSuccess = await login(formData.email, formData.password);
        if (loginSuccess) {
            const authCheck = await checkAuth();
            if (authCheck) {
                console.log("User is authenticated");
            }
        } else {
            setFormData((prev) => ({ ...prev, password: "" }));
        }
    } catch (err: any) { // Tipamos el error
        console.error("Error during login:", err);
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('Ha ocurrido un error durante el inicio de sesión');
        }
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
