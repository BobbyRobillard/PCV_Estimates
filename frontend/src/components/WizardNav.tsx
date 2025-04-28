// WizardNav.tsx

import React from 'react';

interface WizardNavProps {
  step: number;
  onPrevStep: () => void;
  onNextStep: () => void;
  canProceed: boolean;
}

const WizardNav = ({ step, onPrevStep, onNextStep, canProceed }: WizardNavProps) => {
  return (
    <div>
      <button
        className="btn btn-secondary"
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
