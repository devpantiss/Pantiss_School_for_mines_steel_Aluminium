import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBusinessJobStore } from '../../store/useBusinessJobStore';
import { useBusinessAuthStore } from '../../store/useBusinessAuthStore';
import toast from 'react-hot-toast';
import { FaPlus, FaTimes, FaSpinner } from 'react-icons/fa';

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

const JobPostForm: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useBusinessAuthStore();
  const { postJob, isLoading } = useBusinessJobStore();
  const [formData, setFormData] = useState<JobFormData>({
    designation: '',
    description: '',
    salary: 0,
    experienceRequired: 0,
    qualificationRequired: '',
    jobLocation: '',
    noOfOpenings: 1,
    genderSpecifics: 'Any',
    rolesAndResponsibilities: [''],
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof JobFormData, string>>>({});
  const [roleInput, setRoleInput] = useState('');
  const [formProgress, setFormProgress] = useState(0);

  // Calculate form completion progress
  useEffect(() => {
    const fields = [
      formData.designation,
      formData.description,
      formData.salary.toString(),
      formData.experienceRequired.toString(),
      formData.qualificationRequired,
      formData.jobLocation,
      formData.noOfOpenings.toString(),
      formData.genderSpecifics,
      formData.rolesAndResponsibilities.some((role) => role.trim()),
    ];
    const filledFields = fields.filter((field) => field && field !== '0' && field !== 'Any').length;
    setFormProgress((filledFields / fields.length) * 100);
  }, [formData]);

  if (!token) {
    toast.error('Please log in to post a job.', {
      style: { background: '#1f2937', color: '#e5e7eb', border: '1px solid #7c3aed' },
    });
    navigate('/job-search-engine/business/auth');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'salary' || name === 'noOfOpenings' || name === 'experienceRequired' ? Number(value) : value,
    }));
    // Real-time validation
    validateField(name as keyof JobFormData, value);
  };

  const handleRoleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoleInput(e.target.value);
  };

  const handleAddRole = () => {
    if (roleInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        rolesAndResponsibilities: [...prev.rolesAndResponsibilities, roleInput.trim()],
      }));
      setRoleInput('');
      validateField('rolesAndResponsibilities', [...formData.rolesAndResponsibilities, roleInput.trim()]);
    }
  };

  const handleRemoveRole = (index: number) => {
    const updatedRoles = formData.rolesAndResponsibilities.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, rolesAndResponsibilities: updatedRoles }));
    validateField('rolesAndResponsibilities', updatedRoles);
  };

  const validateField = (name: keyof JobFormData, value: any) => {
    const errors: Partial<Record<keyof JobFormData, string>> = { ...formErrors };
    switch (name) {
      case 'designation':
        errors.designation = value.trim() ? '' : 'Designation is required';
        break;
      case 'description':
        errors.description = value.trim() ? '' : 'Description is required';
        break;
      case 'salary':
        errors.salary = value >= 0 ? '' : 'Salary must be a positive number';
        break;
      case 'experienceRequired':
        errors.experienceRequired = value >= 0 ? '' : 'Experience must be a positive number';
        break;
      case 'qualificationRequired':
        errors.qualificationRequired = value.trim() ? '' : 'Qualification is required';
        break;
      case 'jobLocation':
        errors.jobLocation = value.trim() ? '' : 'Job location is required';
        break;
      case 'noOfOpenings':
        errors.noOfOpenings = value >= 1 ? '' : 'Number of openings must be at least 1';
        break;
      case 'genderSpecifics':
        errors.genderSpecifics = ['Male', 'Female', 'Any'].includes(value) ? '' : 'Invalid gender specifics';
        break;
      case 'rolesAndResponsibilities':
        errors.rolesAndResponsibilities =
          (value as string[]).some((role) => role.trim()) ? '' : 'At least one role/responsibility is required';
        break;
      default:
        break;
    }
    setFormErrors(errors);
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof JobFormData, string>> = {};
    if (!formData.designation.trim()) errors.designation = 'Designation is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (formData.salary < 0) errors.salary = 'Salary must be a positive number';
    if (formData.experienceRequired < 0) errors.experienceRequired = 'Experience must be a positive number';
    if (!formData.qualificationRequired.trim()) errors.qualificationRequired = 'Qualification is required';
    if (!formData.jobLocation.trim()) errors.jobLocation = 'Job location is required';
    if (formData.noOfOpenings < 1) errors.noOfOpenings = 'Number of openings must be at least 1';
    if (!['Male', 'Female', 'Any'].includes(formData.genderSpecifics)) errors.genderSpecifics = 'Invalid gender specifics';
    if (formData.rolesAndResponsibilities.length === 0 || formData.rolesAndResponsibilities.every((role) => !role.trim())) {
      errors.rolesAndResponsibilities = 'At least one role/responsibility is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the form errors before submitting.', {
        style: { background: '#1f2937', color: '#e5e7eb', border: '1px solid #7c3aed' },
      });
      return;
    }
    try {
      await postJob({
        ...formData,
        rolesAndResponsibilities: formData.rolesAndResponsibilities.filter((role) => role.trim()),
      });
      toast.success('Job posted successfully!', {
        style: { background: '#1f2937', color: '#e5e7eb', border: '1px solid #7c3aed' },
      });
      navigate('/job-search-engine/business/profile');
    } catch {
      // Error handled by store's toast
    }
  };

  return (
    <div className="relative bg-gray-900 min-h-screen pt-20 pb-12 px-4 sm:px-8 mt-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#4b0082_0%,#1e3a8a_50%,#000000_100%)] opacity-60" />
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-8 rounded-2xl border border-purple-500/40 shadow-2xl shadow-purple-500/20 backdrop-blur-sm">
          <h2 className="text-3xl font-extrabold text-gray-100 mb-8 tracking-tight">
            Post a New Job
            <span className="block h-1 w-24 bg-gradient-to-r from-purple-500 to-indigo-500 mt-2 rounded-full" />
          </h2>
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="text-sm text-gray-300 mb-2">Form Completion: {Math.round(formProgress)}%</div>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500"
                style={{ width: `${formProgress}%` }}
              />
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Designation */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Designation</label>
                <input
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-800/80 text-gray-100 border ${
                    formErrors.designation ? 'border-red-500' : 'border-purple-500/50'
                  } focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 focus:outline-none transition-all duration-300 placeholder-gray-500`}
                  placeholder="Enter job designation"
                  aria-invalid={!!formErrors.designation}
                  aria-describedby="designation-error"
                />
                {formErrors.designation && (
                  <p id="designation-error" className="text-sm text-red-400 mt-1 animate-fade-in">{formErrors.designation}</p>
                )}
              </div>
              {/* Job Location */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Job Location</label>
                <input
                  name="jobLocation"
                  value={formData.jobLocation}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-800/80 text-gray-100 border ${
                    formErrors.jobLocation ? 'border-red-500' : 'border-purple-500/50'
                  } focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 focus:outline-none transition-all duration-300 placeholder-gray-500`}
                  placeholder="Enter job location"
                  aria-invalid={!!formErrors.jobLocation}
                  aria-describedby="jobLocation-error"
                />
                {formErrors.jobLocation && (
                  <p id="jobLocation-error" className="text-sm text-red-400 mt-1 animate-fade-in">{formErrors.jobLocation}</p>
                )}
              </div>
              {/* Salary */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Annual Salary (INR) </label>
                <input
                  name="salary"
                  type="number"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-800/80 text-gray-100 border ${
                    formErrors.salary ? 'border-red-500' : 'border-purple-500/50'
                  } focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 focus:outline-none transition-all duration-300 placeholder-gray-500`}
                  placeholder="Enter salary"
                  min="0"
                  step="1000"
                  aria-invalid={!!formErrors.salary}
                  aria-describedby="salary-error"
                />
                {formErrors.salary && (
                  <p id="salary-error" className="text-sm text-red-400 mt-1 animate-fade-in">{formErrors.salary}</p>
                )}
              </div>
              {/* Experience Required */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Experience Required (Years)</label>
                <input
                  name="experienceRequired"
                  type="number"
                  value={formData.experienceRequired}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-800/80 text-gray-100 border ${
                    formErrors.experienceRequired ? 'border-red-500' : 'border-purple-500/50'
                  } focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 focus:outline-none transition-all duration-300 placeholder-gray-500`}
                  placeholder="Enter years of experience"
                  min="0"
                  step="1"
                  aria-invalid={!!formErrors.experienceRequired}
                  aria-describedby="experienceRequired-error"
                />
                {formErrors.experienceRequired && (
                  <p id="experienceRequired-error" className="text-sm text-red-400 mt-1 animate-fade-in">{formErrors.experienceRequired}</p>
                )}
              </div>
              {/* Qualification Required */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-200 mb-2">Qualification Required</label>
                <input
                  name="qualificationRequired"
                  value={formData.qualificationRequired}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-800/80 text-gray-100 border ${
                    formErrors.qualificationRequired ? 'border-red-500' : 'border-purple-500/50'
                  } focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 focus:outline-none transition-all duration-300 placeholder-gray-500`}
                  placeholder="Enter required qualification"
                  aria-invalid={!!formErrors.qualificationRequired}
                  aria-describedby="qualificationRequired-error"
                />
                {formErrors.qualificationRequired && (
                  <p id="qualificationRequired-error" className="text-sm text-red-400 mt-1 animate-fade-in">{formErrors.qualificationRequired}</p>
                )}
              </div>
              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-200 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-800/80 text-gray-100 border ${
                    formErrors.description ? 'border-red-500' : 'border-purple-500/50'
                  } focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 focus:outline-none transition-all duration-300 placeholder-gray-500`}
                  placeholder="Enter job description"
                  rows={6}
                  aria-invalid={!!formErrors.description}
                  aria-describedby="description-error"
                />
                {formErrors.description && (
                  <p id="description-error" className="text-sm text-red-400 mt-1 animate-fade-in">{formErrors.description}</p>
                )}
              </div>
              {/* Number of Openings */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Number of Openings</label>
                <input
                  name="noOfOpenings"
                  type="number"
                  value={formData.noOfOpenings}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-800/80 text-gray-100 border ${
                    formErrors.noOfOpenings ? 'border-red-500' : 'border-purple-500/50'
                  } focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 focus:outline-none transition-all duration-300 placeholder-gray-500`}
                  placeholder="Enter number of openings"
                  min="1"
                  step="1"
                  aria-invalid={!!formErrors.noOfOpenings}
                  aria-describedby="noOfOpenings-error"
                />
                {formErrors.noOfOpenings && (
                  <p id="noOfOpenings-error" className="text-sm text-red-400 mt-1 animate-fade-in">{formErrors.noOfOpenings}</p>
                )}
              </div>
              {/* Gender Specifics */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Gender Specifics</label>
                <select
                  name="genderSpecifics"
                  value={formData.genderSpecifics}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-800/80 text-gray-100 border ${
                    formErrors.genderSpecifics ? 'border-red-500' : 'border-purple-500/50'
                  } focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 focus:outline-none transition-all duration-300`}
                  aria-invalid={!!formErrors.genderSpecifics}
                  aria-describedby="genderSpecifics-error"
                >
                  <option value="Any">Any</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {formErrors.genderSpecifics && (
                  <p id="genderSpecifics-error" className="text-sm text-red-400 mt-1 animate-fade-in">{formErrors.genderSpecifics}</p>
                )}
              </div>
            </div>
            {/* Roles and Responsibilities */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Roles and Responsibilities</label>
              <div className="flex items-center space-x-3 mb-4">
                <input
                  value={roleInput}
                  onChange={handleRoleInputChange}
                  className={`flex-1 px-4 py-3 rounded-lg bg-gray-800/80 text-gray-100 border ${
                    formErrors.rolesAndResponsibilities ? 'border-red-500' : 'border-purple-500/50'
                  } focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 focus:outline-none transition-all duration-300 placeholder-gray-500`}
                  placeholder="Enter a role/responsibility"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddRole()}
                />
                <button
                  type="button"
                  onClick={handleAddRole}
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 px-6 rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105"
                  disabled={!roleInput.trim()}
                  aria-label="Add role"
                >
                  <FaPlus />
                  <span>Add</span>
                </button>
              </div>
              {formErrors.rolesAndResponsibilities && (
                <p className="text-sm text-red-400 mb-4 animate-fade-in">{formErrors.rolesAndResponsibilities}</p>
              )}
              <ul className="space-y-3">
                {formData.rolesAndResponsibilities.map((role, index) => (
                  role.trim() && (
                    <li
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg border border-purple-500/30 hover:bg-gray-700/70 transition-all duration-200"
                    >
                      <span className="text-gray-100">{role}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveRole(index)}
                        className="text-red-400 hover:text-red-300 transition-colors duration-200"
                        aria-label={`Remove role ${role}`}
                      >
                        <FaTimes />
                      </button>
                    </li>
                  )
                ))}
              </ul>
            </div>
            {/* Form Actions */}
            <div className="flex space-x-4 mt-8">
              <button
                type="button"
                onClick={() => navigate('/job-search-engine/business/profile')}
                className="flex-1 bg-gray-700/80 text-gray-200 py-3 px-6 rounded-lg hover:bg-gray-600/80 transition-all duration-300 transform hover:scale-105"
                aria-label="Cancel job posting"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 px-6 rounded-lg hover:from-purple-600 hover:to-indigo-600 disabled:opacity-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                aria-label="Post job"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Posting...
                  </>
                ) : (
                  'Post Job'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobPostForm;