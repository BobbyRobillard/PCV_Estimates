import React, { useState } from 'react';
import StepIntro from './components/StepIntro';
import StepCanvas from './components/StepCanvas';
import StepInspiration from './components/StepInspiration';
import StepUpload from './components/StepUpload';
import StepContactInfo from './components/StepContactInfo';
import StepReview from './components/StepReview';
import SidebarItemList from './components/SidebarItemList';
import WizardNav from './components/WizardNav';

interface EstimateItem {
  id: string;
  canvas_type: string;
  sub_type: string;
  inspiration_images: any[];
  uploads: File[];
  isDraft: boolean;
}

const initialItem = (): EstimateItem => ({
  id: crypto.randomUUID(),
  canvas_type: '',
  sub_type: '',
  inspiration_images: [],
  uploads: [],
  isDraft: true
});

export default function App() {
  const [items, setItems] = useState<EstimateItem[]>([initialItem()]);
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isFinalStep, setIsFinalStep] = useState<boolean>(false);

  const handleAddItem = () => {
    setItems(prev => [...prev, initialItem()]);
    setCurrentItemIndex(items.length);
    setCurrentStep(0);
  };

  const handleDeleteItem = (id: string) => {
    const updated = items.filter(item => item.id !== id);
    setItems(updated);
    if (currentItemIndex >= updated.length) {
      setCurrentItemIndex(updated.length - 1);
    }
  };

  const handleSwitchItem = (index: number) => {
    setItems(prev => {
      const updated = [...prev];
      updated[currentItemIndex].isDraft = true;
      return updated;
    });
    setCurrentItemIndex(index);
    setCurrentStep(0);
  };

  const currentItem = items[currentItemIndex];

  const renderStep = () => {
    if (isFinalStep) return <StepReview items={items} />;
    switch (currentStep) {
      case 0: return <StepCanvas item={currentItem} setItems={setItems} index={currentItemIndex} />;
      case 1: return <StepInspiration item={currentItem} setItems={setItems} index={currentItemIndex} />;
      case 2: return <StepUpload item={currentItem} setItems={setItems} index={currentItemIndex} />;
      case 3: return <StepContactInfo />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="lg:w-3/4 p-4">
        <StepIntro step={currentStep} />
        {renderStep()}
        <WizardNav
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          maxStep={3}
          setIsFinalStep={setIsFinalStep}
        />
      </div>
      <div className="lg:w-1/4 bg-gray-100 p-4">
        <SidebarItemList
          items={items}
          currentIndex={currentItemIndex}
          onSelect={handleSwitchItem}
          onDelete={handleDeleteItem}
          onAdd={handleAddItem}
        />
      </div>
    </div>
  );
}