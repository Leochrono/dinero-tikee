import { useState, useCallback } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

interface LoginModalState {
  loading: boolean;
  error: string | null;
  isOpen: boolean;
}

export const useLoginModal = (onLoginSuccess?: () => void) => {
  const { login: authLogin, checkAuth } = useAuth();
  const [state, setState] = useState<LoginModalState>({
    loading: false,
    error: null,
    isOpen: false,
  });
  const navigate = useNavigate();

  const updateState = useCallback((newState: Partial<LoginModalState>) => {
    setState((prev) => ({ ...prev, ...newState }));
  }, []);

  const login = useCallback(
    async (email: string, password: string, redirect: boolean = false) => {
      try {
        updateState({ loading: true, error: null });
        const success = await authLogin(email, password, false);

        if (success) {
          await checkAuth();
          onLoginSuccess?.();
          toast.success("Inicio de sesión exitoso");
          return true;
        } else {
          throw new Error("Credenciales incorrectas");
        }
      } catch (error: any) {
        const errorMessage = error.message || "Error en inicio de sesión";
        updateState({ error: errorMessage });
        toast.error(errorMessage);
        return false;
      } finally {
        updateState({ loading: false });
      }
    },
    [authLogin, checkAuth, onLoginSuccess]
  );

  const openModal = useCallback(() => {
    updateState({ isOpen: true, error: null });
  }, [updateState]);

  const closeModal = useCallback(() => {
    updateState({ isOpen: false, error: null });
  }, [updateState]);

  const navigateToPublic = useCallback(
    (route: string) => {
      closeModal();
      navigate(route);
    },
    [navigate, closeModal]
  );

  return {
    // Estado
    loading: state.loading,
    error: state.error,
    isOpen: state.isOpen,

    // Métodos
    login,
    openModal,
    closeModal,
    navigateToPublic,

    // Utilidades
    setError: (error: string | null) => updateState({ error }),
  };
};
