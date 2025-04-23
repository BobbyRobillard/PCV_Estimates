import React from 'react';

interface StepIntroProps {
  step: number;
}

const stepContent = [
  { title: 'Select Your Canvas', description: 'Need something else designed? No worries!', buttonText: 'Contact Us' },
  { title: 'Select Inspiration', description: 'Choose up to 5 images that reflect your style.' },
  { title: 'Upload a Design', description: 'Add any past design, sketch or reference image.' },
  { title: 'Your Info', description: 'Let us know how to get in touch with you.' },
];

const StepIntro: React.FC<StepIntroProps> = ({ step }) => {
  const { title, description, buttonText } = stepContent[step] || {};

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700 mb-2">{description}</p>
      {buttonText && (
        <button
          className="mt-2 px-4 py-2 text-sm text-white bg-blue-600 rounded"
          onClick={() => window.open('mailto:info@example.com')}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default StepIntro;