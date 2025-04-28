import React from 'react';

interface StepCanvasProps {
  onSelect: (canvas_type: string) => void;
}

const canvasOptions = ['Airboat', 'Boat', 'Vehicle', 'Digital', 'Branding'];

const StepCanvas: React.FC<StepCanvasProps> = ({ onSelect }) => {
  return (
    <div>
      <h3>Select Your Canvas</h3>
      <div className="d-flex flex-wrap gap-2">
        {canvasOptions.map(type => (
          <button
            key={type}
            className="btn btn-outline-primary"
            onClick={() => onSelect(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StepCanvas;
