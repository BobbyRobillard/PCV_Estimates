// App.tsx

import React, { useState } from 'react';
import StepCanvas from './components/StepCanvas';
import StepInspiration from './components/StepInspiration';
import StepUpload from './components/StepUpload';
import StepReview from './components/StepReview';
import SidebarItemList from './components/SidebarItemList';
import WizardNav from './components/WizardNav';
import { EstimateItem } from './types/EstimateItem';
import { CanvasType } from './types/canvasTypes';

const App: React.FC = () => {
  const [items, setItems] = useState<EstimateItem[]>([]);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [step, setStep] = useState(0);

  const [selectedPrimary, setSelectedPrimary] = useState<CanvasType | null>(null);
  const [selectedSubTypes, setSelectedSubTypes] = useState<string[]>([]);
  const [selectedHullType, setSelectedHullType] = useState<string>('');
  const [canvasComplete, setCanvasComplete] = useState(false);

  const [formData, setFormData] = useState<{
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    special_requests: string;
    text_permission: boolean;
  }>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    special_requests: '',
    text_permission: false
  });

  const activeItem = items.find((item) => item.id === activeItemId) || null;

  const handleNextStep = () => {
    if (step === 0 && selectedPrimary && selectedSubTypes.length > 0) {
      if (activeItemId) {
        // Edit existing item
        setItems(prev => prev.map(item =>
          item.id === activeItemId
            ? { ...item, canvas_type: selectedPrimary, sub_types: selectedSubTypes, hull_subtype: selectedHullType }
            : item
        ));
        console.log('Edited existing item');
      } else {
        // Create new item
        const newItem: EstimateItem = {
          id: crypto.randomUUID(),
          canvas_type: selectedPrimary,
          sub_types: selectedSubTypes,
          hull_subtype: selectedHullType,
          inspiration_images: [],
          uploads: [],
          isDraft: true
        };
        setItems(prev => [...prev, newItem]);
        setActiveItemId(newItem.id);
        console.log('New item created');
      }
    }

    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(prev - 1, 0));
  };

  const updateActiveItem = (updated: EstimateItem) => {
    setItems((prev) => prev.map((item) => item.id === updated.id ? updated : item));
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    if (id === activeItemId) {
      setActiveItemId(null);
      setStep(0);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* LEFT SIDE */}
        <div className={`${step === 3 ? 'col-12' : 'col-md-9'} p-4`}>
          {step === 0 && (
            <StepCanvas
              setSelectedPrimary={setSelectedPrimary}
              setSelectedSubTypes={setSelectedSubTypes}
              setSelectedHullType={setSelectedHullType}
              setCanvasComplete={setCanvasComplete}
              currentItem={activeItem}
            />
          )}
          {step === 1 && activeItem && (
            <StepInspiration
              item={activeItem}
              updateItem={updateActiveItem}
            />
          )}
          {step === 2 && activeItem && (
            <StepUpload
              item={activeItem}
              updateItem={updateActiveItem}
            />
          )}
          {step === 3 && (
            <StepReview
              items={items}
              formData={formData}
              setFormData={setFormData}
              setStep={setStep}
              setActiveItemId={setActiveItemId}
            />
          )}

          {step < 3 && (
            <WizardNav
              step={step}
              onNextStep={handleNextStep}
              onPrevStep={handlePrevStep}
              canProceed={(step === 0 && canvasComplete) || (step > 0 && Boolean(activeItem))}
            />
          )}
        </div>

        {/* RIGHT SIDE */}
        {step < 3 && (
          <div className="col-md-3 p-3 border-start bg-light">
            <SidebarItemList
              items={items}
              activeItemId={activeItemId}
              setActiveItemId={setActiveItemId}
              onDelete={deleteItem}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
