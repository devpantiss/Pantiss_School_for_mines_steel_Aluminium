import { create } from 'zustand';
import axios, { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';

interface JobSeekerState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  sendEmailOTP: (email: string) => Promise<{ success: boolean; error?: string }>;
  verifyEmailOTP: (email: string, otp: string) => Promise<{ success: boolean; error?: string }>;
  initiateSignup: (data: FormData) => Promise<void>;
  sendMobileOTP: (mobile: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (email: string, otp: string, newPassword: string) => Promise<void>;
  logout: () => void;
  checkTokenExpiration: () => boolean;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Initialize token and authentication state from localStorage
const authData = localStorage.getItem('job-seeker-auth');
let initialToken: string | null = null;
try {
  if (authData) {
    const parsedData = JSON.parse(authData);
    initialToken = parsedData?.token || null;
  }
} catch (error) {
  console.error('Failed to parse job-seeker-auth from localStorage:', error);
}

export const useJobSeekerStore = create<JobSeekerState>((set) => ({
  token: initialToken,
  isAuthenticated: !!initialToken,
  isLoading: false,
  error: null,

  checkTokenExpiration: () => {
    const token = localStorage.getItem('job-seeker-auth');
    if (!token) {
      set({ token: null, isAuthenticated: false });
      return false;
    }
    try {
      const parsedData = JSON.parse(token);
      const decoded: { exp: number } = jwtDecode(parsedData.token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime) {
        console.log('Token expired, logging out');
        localStorage.removeItem('job-seeker-auth');
        set({ token: null, isAuthenticated: false, error: null });
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error decoding token:', error);
      localStorage.removeItem('job-seeker-auth');
      set({ token: null, isAuthenticated: false, error: null });
      return false;
    }
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      console.log('Sending login request:', { email });
      const response = await axios.post(`${API_URL}/jobseeker/login`, { email, password }, { timeout: 10000 });
      console.log('Login response:', response.data);
      const token = response.data.token;
      if (!token) {
        throw new Error('No token received from server');
      }
      localStorage.setItem('job-seeker-auth', JSON.stringify({ token }));
      set({ token, isAuthenticated: true, isLoading: false });
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      const errorMessage = err.response?.data?.message || 'Login failed';
      console.error('Login error:', { message: errorMessage, status: err.response?.status });
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  sendEmailOTP: async (email: string) => {
    set({ isLoading: true, error: null });
    try {
      console.log('Sending OTP request:', { email });
      const response = await axios.post(`${API_URL}/jobseeker/send-email-otp`, { email }, { timeout: 10000 });
      console.log('sendEmailOTP response:', response.data);
      set({ isLoading: false });
      return { success: true };
    } catch (error: any) {
      console.error('sendEmailOTP error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      const errorMessage = error.response?.data?.message || 'Failed to send OTP';
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  },

  verifyEmailOTP: async (email: string, otp: string) => {
    set({ isLoading: true, error: null });
    try {
      console.log('Verifying OTP request:', { email, otp });
      const response = await axios.post(`${API_URL}/jobseeker/verify-email`, { email, otp }, { timeout: 10000 });
      console.log('verifyEmailOTP response:', response.data);
      set({ isLoading: false });
      return { success: true };
    } catch (error: any) {
      console.error('verifyEmailOTP error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      const errorMessage = error.response?.data?.message || 'OTP verification failed';
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  },

  initiateSignup: async (data: FormData) => {
    set({ isLoading: true, error: null });
    try {
      console.log('Initiating signup request with FormData');
      const response = await axios.post(`${API_URL}/jobseeker/initiate-signup`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 10000,
      });
      console.log('initiateSignup response:', response.data);
      const token = response.data.token;
      if (!token) {
        throw new Error('No token received from server');
      }
      localStorage.setItem('job-seeker-auth', JSON.stringify({ token }));
      set({ token, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      console.error('initiateSignup error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      const errorMessage = error.response?.data?.message || 'Signup failed';
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  sendMobileOTP: async (mobile: string) => {
    set({ isLoading: true, error: null });
    try {
      console.log('Sending mobile OTP request:', { mobile });
      const response = await axios.post(`${API_URL}/jobseeker/send-mobile-otp`, { mobile }, { timeout: 10000 });
      console.log('sendMobileOTP response:', response.data);
      set({ isLoading: false });
    } catch (error: any) {
      console.error('sendMobileOTP error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      const errorMessage = error.response?.data?.message || 'Failed to send mobile OTP';
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  forgotPassword: async (email: string) => {
    set({ isLoading: true, error: null });
    try {
      console.log('Sending forgot password request:', { email });
      const response = await axios.post(`${API_URL}/jobseeker/forgot-password`, { email }, { timeout: 10000 });
      console.log('forgotPassword response:', response.data);
      set({ isLoading: false });
    } catch (error: any) {
      console.error('forgotPassword error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      const errorMessage = error.response?.data?.message || 'Failed to send reset OTP';
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  resetPassword: async (email: string, otp: string, newPassword: string) => {
    set({ isLoading: true, error: null });
    try {
      console.log('Sending reset password request:', { email, otp });
      const response = await axios.post(
        `${API_URL}/jobseeker/reset-password`,
        { email, otp, newPassword },
        { timeout: 10000 }
      );
      console.log('resetPassword response:', response.data);
      set({ isLoading: false });
    } catch (error: any) {
      console.error('resetPassword error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      const errorMessage = error.response?.data?.message || 'Password reset failed';
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  logout: () => {
    console.log('Logging out');
    localStorage.removeItem('job-seeker-auth');
    set({ token: null, isAuthenticated: false, error: null });
  },
}));