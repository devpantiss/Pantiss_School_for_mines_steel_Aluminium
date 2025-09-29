import { useState } from 'react';
import { useJobSeekerStore } from '../../store/useJobSeekerAuthStore';
import ICard from './ICard';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { login, forgotPassword, resetPassword, isLoading, error } = useJobSeekerStore();
  const navigate = useNavigate();

  // Handle login form submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Attempting to log in with:', { email, password });
      const token = await login(email, password);
      console.log('Received token:', token);
      console.log('Stored token in localStorage:', localStorage.getItem('job-seeker-auth'));
      toast.success('Login successful! Redirecting to your dashboard...', {
        duration: 2000,
      });
      setTimeout(() => {
        navigate('/job-search-engine/job-seekers/profile', { replace: true });
      }, 2000);
    } catch (error: any) {
      console.error('Login failed:', error.message || error);
      toast.error(error.message || 'Login failed. Please check your credentials.');
    }
  };

  // Handle forgot password (send OTP)
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      toast.success('OTP sent to your email! Please check your inbox.', {
        duration: 3000,
      });
      setIsForgotPassword(false);
      setIsResetPassword(true);
    } catch (error: any) {
      console.error('Forgot password failed:', error.message || error);
      toast.error(error.message || 'Failed to send OTP. Please try again.');
    }
  };

  // Handle reset password (verify OTP and set new password)
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPassword(email, otp, newPassword);
      toast.success('Password reset successful! Redirecting to login...', {
        duration: 2000,
      });
      setTimeout(() => {
        setIsResetPassword(false);
        setEmail('');
        setOtp('');
        setNewPassword('');
      }, 2000);
    } catch (error: any) {
      console.error('Reset password failed:', error.message || error);
      toast.error(error.message || 'Password reset failed. Please check your OTP.');
    }
  };

  // Toggle between login and forgot password forms
  const toggleForgotPassword = () => {
    setIsForgotPassword(true);
    setIsResetPassword(false);
    setOtp('');
    setNewPassword('');
  };

  return (
    <ICard title={isForgotPassword ? 'Forgot Password' : isResetPassword ? 'Reset Password' : 'Job Seeker Login'}>
      {/* Login Form */}
      {!isForgotPassword && !isResetPassword && (
        <form onSubmit={handleLoginSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 block w-full border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:ring-purple-600 focus:border-purple-600"
              required
            />
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
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 block w-full border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:ring-purple-600 focus:border-purple-600"
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
          </div>
          <div className="text-right">
            <button
              type="button"
              onClick={toggleForgotPassword}
              className="text-sm text-purple-400 hover:text-purple-500 font-futuristic"
            >
              Forgot Password?
            </button>
          </div>
          {error && <p className="text-red-400 text-sm font-futuristic">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 text-white py-3 rounded-md shadow-lg hover:bg-purple-700 transition-all duration-300 font-futuristic disabled:bg-gray-600"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      )}

      {/* Forgot Password Form */}
      {isForgotPassword && !isResetPassword && (
        <form onSubmit={handleForgotPassword} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 block w-full border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:ring-purple-600 focus:border-purple-600"
              required
            />
          </div>
          {error && <p className="text-red-400 text-sm font-futuristic">{error}</p>}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setIsForgotPassword(false)}
              className="bg-gray-700 text-gray-200 py-3 px-6 rounded-md shadow-lg hover:bg-gray-600 transition-all duration-300 font-futuristic"
            >
              Back to Login
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-purple-600 text-white py-3 px-6 rounded-md shadow-lg hover:bg-purple-700 transition-all duration-300 font-futuristic disabled:bg-gray-600"
            >
              {isLoading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </div>
        </form>
      )}

      {/* Reset Password Form */}
      {isResetPassword && (
        <form onSubmit={handleResetPassword} className="space-y-6">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-200">
              OTP
            </label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 p-2 block w-full border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:ring-purple-600 focus:border-purple-600"
              required
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-200">
              New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 p-2 block w-full border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:ring-purple-600 focus:border-purple-600"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          {error && <p className="text-red-400 text-sm font-futuristic">{error}</p>}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setIsResetPassword(false)}
              className="bg-gray-700 text-gray-200 py-3 px-6 rounded-md shadow-lg hover:bg-gray-600 transition-all duration-300 font-futuristic"
            >
              Back to Login
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-purple-600 text-white py-3 px-6 rounded-md shadow-lg hover:bg-purple-700 transition-all duration-300 font-futuristic disabled:bg-gray-600"
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
        </form>
      )}
    </ICard>
  );
};

export default LoginForm;