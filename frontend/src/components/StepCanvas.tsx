// StepCanvas.tsx

import React, { useState, useEffect } from 'react';
import { CanvasType } from '../types/canvasTypes';
import { EstimateItem } from '../types/EstimateItem';

interface StepCanvasProps {
  setSelectedPrimary: (primary: CanvasType) => void;
  setSelectedSubTypes: (subs: string[]) => void;
  setSelectedHullType: (hull: string) => void;
  setCanvasComplete: (complete: boolean) => void;
  currentItem: EstimateItem | null; // <--- NEW
}

const StepCanvas: React.FC<StepCanvasProps> = ({
  setSelectedPrimary,
  setSelectedSubTypes,
  setSelectedHullType,
  setCanvasComplete,
  currentItem
}) => {
  const [primaryType, setPrimaryType] = useState<CanvasType | null>(null);
  const [selectedSubTypes, setLocalSubTypes] = useState<string[]>([]);
  const [hullSubtype, setHullSubtype] = useState<string>('');

  const airboatSubTypes = ['Hull Wrap', 'Console Wrap', 'Rudder Wrap', 'Dry Box Wrap'];
  const boatSubTypes = ['Flats Boat Wrap', 'Center Console Wrap', 'Bay Boat Wrap', 'Pontoon Boat Wrap', 'Jon Boat Wrap', 'Other'];
  const digitalSubTypes = ['Logo Design', 'Business Card Design', 'Apparel Design', 'Sticker Design', 'Banner Design'];
  const hullOptions = ['Step Hull', 'Deckover Hull', 'Open Hull'];

  const getSubTypesForPrimary = () => {
    switch (primaryType) {
      case CanvasType.Airboat: return airboatSubTypes;
      case CanvasType.Boat: return boatSubTypes;
      case CanvasType.DigitalGraphics: return digitalSubTypes;
      default: return [];
    }
  };

  useEffect(() => {
    if (currentItem) {
      setPrimaryType(currentItem.canvas_type);
      setLocalSubTypes(currentItem.sub_types || []);
      setHullSubtype(currentItem.hull_subtype || '');
      setSelectedPrimary(currentItem.canvas_type);
      setSelectedSubTypes(currentItem.sub_types || []);
      setSelectedHullType(currentItem.hull_subtype || '');
    }
  }, [currentItem, setSelectedPrimary, setSelectedSubTypes, setSelectedHullType]);

  const handlePrimaryTypeSelect = (type: CanvasType) => {
    setPrimaryType(type);
    setLocalSubTypes([]);
    setHullSubtype('');
    setSelectedPrimary(type);
  };

  const toggleSubType = (subType: string) => {
    const updated = selectedSubTypes.includes(subType)
      ? selectedSubTypes.filter(st => st !== subType)
      : [...selectedSubTypes, subType];

    setLocalSubTypes(updated);
    setSelectedSubTypes(updated);
  };

  const handleHullTypeSelect = (hull: string) => {
    setHullSubtype(hull);
    setSelectedHullType(hull);
  };

  useEffect(() => {
    let complete = false;

    if (primaryType && selectedSubTypes.length > 0) {
      if (selectedSubTypes.includes('Hull Wrap')) {
        complete = hullSubtype.trim().length > 0;
      } else {
        complete = true;
      }
    }

    setCanvasComplete(complete);
  }, [primaryType, selectedSubTypes, hullSubtype, setCanvasComplete]);

  return (
    <div>
      <h3>Select Primary Type</h3>
      <div className="d-flex flex-wrap gap-2 mb-4">
        {Object.values(CanvasType).map(type => (
          <button
            key={type}
            className={`btn ${primaryType === type ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => handlePrimaryTypeSelect(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {primaryType && (
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
                    className={`btn ${hullSubtype === hull ? 'btn-info' : 'btn-outline-info'}`}
                    onClick={() => handleHullTypeSelect(hull)}
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
