
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
    <div>
      <StepHeader
        stepNumber={5}
        title={"What Kind of Wrap Are You Thinking?"}
        subtitle={"Choose the general level of customization you're interested in."}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {LEVEL_OPTIONS.map(option => (
          <label key={option} style={{ fontSize: '1rem' }}>
            <input
              type="radio"
              value={option}
              checked={currentItem.wrapLevel === option}
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
