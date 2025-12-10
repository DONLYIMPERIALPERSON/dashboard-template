import { api, extractData, handleApiError } from './client';

// Types for authentication
export interface User {
  business_id: string;
  email: string;
  first_name: string;
  last_name: string;
  business_name: string;
}

export interface LoginResponse {
  user: User;
  access_token: string;
  scope: string;
}

export interface SignupRequest {
  email: string;
  business_name: string;
  owner_first_name: string;
  owner_last_name: string;
  phone: string;
}

export interface WebAuthnChallenge {
  authentication_options?: any;
  registration_options?: any;
  challenge_id: string;
  user_id?: string;
}

// Authentication API methods
export const authApi = {
  // Send OTP for email verification
  sendOtp: async (email: string) => {
    try {
      const response = await api.post('/auth/send-otp', { email });
      return extractData(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  // Register business user
  register: async (data: SignupRequest, otp: string) => {
    try {
      const response = await api.post('/auth/register', {
        ...data,
        otp,
      });
      return extractData(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  // Initialize WebAuthn registration
  initRegistration: async (email: string) => {
    try {
      const response = await api.post('/auth/register/init', null, {
        params: { email },
      });
      return extractData<WebAuthnChallenge>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  // Complete WebAuthn registration
  completeRegistration: async (userId: string, credential: any) => {
    try {
      const response = await api.post('/auth/register/complete', {
        user_id: userId,
        credential,
      });
      return extractData<LoginResponse>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  // Initialize WebAuthn login
  initLogin: async (email: string) => {
    try {
      const response = await api.post('/auth/login/init', null, {
        params: { email },
      });
      return extractData<WebAuthnChallenge>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  // Complete WebAuthn login
  completeLogin: async (userId: string, credential: any) => {
    try {
      const response = await api.post('/auth/login/complete', {
        user_id: userId,
        credential,
      });
      return extractData<LoginResponse>(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },

  // Logout
  logout: async () => {
    try {
      const response = await api.post('/auth/logout');
      return extractData(response);
    } catch (error) {
      throw handleApiError(error as any);
    }
  },
};

export default authApi;
