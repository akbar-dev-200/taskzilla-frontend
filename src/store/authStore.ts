import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';
import { LoginCredentials, RegisterData } from '@/types/auth';
import { authApi } from '@/api/endpoints/auth';
import { storage } from '@/utils/storage';
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from '@/utils/constants';
import toast from 'react-hot-toast';

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  initAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,

  initAuth: () => {
    const token = storage.get<string>(AUTH_TOKEN_KEY);
    const user = storage.get<User>(AUTH_USER_KEY);

    if (token && user) {
      set({ user, token, isAuthenticated: true, isInitialized: true });
    } else {
      set({ isInitialized: true });
    }
  },

  login: async (credentials: LoginCredentials) => {
    try {
      set({ isLoading: true });
      const response = await authApi.login(credentials);

      storage.set(AUTH_TOKEN_KEY, response.token);
      storage.set(AUTH_USER_KEY, response.user);

      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
      });

      toast.success('Welcome back!');
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (userData: RegisterData) => {
    try {
      set({ isLoading: true });
      await authApi.register(userData);
      
      // Don't auto-login, let user login manually
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      storage.remove(AUTH_TOKEN_KEY);
      storage.remove(AUTH_USER_KEY);
      set({
        user: null,
        token: null,
        isAuthenticated: false,
      });
      toast.success('Logged out successfully');
    }
  },

  setUser: (user: User | null) => {
    if (user) {
      storage.set(AUTH_USER_KEY, user);
    }
    set({ user });
  },
}),
    {
      name: 'taskzilla-auth', // unique name for localStorage key
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
