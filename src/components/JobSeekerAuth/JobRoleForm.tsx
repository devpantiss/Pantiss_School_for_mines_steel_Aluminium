import { useState } from 'react';
import ICard from './ICard';
import { JobSeekerFormData } from '../../types/jobSeeker';
import { FaShieldAlt, FaTools, FaBolt, FaTractor, FaTruck } from 'react-icons/fa';

interface JobRoleFormProps {
  onNext: (data: JobSeekerFormData) => void;
  onBack: () => void;
}

const roles = [
  { name: 'Security Guard', icon: <FaShieldAlt className="text-4xl text-purple-400" /> },
  { name: 'Welder', icon: <FaTools className="text-4xl text-purple-400" /> },
  { name: 'Electrician', icon: <FaBolt className="text-4xl text-purple-400" /> },
  { name: 'Excavator Operator', icon: <FaTractor className="text-4xl text-purple-400" /> },
  { name: 'Dumper Operator', icon: <FaTruck className="text-4xl text-purple-400" /> },
];

const JobRoleForm = ({ onNext, onBack }: JobRoleFormProps) => {
  const [jobRole, setJobRole] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobRole) {
      alert('Please select a role');
      return;
    }
    onNext({ jobRole });
  };

  return (
    <ICard title="Select Job Role">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roles.map((role) => (
            <div
              key={role.name}
              onClick={() => setJobRole(role.name)}
              className={`flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all duration-300 border-2 ${
                jobRole === role.name ? 'border-purple-600 bg-gray-800' : 'border-gray-600 bg-gray-900'
              } hover:bg-gray-800`}
            >
              {role.icon}
              <p className="mt-2 text-gray-200 font-futuristic">{role.name}</p>
            </div>
          ))}
        </div>
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

export default JobRoleForm;