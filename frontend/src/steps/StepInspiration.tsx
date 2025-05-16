
import React from 'react'
import StepTracker from '../components/StepTracker'
import StepHeader from '../components/StepHeader'
import StepControls from '../components/StepControls'
import { useEstimateStore } from '../store/EstimateStore'

const imageGlob = import.meta.glob('/public/inspiration/airboats/*.{jpg,jpeg,png}', { eager: true, as: 'url' })

export default function StepInspiration() {
  const { currentItem, updateCurrentItem } = useEstimateStore()

  if (!currentItem) return null

  const handleToggle = (id: string) => {
    const current = currentItem.inspirationIds || []
    const exists = current.includes(id)
    let updated = exists ? current.filter(i => i !== id) : [...current, id]
    if (updated.length > 5) return
    updateCurrentItem({ inspirationIds: updated })
  }

  return (
    <div>
      <StepHeader
        stepNumber={2}
        title={"Select Some Inspiration"}
        subtitle={"Choose up to 5 options which you feel fit the 'style' of design you're looking for."}
      />

      <StepControls />

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
        marginTop: 10,
        marginBottom: 16
      }}>
        {Object.entries(imageGlob).map(([path, url]) => {
          const filename = path.split('/').pop() || ''
          const isSelected = currentItem.inspirationIds?.includes(filename)
          return (
            <div
              key={filename}
              onClick={() => handleToggle(filename)}
              style={{
                width: 160,
                height: 120,
                border: isSelected ? '3px solid #0070f3' : '1px solid #ccc',
                borderRadius: 6,
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              <img
                src={url}
                alt={filename}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: isSelected ? 'none' : 'grayscale(40%)',
                  transition: '0.2s ease'
                }}
              />
              {isSelected && (
                <div style={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  backgroundColor: '#0070f3',
                  color: 'white',
                  borderRadius: '50%',
                  width: 20,
                  height: 20,
                  fontSize: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>✓</div>
              )}
            </div>
          )
        })}
      </div>

    </div>
  )
}
