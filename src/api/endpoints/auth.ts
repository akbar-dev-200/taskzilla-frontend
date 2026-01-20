import apiClient from '../client';
import { LoginCredentials, RegisterData, AuthResponse } from '@/types/auth';
import { ApiResponse } from '@/types/api';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await apiClient.post<ApiResponse<AuthResponse>>('/login', credentials);
    return data.data;
  },

  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const { data } = await apiClient.post<ApiResponse<AuthResponse>>('/register', userData);
    return data.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/logout');
  },
};
