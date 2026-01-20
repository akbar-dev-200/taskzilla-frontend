import { useAuthStore } from '@/store/authStore';

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, isInitialized, login, register, logout, setUser } = useAuthStore();

  return {
    user,
    isAuthenticated,
    isLoading,
    isInitialized,
    login,
    register,
    logout,
    setUser,
  };
};
