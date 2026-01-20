import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL, AUTH_TOKEN_KEY } from '@/utils/constants';
import { storage } from '@/utils/storage';
import { ApiError } from '@/types/api';
import toast from 'react-hot-toast';

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // withCredentials: true, // Removed - not needed for Bearer token auth
});

// Request interceptor - add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storage.get<string>(AUTH_TOKEN_KEY);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ApiError>) => {
    const apiError: ApiError = {
      message: 'An unexpected error occurred',
      status: error.response?.status,
    };

    if (error.response) {
      // Server responded with error
      const { status, data } = error.response;

      if (status === 401) {
        // Unauthorized - clear auth and redirect to login
        storage.remove(AUTH_TOKEN_KEY);
        storage.remove('auth_user');
        window.location.href = '/login';
        apiError.message = 'Session expired. Please login again.';
      } else if (status === 403) {
        apiError.message = 'You do not have permission to perform this action.';
      } else if (status === 404) {
        apiError.message = 'Resource not found.';
      } else if (status === 422) {
        // Validation error
        apiError.message = data.message || 'Validation failed';
        apiError.errors = data.errors;
      } else if (status === 500) {
        apiError.message = 'Server error. Please try again later.';
      } else {
        apiError.message = data.message || 'An error occurred';
        apiError.errors = data.errors;
      }
    } else if (error.request) {
      // Request made but no response
      apiError.message = 'Network error. Please check your connection.';
    }

    // Show error toast for non-validation errors
    if (apiError.status !== 422) {
      toast.error(apiError.message);
    }

    return Promise.reject(apiError);
  }
);

export default apiClient;
