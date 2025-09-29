import { create } from 'zustand';
import axios from 'axios';
import { BusinessProfile, BusinessFormData } from '../types/businessTypes';

interface BusinessProfileState {
  profile: BusinessProfile | null;
  isLoading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<BusinessFormData>, files: { companyLogo?: File; recruiterProfilePicture?: File }) => Promise<void>;
}

export const useBusinessProfileStore = create<BusinessProfileState>((set) => ({
  profile: null,
  isLoading: false,
  error: null,
  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const authData = localStorage.getItem('business-auth');
      if (!authData) {
        throw new Error('No business authentication data found');
      }
      let token: string;
      try {
        const parsedData = JSON.parse(authData);
        token = parsedData?.token;
        if (!token || typeof token !== 'string') {
          throw new Error('Invalid or missing token in business authentication data');
        }
      } catch (parseError) {
        throw new Error('Invalid business authentication data format');
      }

      const response = await axios.get('http://localhost:5000/api/business/profile/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ profile: response.data });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch profile' });
    } finally {
      set({ isLoading: false });
    }
  },
  updateProfile: async (data, files) => {
    set({ isLoading: true, error: null });
    try {
      const authData = localStorage.getItem('business-auth');
      if (!authData) {
        throw new Error('No business authentication data found');
      }
      let token: string;
      try {
        const parsedData = JSON.parse(authData);
        token = parsedData?.token;
        if (!token || typeof token !== 'string') {
          throw new Error('Invalid or missing token in business authentication data');
        }
      } catch (parseError) {
        throw new Error('Invalid business authentication data format');
      }

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      if (files.companyLogo) formData.append('companyLogo', files.companyLogo);
      if (files.recruiterProfilePicture) formData.append('recruiterProfilePicture', files.recruiterProfilePicture);

      const response = await axios.put('http://localhost:5000/api/business/profile/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      set({ profile: response.data });
    } catch (error: any) {
      set({ error: error.message || 'Failed to update profile' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));