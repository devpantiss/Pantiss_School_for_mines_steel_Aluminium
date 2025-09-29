import { useState } from 'react';
import ICard from './ICard';
import { Experience, JobSeekerFormData } from '../../types/jobSeeker';

interface ExperienceFormProps {
  onNext: (data: JobSeekerFormData) => void;
  onBack: () => void;
}

const ExperienceForm = ({ onNext, onBack }: ExperienceFormProps) => {
  const [isFresher, setIsFresher] = useState(false);
  const [experiences, setExperiences] = useState<Experience[]>([
    { company: '', role: '', fromDate: '', toDate: '', tenure: '', lastIncome: 0 },
  ]);
  const [errors, setErrors] = useState<Array<{ [key: string]: string }>>(
    [{ company: '', role: '', fromDate: '', toDate: '', tenure: '', lastIncome: '' }]
  );

  const calculateTenure = (fromDate: string, toDate: string): string => {
    if (!fromDate || !toDate) return '';
    const start = new Date(fromDate);
    const end = new Date(toDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return 'Invalid: Invalid date format';
    }
    if (end < start) {
      return 'Invalid: To Date cannot be before From Date';
    }

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    if (months < 0) {
      years--;
      months += 12;
    }
    if (end.getDate() < start.getDate()) {
      months--;
      if (months < 0) {
        years--;
        months += 12;
      }
    }

    const yearText = years > 0 ? `${years} year${years !== 1 ? 's' : ''}` : '';
    const monthText = months > 0 ? `${months} month${months !== 1 ? 's' : ''}` : '';
    if (years === 0 && months === 0) {
      return 'Less than a month';
    }
    return [yearText, monthText].filter(Boolean).join(', ');
  };

  const validateExperience = (exp: Experience, _index: number): { [key: string]: string } => {
    const newErrors: { [key: string]: string } = {};
    if (!exp.company.trim()) newErrors.company = 'Company is required';
    if (!exp.role.trim()) newErrors.role = 'Role is required';
    if (!exp.fromDate) newErrors.fromDate = 'From Date is required';
    if (!exp.toDate) newErrors.toDate = 'To Date is required';
    if (!exp.tenure || exp.tenure.includes('Invalid')) {
      newErrors.tenure = exp.tenure.includes('Invalid') ? exp.tenure : 'Valid tenure is required';
    }
    if (!exp.lastIncome || exp.lastIncome <= 0) newErrors.lastIncome = 'Last Income must be greater than 0';
    return newErrors;
  };

  const handleAddExperience = () => {
    setExperiences([...experiences, { company: '', role: '', fromDate: '', toDate: '', tenure: '', lastIncome: 0 }]);
    setErrors([...errors, { company: '', role: '', fromDate: '', toDate: '', tenure: '', lastIncome: '' }]);
  };

  const handleRemoveExperience = (index: number) => {
    if (experiences.length === 1) return;
    setExperiences(experiences.filter((_, i) => i !== index));
    setErrors(errors.filter((_, i) => i !== index));
  };

  const handleExperienceChange = (index: number, field: keyof Experience, value: string | number) => {
    const newExperiences = [...experiences];
    const parsedValue = field === 'lastIncome' ? Number(value) || 0 : value;
    newExperiences[index] = { ...newExperiences[index], [field]: parsedValue };

    if (field === 'fromDate' || field === 'toDate') {
      const tenure = calculateTenure(newExperiences[index].fromDate, newExperiences[index].toDate);
      newExperiences[index].tenure = tenure;
    }

    setExperiences(newExperiences);

    const newErrors = [...errors];
    newErrors[index] = validateExperience(newExperiences[index], index);
    setErrors(newErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isFresher) {
      onNext({ experiences: 'Fresher' });
      return;
    }

    const newErrors = experiences.map((exp, index) => validateExperience(exp, index));
    setErrors(newErrors);

    const hasErrors = newErrors.some((error) => Object.values(error).some((msg) => msg));
    if (hasErrors) {
      return;
    }

    onNext({ experiences: experiences.map((exp) => ({
      ...exp,
      lastIncome: Number(exp.lastIncome),
    })) });
  };

  return (
    <ICard title="Experience Details">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="flex items-center text-gray-200">
            <input
              type="checkbox"
              checked={isFresher}
              onChange={(e) => {
                setIsFresher(e.target.checked);
                if (e.target.checked) {
                  setExperiences([{ company: '', role: '', fromDate: '', toDate: '', tenure: '', lastIncome: 0 }]);
                  setErrors([{ company: '', role: '', fromDate: '', toDate: '', tenure: '', lastIncome: '' }]);
                }
              }}
              className="mr-2 text-purple-600 focus:ring-purple-600"
            />
            I am a Fresher
          </label>
        </div>
        {!isFresher &&
          experiences.map((exp, index) => (
            <div key={index} className="border border-gray-600 p-4 rounded-md space-y-4">
              <div>
                <label htmlFor={`company-${index}`} className="block text-sm font-medium text-gray-200">
                  Company
                </label>
                <input
                  id={`company-${index}`}
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                  className="mt-1 p-2 block w-full border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:ring-purple-600 focus:border-purple-600"
                  required
                />
                {errors[index].company && (
                  <p className="text-red-400 text-sm font-futuristic">{errors[index].company}</p>
                )}
              </div>
              <div>
                <label htmlFor={`role-${index}`} className="block text-sm font-medium text-gray-200">
                  Role
                </label>
                <input
                  id={`role-${index}`}
                  type="text"
                  value={exp.role}
                  onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                  className="mt-1 p-2 block w-full border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:ring-purple-600 focus:border-purple-600"
                  required
                />
                {errors[index].role && (
                  <p className="text-red-400 text-sm font-futuristic">{errors[index].role}</p>
                )}
              </div>
              <div>
                <label htmlFor={`fromDate-${index}`} className="block text-sm font-medium text-gray-200">
                  From Date
                </label>
                <input
                  id={`fromDate-${index}`}
                  type="date"
                  value={exp.fromDate}
                  onChange={(e) => handleExperienceChange(index, 'fromDate', e.target.value)}
                  className="mt-1 p-2 block w-full border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:ring-purple-600 focus:border-purple-600"
                  required
                />
                {errors[index].fromDate && (
                  <p className="text-red-400 text-sm font-futuristic">{errors[index].fromDate}</p>
                )}
              </div>
              <div>
                <label htmlFor={`toDate-${index}`} className="block text-sm font-medium text-gray-200">
                  To Date
                </label>
                <input
                  id={`toDate-${index}`}
                  type="date"
                  value={exp.toDate}
                  onChange={(e) => handleExperienceChange(index, 'toDate', e.target.value)}
                  className="mt-1 p-2 block w-full border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:ring-purple-600 focus:border-purple-600"
                  required
                />
                {errors[index].toDate && (
                  <p className="text-red-400 text-sm font-futuristic">{errors[index].toDate}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200">Tenure</label>
                <p className="mt-1 text-gray-400 font-futuristic">
                  {exp.tenure || 'Select dates to calculate tenure'}
                </p>
                {errors[index].tenure && (
                  <p className="text-red-400 text-sm font-futuristic">{errors[index].tenure}</p>
                )}
              </div>
              <div>
                <label htmlFor={`lastIncome-${index}`} className="block text-sm font-medium text-gray-200">
                  Last Income (Annual)
                </label>
                <input
                  id={`lastIncome-${index}`}
                  type="number"
                  min="1"
                  value={exp.lastIncome || ''}
                  onChange={(e) => handleExperienceChange(index, 'lastIncome', e.target.value)}
                  className="mt-1 p-2 block w-full border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:ring-purple-600 focus:border-purple-600"
                  required
                />
                {errors[index].lastIncome && (
                  <p className="text-red-400 text-sm font-futuristic">{errors[index].lastIncome}</p>
                )}
              </div>
              {experiences.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveExperience(index)}
                  className="bg-red-600 text-white py-2 px-4 rounded-md shadow-lg hover:bg-red-700 transition-all duration-300 font-futuristic"
                >
                  Remove Experience
                </button>
              )}
            </div>
          ))}
        {!isFresher && (
          <button
            type="button"
            onClick={handleAddExperience}
            className="w-full bg-gray-700 text-gray-200 py-3 rounded-md shadow-lg hover:bg-gray-600 transition-all duration-300 font-futuristic"
          >
            Add Another Experience
          </button>
        )}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-700 text-gray-200 py-3 px-6 rounded-md shadow-lg hover:bg-gray-600 transition-all duration-300 font-futuristic"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={errors.some((error) => Object.values(error).some((msg) => msg)) && !isFresher}
            className="bg-purple-600 text-white py-3 px-6 rounded-md shadow-lg hover:bg-purple-700 transition-all duration-300 font-futuristic disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </form>
    </ICard>
  );
};

export default ExperienceForm;