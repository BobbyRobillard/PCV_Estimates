
import React, { useState, useEffect } from 'react'
import StepTracker from '../components/StepTracker'
import StepHeader from '../components/StepHeader'
import StepControls from '../components/StepControls'
import { useEstimateStore } from '../store/EstimateStore'

const allImages = import.meta.glob('/public/inspiration/**/*.{jpg,jpeg,png}', { eager: true, as: 'url' })

export default function StepInspiration() {
  const { currentItem, updateCurrentItem } = useEstimateStore()
  const [selected, setSelected] = useState<string[]>(currentItem?.inspirationIds || [])

  useEffect(() => {
    updateCurrentItem({ inspirationIds: selected })
  }, [selected])

  if (!currentItem) return null

  const toggleImage = (img: string) => {
    let updated
    if (selected.includes(img)) {
      updated = selected.filter(i => i !== img)
    } else if (selected.length < 5) {
      updated = [...selected, img]
    } else {
      return
    }
    setSelected(updated)
  }

  const subfolder = currentItem.mainType === 'Power Boats' ? 'boats' : 'airboats'

  return (
    <div>
      <StepHeader
        stepNumber={2}
        title={"Select Some Inspiration"}
        subtitle={"Choose up to 5 options which you feel fit the 'style' of design you're looking for."}
      />

      <StepControls />


      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '12px'
      }}>
        {Object.entries(allImages).filter(([path]) => path.includes(`/inspiration/${subfolder}/`)).map(([path, url]) => {
          const fileName = path.split('/').pop()
          const isSelected = selected.includes(fileName)

          return (
            <div
              key={path}
              onClick={() => toggleImage(fileName)}
              style={{
                cursor: 'pointer',
                border: isSelected ? '3px solid #0070f3' : '1px solid #ccc',
                borderRadius: 4,
                overflow: 'hidden',
                height: 150,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fafafa'
              }}
            >
              <img
                src={url}
                alt={fileName}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          )
        })}
      </div>

    </div>
  )
}
