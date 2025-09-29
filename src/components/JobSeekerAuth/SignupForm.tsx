import { useState } from 'react';
import { useJobSeekerStore } from '../../store/useJobSeekerAuthStore';
import Stepper from './Stepper';
import EmailAndPersonalForm from './EmailAndPersonalForm';
import JobRoleForm from './JobRoleForm';
import PersonalDetailsForm from './PersonalDetailsForm';
import EducationForm from './EducationForm';
import ExperienceForm from './ExperienceForm';
import PreviewForm from './PreviewForm';
import { JobSeekerFormData, Experience } from '../../types/jobSeeker';
import Loader from '../common/Loader';

const SignupForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<JobSeekerFormData>({});
  const { sendEmailOTP, verifyEmailOTP, initiateSignup, isLoading } = useJobSeekerStore();

  const steps = ['Personal Info', 'Job Role', 'Details', 'Education', 'Experience', 'Preview'];

  const handleNext = async (data: JobSeekerFormData) => {
    console.log('handleNext called with:', data);
    try {
      setFormData((prev) => ({ ...prev, ...data }));
      if (currentStep === 0 && data.email && !data.otp && data.otpSent) {
        console.log('Sending email OTP for:', data.email);
        const result = await sendEmailOTP(data.email);
        console.log('sendEmailOTP result:', result);
        if (!result.success) {
          throw new Error(result.error || 'Failed to send OTP');
        }
      } else if (currentStep === 0 && data.email && data.otp) {
        console.log('Verifying OTP:', { email: data.email, otp: data.otp });
        const result = await verifyEmailOTP(data.email, data.otp);
        console.log('verifyEmailOTP result:', result);
        if (result.success) {
          console.log('OTP verification successful');
          setFormData((prev) => ({ ...prev, emailVerified: true }));
        } else {
          throw new Error(result.error || 'OTP verification failed');
        }
      } else if (currentStep === 0 && data.email && data.name && data.mobile && data.password) {
        console.log('Advancing to Step 2 with personal info:', {
          email: data.email,
          name: data.name,
          mobile: data.mobile,
          password: data.password,
        });
        setCurrentStep((prev) => prev + 1);
      } else {
        console.log('Advancing to next step (default)', { currentStep, data });
        setCurrentStep((prev) => prev + 1);
      }
    } catch (error: any) {
      console.error('handleNext error:', error.message);
      throw new Error(error.message || 'Operation failed');
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (data: JobSeekerFormData) => {
    console.log('handleSubmit called with:', data);
    try {
      setFormData((prev) => ({ ...prev, ...data }));
      const { otp, emailVerified, otpSent, ...signupData } = { ...formData, ...data };

      // Ensure experiences have lastIncome as number
      if (signupData.experiences && signupData.experiences !== 'Fresher') {
        signupData.experiences = signupData.experiences.map((exp: Experience) => ({
          ...exp,
          lastIncome: Number(exp.lastIncome),
        }));
      }

      const formDataToSend = new FormData();
      Object.entries(signupData).forEach(([key, value]) => {
        if (key === 'experiences') {
          formDataToSend.append(
            'experiences',
            value === 'Fresher' ? 'Fresher' : JSON.stringify(value)
          );
        } else if (key === 'education' && Array.isArray(value)) {
          formDataToSend.append('education', JSON.stringify(value));
        } else if (value instanceof File) {
          formDataToSend.append(key, value);
        } else if (value !== undefined && value !== null) {
          formDataToSend.append(key, value as string);
        }
      });

      console.log('Initiating signup with FormData');
      await initiateSignup(formDataToSend);
    } catch (error: any) {
      console.error('handleSubmit error:', error.message);
    }
  };

  return (
    <div className="relative">
      <Stepper currentStep={currentStep} steps={steps} />
      {currentStep === 0 && <EmailAndPersonalForm onNext={handleNext} formData={formData} />}
      {currentStep === 1 && <JobRoleForm onNext={handleNext} onBack={handleBack} />}
      {currentStep === 2 && <PersonalDetailsForm onNext={handleNext} onBack={handleBack} />}
      {currentStep === 3 && <EducationForm onNext={handleNext} onBack={handleBack} />}
      {currentStep === 4 && <ExperienceForm onNext={handleNext} onBack={handleBack} />}
      {currentStep === 5 && <PreviewForm formData={formData} onBack={handleBack} onSubmit={handleSubmit} />}
      {isLoading && (
        <div className="text-center mt-4 flex items-center gap-x-4 justify-center">
          <Loader />
          <p className="text-purple-400 font-futuristic">Processing...</p>
        </div>
      )}
    </div>
  );
};

export default SignupForm;