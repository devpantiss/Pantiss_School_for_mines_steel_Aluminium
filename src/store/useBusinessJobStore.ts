import { create } from 'zustand';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { PostedJob, Application } from '../types/businessTypes';

interface JobFormData {
  designation: string;
  description: string;
  salary: number;
  experienceRequired: number;
  qualificationRequired: string;
  jobLocation: string;
  noOfOpenings: number;
  genderSpecifics: 'Male' | 'Female' | 'Any';
  rolesAndResponsibilities: string[];
}

interface BusinessJobState {
  jobs: PostedJob[];
  applicants: { [jobId: string]: Application[] };
  selectedJob: PostedJob | null;
  isLoading: boolean;
  error: string | null;
  fetchJobs: () => Promise<void>;
  postJob: (data: JobFormData) => Promise<void>;
  closeJob: (jobId: string) => Promise<void>;
  fetchJobById: (jobId: string) => Promise<void>;
  fetchApplicants: (jobId: string) => Promise<void>;
  fetchApplicantProfile: (applicationId: string) => Promise<Application['jobSeekerProfile']>;
  updateApplicationStatus: (applicationId: string, status: 'Accepted' | 'Rejected') => Promise<void>;
}

export const useBusinessJobStore = create<BusinessJobState>((set, get) => ({
  jobs: [],
  applicants: {},
  selectedJob: null,
  isLoading: false,
  error: null,

  fetchJobs: async () => {
    set({ isLoading: true, error: null });
    try {
      const authData = localStorage.getItem('business-auth');
      if (!authData) {
        throw new Error('No authentication token found. Please log in.');
      }
      const { token } = JSON.parse(authData);
      if (!token || typeof token !== 'string') {
        throw new Error('Invalid token format.');
      }
      const response = await axios.get('http://localhost:5000/api/jobs/business', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const jobs: PostedJob[] = response.data.map((job: any) => ({
        id: job._id,
        title: job.designation,
        companyName: job.companyName || 'Unknown Company',
        location: job.jobLocation,
        postedDate: new Date(job.jobPostedDate).toISOString().split('T')[0],
        status: job.isActive ? 'Open' : 'Closed',
        description: job.description,
        salary: job.salary,
        experienceRequired: job.experienceRequired,
        qualificationRequired: job.qualificationRequired,
        noOfOpenings: job.noOfOpenings,
        genderSpecifics: job.genderSpecifics,
        rolesAndResponsibilities: job.rolesAndResponsibilities,
      }));
      set({ jobs, isLoading: false });
      toast.success('Jobs fetched successfully!', {
        style: { background: '#1f2937', color: '#e5e7eb', border: '1px solid #7c3aed' },
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch jobs.';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage, {
        style: { background: '#1f2937', color: '#e5e7eb', border: '1px solid #7c3aed' },
      });
    }
  },

  postJob: async (data: JobFormData) => {
    set({ isLoading: true, error: null });
    try {
      const authData = localStorage.getItem('business-auth');
      if (!authData) {
        throw new Error('No authentication token found. Please log in.');
      }
      const { token } = JSON.parse(authData);
      if (!token || typeof token !== 'string') {
        throw new Error('Invalid token format.');
      }
      const response = await axios.post('http://localhost:5000/api/jobs/post-job', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const newJob: PostedJob = {
        id: response.data.job._id,
        title: response.data.job.designation,
        companyName: response.data.job.companyName || 'Unknown Company',
        location: response.data.job.jobLocation,
        postedDate: new Date(response.data.job.jobPostedDate).toISOString().split('T')[0],
        status: response.data.job.isActive ? 'Open' : 'Closed',
        description: response.data.job.description,
        salary: response.data.job.salary,
        experienceRequired: response.data.job.experienceRequired,
        qualificationRequired: response.data.job.qualificationRequired,
        noOfOpenings: response.data.job.noOfOpenings,
        genderSpecifics: response.data.job.genderSpecifics,
        rolesAndResponsibilities: response.data.job.rolesAndResponsibilities,
      };
      set((state) => ({ jobs: [...state.jobs, newJob], isLoading: false }));
      toast.success('Job posted successfully!', {
        style: { background: '#1f2937', color: '#e5e7eb', border: '1px solid #7c3aed' },
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const errorMessage = err.response?.data?.message || err.message || 'Failed to post job.';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage, {
        style: { background: '#1f2937', color: '#e5e7eb', border: '1px solid #7c3aed' },
      });
      throw error;
    }
  },

  closeJob: async (jobId: string) => {
    set({ isLoading: true, error: null });
    try {
      const authData = localStorage.getItem('business-auth');
      if (!authData) {
        throw new Error('No authentication token found. Please log in.');
      }
      const { token } = JSON.parse(authData);
      if (!token || typeof token !== 'string') {
        throw new Error('Invalid token format.');
      }
      await axios.put(`http://localhost:5000/api/jobs/close/:jobId`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set((state) => ({
        jobs: state.jobs.map((job) =>
          job.id === jobId ? { ...job, status: 'Closed' } : job
        ),
        selectedJob:
          state.selectedJob && state.selectedJob.id === jobId
            ? { ...state.selectedJob, status: 'Closed' }
            : state.selectedJob,
        isLoading: false,
      }));
      toast.success('Job closed successfully!', {
        style: { background: '#1f2937', color: '#e5e7eb', border: '1px solid #7c3aed' },
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const errorMessage = err.response?.data?.message || err.message || 'Failed to close job.';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage, {
        style: { background: '#1f2937', color: '#e5e7eb', border: '1px solid #7c3aed' },
      });
      throw error;
    }
  },

  fetchJobById: async (jobId: string) => {
    set({ isLoading: true, error: null });
    try {
      const { jobs, fetchJobs } = get();
      console.log('fetchJobById: Job ID:', jobId);
      console.log('fetchJobById: Current jobs array:', jobs);
      if (jobs.length === 0) {
        console.log('fetchJobById: Jobs array is empty, calling fetchJobs');
        await fetchJobs();
      }
      const updatedJobs = get().jobs;
      const job = updatedJobs.find((j) => j.id === jobId);
      if (!job) {
        throw new Error(`Job with ID ${jobId} not found. Please try refreshing the job list.`);
      }
      set({ selectedJob: job, isLoading: false });
      toast.success('Job details loaded successfully!', {
        style: { background: '#1f2937', color: '#e5e7eb', border: '1px solid #7c3aed' },
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load job details.';
      console.error('fetchJobById Error:', errorMessage);
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage, {
        style: { background: '#1f2937', color: '#e5e7eb', border: '1px solid #7c3aed' },
      });
    }
  },

  fetchApplicants: async (jobId: string) => {
    set({ isLoading: true, error: null });
    try {
      const authData = localStorage.getItem('business-auth');
      if (!authData) {
        throw new Error('No authentication token found. Please log in.');
      }
      const { token } = JSON.parse(authData);
      if (!token || typeof token !== 'string') {
        throw new Error('Invalid token format.');
      }
      const response = await axios.get(`http://localhost:5000/api/applications/job/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const applications: Application[] = response.data.map((app: any) => ({
        _id: app._id,
        jobId: app.jobId._id,
        jobSeekerId: app.jobSeekerId._id,
        businessId: app.businessId._id,
        status: app.status,
        appliedDate: new Date(app.appliedDate).toISOString().split('T')[0],
        jobSeekerProfile: {
          name: app.jobSeekerId.name,
          email: app.jobSeekerId.email,
          phone: app.jobSeekerId.mobile || 'N/A',
          resume: app.jobSeekerId.resume || '',
          skills: app.jobSeekerId.skills || [],
          experience: app.jobSeekerId.experience || 0,
          education: app.jobSeekerId.education ? JSON.stringify(app.jobSeekerId.education) : '',
        },
      }));
      set((state) => ({
        applicants: { ...state.applicants, [jobId]: applications },
        isLoading: false,
      }));
      toast.success('Applicants fetched successfully!', {
        style: { background: '#1f2937', color: '#e5e7eb', border: '1px solid #7c3aed' },
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch applicants.';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage, {
        style: { background: '#1f2937', color: '#e5e7eb', border: '1px solid #7c3aed' },
      });
    }
  },

  fetchApplicantProfile: async (applicationId: string) => {
    set({ isLoading: true, error: null });
    try {
      const authData = localStorage.getItem('business-auth');
      if (!authData) {
        throw new Error('No authentication token found. Please log in.');
      }
      const { token } = JSON.parse(authData);
      if (!token || typeof token !== 'string') {
        throw new Error('Invalid token format.');
      }
      const response = await axios.get(`http://localhost:5000/api/applications/${applicationId}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const profile: Application['jobSeekerProfile'] = {
        name: response.data.name,
        email: response.data.email,
        phone: response.data.mobile || 'N/A',
        resume: response.data.resume || '',
        skills: response.data.skills || [],
        experience: response.data.experience || 0,
        education: response.data.education ? JSON.stringify(response.data.education) : '',
      };
      set({ isLoading: false });
      return profile;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch applicant profile.';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage, {
        style: { background: '#1f2937', color: '#e5e7eb', border: '1px solid #7c3aed' },
      });
      throw error;
    }
  },

  updateApplicationStatus: async (applicationId: string, status: 'Accepted' | 'Rejected') => {
    set({ isLoading: true, error: null });
    try {
      const authData = localStorage.getItem('business-auth');
      if (!authData) {
        throw new Error('No authentication token found. Please log in.');
      }
      const { token } = JSON.parse(authData);
      if (!token || typeof token !== 'string') {
        throw new Error('Invalid token format.');
      }
      const response = await axios.put(
        `http://localhost:5000/api/applications/${applicationId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      set((state) => ({
        applicants: Object.fromEntries(
          Object.entries(state.applicants).map(([jobId, apps]) => [
            jobId,
            apps.map((app) =>
              app._id === applicationId ? { ...app, status: response.data.application.status } : app
            ),
          ])
        ),
        isLoading: false,
      }));
      toast.success(`Application ${status.toLowerCase()} successfully!`, {
        style: { background: '#1f2937', color: '#e5e7eb', border: '1px solid #7c3aed' },
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update application status.';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage, {
        style: { background: '#1f2937', color: '#e5e7eb', border: '1px solid #7c3aed' },
      });
      throw error;
    }
  },
}));