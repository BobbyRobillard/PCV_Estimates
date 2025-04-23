import React from 'react';

interface WizardNavProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  maxStep: number;
  setIsFinalStep: (done: boolean) => void;
}

const WizardNav: React.FC<WizardNavProps> = ({ currentStep, setCurrentStep, maxStep, setIsFinalStep }) => {
  return (
    <div className="flex justify-between mt-6">
      <button
        onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
        className="px-4 py-2 bg-gray-300 rounded"
        disabled={currentStep === 0}
      >
        Back
      </button>
      {currentStep < maxStep ? (
        <button
          onClick={() => setCurrentStep(Math.min(maxStep, currentStep + 1))}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Next
        </button>
      ) : (
        <button
          onClick={() => setIsFinalStep(true)}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Finish Items
        </button>
      )}
    </div>
  );
};

export default WizardNav;