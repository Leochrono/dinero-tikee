import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useGlobalAuth } from "@/src/core/context/authContext";
import { routesWebpage } from "@/webpage/components/contants/routes";
import { useEffect, useState, ReactNode, useCallback } from "react";

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

  // Verificación de estado de recuperación
  const isRecoveryFlow = location.state?.isRecoveryFlow;
  const isChangePasswordRoute = location.pathname === routesWebpage.cambiarPassword;
  const hasTempCode = location.state?.tempCode && location.state?.email;

  const verifyAuth = useCallback(async () => {
    if (!initialCheckDone) {
      await checkAuth();
      setInitialCheckDone(true);
    }
  }, [initialCheckDone, checkAuth]);

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  // Loading state
  if (!initialCheckDone || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
      </div>
    );
  }

  // Manejo de flujo de recuperación de contraseña
  if (isRecoveryFlow && isChangePasswordRoute && hasTempCode) {
    console.log("Recovery flow detected:", {
      email: location.state?.email,
      tempCode: location.state?.tempCode
    });
    return <>{typeof children === "function" ? children() : children}</>;
  }

  // Rutas públicas
  const publicRoutes: PublicRoute[] = [
    routesWebpage.login,
    routesWebpage.registro,
    routesWebpage.recuperarPassword,
  ];
  const isPublicRoute = publicRoutes.includes(location.pathname as PublicRoute);

  if (isPublicRoute && !isAuthenticated) {
    return <>{typeof children === "function" ? children() : children}</>;
  }

  if (isPublicRoute && isAuthenticated) {
    localStorage.setItem("lastActivity", Date.now().toString());
    return <Navigate to={routesWebpage.perfil} replace />;
  }

  // Verificación de autenticación
  if (!isAuthenticated || !user) {
    return (
      <Navigate 
        to={routesWebpage.login} 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  // Manejo de cambio de contraseña requerido
  if (user.requiresPasswordChange && !isChangePasswordRoute) {
    return <Navigate to={routesWebpage.cambiarPassword} replace />;
  }

  // Actualización de actividad y renderizado normal
  localStorage.setItem("lastActivity", Date.now().toString());
  return <>{typeof children === "function" ? children() : children}</>;
};

export default PrivateRoute;