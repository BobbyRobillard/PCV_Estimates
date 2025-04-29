// StepCanvas.tsx

import React, { useEffect } from 'react';
import { CanvasType } from '../types/canvasTypes';
import StepHeader from './StepHeader';

interface StepCanvasProps {
  selectedPrimary: CanvasType | null;
  selectedSubTypes: string[];
  selectedHullType: string;
  setSelectedPrimary: (primary: CanvasType | null) => void;
  setSelectedSubTypes: (subs: string[]) => void;
  setSelectedHullType: (hull: string) => void;
  setCanvasComplete: (complete: boolean) => void;
}

const StepCanvas: React.FC<StepCanvasProps> = ({
  selectedPrimary,
  selectedSubTypes,
  selectedHullType,
  setSelectedPrimary,
  setSelectedSubTypes,
  setSelectedHullType,
  setCanvasComplete
}) => {
  const airboatSubTypes = ['Hull Wrap', 'Console Wrap', 'Rudder Wrap', 'Dry Box Wrap'];
  const boatSubTypes = ['Flats Boat Wrap', 'Center Console Wrap', 'Bay Boat Wrap', 'Pontoon Boat Wrap', 'Jon Boat Wrap', 'Other'];
  const digitalSubTypes = ['Logo Design', 'Business Card Design', 'Apparel Design', 'Sticker Design', 'Banner Design'];
  const hullOptions = ['Step Hull', 'Deckover Hull', 'Open Hull'];

  const getSubTypesForPrimary = () => {
    switch (selectedPrimary) {
      case CanvasType.Airboat: return airboatSubTypes;
      case CanvasType.Boat: return boatSubTypes;
      case CanvasType.DigitalGraphics: return digitalSubTypes;
      default: return [];
    }
  };

  const toggleSubType = (subType: string) => {
    const updated = selectedSubTypes.includes(subType)
      ? selectedSubTypes.filter(st => st !== subType)
      : [...selectedSubTypes, subType];

    setSelectedSubTypes(updated);
  };

  // Auto-check if canvas step can proceed
  useEffect(() => {
    let complete = false;
    if (selectedPrimary && selectedSubTypes.length > 0) {
      if (selectedSubTypes.includes('Hull Wrap')) {
        complete = selectedHullType.trim().length > 0;
      } else {
        complete = true;
      }
    }
    setCanvasComplete(complete);
  }, [selectedPrimary, selectedSubTypes, selectedHullType, setCanvasComplete]);

  const handlePrimaryTypeChange = (type: CanvasType) => {
    setSelectedPrimary(type);
    setSelectedSubTypes([]);     // 💥 Clear sub-types when switching types
    setSelectedHullType('');      // 💥 Clear hull type when switching types
  };

  return (
    <div>
      <StepHeader step={1} title="Select Your Canvas" />
      <h3>Select Primary Type</h3>
      <div className="d-flex flex-wrap gap-2 mb-4">
        {Object.values(CanvasType).map(type => (
          <button
            key={type}
            className={`btn ${selectedPrimary === type ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => handlePrimaryTypeChange(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {selectedPrimary && (
        <>
          <h4>Select Sub-Types</h4>
          <div className="d-flex flex-wrap gap-2 mb-4">
            {getSubTypesForPrimary().map(subType => (
              <button
                key={subType}
                className={`btn ${selectedSubTypes.includes(subType) ? 'btn-success' : 'btn-outline-success'}`}
                onClick={() => toggleSubType(subType)}
              >
                {subType}
              </button>
            ))}
          </div>

          {selectedSubTypes.includes('Hull Wrap') && (
            <>
              <h4>Select Hull Type</h4>
              <div className="d-flex flex-wrap gap-2 mb-4">
                {hullOptions.map(hull => (
                  <button
                    key={hull}
                    className={`btn ${selectedHullType === hull ? 'btn-info' : 'btn-outline-info'}`}
                    onClick={() => setSelectedHullType(hull)}
                  >
                    {hull}
                  </button>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default StepCanvas;
