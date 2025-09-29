import { create } from 'zustand';
import axios from 'axios';
import { JobSeeker } from '../types/jobSeeker';
import toast from 'react-hot-toast';

interface JobSeekerProfileStore {
  profile: JobSeeker | null;
  loading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  fetchPublicProfile: (applicationId: string) => Promise<void>;
  updateProfile: (
    data: Partial<JobSeeker> & {
      aadharFile?: File;
      profilePic?: File;
      certificate?: File;
      license?: File;
    }
  ) => Promise<void>;
}

export const useJobSeekerProfileStore = create<JobSeekerProfileStore>((set) => ({
  profile: null,
  loading: false,
  error: null,

  fetchProfile: async () => {
    set({ loading: true, error: null });
    try {
      const authData = localStorage.getItem('job-seeker-auth');
      if (!authData) throw new Error('No job seeker authentication data found');
      const { token } = JSON.parse(authData);
      if (!token) throw new Error('Invalid authentication token');
      const response = await axios.get('http://localhost:5000/api/jobseeker/profile/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('fetchProfile: Fetched profile:', response.data);
      set({ profile: response.data, loading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch profile';
      console.error('fetchProfile Error:', errorMessage);
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage, {
        style: { background: '#1f2937', color: '#e5e7eb', border: '1px solid #7c3aed' },
      });
    }
  },

  fetchPublicProfile: async (applicationId: string) => {
    set({ loading: true, error: null });
    try {
      const authData = localStorage.getItem('business-auth');
      if (!authData) throw new Error('No business authentication data found');
      const { token } = JSON.parse(authData);
      if (!token) throw new Error('Invalid business authentication token');
      console.log('fetchPublicProfile: Fetching profile for application ID:', applicationId);
      const response = await axios.get(`http://localhost:5000/api/applications/${applicationId}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('fetchPublicProfile: Fetched profile:', response.data);
      set({ profile: response.data, loading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch job seeker profile';
      console.error('fetchPublicProfile Error:', errorMessage, error);
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage, {
        style: { background: '#1f2937', color: '#e5e7eb', border: '1px solid #7c3aed' },
      });
    }
  },

  updateProfile: async (data: Partial<JobSeeker> & {
    aadharFile?: File;
    profilePic?: File;
    certificate?: File;
    license?: File;
  }) => {
    set({ loading: true, error: null });
    try {
      const authData = localStorage.getItem('job-seeker-auth');
      if (!authData) throw new Error('No job seeker authentication data found');
      const { token } = JSON.parse(authData);
      if (!token) throw new Error('Invalid authentication token');

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === 'experiences' || key === 'education') {
            formData.append(key, JSON.stringify(value));
          } else if (value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, String(value));
          }
        }
      });

      const response = await axios.put('http://localhost:5000/api/jobseeker/profile/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('updateProfile: Updated profile:', response.data);
      set({ profile: response.data, loading: false });
      toast.success('Profile updated successfully', {
        style: { background: '#1f2937', color: '#e5e7eb', border: '1px solid #7c3aed' },
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update profile';
      console.error('updateProfile Error:', errorMessage);
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage, {
        style: { background: '#1f2937', color: '#e5e7eb', border: '1px solid #7c3aed' },
      });
      throw error;
    }
  },
}));