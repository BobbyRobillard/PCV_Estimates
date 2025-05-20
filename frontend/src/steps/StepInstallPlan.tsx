
import React, { useState } from 'react'
import StepHeader from '../components/StepHeader'
import StepControls from '../components/StepControls'
import { useEstimateStore } from '../store/EstimateStore'

const INSTALL_PLANS = [
  { label: "PainterChic Will Install", value: "PainterChic" },
  { label: "I’ll Install It Myself", value: "Self" }
]

export default function StepInstallPlan() {
  const { currentItem, updateCurrentItem, currentStep, goToStep } = useEstimateStore()
  const [error, setError] = useState<string | null>(null)

  const selectedPlan = currentItem?.installPlan || ''
  const shipToPainterChic = currentItem?.shipToPainterChic || ''
  const state = currentItem?.installState || ''
  const city = currentItem?.installCity || ''

  const handleSelectPlan = (val: string) => {
    updateCurrentItem({
      installPlan: val,
      shipToPainterChic: '',
      installState: '',
      installCity: ''
    })
    setError(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    updateCurrentItem({ [e.target.name]: e.target.value })
  }

  const handleShipSelect = (val: string) => {
    updateCurrentItem({ shipToPainterChic: val })
  }

  const handleNext = () => {
    if (!selectedPlan) return setError("Please select an installation plan.")

    if (selectedPlan === 'PainterChic') {
      if (!shipToPainterChic) return setError("Please tell us if you're shipping the boat.")
      if (shipToPainterChic === 'no' && (!state || !city)) {
        return setError("Please provide your city and state.")
      }
    } else {
      if (!state || !city) return setError("Please provide your city and state.")
    }

    setError(null)
    goToStep(currentStep + 1)
  }

  const handleBack = () => goToStep(currentStep - 1)

  return (
    <div className="text-center">
      <StepHeader
        stepNumber={6}
        title="What's the Installation Plan?"
        subtitle="Tell us how the wrap will be installed and where (NOTE - We're located in Central Florida.)"
      />

      <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
        {INSTALL_PLANS.map(({ label, value }) => {
          const isSelected = selectedPlan === value
          return (
            <div
              key={value}
              onClick={() => handleSelectPlan(value)}
              className={`rounded border px-3 py-2 d-flex align-items-center justify-content-center 
                ${isSelected ? 'border-primary bg-light fw-bold text-dark shadow-sm' : 'border-secondary bg-white text-muted'}`}
              style={{
                width: 260,
                height: 60,
                fontSize: '1rem',
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'all 0.2s ease-in-out'
              }}
            >
              {label}
            </div>
          )
        })}
      </div>

      {selectedPlan === 'PainterChic' && (
        <div className="mt-4">
          <h6 className="fw-bold">Will you be shipping your boat to PainterChic?</h6>
          <div className="d-flex justify-content-center gap-3 mt-2">
            {['yes', 'no'].map(opt => {
              const isSelected = shipToPainterChic === opt
              return (
                <div
                  key={opt}
                  onClick={() => handleShipSelect(opt)}
                  className={`rounded border px-3 py-2 d-flex align-items-center justify-content-center 
                    ${isSelected ? 'border-primary bg-light fw-bold text-dark shadow-sm' : 'border-secondary bg-white text-muted'}`}
                  style={{
                    width: 100,
                    height: 48,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    userSelect: 'none',
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  {opt.toUpperCase()}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {(selectedPlan === 'Self' || (selectedPlan === 'PainterChic' && shipToPainterChic === 'no')) && (
        <div className="mt-4 w-75 mx-auto">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="installState" className="form-label">State</label>
              <select
                name="installState"
                className="form-select"
                value={state}
                onChange={handleInputChange}
              >
                <option value="">Select a state</option>
                {['FL', 'LA', 'TX', 'GA', 'NC', 'SC', 'AL', 'MS'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="installCity" className="form-label">City</label>
              <input
                type="text"
                name="installCity"
                className="form-control"
                placeholder="City"
                value={city}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger w-75 mx-auto mt-4" role="alert">
          {error}
        </div>
      )}

      <div className="d-flex justify-content-center gap-3 mt-4">
        <StepControls onBack={handleBack} onNext={handleNext} />
      </div>
    </div>
  )
}
