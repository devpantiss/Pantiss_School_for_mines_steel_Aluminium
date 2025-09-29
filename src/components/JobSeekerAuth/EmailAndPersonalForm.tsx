import { useState } from 'react';
import ICard from './ICard';
import { JobSeekerFormData } from '../../types/jobSeeker';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface EmailAndPersonalFormProps {
  onNext: (data: JobSeekerFormData) => Promise<void>;
  formData: JobSeekerFormData;
}

const EmailAndPersonalForm = ({ onNext, formData }: EmailAndPersonalFormProps) => {
  const [email, setEmail] = useState(formData.email || '');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [name, setName] = useState(formData.name || '');
  const [mobile, setMobile] = useState(formData.mobile || '');
  const [password, setPassword] = useState(formData.password || '');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(formData.otpSent || false);
  const [emailVerified, setEmailVerified] = useState(formData.emailVerified || false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    otp: '',
    name: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  const handleOtpChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        document.getElementById(`otp${index + 1}`)?.focus();
      }
      setFieldErrors((prev) => ({ ...prev, otp: '' }));
    }
  };

  const normalizeMobile = (input: string) => {
    return input.replace(/[^0-9]/g, '').slice(0, 10);
  };

  const formatMobileForApi = (mobile: string) => {
    const normalized = normalizeMobile(mobile);
    return `+91${normalized}`;
  };

  const validateEmail = (email: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\.]+$/i.test(email);
    console.log('Validating email:', { email, isValid });
    return isValid;
  };

  const validateOtp = (otp: string) => {
    const isValid = otp.length === 6 && /^\d{6}$/.test(otp);
    console.log('Validating OTP:', { otp, isValid });
    return isValid;
  };

  const validateFields = () => {
    const errors = {
      name: '',
      mobile: '',
      password: '',
      confirmPassword: '',
    };
    let isValid = true;

    if (!name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }
    if (!mobile) {
      errors.mobile = 'Mobile number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(normalizeMobile(mobile))) {
      errors.mobile = 'Mobile number must be exactly 10 digits';
      isValid = false;
    }
    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setFieldErrors((prev) => ({ ...prev, ...errors }));
    console.log('Personal info validation:', { isValid, errors });
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted', { emailVerified, otpSent, email, otp: otp.join(''), name, mobile, password });
    setError('');

    if (!otpSent) {
      if (retryCount >= maxRetries) {
        setError('Maximum OTP attempts reached. Please try again later.');
        console.log('Validation failed: Max OTP retries');
        return;
      }
      if (!email) {
        setFieldErrors((prev) => ({ ...prev, email: 'Email is required' }));
        console.log('Validation failed: Empty email');
        return;
      }
      if (!validateEmail(email)) {
        setFieldErrors((prev) => ({ ...prev, email: 'Please enter a valid email address' }));
        console.log('Validation failed: Invalid email');
        return;
      }
      setIsLoading(true);
      try {
        setOtpSent(true);
        setRetryCount((prev) => prev + 1);
        console.log('Calling onNext for send OTP', { email, otpSent: true });
        await onNext({ email, otpSent: true });
      } catch (error: any) {
        setError(error.message || 'Failed to send OTP');
        setOtpSent(false);
        setRetryCount((prev) => prev - 1);
        console.error('Send OTP error:', error);
      } finally {
        setIsLoading(false);
      }
    } else if (otpSent && !emailVerified) {
      const otpValue = otp.join('');
      if (!validateOtp(otpValue)) {
        setFieldErrors((prev) => ({ ...prev, otp: 'Invalid OTP. Please enter a valid 6-digit OTP' }));
        console.log('Validation failed: Invalid OTP');
        return;
      }
      setIsLoading(true);
      try {
        console.log('Calling onNext for verify OTP', { email, otp: otpValue });
        await onNext({ email, otp: otpValue });
        setEmailVerified(true);
      } catch (error: any) {
        setError(error.message || 'OTP verification failed');
        console.error('Verify OTP error:', error);
      } finally {
        setIsLoading(false);
      }
    } else if (emailVerified) {
      if (!validateFields()) {
        setError('Please fix the errors in the form');
        console.log('Validation failed: Invalid personal info');
        return;
      }
      setIsLoading(true);
      try {
        console.log('Calling onNext for personal info', {
          email,
          name,
          mobile: formatMobileForApi(mobile),
          password,
        });
        await onNext({ email, name, mobile: formatMobileForApi(mobile), password });
      } catch (error: any) {
        setError(error.message || 'Failed to proceed to next step');
        console.error('Next step error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleResendOTP = async () => {
    if (retryCount >= maxRetries) {
      setError('Maximum OTP attempts reached. Please try again later.');
      console.log('OTP error: Max retries reached');
      return;
    }
    setOtp(['', '', '', '', '', '']);
    setIsLoading(true);
    try {
      setRetryCount((prev) => prev + 1);
      console.log('Calling onNext for resend OTP', { email, otpSent: true });
      await onNext({ email, otpSent: true });
    } catch (error: any) {
      setError(error.message || 'Failed to resend OTP');
      setRetryCount((prev) => prev - 1);
      console.error('Resend OTP error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ICard title="Personal Information">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-200">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFieldErrors((prev) => ({ ...prev, email: '' }));
            }}
            onBlur={() => {
              if (!email) {
                setFieldErrors((prev) => ({ ...prev, email: 'Email is required' }));
              } else if (!validateEmail(email)) {
                setFieldErrors((prev) => ({ ...prev, email: 'Please enter a valid email address' }));
              }
            }}
            className={`mt-1 p-2 block w-full border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:ring-purple-600 focus:border-purple-600 ${fieldErrors.email ? 'border-red-400' : ''}`}
            required
            disabled={otpSent}
          />
          {fieldErrors.email && <p className="text-red-400 text-sm mt-1">{fieldErrors.email}</p>}
          {emailVerified && (
            <p className="text-green-400 text-sm mt-1 font-futuristic">Email Verified</p>
          )}
        </div>
        {otpSent && !emailVerified && (
          <div>
            <label className="block text-sm font-medium text-gray-200">Enter OTP</label>
            <div className="flex space-x-2 mt-1">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className={`w-12 h-12 text-center border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:ring-purple-600 focus:border-purple-600 ${fieldErrors.otp ? 'border-red-400' : ''}`}
                  required
                />
              ))}
            </div>
            {fieldErrors.otp && <p className="text-red-400 text-sm mt-1">{fieldErrors.otp}</p>}
            <button
              type="button"
              onClick={handleResendOTP}
              className="mt-2 text-purple-400 hover:underline font-futuristic"
              disabled={retryCount >= maxRetries || isLoading}
            >
              Resend OTP
            </button>
          </div>
        )}
        {emailVerified && (
          <>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-200">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, name: '' }));
                }}
                onBlur={() => !name.trim() && setFieldErrors((prev) => ({ ...prev, name: 'Name is required' }))}
                className={`mt-1 p-2 block w-full border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:ring-purple-600 focus:border-purple-600 ${fieldErrors.name ? 'border-red-400' : ''}`}
                required
              />
              {fieldErrors.name && <p className="text-red-400 text-sm mt-1">{fieldErrors.name}</p>}
            </div>
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-200">
                Mobile Number
              </label>
              <input
                id="mobile"
                type="text"
                value={mobile}
                onChange={(e) => {
                  const value = normalizeMobile(e.target.value);
                  setMobile(value);
                  setFieldErrors((prev) => ({ ...prev, mobile: '' }));
                }}
                onBlur={() => {
                  if (!mobile) {
                    setFieldErrors((prev) => ({ ...prev, mobile: 'Mobile number is required' }));
                  } else if (!/^\d{10}$/.test(normalizeMobile(mobile))) {
                    setFieldErrors((prev) => ({ ...prev, mobile: 'Mobile number must be exactly 10 digits' }));
                  }
                }}
                className={`mt-1 p-2 block w-full border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:ring-purple-600 focus:border-purple-600 ${fieldErrors.mobile ? 'border-red-400' : ''}`}
                required
                placeholder="Enter 10-digit mobile number"
                maxLength={10}
              />
              {fieldErrors.mobile && <p className="text-red-400 text-sm mt-1">{fieldErrors.mobile}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, password: '' }));
                  }}
                  onBlur={() => {
                    if (!password) {
                      setFieldErrors((prev) => ({ ...prev, password: 'Password is required' }));
                    } else if (password.length < 6) {
                      setFieldErrors((prev) => ({ ...prev, password: 'Password must be at least 6 characters' }));
                    }
                  }}
                  className={`mt-1 p-2 block w-full border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:ring-purple-600 focus:border-purple-600 ${fieldErrors.password ? 'border-red-400' : ''}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {fieldErrors.password && <p className="text-red-400 text-sm mt-1">{fieldErrors.password}</p>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, confirmPassword: '' }));
                  }}
                  onBlur={() => {
                    if (!confirmPassword) {
                      setFieldErrors((prev) => ({ ...prev, confirmPassword: 'Please confirm your password' }));
                    } else if (password !== confirmPassword) {
                      setFieldErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
                    }
                  }}
                  className={`mt-1 p-2 block w-full border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:ring-purple-600 focus:border-purple-600 ${fieldErrors.confirmPassword ? 'border-red-400' : ''}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {fieldErrors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">{fieldErrors.confirmPassword}</p>
              )}
            </div>
          </>
        )}
        {error && <p className="text-red-400 text-sm font-futuristic mt-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-md shadow-sm hover:bg-purple-700 transition-all duration-300 font-futuristic disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          disabled={(otpSent && !emailVerified && !otp.every((digit) => digit.length === 1)) || isLoading}
        >
          <span>{isLoading ? 'Processing...' : emailVerified ? 'Next' : otpSent ? 'Verify OTP' : 'Send OTP'}</span>
          {isLoading && (
            <div className="w-5 h-5 border-2 border-t-purple-200 border-purple-600 rounded-full animate-spin"></div>
          )}
        </button>
        {otpSent && !emailVerified && !otp.every((digit) => digit.length === 1) && (
          <p className="text-yellow-500 text-sm mt-2 text-center">Please enter all 6 OTP digits sent to your mail!</p>
        )}
      </form>
    </ICard>
  );
};

export default EmailAndPersonalForm;