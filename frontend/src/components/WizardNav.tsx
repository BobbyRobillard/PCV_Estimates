
import React from 'react'
import { useEstimateStore } from '../store/EstimateStore'

const stepLabels = [
  'Canvas',
  'Inspiration',
  'Upload',
  'Purpose',
  'Level',
  'Install',
  'Requests',
  'Review',
]

export default function WizardNav() {
  const { currentStep, goToStep } = useEstimateStore()

  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: 20 }}>
      {stepLabels.map((label, index) => (
        <button
          key={label}
          style={{
            backgroundColor: currentStep === index ? '#444' : '#ccc',
            color: currentStep === index ? 'white' : 'black',
            padding: '8px 12px',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
          onClick={() => goToStep(index)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
