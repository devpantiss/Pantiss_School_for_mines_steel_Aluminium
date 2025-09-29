export interface BusinessFormData {
  recruiterName: string;
  email: string;
  phone: string;
  password?: string;
  confirmPassword?: string;
  emailOtp: string;
  phoneOtp: string;
  organizationType: 'Organization' | 'Nano Contractor' | '';
  organizationDescription?: string;
  companyName?: string;
  companyLogo?: string;
  recruiterProfilePicture?: string;
  location?: string;
  noOfEmployees?: '0-10' | '10-50' | '50-100' | '100-500' | '500-1000' | '1000+' | '';
  companyDescription?: string;
  companyAddress?: string;
  websiteLink?: string;
}

export interface BusinessProfile extends BusinessFormData {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostedJob {
  id: string;
  title: string;
  companyName: string;
  location: string;
  postedDate: string;
  status: 'Open' | 'Closed';
  description?: string;
  salary?: number;
  experienceRequired?: number;
  qualificationRequired?: string;
  noOfOpenings?: number;
  genderSpecifics?: 'Male' | 'Female' | 'Any';
  rolesAndResponsibilities?: string[];
}

export interface Application {
  _id: string;
  jobId: string;
  jobSeekerId: string;
  businessId: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  appliedDate: string;
  jobSeekerProfile?: {
    name: string;
    email: string;
    phone: string;
    resume: string;
    skills: string[];
    experience: number;
    education: string;
  };
}