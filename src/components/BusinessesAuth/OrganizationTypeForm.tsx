import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBuilding, FaUser } from 'react-icons/fa';
import { BusinessFormData } from '../../types/businessTypes';

interface Errors {
  organizationType?: string;
}

interface OrganizationTypeFormProps {
  formData: BusinessFormData;
  updateFormData: (data: Partial<BusinessFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const OrganizationTypeForm: React.FC<OrganizationTypeFormProps> = React.memo(
  ({ formData, updateFormData, onNext, onBack }) => {
    const [organizationType, setOrganizationType] = useState<BusinessFormData['organizationType']>(
      formData.organizationType || ''
    );
    const [errors, setErrors] = useState<Errors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = (): boolean => {
      const newErrors: Errors = {};
      let isValid = true;

      if (!organizationType || !['Organization', 'Nano Contractor'].includes(organizationType)) {
        newErrors.organizationType = 'Organization type is required';
        isValid = false;
      }

      setErrors(newErrors);
      return isValid;
    };

    const handleTypeChange = (type: 'Organization' | 'Nano Contractor') => {
      setOrganizationType(type);
    };

    const onSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateForm()) return;
      setIsSubmitting(true);
      updateFormData({ organizationType });
      setIsSubmitting(false);
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
          Organization Type
        </h2>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-200 tracking-wide">
              Select Organization Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleTypeChange('Organization')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleTypeChange('Organization');
                  }
                }}
                className={`p-4 rounded-lg border bg-gradient-to-r from-gray-800 to-gray-900 text-gray-200 cursor-pointer transition-all duration-500 ${
                  organizationType === 'Organization'
                    ? 'border-purple-600 shadow-[0_0_15px_#7c3aed] scale-105'
                    : 'border-purple-600/30 hover:shadow-[0_0_10px_#7c3aed] hover:scale-105'
                } ${errors.organizationType ? 'border-red-500' : ''}`}
                aria-invalid={!!errors.organizationType}
                aria-describedby="organizationType-error"
              >
                <FaBuilding
                  className={`h-8 w-8 mx-auto mb-2 text-purple-400 ${
                    organizationType === 'Organization'
                      ? 'shadow-[0_0_5px_#7c3aed]'
                      : 'hover:shadow-[0_0_5px_#7c3aed]'
                  } transition-shadow duration-500`}
                  aria-hidden="true"
                />
                <h3 className="text-lg font-semibold text-center">Organization</h3>
                <p className="text-sm text-gray-400 text-center">
                  A business entity with multiple employees and structured operations.
                </p>
              </div>
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleTypeChange('Nano Contractor')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleTypeChange('Nano Contractor');
                  }
                }}
                className={`p-4 rounded-lg border bg-gradient-to-r from-gray-800 to-gray-900 text-gray-200 cursor-pointer transition-all duration-500 ${
                  organizationType === 'Nano Contractor'
                    ? 'border-purple-600 shadow-[0_0_15px_#7c3aed] scale-105'
                    : 'border-purple-600/30 hover:shadow-[0_0_10px_#7c3aed] hover:scale-105'
                } ${errors.organizationType ? 'border-red-500' : ''}`}
                aria-invalid={!!errors.organizationType}
                aria-describedby="organizationType-error"
              >
                <FaUser
                  className={`h-8 w-8 mx-auto mb-2 text-purple-400 ${
                    organizationType === 'Nano Contractor'
                      ? 'shadow-[0_0_5px_#7c3aed]'
                      : 'hover:shadow-[0_0_5px_#7c3aed]'
                  } transition-shadow duration-500`}
                  aria-hidden="true"
                />
                <h3 className="text-lg font-semibold text-center">Nano Contractor</h3>
                <p className="text-sm text-gray-400 text-center">
                  An individual or small-scale contractor operating independently.
                </p>
              </div>
            </div>
            {errors.organizationType && (
              <p id="organizationType-error" className="text-sm text-red-500">
                {errors.organizationType}
              </p>
            )}
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 bg-gradient-to-r from-gray-800 to-gray-900 text-gray-200 py-3 px-4 rounded-lg hover:bg-gray-700 hover:-rotate-1 shadow-[0_0_8px_#7c3aed] hover:shadow-[0_0_12px_#7c3aed] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-500"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 px-4 rounded-lg hover:bg-purple-700 hover:-rotate-1 disabled:opacity-50 shadow-[0_0_12px_#7c3aed] hover:shadow-[0_0_20px_#7c3aed] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-500"
            >
              {isSubmitting ? 'Processing...' : 'Next'}
            </button>
          </div>
        </form>
      </motion.div>
    );
  }
);