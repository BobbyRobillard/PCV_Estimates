// App.tsx

import React, { useEffect, useState } from 'react';
import StepCanvas from './components/StepCanvas';
import StepInspiration from './components/StepInspiration';
import StepUpload from './components/StepUpload';
import StepReview from './components/StepReview';
import SidebarItemList from './components/SidebarItemList';
import WizardNav from './components/WizardNav';
import RefreshWarningBanner from './components/RefreshWarningBanner';
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

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    special_requests: '',
    text_permission: false
  });

  const activeItem = items.find((item) => item.id === activeItemId) || null;

  useEffect(() => {
    if (step === 0 && activeItem) {
      setSelectedPrimary(activeItem.canvas_type);
      setSelectedSubTypes(activeItem.sub_types);
      setSelectedHullType(activeItem.hull_subtype || '');
      setCanvasComplete(true);
    } else if (step === 0 && !activeItemId) {
      setSelectedPrimary(null);
      setSelectedSubTypes([]);
      setSelectedHullType('');
      setCanvasComplete(false);
    }
  }, [activeItem, activeItemId, step]);

  const handleNextStep = () => {
    if (step === 0) {
      if (!selectedPrimary || selectedSubTypes.length === 0) return;

      const hullValue = selectedSubTypes.includes('Hull Wrap') ? selectedHullType : '';

      if (activeItemId) {
        const updatedItem: EstimateItem = {
          ...activeItem!,
          canvas_type: selectedPrimary,
          sub_types: selectedSubTypes,
          hull_subtype: hullValue
        };
        updateActiveItem(updatedItem);
      } else {
        const newItem: EstimateItem = {
          id: crypto.randomUUID(),
          canvas_type: selectedPrimary,
          sub_types: selectedSubTypes,
          hull_subtype: hullValue,
          inspiration_images: [],
          uploads: [],
          isDraft: true
        };
        setItems(prev => [...prev, newItem]);
        setActiveItemId(newItem.id);
        setSelectedHullType('');
      }
    }

    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(prev - 1, 0));
  };

  const updateActiveItem = (updated: EstimateItem) => {
    setItems(prev => prev.map((item) => item.id === updated.id ? updated : item));
  };

  const deleteItem = (id: string) => {
    setItems(prev => {
      const updated = prev.filter(item => item.id !== id);

      if (updated.length === 0) {
        setStep(0);
        setActiveItemId(null);
      } else {
        if (id === activeItemId) {
          setActiveItemId(null);
        }
      }

      return updated;
    });
  };

  // Show native browser warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (items.length > 0) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [items]);

  return (
    <div className="container-fluid">
      {items.length > 0 && (
        <div className="row">
          <div className="col-12">
            <RefreshWarningBanner />
          </div>
        </div>
      )}

      <div className="row">
        <div className={`${step === 3 ? 'col-12' : 'col-md-9'} p-4`}>
          {step === 0 && (
            <StepCanvas
              selectedPrimary={selectedPrimary}
              selectedSubTypes={selectedSubTypes}
              selectedHullType={selectedHullType}
              setSelectedPrimary={setSelectedPrimary}
              setSelectedSubTypes={setSelectedSubTypes}
              setSelectedHullType={setSelectedHullType}
              setCanvasComplete={setCanvasComplete}
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
              deleteItem={deleteItem}
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
