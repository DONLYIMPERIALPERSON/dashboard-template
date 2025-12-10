"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, authApi } from '@/lib/api';

// Auth context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (userData: any) => Promise<void>;
  refreshAuth: () => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('auth_token');
      const userData = localStorage.getItem('user_data');

      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (error) {
          console.error('Failed to parse user data:', error);
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_data');
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  // Login function (WebAuthn based)
  const login = async (email: string, password?: string) => {
    try {
      setIsLoading(true);

      // Initialize WebAuthn login
      const challenge = await authApi.initLogin(email);

      // Use WebAuthn API to get credential
      const credential = await navigator.credentials.get({
        publicKey: challenge.authentication_options.publicKey,
      });

      // Complete login with backend
      const response = await authApi.completeLogin(challenge.user_id!, credential);

      // Store auth data
      localStorage.setItem('auth_token', response.access_token);
      localStorage.setItem('user_data', JSON.stringify(response.user));

      setUser(response.user);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setIsLoading(true);

      // Call logout API (optional, but good for audit logging)
      await authApi.logout();
    } catch (error) {
      console.error('Logout API call failed:', error);
      // Continue with local logout even if API call fails
    } finally {
      // Clear local storage and state
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      setUser(null);
      setIsLoading(false);
    }
  };

  // Signup function (WebAuthn based)
  const signup = async (userData: any) => {
    try {
      setIsLoading(true);

      // Send OTP first
      await authApi.sendOtp(userData.email);

      // Register user with OTP
      const registerResult = await authApi.register(userData, userData.otp);

      // Initialize WebAuthn registration
      const challenge = await authApi.initRegistration(userData.email);

      // Use WebAuthn API to create credential
      const credential = await navigator.credentials.create({
        publicKey: challenge.registration_options.publicKey,
      });

      // Complete registration with backend
      const response = await authApi.completeRegistration(challenge.user_id!, credential);

      // Store auth data
      localStorage.setItem('auth_token', response.access_token);
      localStorage.setItem('user_data', JSON.stringify(response.user));

      setUser(response.user);
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh auth state
  const refreshAuth = async () => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to refresh auth:', error);
        await logout();
      }
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    signup,
    refreshAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
