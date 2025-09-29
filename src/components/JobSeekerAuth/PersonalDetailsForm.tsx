import { useState, useRef } from 'react';
import ICard from './ICard';
import { JobSeekerFormData } from '../../types/jobSeeker';
import { FaTimes } from 'react-icons/fa';

interface PersonalDetailsFormProps {
  onNext: (data: JobSeekerFormData) => void;
  onBack: () => void;
}

type FileField = 'aadharFile' | 'profilePic' | 'certificate' | 'license';

const PersonalDetailsForm = ({ onNext, onBack }: PersonalDetailsFormProps) => {
  const [formData, setFormData] = useState<JobSeekerFormData>({
    dob: '',
    aadhar: '',
    aadharFile: undefined,
    profilePic: undefined,
    certificate: undefined,
    license: undefined,
    bio: '',
    gender: 'Male',
  });
  const [ageError, setAgeError] = useState('');
  const [bioError, setBioError] = useState('');
  const [filePreviews, setFilePreviews] = useState<Record<FileField, string | null>>({
    aadharFile: null,
    profilePic: null,
    certificate: null,
    license: null,
  });

  const fileInputRefs = {
    aadharFile: useRef<HTMLInputElement>(null),
    profilePic: useRef<HTMLInputElement>(null),
    certificate: useRef<HTMLInputElement>(null),
    license: useRef<HTMLInputElement>(null),
  };

  const MAX_WORDS = 700;

  const calculateAge = (dob: string) => {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const countWords = (text: string) => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newBio = e.target.value;
    const wordCount = countWords(newBio);
    if (wordCount <= MAX_WORDS) {
      setFormData((prev) => ({ ...prev, bio: newBio }));
      setBioError('');
    } else {
      setBioError(`Bio exceeds ${MAX_WORDS} words. Current: ${wordCount} words.`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: FileField) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [field]: file }));
      const previewUrl = URL.createObjectURL(file);
      setFilePreviews((prev) => ({ ...prev, [field]: previewUrl }));
    }
  };

  const handleRemoveFile = (field: FileField) => {
    setFormData((prev) => ({ ...prev, [field]: undefined }));
    setFilePreviews((prev) => ({ ...prev, [field]: null }));
    if (fileInputRefs[field].current) {
      fileInputRefs[field].current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAgeError('');
    setBioError('');

    const age = calculateAge(formData.dob || '');
    if (age < 18) {
      setAgeError('Age must be 18 or above');
      return;
    }
    if (!formData.aadhar || !/^\d{12}$/.test(formData.aadhar)) {
      setAgeError('Valid 12-digit Aadhar number is required');
      return;
    }
    if (countWords(formData.bio || '') > MAX_WORDS) {
      setBioError(`Bio exceeds ${MAX_WORDS} words. Please reduce the word count.`);
      return;
    }
    onNext(formData);
  };

  const renderFileInput = (field: FileField, label: string, accept?: string) => (
    <div>
      <label htmlFor={field} className="block text-sm font-medium text-gray-200">
        {label}
      </label>
      {filePreviews[field] ? (
        <div className="relative mt-1">
          <img
            src={filePreviews[field]!}
            alt={`${label} preview`}
            className="h-40 w-auto rounded-md object-cover"
          />
          <button
            type="button"
            onClick={() => handleRemoveFile(field)}
            className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-all duration-200"
            aria-label={`Remove ${label}`}
          >
            <FaTimes size={14} />
          </button>
        </div>
      ) : (
        <div className="mt-1">
          <input
            id={field}
            type="file"
            accept={accept}
            onChange={(e) => handleFileChange(e, field)}
            className="hidden"
            ref={fileInputRefs[field]}
          />
          <button
            type="button"
            onClick={() => fileInputRefs[field].current?.click()}
            className="bg-gray-700 text-gray-200 py-2 px-4 rounded-md shadow-sm hover:bg-gray-600 transition-all duration-300 font-futuristic flex items-center"
          >
            <span>Choose {label}</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <ICard title="Personal Details">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="dob" className="block text-sm font-medium text-gray-200">
            Date of Birth
          </label>
          <input
            id="dob"
            type="date"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            className="mt-1 p-2 block w-full border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:ring-purple-600 focus:border-purple-600"
            required
          />
          {formData.dob && (
            <p className="text-gray-400 text-sm mt-1 font-futuristic">
              Age: {calculateAge(formData.dob)} years
            </p>
          )}
          {ageError && <p className="text-red-400 text-sm font-futuristic">{ageError}</p>}
        </div>
        <div>
          <label htmlFor="aadhar" className="block text-sm font-medium text-gray-200">
            Aadhar Number
          </label>
          <input
            id="aadhar"
            type="text"
            value={formData.aadhar}
            onChange={(e) => setFormData({ ...formData, aadhar: e.target.value })}
            className="mt-1 p-2 block w-full border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:ring-purple-600 focus:border-purple-600"
            required
          />
        </div>
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-200">
            Bio
          </label>
          <textarea
            id="bio"
            value={formData.bio}
            onChange={handleBioChange}
            placeholder="Enter Your Bio - Max 700 Words"
            className={`mt-1 p-2 block w-full border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:ring-purple-600 focus:border-purple-600 ${bioError ? 'border-red-400' : ''}`}
            rows={5}
          />
          <p className="text-gray-400 text-sm mt-1 font-futuristic">
            Word count: {countWords(formData.bio || '')}/{MAX_WORDS}
          </p>
          {bioError && <p className="text-red-400 text-sm mt-1 font-futuristic">{bioError}</p>}
        </div>
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-200">
            Gender
          </label>
          <select
            id="gender"
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value as 'Male' | 'Female' | 'Others' })
            }
            className="mt-1 p-2 block w-full border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:ring-purple-600 focus:border-purple-600"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>
        {renderFileInput('aadharFile', 'Aadhar File')}
        {renderFileInput('profilePic', 'Profile Picture', 'image/*')}
        {renderFileInput('certificate', 'Certificate')}
        {renderFileInput('license', 'License')}
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

export default PersonalDetailsForm;