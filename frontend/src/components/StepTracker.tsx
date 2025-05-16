
import React from 'react'
import { useEstimateStore } from '../store/EstimateStore'

const StepTracker = () => {
  const { currentStep, goToStep } = useEstimateStore()
  const totalSteps = 8

  return (
    <div style={{
      display: 'flex',
      gap: 8,
      marginBottom: 10,
      fontSize: '0.9rem',
      paddingTop: '4px'
    }}>
      <b>Step: </b>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <React.Fragment key={index}>
          <span
            onClick={() => goToStep(index)}
            style={{
              cursor: 'pointer',
              fontWeight: currentStep === index ? 'bold' : 'normal',
              color: currentStep === index ? '#000' : '#777',
              borderBottom: currentStep === index ? '2px solid black' : 'none',
              padding: '2px 4px'
            }}
          >
            {index + 1}
          </span>
          {index < totalSteps - 1 && (
            <span style={{ color: '#ccc' }}>|</span>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default StepTracker
