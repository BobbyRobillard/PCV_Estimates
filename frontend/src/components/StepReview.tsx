import React from 'react';

interface StepReviewProps {
  items: any[];
}

const StepReview: React.FC<StepReviewProps> = ({ items }) => {
  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Review Your Estimate</h3>
      {items.map((item, index) => (
        <div key={item.id} className="mb-2">
          <p>
            Item {index + 1}: {item.canvas_type} – {item.sub_type}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StepReview;