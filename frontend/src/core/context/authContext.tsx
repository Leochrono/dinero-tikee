import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '../hooks/api/useAuth';
import { User } from '../types/user.types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  checkAuth: () => Promise<boolean>;
  login: (email: string, password: string, redirect?: boolean) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();
  const [initialized, setInitialized] = useState(false);
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null
  });
  
  const isInitialCheck = useRef(true);

  // Verificación inicial de autenticación
  useEffect(() => {
    const verifyAuth = async () => {
      if (isInitialCheck.current) {
        try {
          const isAuthenticated = await auth.checkAuth();
          if (isAuthenticated && auth.user) {
            setAuthState({
              isAuthenticated: true,
              user: auth.user
            });
          }
        } catch (error) {
          console.error('Auth check error:', error);
        } finally {
          setInitialized(true);
          isInitialCheck.current = false;
        }
      }
    };

    verifyAuth();
  }, [auth.checkAuth, auth.user]);

  // Monitor de inactividad
  useEffect(() => {
    const checkInactivity = () => {
      const lastActivity = localStorage.getItem('lastActivity');
      if (lastActivity && authState.isAuthenticated) {
        const timeSinceLastActivity = Date.now() - parseInt(lastActivity);
        if (timeSinceLastActivity > 5 * 60 * 1000) { // 5 minutos
          handleLogout();
        }
      }
    };

    const inactivityInterval = setInterval(checkInactivity, 60000); // Cada minuto

    return () => clearInterval(inactivityInterval);
  }, [authState.isAuthenticated]);

  // Sincronización con cambios en auth
  const { isAuthenticated, user } = auth;
  useEffect(() => {
    if (initialized && !isInitialCheck.current) {
      if (isAuthenticated && user) {
        setAuthState({
          isAuthenticated: true,
          user: user
        });
      } else {
        setAuthState({
          isAuthenticated: false,
          user: null
        });
      }
    }
  }, [isAuthenticated, user, initialized]);

  const handleLogin = async (email: string, password: string, redirect: boolean = true) => {
    try {
      const success = await auth.login(email, password, redirect);
      if (success) {
        setAuthState({
          isAuthenticated: true,
          user: auth.user
        });
      }
      return success;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const handleLogout = useCallback(() => {
    auth.logout();
    setAuthState({
      isAuthenticated: false,
      user: null
    });
  }, [auth]);

  if (!initialized) {
    return null;
  }

  const contextValue: AuthContextType = {
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    loading: auth.loading,
    checkAuth: auth.checkAuth,
    login: handleLogin,
    logout: handleLogout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useGlobalAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useGlobalAuth must be used within an AuthProvider');
  }
  return context;
};