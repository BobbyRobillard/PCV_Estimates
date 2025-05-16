
import React, { useState } from 'react'
import StepHeader from '../components/StepHeader'
import StepControls from '../components/StepControls'
import { useEstimateStore } from '../store/EstimateStore'

export default function StepInstallPlan() {
  const { currentItem, updateCurrentItem, currentStep, goToStep } = useEstimateStore()
  const [error, setError] = useState<string | null>(null)

  if (!currentItem) return null

  const handleInstallOption = (value: string) => {
    updateCurrentItem({
      installPlan: value,
      shippingToPainterChic: undefined,
      installState: '',
      installCity: ''
    })
    setError(null)
  }

  const handleNext = () => {
    if (!currentItem.installPlan) return setError('Please select who will install the wrap.')

    if (currentItem.installPlan === 'PainterChic') {
      if (currentItem.shippingToPainterChic === undefined) {
        return setError('Please select a shipping option.')
      }
      if (!currentItem.shippingToPainterChic && (!currentItem.installState || !currentItem.installCity)) {
        return setError('Please enter your city and select a state.')
      }
    } else {
      if (!currentItem.installState || !currentItem.installCity) {
        return setError('Please enter your city and select a state.')
      }
    }

    goToStep(currentStep + 1)
  }

  return (
    <div>
      <StepHeader
        stepNumber={6}
        title={"Wrap Installation Plan"}
        subtitle={"Let us know where the wrap is going and who will be installing it."}
      />

      <div style={{ marginBottom: 16 }}>
        <label style={{ marginRight: 20 }}>
          <input
            type="radio"
            value="PainterChic"
            checked={currentItem.installPlan === 'PainterChic'}
            onChange={() => handleInstallOption('PainterChic')}
          />
          PainterChic will install
        </label>
        <label>
          <input
            type="radio"
            value="Customer"
            checked={currentItem.installPlan === 'Customer'}
            onChange={() => handleInstallOption('Customer')}
          />
          I will install myself
        </label>
      </div>

      {currentItem.installPlan === 'PainterChic' && (
        <div style={{ marginBottom: 16 }}>
          <label style={{ marginRight: 20 }}>
            <input
              type="radio"
              checked={currentItem.shippingToPainterChic === true}
              onChange={() => updateCurrentItem({ shippingToPainterChic: true })}
            />
            I will ship my boat to PainterChic
          </label>
          <label>
            <input
              type="radio"
              checked={currentItem.shippingToPainterChic === false}
              onChange={() => updateCurrentItem({ shippingToPainterChic: false })}
            />
            I need on-site installation
          </label>
        </div>
      )}

      {(currentItem.installPlan === 'Customer' ||
        (currentItem.installPlan === 'PainterChic' && currentItem.shippingToPainterChic === false)) && (
        <div style={{ marginBottom: 16 }}>
          <label>
            State:
            <select
              value={currentItem.installState || ''}
              onChange={e => updateCurrentItem({ installState: e.target.value })}
              style={{ marginLeft: 8 }}
            >
              <option value="">Select state</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="TX">Texas</option>
              <option value="LA">Louisiana</option>
              <option value="AL">Alabama</option>
            </select>
          </label>
          <br />
          <label>
            City:
            <input
              type="text"
              value={currentItem.installCity || ''}
              onChange={e => updateCurrentItem({ installCity: e.target.value })}
              style={{ marginLeft: 8 }}
            />
          </label>
        </div>
      )}

      {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}

      <StepControls onNext={handleNext} />
    </div>
  )
}
