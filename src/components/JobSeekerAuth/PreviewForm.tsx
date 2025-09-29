import { useState } from "react";
import ICard from "./ICard";
import { JobSeekerFormData } from "../../types/jobSeeker";
import FilePreview from "./FilePreview";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface PreviewFormProps {
  formData: JobSeekerFormData;
  onBack: () => void;
  onSubmit: (data: JobSeekerFormData) => Promise<void>; // Updated to async
}

const PreviewForm = ({ formData, onBack, onSubmit }: PreviewFormProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleImageClick = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
      setSelectedImage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      toast.success("Signup successful! Redirecting to your profile...");
      navigate("/job-search-engine/job-seekers/profile");
    } catch (error) {
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <ICard title="Preview Your Information">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-200">
            Personal Information
          </h3>
          <p className="text-gray-400 font-futuristic">
            Email: {formData.email}
          </p>
          <p className="text-gray-400 font-futuristic">Name: {formData.name}</p>
          <p className="text-gray-400 font-futuristic">
            Mobile: {formData.mobile}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-200">Job Role</h3>
          <p className="text-gray-400 font-futuristic">{formData.jobRole}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-200">
            Personal Details
          </h3>
          <p className="text-gray-400 font-futuristic">
            Date of Birth: {formData.dob}
          </p>
          <p className="text-gray-400 font-futuristic">
            Aadhar: {formData.aadhar}
          </p>
          <p className="text-gray-400 font-futuristic">
            Bio: {formData.bio || "N/A"}
          </p>
          <p className="text-gray-400 font-futuristic">
            Gender: {formData.gender}
          </p>

          <div className="grid grid-cols-2 gap-y-3 mt-5">
            {formData.aadharFile && (
              <div>
                <p className="text-gray-400 font-futuristic">Aadhar File:</p>
                <div
                  className="cursor-pointer"
                  onClick={() => handleImageClick(formData.aadharFile!)}
                >
                  <FilePreview file={formData.aadharFile} />
                </div>
              </div>
            )}
            {formData.profilePic && (
              <div>
                <p className="text-gray-400 font-futuristic">
                  Profile Picture:
                </p>
                <div
                  className="cursor-pointer"
                  onClick={() => handleImageClick(formData.profilePic!)}
                >
                  <FilePreview file={formData.profilePic} />
                </div>
              </div>
            )}
            {formData.certificate && (
              <div>
                <p className="text-gray-400 font-futuristic">Certificate:</p>
                <div
                  className="cursor-pointer"
                  onClick={() => handleImageClick(formData.certificate!)}
                >
                  <FilePreview file={formData.certificate} />
                </div>
              </div>
            )}
            {formData.license && (
              <div>
                <p className="text-gray-400 font-futuristic">License:</p>
                <div
                  className="cursor-pointer"
                  onClick={() => handleImageClick(formData.license!)}
                >
                  <FilePreview file={formData.license} />
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-200">Education</h3>
          <div className="grid grid-cols-2 gap-x-2">
            {formData.education?.map((edu, index) => (
              <div key={index} className="text-gray-400 font-futuristic">
                <p>Institute: {edu.institute}</p>
                <p>Qualification: {edu.qualification}</p>
                <p>From: {edu.fromDate}</p>
                <p>To: {edu.toDate}</p>
                <p>Marks: {edu.marks}%</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-200">Experience</h3>
          <div className="grid grid-cols-2 gap-x-2">
            {formData.experiences === "Fresher" ? (
              <p className="text-gray-400 font-futuristic">Fresher</p>
            ) : (
              formData.experiences?.map((exp, index) => (
                <div key={index} className="text-gray-400 font-futuristic">
                  <p>Company: {exp.company}</p>
                  <p>Role: {exp.role}</p>
                  <p>From: {exp.fromDate}</p>
                  <p>To: {exp.toDate}</p>
                  <p>Tenure: {exp.tenure}</p>
                  <p>Last Income: {exp.lastIncome}</p>
                </div>
              ))
            )}
          </div>
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
            Confirm and Signup
          </button>
        </div>
      </form>

      {/* Modal for Image Preview */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative bg-gray-800 rounded-lg p-4 max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-all duration-200"
              aria-label="Close modal"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Full-size preview"
                className="w-full h-auto max-h-[80vh] object-contain rounded-md"
              />
            )}
          </div>
        </div>
      )}
    </ICard>
  );
};

export default PreviewForm;