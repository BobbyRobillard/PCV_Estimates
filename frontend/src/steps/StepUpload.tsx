
import React from 'react'
import StepHeader from '../components/StepHeader'
import StepControls from '../components/StepControls'
import { useEstimateStore } from '../store/EstimateStore'

export default function StepUpload() {
  const { currentItem, updateCurrentItem, goToStep, currentStep } = useEstimateStore()

  if (!currentItem) return null

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const valid = files.filter(f => f.size <= 50 * 1024 * 1024).slice(0, 3)

    const uploads = valid.map(file => ({
      file,
      previewUrl: URL.createObjectURL(file)
    }))

    updateCurrentItem({ uploadedImages: uploads })
  }

  const handleNext = () => goToStep(currentStep + 1)
  const handleBack = () => goToStep(currentStep - 1)

  return (
    <div className="text-center">
      <StepHeader
        stepNumber={3}
        title="Upload Inspiration"
        subtitle="Upload up to 3 images you'd like us to consider."
      />

      <div className="container mt-4 mb-3">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFiles}
          className="form-control mb-3"
        />

        <div className="d-flex justify-content-center gap-3 flex-wrap">
          {currentItem.uploadedImages?.map((img, i) => (
            <img
              key={i}
              src={img.previewUrl}
              alt={`Upload ${i}`}
              style={{
                width: 120,
                height: 100,
                objectFit: 'cover',
                border: '1px solid #ccc',
                borderRadius: 4
              }}
            />
          ))}
        </div>
      </div>

      <div className="d-flex justify-content-center gap-3">
        <StepControls onBack={handleBack} onNext={handleNext} />
      </div>
    </div>
  )
}
