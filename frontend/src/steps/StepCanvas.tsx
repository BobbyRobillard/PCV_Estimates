
import React, { useEffect, useState } from 'react'
import StepHeader from '../components/StepHeader'
import StepControls from '../components/StepControls'
import { useEstimateStore } from '../store/EstimateStore'

const AIRBOAT_SUBTYPES = ["Hull", "Console", "Rudder", "Dry Box"]
const HULL_TYPES = ["Step Hull", "Deckover Hull", "Open Hull"]
const POWER_BOAT_SUBTYPES = ["Flats Boat", "Center Console", "Bay Boat", "Pontoon Boat", "Jon Boat", "Other"]

export default function StepCanvas() {
  const { currentItem, updateCurrentItem, startNewItem, goToStep, currentStep } = useEstimateStore()

  useEffect(() => {
    if (!currentItem) {
      startNewItem()
    }
  }, [currentItem])

  const [error, setError] = useState("")

  useEffect(() => {
    if (currentItem?.mainType || currentItem?.subTypes?.length > 0 || currentItem?.hullType) {
      setError("")
    }
  }, [currentItem?.mainType, currentItem?.subTypes, currentItem?.hullType])

  const mainType = currentItem?.mainType || ''
  const subTypes = currentItem?.subTypes || []
  const hullType = currentItem?.hullType || ''

  const handleMainTypeChange = (type: string) => {
    updateCurrentItem({
      mainType: type,
      subTypes: [],
      hullType: ''
    })
  }

  const toggleSubType = (sub: string) => {
    const newSubTypes = subTypes.includes(sub)
      ? subTypes.filter(s => s !== sub)
      : [...subTypes, sub]

    updateCurrentItem({
      ...currentItem,
      subTypes: newSubTypes,
      ...(sub !== "Hull" && { hullType: '' })
    })
  }

  const handleHullTypeChange = (val: string) => {
    updateCurrentItem({
      ...currentItem,
      hullType: val
    })
  }

  const handleNext = () => {
    if (!mainType) return setError("Please select a canvas type.")
    if (subTypes.length === 0) return setError("Please select at least one item to wrap.")
    if (mainType === "Airboats" && subTypes.includes("Hull") && !hullType)
      return setError("Please select a hull type.")
    setError("")
    goToStep(currentStep + 1)
  }

  const getSubTypeOptions = () => {
    if (mainType === 'Airboats') return AIRBOAT_SUBTYPES
    if (mainType === 'Power Boats') return POWER_BOAT_SUBTYPES
    return []
  }

  const shouldShowHullTypes = mainType === 'Airboats' && subTypes.includes("Hull")

  const boxStyle = (selected: boolean) => ({
    border: selected ? '3px solid black' : '1px solid #ccc',
    borderRadius: 8,
    padding: 10,
    height: 120,
    width: 120,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: selected ? '#f8f9fa' : 'white'
  })

  return (
    <div className="text-center">
      <StepHeader
        stepNumber={1}
        title="Select a Canvas"
        subtitle="Choose what kind of item you're getting wrapped."
      />

      {!currentItem ? (
        <div className="my-5">Loading...</div>
      ) : (
        <>
          <div className="d-flex justify-content-center gap-4 my-4">
            <div onClick={() => handleMainTypeChange('Airboats')} style={{ cursor: 'pointer' }}>
              <div style={boxStyle(mainType === 'Airboats')}>
                <img src="/icons/airboat.png" alt="Airboat Wraps" style={{ height: 60 }} />
              </div>
              <div className="fw-bold mt-2">Airboat Wraps</div>
            </div>

            <div onClick={() => handleMainTypeChange('Power Boats')} style={{ cursor: 'pointer' }}>
              <div style={boxStyle(mainType === 'Power Boats')}>
                <img src="/icons/boat.png" alt="Power Boat Wraps" style={{ height: 60 }} />
              </div>
              <div className="fw-bold mt-2">Power Boat Wraps</div>
            </div>
          </div>

          <div className="mb-4">
            <strong>
              {mainType === 'Airboats'
                ? 'Select the parts of your airboat to wrap'
                : 'Select your boat type'}
            </strong>
            <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
              {getSubTypeOptions().map(sub => {
                const selected = subTypes.includes(sub)
                return (
                  <div
                    key={sub}
                    onClick={() => toggleSubType(sub)}
                    className={`rounded border px-3 py-2 d-flex align-items-center justify-content-center 
                      ${selected ? 'border-dark bg-light fw-semibold text-dark' : 'border-secondary bg-white text-muted'}`}
                    style={{
                      width: 180,
                      height: 48,
                      fontSize: '1rem',
                      cursor: 'pointer',
                      userSelect: 'none'
                    }}
                  >
                    {sub}
                  </div>
                )
              })}
            </div>
          </div>

          {shouldShowHullTypes && (
            <div className="mb-3">
              <strong>Select Hull Type:</strong>
              <div className="mt-2">
                <select
                  className="form-select w-auto mx-auto"
                  value={hullType}
                  onChange={e => handleHullTypeChange(e.target.value)}
                >
                  <option value="">Select...</option>
                  {HULL_TYPES.map(h => <option key={h}>{h}</option>)}
                </select>
              </div>
            </div>
          )}

          {error && (
            <div className="alert alert-danger w-75 mx-auto mt-3" role="alert">
              {error}
            </div>
          )}

          <div className="d-flex justify-content-center gap-3 mt-4">
            <StepControls onNext={handleNext} />
          </div>
        </>
      )}
    </div>
  )
}
