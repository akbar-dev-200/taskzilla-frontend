import { ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Spinner } from './Spinner';
import { ROUTES } from '@/utils/constants';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, isInitialized } = useAuth();

  // Show loading spinner while auth is initializing or loading
  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  // Only redirect to login after auth has been initialized
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
};
