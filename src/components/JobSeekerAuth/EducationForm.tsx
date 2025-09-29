import { useState } from 'react';
import ICard from './ICard';
import { Education, JobSeekerFormData } from '../../types/jobSeeker';

interface EducationFormProps {
  onNext: (data: JobSeekerFormData) => void;
  onBack: () => void;
}

const EducationForm = ({ onNext, onBack }: EducationFormProps) => {
  const [education, setEducation] = useState<Education[]>([
    { institute: '', qualification: '10th', fromDate: '', toDate: '', marks: 0 },
  ]);

  const handleAddEducation = () => {
    setEducation([...education, { institute: '', qualification: '10th', fromDate: '', toDate: '', marks: 0 }]);
  };

  const handleEducationChange = (index: number, field: keyof Education, value: string | number) => {
    const newEducation = [...education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setEducation(newEducation);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ education });
  };

  return (
    <ICard title="Education Details">
      <form onSubmit={handleSubmit} className="space-y-6">
        {education.map((edu, index) => (
          <div key={index} className="border border-gray-600 p-4 rounded-md">
            <div>
              <label htmlFor={`institute-${index}`} className="block text-sm font-medium text-gray-200">
                Institute
              </label>
              <input
                id={`institute-${index}`}
                type="text"
                value={edu.institute}
                onChange={(e) => handleEducationChange(index, 'institute', e.target.value)}
                className="mt-1 p-2 block w-full border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:ring-purple-600 focus:border-purple-600"
                required
              />
            </div>
            <div>
              <label htmlFor={`qualification-${index}`} className="block text-sm font-medium text-gray-200">
                Qualification
              </label>
              <select
                id={`qualification-${index}`}
                value={edu.qualification}
                onChange={(e) =>
                  handleEducationChange(index, 'qualification', e.target.value as '10th' | '12th' | 'Diploma')
                }
                className="mt-1 p-2 block w-full border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:ring-purple-600 focus:border-purple-600"
              >
                <option value="10th">10th</option>
                <option value="12th">12th</option>
                <option value="Diploma">Diploma</option>
              </select>
            </div>
            <div>
              <label htmlFor={`fromDate-${index}`} className="block text-sm font-medium text-gray-200">
                From Date
              </label>
              <input
                id={`fromDate-${index}`}
                type="date"
                value={edu.fromDate}
                onChange={(e) => handleEducationChange(index, 'fromDate', e.target.value)}
                className="mt-1 p-2 block w-full border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:ring-purple-600 focus:border-purple-600"
                required
              />
            </div>
            <div>
              <label htmlFor={`toDate-${index}`} className="block text-sm font-medium text-gray-200">
                To Date
              </label>
              <input
                id={`toDate-${index}`}
                type="date"
                value={edu.toDate}
                onChange={(e) => handleEducationChange(index, 'toDate', e.target.value)}
                className="mt-1 p-2 block w-full border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:ring-purple-600 focus:border-purple-600"
                required
              />
            </div>
            <div>
              <label htmlFor={`marks-${index}`} className="block text-sm font-medium text-gray-200">
                Marks (%)
              </label>
              <input
                id={`marks-${index}`}
                type="number"
                value={edu.marks}
                onChange={(e) => handleEducationChange(index, 'marks', Number(e.target.value))}
                className="mt-1 p-2 block w-full border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:ring-purple-600 focus:border-purple-600"
                required
                min="0"
                max="100"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddEducation}
          className="w-full bg-gray-700 text-gray-200 py-3 rounded-md shadow-lg hover:bg-gray-600 transition-all duration-300 font-futuristic"
        >
          Add Another Education
        </button>
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
            className="bg-purple-600 text-white py-3 px-6 rounded-md shadow-lg hover:bg-purple-700 transition-all duration-300 font-futuristic"
          >
            Next
          </button>
        </div>
      </form>
    </ICard>
  );
};

export default EducationForm;