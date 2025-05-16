
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
    <div>
      <StepHeader
        stepNumber={4}
        title={"What’s the Purpose of the Wrap?"}
        subtitle={"Let us know how this boat will primarily be used."}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {PURPOSE_OPTIONS.map(option => (
          <label key={option} style={{ fontSize: '1rem' }}>
            <input
              type="radio"
              value={option}
              checked={currentItem.wrapPurpose === option}
              onChange={() => handleSelect(option)}
              style={{ marginRight: 8 }}
            />
            {option}
          </label>
        ))}
      </div>

      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}

      <StepControls onNext={handleNext} />
    </div>
  )
}
