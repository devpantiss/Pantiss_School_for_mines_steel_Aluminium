import { create } from 'zustand';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

interface Job {
  designation: string;
  jobLocation: string;
  salary: number;
}

interface Application {
  _id: string;
  jobId: Job;
  companyName: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  appliedDate: string;
}

interface ApplicationsState {
  applications: Application[];
  isLoading: boolean;
  error: string | null;
  fetchApplications: () => Promise<void>;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useJobSeekerApplicationsStore = create<ApplicationsState>((set) => ({
  applications: [],
  isLoading: false,
  error: null,
  fetchApplications: async () => {
    try {
      set({ isLoading: true, error: null });

      const authData = localStorage.getItem('job-seeker-auth');
      if (!authData) {
        throw new Error('No authentication data found. Please log in again.');
      }

      let token: string;
      try {
        const parsedData = JSON.parse(authData);
        token = parsedData?.token; // Fixed: Use parsedData.token, not parsedData.state.token
        if (!token || typeof token !== 'string') {
          throw new Error('Authentication token not found or invalid. Please log in again.');
        }
      } catch (parseError) {
        throw new Error('Invalid authentication data format. Please log in again.');
      }

      const response = await axios.get(`${API_BASE_URL}/applications/jobseeker`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ applications: response.data, isLoading: false });
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      const errorMessage =
        err.response?.data?.message || err.message || 'Failed to fetch applications';
      set({ isLoading: false, error: errorMessage, applications: [] });
      toast.error(errorMessage);
    }
  },
}));