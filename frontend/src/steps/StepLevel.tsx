import React, { useState } from 'react'
import StepHeader from '../components/StepHeader'
import StepControls from '../components/StepControls'
import { useEstimateStore } from '../store/EstimateStore'

const LEVEL_OPTIONS = ['Solid Color Wrap', 'Custom Wrap', 'Camo Wrap', 'Show Boat Wrap']

export default function StepLevel() {
  const { currentItem, updateCurrentItem, currentStep, goToStep } = useEstimateStore()
  const [error, setError] = useState<string | null>(null)

  if (!currentItem) return null

  const handleSelect = (level: string) => {
    updateCurrentItem({ wrapLevel: level })
    setError(null)
  }

  const handleNext = () => {
    if (!currentItem.wrapLevel) {
      setError('Please select a wrap level before continuing.')
      return
    }
    goToStep(currentStep + 1)
  }

  return (
    <div className="text-center">
      <StepHeader
        stepNumber={5}
        title="What Level of Wrap Are You Thinking?"
        subtitle="Let us know how detailed or flashy you're aiming for."
      />

      <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
        {LEVEL_OPTIONS.map(option => {
          const selected = currentItem.wrapLevel === option
          return (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className={`rounded border px-3 py-2 d-flex align-items-center justify-content-center 
                ${selected ? 'border-dark bg-light fw-semibold text-dark' : 'border-secondary bg-white text-muted'}`}
              style={{
                width: 200,
                height: 48,
                fontSize: '1rem',
                cursor: 'pointer',
                userSelect: 'none'
              }}
            >
              {option}
            </div>
          )
        })}
      </div>

      {error && (
        <div className="alert alert-danger w-75 mx-auto mt-4" role="alert">
          {error}
        </div>
      )}

      <div className="d-flex justify-content-center gap-3 mt-4">
        <StepControls onNext={handleNext} />
      </div>
    </div>
  )
}
