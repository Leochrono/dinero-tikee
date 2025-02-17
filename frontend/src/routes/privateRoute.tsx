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
  const isRecoveryFlow = location.state?.isRecoveryFlow;
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
  if (!initialCheckDone || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
      </div>
    );
  }
  if (isRecoveryFlow && location.pathname === routesWebpage.cambiarPassword) {
    return <>{typeof children === "function" ? children() : children}</>;
  }

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
  if (!isAuthenticated || !user) {
    return (
      <Navigate to={routesWebpage.login} state={{ from: location }} replace />
    );
  }
  if (
    user.requiresPasswordChange &&
    location.pathname !== routesWebpage.cambiarPassword
  ) {
    return <Navigate to={routesWebpage.cambiarPassword} replace />;
  }
  localStorage.setItem("lastActivity", Date.now().toString());
  return <>{typeof children === "function" ? children() : children}</>;
};

export default PrivateRoute;
