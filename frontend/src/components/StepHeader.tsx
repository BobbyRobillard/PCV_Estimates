// StepHeader.tsx

import React from 'react';

interface StepHeaderProps {
  step: number;
  title: string;
  className?: string;
}

const StepHeader: React.FC<StepHeaderProps> = ({ step, title, className }) => {
  return (
    <h2 className={className || "info-title alert alert-primary"}>
      Step {step} - {title}
    </h2>
  );
};

export default StepHeader;
