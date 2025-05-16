
import React, { useState, useRef } from 'react'
import StepTracker from '../components/StepTracker'
import StepHeader from '../components/StepHeader'
import StepControls from '../components/StepControls'
import { useEstimateStore } from '../store/EstimateStore'

const MAX_FILES = 3
const MAX_FILE_SIZE_MB = 50
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']

export default function StepUpload() {
  const { currentItem, updateCurrentItem } = useEstimateStore()
  const [errors, setErrors] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!currentItem) return null

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || [])
    const existing = currentItem.uploadedImages || []

    const all = [...existing, ...newFiles].slice(0, MAX_FILES)

    const valid: File[] = []
    const messages: string[] = []

    all.forEach(file => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        messages.push(`${file.name}: Unsupported file type.`)
      } else if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        messages.push(`${file.name}: Exceeds 50MB limit.`)
      } else {
        valid.push(file)
      }
    })

    updateCurrentItem({ uploadedImages: valid })
    setErrors(messages)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeFile = (index: number) => {
    const updated = [...(currentItem.uploadedImages || [])]
    updated.splice(index, 1)
    updateCurrentItem({ uploadedImages: updated })
  }

  return (
    <div>
      <StepHeader
        stepNumber={3}
        title={"Upload Your Own Images"}
        subtitle={"Provide up to 3 of your own reference photos. JPG, PNG, or WEBP only — max 50MB each."}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        multiple
        onChange={handleFileChange}
        style={{ marginBottom: 10 }}
      />

      {errors.length > 0 && (
        <div style={{ color: 'red', marginBottom: 10 }}>
          {errors.map((err, i) => <div key={i}>• {err}</div>)}
        </div>
      )}

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {(currentItem.uploadedImages || []).map((file, i) => (
          <div key={i} style={{
            width: 160,
            border: '1px solid #ccc',
            borderRadius: 6,
            padding: 8,
            backgroundColor: '#f9f9f9'
          }}>
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              style={{
                width: '100%',
                height: 100,
                objectFit: 'cover',
                borderRadius: 4,
                marginBottom: 6
              }}
            />
            <div style={{
              fontSize: '0.85rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {file.name}
              </span>
              <button
                onClick={() => removeFile(i)}
                title="Remove"
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 16,
                  color: 'red',
                  marginLeft: 4
                }}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      <StepControls />
    </div>
  )
}
