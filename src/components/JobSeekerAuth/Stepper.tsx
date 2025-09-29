interface StepperProps {
  currentStep: number;
  steps: string[];
}

const Stepper = ({ currentStep, steps }: StepperProps) => {
  return (
    <div className="mb-8">
      {/* Stepper Container */}
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center relative z-10">
            {/* Step Circle */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 font-futuristic text-sm
                ${index <= currentStep
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-gray-700 text-gray-300'
                } hover:scale-110 hover:shadow-xl hover:shadow-purple-500/30`}
            >
              {index + 1}
            </div>
            {/* Step Label */}
            <p className="text-sm mt-2 text-gray-200 font-futuristic text-center">{step}</p>

            {/* Connecting Line (except for the last step) */}
            {index < steps.length - 1 && (
              <div
                className={`absolute top-4 -z-10 -right-20 w-[120px] h-1 transform translate-y-1/2 transition-colors duration-500
                  ${index < currentStep ? 'bg-purple-600' : 'bg-gray-700'}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Responsive Adjustments */}
      <style>{`
        @media (max-width: 640px) {
          .flex-col {
            font-size: 0.75rem;
          }
          .w-10 {
            width: 2rem;
            height: 2rem;
          }
          .text-sm {
            font-size: 0.65rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Stepper;