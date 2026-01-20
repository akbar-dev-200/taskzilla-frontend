import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '@/utils/constants';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-end flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg">
            <span className="text-3xl">🦖</span>
          </div>
          <span className="text-3xl font-bold text-white">{APP_NAME}</span>
        </Link>

        {/* Auth Card */}
        <div className="bg-white rounded-card shadow-2xl p-8">
          {children}
        </div>

        {/* Footer */}
        <p className="text-center text-white text-sm mt-8 opacity-90">
          © 2026 {APP_NAME}. Built for productive teams.
        </p>
      </div>
    </div>
  );
};
