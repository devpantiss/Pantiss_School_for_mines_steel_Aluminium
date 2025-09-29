export interface Experience {
  company: string;
  role: string;
  fromDate: string;
  toDate: string;
  tenure: string;
  lastIncome: number;
}

export interface Education {
  institute: string;
  qualification: '10th' | '12th' | 'Diploma';
  fromDate: string;
  toDate: string;
  marks: number;
}

export interface JobSeeker {
  name: string;
  email: string;
  mobile: string;
  password: string;
  jobRole: string;
  dob?: string;
  aadhar: string;
  aadharFile?: File;
  profilePic?: File;
  certificate?: File;
  license?: File;
  bio?: string;
  gender: 'Male' | 'Female' | 'Others';
  experiences: Experience[] | 'Fresher';
  education: Education[];
}

export interface JobSeekerFormData extends Partial<JobSeeker> {
  otp?: string;
  emailVerified?: boolean;
  otpSent?: boolean; // Added
}