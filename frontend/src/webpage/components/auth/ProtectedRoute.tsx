import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/src/core/hooks/api/useAuth'; // Hook para manejar autenticación

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login', { 
        state: { from: location.pathname }
      });
    }
  }, [isAuthenticated, loading, navigate, location]);

  if (loading) return null;

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;