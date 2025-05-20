
import React from 'react'
import { useEstimateStore } from '../store/EstimateStore'

interface StepControlsProps {
  onNext?: () => void
  isNextDisabled?: boolean
}

export default function StepControls({ onNext, isNextDisabled = false }: StepControlsProps) {
  const { currentStep, goToStep } = useEstimateStore()

  const handleBack = () => {
    if (currentStep > 0) {
      goToStep(currentStep - 1)
    }
  }

  const handleNext = () => {
    if (onNext) {
      onNext()
    } else {
      goToStep(currentStep + 1)
    }
  }

  return (
    <div className="text-center">
      <button onClick={handleBack} disabled={currentStep === 0} style={{ marginRight: '8px' }}>
        Back
      </button>
      <button onClick={handleNext} disabled={isNextDisabled}>
        Next
      </button>
    </div>
  )
}
