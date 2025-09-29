import { create } from 'zustand';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

interface BusinessAuthState {
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  sendEmailOTP: (email: string) => Promise<void>;
  signup: (formData: FormData) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (email: string, otp: string, newPassword: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useBusinessAuthStore = create<BusinessAuthState>((set) => ({
  token: null,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post('http://localhost:5000/api/business/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('business-auth', JSON.stringify({ token }));
      set({ token, isLoading: false });
      toast.success('Login successful!', { style: { background: '#1f2937', color: '#e5e7eb' } });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage, { style: { background: '#1f2937', color: '#e5e7eb' } });
      throw error;
    }
  },

  sendEmailOTP: async (email: string) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post('http://localhost:5000/api/business/send-email-otp', { email });
      set({ isLoading: false });
      toast.success('Email OTP sent!', { style: { background: '#1f2937', color: '#e5e7eb' } });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const errorMessage = err.response?.data?.message || 'Failed to send Email OTP.';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage, { style: { background: '#1f2937', color: '#e5e7eb' } });
      throw error;
    }
  },

  signup: async (formData: FormData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post('http://localhost:5000/api/business/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const { token } = response.data;
      localStorage.setItem('business-auth', JSON.stringify({ token }));
      set({ token, isLoading: false });
      toast.success('Business registered successfully!', { style: { background: '#1f2937', color: '#e5e7eb' } });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const errorMessage = err.response?.data?.message || 'Signup failed. Please try again.';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage, { style: { background: '#1f2937', color: '#e5e7eb' } });
      throw error;
    }
  },

  forgotPassword: async (email: string) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post('http://localhost:5000/api/business/forgot-password', { email });
      set({ isLoading: false });
      toast.success('Password reset OTP sent!', { style: { background: '#1f2937', color: '#e5e7eb' } });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const errorMessage = err.response?.data?.message || 'Failed to send password reset OTP.';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage, { style: { background: '#1f2937', color: '#e5e7eb' } });
      throw error;
    }
  },

  resetPassword: async (email: string, otp: string, newPassword: string) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post('http://localhost:5000/api/business/reset-password', { email, otp, newPassword });
      set({ isLoading: false });
      toast.success('Password reset successfully!', { style: { background: '#1f2937', color: '#e5e7eb' } });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const errorMessage = err.response?.data?.message || 'Password reset failed. Please try again.';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage, { style: { background: '#1f2937', color: '#e5e7eb' } });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ error: null });
    toast.success('Logged out successfully!', { style: { background: '#1f2937', color: '#e5e7eb' } });
  },

  clearError: () => set({ error: null }),
}));