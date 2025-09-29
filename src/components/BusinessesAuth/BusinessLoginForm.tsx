import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useBusinessAuthStore } from '../../store/useBusinessAuthStore';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

interface BusinessLoginFormProps {
  onSignupClick: () => void;
  onSuccess: () => void;
}

interface FormData {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
}

export const BusinessLoginForm: React.FC<BusinessLoginFormProps> = React.memo(
  ({ onSignupClick, onSuccess }) => {
    const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
    const [errors, setErrors] = useState<Errors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login, isLoading, error, clearError } = useBusinessAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
      if (error) {
        toast.error(error, {
          style: { background: '#1f2937', color: '#e5e7eb', border: '1px solid #7c3aed' },
        });
        clearError();
      }
    }, [error, clearError]);

    const validateField = (name: keyof FormData, value: string) => {
      const newErrors: Errors = { ...errors };
      switch (name) {
        case 'email':
          newErrors.email = value
            ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
              ? ''
              : 'Invalid email address'
            : 'Email is required';
          break;
        case 'password':
          newErrors.password = value
            ? value.length >= 6
              ? ''
              : 'Password must be at least 6 characters'
            : 'Password is required';
          break;
        default:
          break;
      }
      setErrors(newErrors);
    };

    const validateForm = (): boolean => {
      const newErrors: Errors = {};
      let isValid = true;

      if (!formData.email) {
        newErrors.email = 'Email is required';
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email address';
        isValid = false;
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
        isValid = false;
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
        isValid = false;
      }

      setErrors(newErrors);
      return isValid;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      validateField(name as keyof FormData, value);
    };

    const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateForm()) {
        toast.error('Please fix the form errors before submitting.', {
          style: { background: '#1f2937', color: '#e5e7eb', border: '1px solid #7c3aed' },
        });
        return;
      }

      setIsSubmitting(true);
      try {
        await login(formData.email, formData.password);
        toast.success('Logged in successfully!', {
          style: { background: '#1f2937', color: '#e5e7eb', border: '1px solid #7c3aed' },
        });
        onSuccess();
        navigate('/job-search-engine/business/profile');
      } catch {
        // Error is handled by the store's toast in useEffect
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="relative bg-transparent min-h-screen flex items-center justify-center py-12 px-4 sm:px-8">
        {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#4b0082_0%,#1e3a8a_50%,#000000_100%)] opacity-60" /> */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-md w-full p-8 rounded-2xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-purple-500/40 shadow-2xl shadow-purple-500/20 backdrop-blur-sm"
          aria-busy={isSubmitting || isLoading}
        >
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-gray-100 tracking-tight"
            style={{ textShadow: '0 0 8px #7c3aed' }}
          >
            Business Login
            <span className="block h-1 w-24 bg-gradient-to-r from-purple-500 to-indigo-500 mt-2 rounded-full mx-auto" />
          </h2>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200 mb-2 tracking-wide"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`block w-full px-4 py-3 rounded-lg bg-gray-800/80 text-gray-100 border ${
                  errors.email ? 'border-red-500' : 'border-purple-500/50'
                } focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 focus:outline-none transition-all duration-300 placeholder-gray-500 hover:shadow-[0_0_8px_#7c3aed]`}
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
                placeholder="Enter your email"
                disabled={isSubmitting || isLoading}
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-red-400 mt-1">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-200 mb-2 tracking-wide"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`block w-full px-4 py-3 rounded-lg bg-gray-800/80 text-gray-100 border ${
                  errors.password ? 'border-red-500' : 'border-purple-500/50'
                } focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 focus:outline-none transition-all duration-300 placeholder-gray-500 hover:shadow-[0_0_8px_#7c3aed]`}
                aria-invalid={!!errors.password}
                aria-describedby="password-error"
                placeholder="Enter your password"
                disabled={isSubmitting || isLoading}
              />
              {errors.password && (
                <p id="password-error" className="text-sm text-red-400 mt-1">{errors.password}</p>
              )}
            </div>
            {error && (
              <p id="form-error" className="text-sm text-red-400 text-center">{error}</p>
            )}
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-600 disabled:opacity-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-[0_0_12px_#7c3aed] hover:shadow-[0_0_20px_#7c3aed]"
              aria-label="Login"
            >
              {isSubmitting || isLoading ? (
                <span className="flex items-center">
                  <FaSpinner className="animate-spin mr-2" />
                  Logging in...
                </span>
              ) : (
                'Login'
              )}
            </button>
            <p className="text-center mt-6 text-sm text-gray-300">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onSignupClick}
                className="text-purple-400 hover:text-purple-300 focus:outline-none transition-colors duration-300"
                aria-label="Sign up"
              >
                Sign Up
              </button>
            </p>
          </form>
        </motion.div>
      </div>
    );
  }
);