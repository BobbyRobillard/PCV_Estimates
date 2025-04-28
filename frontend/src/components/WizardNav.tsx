import React from 'react';

interface WizardNavProps {
  step: number;
  setStep: (step: number) => void;
  canProceed: boolean;
}

const WizardNav: React.FC<WizardNavProps> = ({ step, setStep, canProceed }) => {
  return (
    <div className="d-flex justify-content-between mt-4">
      <button
        className="btn btn-secondary"
        onClick={() => setStep(step - 1)}
        disabled={step === 0}
      >
        Back
      </button>
      <button
        className="btn btn-primary"
        onClick={() => setStep(step + 1)}
        disabled={!canProceed}
      >
        {step === 4 ? 'Review' : 'Next'}
      </button>
    </div>
  );
};

export default WizardNav;