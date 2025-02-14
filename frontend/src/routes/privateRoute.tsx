import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useGlobalAuth } from '@/src/core/context/authContext';
import { routesWebpage } from '@/webpage/components/contants/routes';
import { useEffect, useState, ReactNode, useCallback } from 'react';

type PublicRoute =
  | typeof routesWebpage.login
  | typeof routesWebpage.registro
  | typeof routesWebpage.recuperarPassword;

interface PrivateRouteProps {
  children: ReactNode | (() => ReactNode);
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, user, loading, checkAuth } = useGlobalAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  // Verificar si es un flujo de recuperación
  const isRecoveryFlow = location.state?.isRecoveryFlow;

  // Memoizar la función de verificación de autenticación
  const verifyAuth = useCallback(async () => {
    if (!initialCheckDone) {
      const authResult = await checkAuth();
      setInitialCheckDone(true);
    }
  }, [initialCheckDone, checkAuth]);

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  useEffect(() => {
    if (initialCheckDone && !loading) {
      if (!isAuthenticated) {
        navigate(routesWebpage.login, {
          state: { from: location.pathname },
          replace: true,
        });
      }
    }
  }, [isAuthenticated, initialCheckDone, loading, navigate, location]);

  // Mostrar loader mientras se hace la verificación inicial
  if (!initialCheckDone || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
      </div>
    );
  }

  // Si es un flujo de recuperación, permitir acceso
  if (isRecoveryFlow && location.pathname === routesWebpage.cambiarPassword) {
    return <>{typeof children === 'function' ? children() : children}</>;
  }

  const publicRoutes: PublicRoute[] = [
    routesWebpage.login,
    routesWebpage.registro,
    routesWebpage.recuperarPassword,
  ];

  // Verificar si la ruta actual es pública
  const isPublicRoute = publicRoutes.includes(location.pathname as PublicRoute);

  // Si es una ruta pública y el usuario NO está autenticado
  if (isPublicRoute && !isAuthenticated) {
    return <>{typeof children === 'function' ? children() : children}</>;
  }

  // Si es una ruta pública y el usuario SÍ está autenticado
  if (isPublicRoute && isAuthenticated) {
    localStorage.setItem('lastActivity', Date.now().toString());
    return <Navigate to={routesWebpage.perfil} replace />;
  }

  // Si no hay autenticación, redirigir al login
  if (!isAuthenticated || !user) {
    return <Navigate to={routesWebpage.login} state={{ from: location }} replace />;
  }

  // Manejar el cambio de contraseña requerido
  if (user.requiresPasswordChange && location.pathname !== routesWebpage.cambiarPassword) {
    return <Navigate to={routesWebpage.cambiarPassword} replace />;
  }

  // Actualizar la última actividad en cada navegación exitosa
  localStorage.setItem('lastActivity', Date.now().toString());

  // Renderizar children con sus props
  return <>{typeof children === 'function' ? children() : children}</>;
};

export default PrivateRoute;