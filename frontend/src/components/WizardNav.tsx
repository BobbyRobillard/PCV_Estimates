// WizardNav.tsx

import React from 'react';

interface WizardNavProps {
  step: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  canProceed: boolean;
}

const WizardNav: React.FC<WizardNavProps> = ({ step, onNextStep, onPrevStep, canProceed }) => {
  return (
    <div className="d-flex justify-content-between mt-4">
      <button
        className="btn btn-outline-secondary"
        onClick={onPrevStep}
        disabled={step === 0}
      >
        Back
      </button>
      <button
        className="btn btn-primary"
        onClick={onNextStep}
        disabled={!canProceed}
      >
        Next
      </button>
    </div>
  );
};

export default WizardNav;
