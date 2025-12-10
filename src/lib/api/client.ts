import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.oyapasteaza.com';

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Get token from localStorage
    const token = localStorage.getItem('auth_token');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const { response } = error;

    // Handle 401 Unauthorized - redirect to login
    if (response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      // Redirect to login page
      if (typeof window !== 'undefined') {
        window.location.href = '/signin';
      }
    }

    // Handle 403 Forbidden - permission error
    if (response?.status === 403) {
      console.error('Access forbidden:', response.data);
    }

    // Handle network errors
    if (!response) {
      console.error('Network error - please check your connection');
    }

    return Promise.reject(error);
  }
);

// Generic API methods
export const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.get(url, config),

  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.post(url, data, config),

  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.put(url, data, config),

  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.patch(url, data, config),

  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.delete(url, config),
};

// Helper function to extract data from response
export const extractData = <T>(response: AxiosResponse<T>): T => response.data;

// Error types
export interface ApiError {
  message: string;
  status?: number;
  details?: any;
}

// Helper to handle API errors
export const handleApiError = (error: AxiosError): ApiError => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    return {
      message: (data as any)?.message || `Request failed with status ${status}`,
      status,
      details: data,
    };
  } else if (error.request) {
    // Network error
    return {
      message: 'Network error - please check your connection',
      details: error.message,
    };
  } else {
    // Other error
    return {
      message: error.message || 'An unexpected error occurred',
      details: error,
    };
  }
};

export default apiClient;
