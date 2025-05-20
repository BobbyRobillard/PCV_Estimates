
import React from 'react'
import StepHeader from '../components/StepHeader'
import StepControls from '../components/StepControls'
import { useEstimateStore } from '../store/EstimateStore'

export default function StepSpecialRequests() {
  const {
    currentItem,
    updateCurrentItem,
    goToStep,
    currentStep,
    finalizeCurrentItem
  } = useEstimateStore()

  if (!currentItem) return null

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateCurrentItem({ specialRequests: e.target.value })
  }

  const handleNext = () => {
    finalizeCurrentItem()
    goToStep(currentStep + 1)
  }

  const handleBack = () => goToStep(currentStep - 1)

  return (
    <div className="text-center">
      <StepHeader
        stepNumber={7}
        title="Any Special Requests?"
        subtitle="Let us know what stood out to you from the inspiration images or uploads."
      />

      <div className="container mt-4">
        {currentItem.inspirationImages?.length > 0 && (
          <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
            {currentItem.inspirationImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Inspiration ${i}`}
                style={{
                  width: 120,
                  height: 100,
                  objectFit: 'cover',
                  borderRadius: 4,
                  border: '1px solid #ccc'
                }}
              />
            ))}
          </div>
        )}

        {currentItem.uploadedImages?.length > 0 && (
          <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
            {currentItem.uploadedImages.map((fileObj, i) => (
              <img
                key={i}
                src={fileObj.previewUrl}
                alt={`Uploaded ${i}`}
                style={{
                  width: 120,
                  height: 100,
                  objectFit: 'cover',
                  borderRadius: 4,
                  border: '1px solid #ccc'
                }}
              />
            ))}
          </div>
        )}

        <div className="mb-4 mt-4">
          <textarea
            className="form-control"
            rows={5}
            value={currentItem.specialRequests || ''}
            onChange={handleChange}
            placeholder="Write any details you'd like us to know..."
          />
        </div>

        <div className="d-flex justify-content-center gap-3 mt-4">
          <StepControls onBack={handleBack} onNext={handleNext} />
        </div>
      </div>
    </div>
  )
}
