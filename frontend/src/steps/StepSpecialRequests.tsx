
import React, { useState } from 'react'
import StepHeader from '../components/StepHeader'
import StepControls from '../components/StepControls'
import { useEstimateStore } from '../store/EstimateStore'

export default function StepSpecialRequests() {
  const { currentItem, updateCurrentItem, addItem, goToStep, currentStep } = useEstimateStore()
  const [text, setText] = useState(currentItem?.specialNotes || '')
  const [error, setError] = useState<string | null>(null)

  if (!currentItem) return null

  const handleNext = () => {
    if (!text.trim()) {
      setError('Please enter your notes before continuing.')
      return
    }

    updateCurrentItem({ specialNotes: text })
    addItem()
    goToStep(currentStep + 1)
  }

  const subfolder = currentItem.mainType === 'Power Boats' ? 'boats' : 'airboats'

  return (
    <div>
      <StepHeader
        stepNumber={7}
        title={"Tell Us What You Liked"}
        subtitle={"You selected some images earlier — what stood out to you about them?"}
      />

      {(currentItem.inspirationIds?.length > 0 || currentItem.uploadedImages?.length > 0) && (
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          {(currentItem.inspirationIds || []).map((id, i) => (
            <img
              key={i}
              src={`/inspiration/${subfolder}/${id}`}
              alt={id}
              style={{ width: 120, height: 100, objectFit: 'cover', borderRadius: 4 }}
            />
          ))}
          {(currentItem.uploadedImages || []).map((file, i) => (
            <img
              key={i}
              src={URL.createObjectURL(file)}
              alt={file.name}
              style={{ width: 120, height: 100, objectFit: 'cover', borderRadius: 4 }}
            />
          ))}
        </div>
      )}

      <textarea
        rows={6}
        value={text}
        onChange={(e) => {
          setText(e.target.value)
          if (error) setError(null)
        }}
        style={{
          width: '100%',
          padding: 10,
          borderRadius: 4,
          border: '1px solid #ccc',
          fontSize: '1rem'
        }}
      />

      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}

      <StepControls onNext={handleNext} />
    </div>
  )
}
