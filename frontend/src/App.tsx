import React, { useState } from 'react';
import StepCanvas from './components/StepCanvas';
import StepInspiration from './components/StepInspiration';
import StepUpload from './components/StepUpload';
import StepReview from './components/StepReview';
import SidebarItemList from './components/SidebarItemList';
import WizardNav from './components/WizardNav';
import { EstimateItem } from './types/EstimateItem';

const App: React.FC = () => {
  const [items, setItems] = useState<EstimateItem[]>([]);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    special_requests: ''
  });

  const activeItem = items.find(item => item.id === activeItemId) || null;

  const addNewItem = (canvas_type: string) => {
    const newItem: EstimateItem = {
      id: crypto.randomUUID(),
      canvas_type,
      sub_type: '',
      inspiration_images: [],
      uploads: [],
      isDraft: true
    };
    setItems(prev => [...prev, newItem]);
    setActiveItemId(newItem.id);
    setStep(1);
  };

  const updateActiveItem = (updated: EstimateItem) => {
    setItems(prev => prev.map(item => item.id === updated.id ? updated : item));
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    if (id === activeItemId) {
      setActiveItemId(null);
      setStep(0);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* LEFT SIDE */}
        <div className="col-md-9 p-4">
          {step === 0 && <StepCanvas onSelect={addNewItem} />}
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
            />
          )}

          {/* Navigation Buttons */}
          {step < 3 && (
            <WizardNav
              step={step}
              setStep={setStep}
              canProceed={
                (step === 0 && Boolean(activeItem?.canvas_type)) ||
                (step === 1 && Boolean(activeItem)) ||
                (step === 2 && Boolean(activeItem))
              }
            />
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-3 p-3 border-start bg-light">
          <SidebarItemList
            items={items}
            activeItemId={activeItemId}
            setActiveItemId={setActiveItemId}
            onDelete={deleteItem}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
