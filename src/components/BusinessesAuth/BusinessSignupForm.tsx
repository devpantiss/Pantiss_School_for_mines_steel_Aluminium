import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useBusinessAuthStore } from '../../store/useBusinessAuthStore';
import { BusinessFormData } from '../../types/businessTypes';

interface Errors {
  recruiterName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  emailOtp?: string;
  phoneOtp?: string;
}

interface BusinessSignupFormProps {
  formData: BusinessFormData;
  updateFormData: (data: Partial<BusinessFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const BusinessSignupForm: React.FC<BusinessSignupFormProps> = React.memo(
  ({ formData, updateFormData, onNext, onBack }) => {
    const [step, setStep] = useState<'email' | 'otp' | 'details'>('email');
    const [localFormData, setLocalFormData] = useState<Partial<BusinessFormData>>({
      recruiterName: formData.recruiterName || '',
      email: formData.email || '',
      phone: formData.phone || '',
      password: formData.password || '',
      confirmPassword: formData.confirmPassword || '',
      emailOtp: formData.emailOtp || '',
      phoneOtp: formData.phoneOtp || '',
    });
    const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(''));
    const [errors, setErrors] = useState<Errors>({});
    const [phoneOtpSent, setPhoneOtpSent] = useState(false);
    const { sendEmailOTP, isLoading } = useBusinessAuthStore();
    const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

    const validateEmail = (): boolean => {
      const newErrors: Errors = {};
      let isValid = true;

      if (!localFormData.email) {
        newErrors.email = 'Email is required';
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localFormData.email)) {
        newErrors.email = 'Invalid email address';
        isValid = false;
      }

      setErrors(newErrors);
      return isValid;
    };

    const validateOtp = (): boolean => {
      const newErrors: Errors = {};
      let isValid = true;

      const otp = otpValues.join('');
      if (!otp || otp.length !== 6 || !/^\d{6}$/.test(otp)) {
        newErrors.emailOtp = 'Email OTP must be 6 digits';
        isValid = false;
      }

      setErrors(newErrors);
      return isValid;
    };

    const validateDetails = (): boolean => {
      const newErrors: Errors = {};
      let isValid = true;

      if (!localFormData.recruiterName || localFormData.recruiterName.length < 2) {
        newErrors.recruiterName = 'Name must be at least 2 characters';
        isValid = false;
      }
      if (!localFormData.phone) {
        newErrors.phone = 'Phone number is required';
        isValid = false;
      } else if (!/^\d{10}$/.test(localFormData.phone)) {
        newErrors.phone = 'Phone number must be 10 digits';
        isValid = false;
      }
      if (!localFormData.password) {
        newErrors.password = 'Password is required';
        isValid = false;
      } else if (localFormData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
        isValid = false;
      }
      if (!localFormData.confirmPassword) {
        newErrors.confirmPassword = 'Confirm password is required';
        isValid = false;
      } else if (localFormData.password !== localFormData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords must match';
        isValid = false;
      }
      if (phoneOtpSent && (!localFormData.phoneOtp || localFormData.phoneOtp.length !== 6)) {
        newErrors.phoneOtp = 'Phone OTP must be 6 digits';
        isValid = false;
      }

      setErrors(newErrors);
      return isValid;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setLocalFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleOtpChange = (index: number, value: string) => {
      if (!/^\d?$/.test(value)) return;
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);
      setLocalFormData((prev) => ({ ...prev, emailOtp: newOtpValues.join('') }));
      if (value && index < 5 && otpInputs.current[index + 1]) {
        otpInputs.current[index + 1]?.focus();
      }
    };

    const handleOtpKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
      index: number
    ) => {
      if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
        otpInputs.current[index - 1]?.focus();
      }
    };

    const handleSendEmailOtp = async () => {
      if (!validateEmail()) return;
      try {
        await sendEmailOTP(localFormData.email!);
        setStep('otp');
        toast.success('Email OTP sent!', { style: { background: '#1f2937', color: '#e5e7eb' } });
      } catch {
        // Error is handled by the store's toast
      }
    };

    const handleVerifyOtp = async () => {
      if (!validateOtp()) return;
      // TODO: Replace with actual OTP verification API call when available
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate verification
        setStep('details');
        toast.success('Email verified!', { style: { background: '#1f2937', color: '#e5e7eb' } });
      } catch {
        toast.error('Invalid OTP. Please try again.', { style: { background: '#1f2937', color: '#e5e7eb' } });
      }
    };

    const handleSendPhoneOtp = async () => {
      if (!localFormData.phone || !/^\d{10}$/.test(localFormData.phone)) {
        setErrors((prev) => ({ ...prev, phone: 'Phone number must be 10 digits' }));
        return;
      }
      // TODO: Implement phone OTP sending when backend API is available
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Placeholder
        setPhoneOtpSent(true);
        toast.success('Phone OTP sent!', { style: { background: '#1f2937', color: '#e5e7eb' } });
      } catch {
        toast.error('Failed to send Phone OTP.', { style: { background: '#1f2937', color: '#e5e7eb' } });
      }
    };

    const onSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateDetails()) return;
      updateFormData(localFormData);
      onNext();
    };

    return (
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.5 }}
        className="p-6 sm:p-8 rounded-xl border border-purple-600/30 bg-gradient-to-br from-gray-900 to-gray-800 shadow-[0_0_25px_#7c3aed]"
      >
        <h2
          className="text-4xl sm:text-5xl font-extrabold text-center mb-8 text-gray-200 tracking-wide"
          style={{ textShadow: '0 0 5px #7c3aed' }}
        >
          Business Signup
        </h2>
        <form onSubmit={step === 'details' ? onSubmit : (e) => e.preventDefault()} className="space-y-6">
          {step === 'email' && (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200 tracking-wide">
                  Email
                </label>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    name="email"
                    value={localFormData.email || ''}
                    onChange={handleInputChange}
                    className={`flex-1 px-4 py-2 rounded-lg border bg-gradient-to-r from-gray-800 to-gray-900 text-gray-200 placeholder-gray-400 ${
                      errors.email ? 'border-red-500' : 'border-purple-600/30'
                    } shadow-sm focus:border-purple-600 focus:ring-purple-600 hover:shadow-[0_0_8px_#7c3aed] transition-all duration-500`}
                    aria-invalid={!!errors.email}
                    aria-describedby="email-error"
                    placeholder="Enter your email"
                  />
                  <button
                    type="button"
                    onClick={handleSendEmailOtp}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-2 px-4 rounded-lg hover:bg-purple-700 hover:-rotate-1 disabled:opacity-50 shadow-[0_0_10px_#7c3aed] hover:shadow-[0_0_15px_#7c3aed] transition-all duration-500"
                  >
                    {isLoading ? 'Sending...' : 'Send OTP'}
                  </button>
                </div>
                {errors.email && (
                  <p id="email-error" className="text-sm text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onBack}
                className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-gray-200 py-3 px-4 rounded-lg hover:bg-gray-700 hover:-rotate-1 shadow-[0_0_8px_#7c3aed] hover:shadow-[0_0_12px_#7c3aed] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-500"
              >
                Back
              </button>
            </>
          )}
          {step === 'otp' && (
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-200 tracking-wide">
                Enter Email OTP
              </label>
              <div className="flex space-x-2 justify-center">
                {otpValues.map((value, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpInputs.current[index] = el)}
                    type="text"
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    maxLength={1}
                    className={`w-12 h-12 text-center text-lg rounded-lg border bg-gradient-to-r from-gray-800 to-gray-900 text-gray-200 placeholder-gray-400 ${
                      errors.emailOtp ? 'border-red-500' : 'border-purple-600/30'
                    } shadow-sm focus:border-purple-600 focus:ring-purple-600 hover:shadow-[0_0_8px_#7c3aed] transition-all duration-500`}
                    aria-invalid={!!errors.emailOtp}
                    aria-describedby="emailOtp-error"
                  />
                ))}
              </div>
              {errors.emailOtp && (
                <p id="emailOtp-error" className="text-sm text-red-500 text-center">
                  {errors.emailOtp}
                </p>
              )}
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 px-4 rounded-lg hover:bg-purple-700 hover:-rotate-1 disabled:opacity-50 shadow-[0_0_12px_#7c3aed] hover:shadow-[0_0_20px_#7c3aed] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-500"
              >
                Verify OTP
              </button>
              <button
                type="button"
                onClick={() => setStep('email')}
                className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-gray-200 py-3 px-4 rounded-lg hover:bg-gray-700 hover:-rotate-1 shadow-[0_0_8px_#7c3aed] hover:shadow-[0_0_12px_#7c3aed] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-500"
              >
                Back to Email
              </button>
            </div>
          )}
          {step === 'details' && (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200 tracking-wide">
                  Email <span className="text-green-500 text-xs">(Verified)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={localFormData.email || ''}
                  readOnly
                  className="block w-full px-4 py-2 rounded-lg border bg-gradient-to-r from-gray-800 to-gray-900 text-gray-400 placeholder-gray-400 border-green-500 shadow-sm cursor-not-allowed"
                  aria-describedby="email-verified"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200 tracking-wide">
                  Recruiter Name
                </label>
                <input
                  name="recruiterName"
                  value={localFormData.recruiterName || ''}
                  onChange={handleInputChange}
                  className={`block w-full px-4 py-2 rounded-lg border bg-gradient-to-r from-gray-800 to-gray-900 text-gray-200 placeholder-gray-400 ${
                    errors.recruiterName ? 'border-red-500' : 'border-purple-600/30'
                  } shadow-sm focus:border-purple-600 focus:ring-purple-600 hover:shadow-[0_0_8px_#7c3aed] transition-all duration-500`}
                  aria-invalid={!!errors.recruiterName}
                  aria-describedby="recruiterName-error"
                  placeholder="Enter your name"
                />
                {errors.recruiterName && (
                  <p id="recruiterName-error" className="text-sm text-red-500">
                    {errors.recruiterName}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200 tracking-wide">
                  Phone Number
                </label>
                {!phoneOtpSent ? (
                  <div className="flex space-x-2">
                    <input
                      type="tel"
                      name="phone"
                      value={localFormData.phone || ''}
                      onChange={handleInputChange}
                      className={`flex-1 px-4 py-2 rounded-lg border bg-gradient-to-r from-gray-800 to-gray-900 text-gray-200 placeholder-gray-400 ${
                        errors.phone ? 'border-red-500' : 'border-purple-600/30'
                      } shadow-sm focus:border-purple-600 focus:ring-purple-600 hover:shadow-[0_0_8px_#7c3aed] transition-all duration-500`}
                      aria-invalid={!!errors.phone}
                      aria-describedby="phone-error"
                      placeholder="Enter your phone number"
                    />
                    <button
                      type="button"
                      onClick={handleSendPhoneOtp}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-2 px-4 rounded-lg hover:bg-purple-700 hover:-rotate-1 disabled:opacity-50 shadow-[0_0_10px_#7c3aed] hover:shadow-[0_0_15px_#7c3aed] transition-all duration-500"
                    >
                      {isLoading ? 'Sending...' : 'Send OTP'}
                    </button>
                  </div>
                ) : (
                  <input
                    name="phoneOtp"
                    value={localFormData.phoneOtp || ''}
                    onChange={handleInputChange}
                    placeholder="Enter Phone OTP"
                    className={`block w-full px-4 py-2 rounded-lg border bg-gradient-to-r from-gray-800 to-gray-900 text-gray-200 placeholder-gray-400 ${
                      errors.phoneOtp ? 'border-red-500' : 'border-purple-600/30'
                    } shadow-sm focus:border-purple-600 focus:ring-purple-600 hover:shadow-[0_0_8px_#7c3aed] transition-all duration-500`}
                    aria-invalid={!!errors.phoneOtp}
                    aria-describedby="phoneOtp-error"
                  />
                )}
                {errors.phone && (
                  <p id="phone-error" className="text-sm text-red-500">
                    {errors.phone}
                  </p>
                )}
                {errors.phoneOtp && (
                  <p id="phoneOtp-error" className="text-sm text-red-500">
                    {errors.phoneOtp}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200 tracking-wide">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={localFormData.password || ''}
                  onChange={handleInputChange}
                  className={`block w-full px-4 py-2 rounded-lg border bg-gradient-to-r from-gray-800 to-gray-900 text-gray-200 placeholder-gray-400 ${
                    errors.password ? 'border-red-500' : 'border-purple-600/30'
                  } shadow-sm focus:border-purple-600 focus:ring-purple-600 hover:shadow-[0_0_8px_#7c3aed] transition-all duration-500`}
                  aria-invalid={!!errors.password}
                  aria-describedby="password-error"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p id="password-error" className="text-sm text-red-500">
                    {errors.password}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200 tracking-wide">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={localFormData.confirmPassword || ''}
                  onChange={handleInputChange}
                  className={`block w-full px-4 py-2 rounded-lg border bg-gradient-to-r from-gray-800 to-gray-900 text-gray-200 placeholder-gray-400 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-purple-600/30'
                  } shadow-sm focus:border-purple-600 focus:ring-purple-600 hover:shadow-[0_0_8px_#7c3aed] transition-all duration-500`}
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby="confirmPassword-error"
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p id="confirmPassword-error" className="text-sm text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setStep('otp')}
                  className="flex-1 bg-gradient-to-r from-gray-800 to-gray-900 text-gray-200 py-3 px-4 rounded-lg hover:bg-gray-700 hover:-rotate-1 shadow-[0_0_8px_#7c3aed] hover:shadow-[0_0_12px_#7c3aed] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-500"
                >
                  Back to OTP
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 px-4 rounded-lg hover:bg-purple-700 hover:-rotate-1 disabled:opacity-50 shadow-[0_0_12px_#7c3aed] hover:shadow-[0_0_20px_#7c3aed] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-500"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </form>
      </motion.div>
    );
  }
);