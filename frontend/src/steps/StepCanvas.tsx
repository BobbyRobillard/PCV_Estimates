
import React, { useEffect, useState } from 'react'
import StepHeader from '../components/StepHeader'
import StepControls from '../components/StepControls'
import { useEstimateStore } from '../store/EstimateStore'

const canvasOptions = {
  Airboats: ['Hull Wrap', 'Console Wrap', 'Rudder Wrap', 'Dry Box Wrap'],
  'Power Boats': ['Flats Boat Wrap', 'Center Console Wrap', 'Bay Boat Wrap', 'Pontoon Boat Wrap', 'Jon Boat Wrap', 'Other']
}

const hullTypes = ['Step Hull', 'Deckover Hull', 'Open Hull']

export default function StepCanvas() {
  const {
    currentItem,
    updateCurrentItem,
    goToStep,
    currentStep
  } = useEstimateStore()

  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    if (currentItem && !currentItem.subTypes) {
      updateCurrentItem({ subTypes: [] })
    }
  }, [currentItem])

  if (!currentItem) return null

  const handleMainTypeChange = (mainType: string) => {
    updateCurrentItem({ mainType, subTypes: [], hullType: undefined })
    setErrors([])
  }

  const toggleSubType = (subType: string) => {
    const current = currentItem.subTypes || []
    const updated = current.includes(subType)
      ? current.filter((s) => s !== subType)
      : [...current, subType]

    if (currentItem.mainType === 'Airboats' && !updated.includes('Hull Wrap')) {
      updateCurrentItem({ subTypes: updated, hullType: undefined })
    } else {
      updateCurrentItem({ subTypes: updated })
    }

    setErrors([])
  }

  const handleNext = () => {
    const validationErrors = []
    const hasSubTypes = currentItem.subTypes && currentItem.subTypes.length > 0
    const isAirboatHull = currentItem.mainType === 'Airboats' && currentItem.subTypes?.includes('Hull Wrap')
    const hasHullType = currentItem.hullType && currentItem.hullType !== ''

    if (!hasSubTypes) validationErrors.push('Please select at least one wrap option.')
    if (isAirboatHull && !hasHullType) validationErrors.push('Please select a hull type for your Hull Wrap.')

    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    goToStep(currentStep + 1)
  }

  const subTypes = canvasOptions[currentItem.mainType]
  const showHullType = currentItem.mainType === 'Airboats' && (currentItem.subTypes || []).includes('Hull Wrap')

  return (
    <div>
      <StepHeader
        stepNumber={1}
        title={"Select a Canvas"}
        subtitle={"Choose what kind of item you're getting wrapped."}
      />

      <select value={currentItem.mainType} onChange={(e) => handleMainTypeChange(e.target.value)}>
        <option value="">Select...</option>
        {Object.keys(canvasOptions).map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      {subTypes && (
        <div style={{ marginTop: 10 }}>
          <strong>Select Parts:</strong>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {subTypes.map((sub) => (
              <label key={sub} style={{ display: 'flex', gap: 4 }}>
                <input
                  type="checkbox"
                  checked={currentItem.subTypes?.includes(sub)}
                  onChange={() => toggleSubType(sub)}
                />
                {sub}
              </label>
            ))}
          </div>
        </div>
      )}

      {showHullType && (
        <div style={{ marginTop: 10 }}>
          <strong>Select Hull Type:</strong>
          <select value={currentItem.hullType || ''} onChange={(e) => updateCurrentItem({ hullType: e.target.value })}>
            <option value="">Select Hull Type</option>
            {hullTypes.map((hull) => (
              <option key={hull} value={hull}>{hull}</option>
            ))}
          </select>
        </div>
      )}

      {errors.length > 0 && (
        <div style={{ marginTop: 15, color: 'red' }}>
          {errors.map((err, i) => (
            <div key={i}>• {err}</div>
          ))}
        </div>
      )}

      <StepControls onNext={handleNext} />
    </div>
  )
}
