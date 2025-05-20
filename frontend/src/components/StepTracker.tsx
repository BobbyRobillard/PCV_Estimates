
import React from 'react'
import { useEstimateStore } from '../store/EstimateStore'

export default function StepTracker() {
  const { currentStep, goToStep } = useEstimateStore()

  const steps = Array.from({ length: 8 }, (_, i) => i)

  return (
    <div className="text-center mt-3">
      <div style={{ fontWeight: 'bold', marginBottom: 8 }}>Step:</div>
      <div className="d-flex justify-content-center align-items-center flex-wrap gap-2">
        {steps.map((step) => (
          <div
            key={step}
            onClick={() => goToStep(step)}
            className={`px-2 cursor-pointer ${step === currentStep ? 'fw-bold text-dark' : 'text-muted'}`}
            style={{
              cursor: 'pointer',
              borderBottom: step === currentStep ? '2px solid black' : '1px solid lightgray',
              margin: '0 6px'
            }}
          >
            {step + 1}
          </div>
        ))}
      </div>
    </div>
  )
}
