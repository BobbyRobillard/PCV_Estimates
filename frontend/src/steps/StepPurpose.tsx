import React, { useState } from 'react'
import StepHeader from '../components/StepHeader'
import StepControls from '../components/StepControls'
import { useEstimateStore } from '../store/EstimateStore'

const PURPOSE_OPTIONS = ['Fishing Boat', 'Pleasure Boat', 'Race Boat', 'Work Boat']

export default function StepPurpose() {
  const { currentItem, updateCurrentItem, currentStep, goToStep } = useEstimateStore()
  const [error, setError] = useState<string | null>(null)

  if (!currentItem) return null

  const handleSelect = (purpose: string) => {
    updateCurrentItem({ wrapPurpose: purpose })
    setError(null)
  }

  const handleNext = () => {
    if (!currentItem.wrapPurpose) {
      setError('Please select a purpose before continuing.')
      return
    }
    goToStep(currentStep + 1)
  }

  return (
    <div className="text-center">
      <StepHeader
        stepNumber={4}
        title={"What’s the Purpose of the Wrap?"}
        subtitle={"Let us know how this boat will primarily be used."}
      />

      <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
        {PURPOSE_OPTIONS.map(option => {
          const selected = currentItem.wrapPurpose === option
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
