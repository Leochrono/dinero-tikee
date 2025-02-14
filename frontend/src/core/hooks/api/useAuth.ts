import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AUTH_TOKENS } from "@/src/core/constants/auth.constants";
import { authService } from "@/src/core/services/auth.service";
import { routesWebpage } from "@/webpage/components/contants/routes";
import { 
  AuthState, 
  AuthHookState, 
  AuthMethods, 
  AuthData, 
  PublicRoute 
} from "@/src/core/types/auth.types";

const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutos

export const useAuth = (): AuthState & AuthMethods => {
  const [state, setState] = useState<AuthHookState>({
    isAuthenticated: false,
    loading: false,
    user: null,
    error: null,
    initialCheckDone: false
  });
  const navigate = useNavigate();

  const updateState = useCallback((newState: Partial<AuthHookState>) => {
    setState((prev) => ({ ...prev, ...newState }));
  }, []);

  const handleError = useCallback(
    (error: any, defaultMessage: string) => {
      const errorMessage = error.response?.data?.error || error.message || defaultMessage;
      updateState({ error: errorMessage });
      toast.error(errorMessage);
      return false;
    },
    [updateState]
  );

  const clearAuthData = useCallback(() => {
    localStorage.removeItem(AUTH_TOKENS);
    localStorage.removeItem("lastLoginTime");
    localStorage.removeItem("lastTokenCheck");
    localStorage.removeItem("lastActivity");
    updateState({
      user: null,
      isAuthenticated: false,
      error: null,
      initialCheckDone: false,
    });
  }, [updateState]);

  const checkAuth = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      
      const tokens = localStorage.getItem(AUTH_TOKENS);
      if (!tokens) {
        setState(prev => ({
          ...prev,
          isAuthenticated: false,
          user: null,
          loading: false,
          initialCheckDone: true
        }));
        return false;
      }

      const { accessToken, user } = JSON.parse(tokens);
      
      const response = await authService.verifyToken();
      if (response.success) {
        setState(prev => ({
          ...prev,
          isAuthenticated: true,
          user,
          loading: false,
          initialCheckDone: true
        }));
        return true;
      }

      localStorage.removeItem(AUTH_TOKENS);
      setState(prev => ({
        ...prev,
        isAuthenticated: false,
        user: null,
        loading: false,
        initialCheckDone: true
      }));
      return false;
    } catch (error) {
      localStorage.removeItem(AUTH_TOKENS);
      setState(prev => ({
        ...prev,
        isAuthenticated: false,
        user: null,
        loading: false,
        initialCheckDone: true
      }));
      return false;
    }
  }, []);

  const checkInactivity = useCallback(() => {
    const lastActivity = localStorage.getItem("lastActivity");
    if (lastActivity && state.isAuthenticated) {
      const now = Date.now();
      const timeSinceLastActivity = now - parseInt(lastActivity);
      if (timeSinceLastActivity > INACTIVITY_TIMEOUT) {
        logout();
        toast.error("Sesión cerrada por inactividad");
      }
    }
  }, [state.isAuthenticated]);

  useEffect(() => {
    if (!state.initialCheckDone) {
      checkAuth().then(() => updateState({ initialCheckDone: true }));
    }

    if (!state.isAuthenticated) return;

    const activityEvents = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];
    const updateActivity = () => localStorage.setItem("lastActivity", Date.now().toString());

    activityEvents.forEach((event) => window.addEventListener(event, updateActivity));
    const inactivityInterval = setInterval(checkInactivity, 60000);
    const tokenCheckInterval = setInterval(checkAuth, 300000);

    return () => {
      activityEvents.forEach((event) => window.removeEventListener(event, updateActivity));
      clearInterval(inactivityInterval);
      clearInterval(tokenCheckInterval);
    };
  }, [state.initialCheckDone, state.isAuthenticated, checkAuth, checkInactivity]);

  const login = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      const response = await authService.login({ email, password });
      
      if (response.success && response.data) {
        const { accessToken, user } = response.data;
        
        // Guardar tokens
        localStorage.setItem(AUTH_TOKENS, JSON.stringify({ accessToken, user }));
        localStorage.setItem('lastActivity', Date.now().toString());
        
        // Actualizar estado inmediatamente
        setState(prev => ({
          ...prev,
          isAuthenticated: true,
          user,
          loading: false,
          error: null,
          initialCheckDone: true
        }));

        return true;
      }
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Login failed',
        isAuthenticated: false
      }));
      
      return false;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Error during login',
        isAuthenticated: false
      }));
      return false;
    }
  };



  const logout = useCallback(() => {
    clearAuthData();
    navigate(routesWebpage.login, { replace: true });
    toast.success("Sesión cerrada exitosamente");
  }, [clearAuthData, navigate]);

  const navigateToPublic = useCallback((route: PublicRoute) => {
    updateState({ error: null });
    navigate(route);
  }, [navigate, updateState]);

  const setError = useCallback((error: string | null) => {
    updateState({ error });
  }, [updateState]);

  return {

    // Métodos
    ...state,
    login,
    logout,
    checkAuth,
    setError,
    navigateToPublic
  };
};