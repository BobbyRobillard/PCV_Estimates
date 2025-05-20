
import React, { useEffect, useState } from 'react'
import StepHeader from '../components/StepHeader'
import StepControls from '../components/StepControls'
import { useEstimateStore } from '../store/EstimateStore'

export default function StepInspiration() {
  const { currentItem, updateCurrentItem, goToStep, currentStep } = useEstimateStore()
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    if (!currentItem) return

    const type = currentItem.mainType
    const files = type === 'Power Boats'
      ? [
          "/inspiration/boats/boat1.jpg", "/inspiration/boats/boat2.jpg",
          "/inspiration/boats/boat3.jpg", "/inspiration/boats/boat4.jpg",
          "/inspiration/boats/boat5.jpg", "/inspiration/boats/boat6.jpg",
          "/inspiration/boats/boat7.jpg", "/inspiration/boats/boat8.jpg",
          "/inspiration/boats/boat9.jpg", "/inspiration/boats/boat10.jpg",
          "/inspiration/boats/boat11.jpg", "/inspiration/boats/boat12.jpg",
          "/inspiration/boats/boat13.jpg", "/inspiration/boats/boat14.jpg",
          "/inspiration/boats/boat15.jpg", "/inspiration/boats/boat16.jpg"
        ]
      : [
          "/inspiration/airboats/airboat1.jpg", "/inspiration/airboats/airboat2.png",
          "/inspiration/airboats/airboat3.png", "/inspiration/airboats/airboat4.png",
          "/inspiration/airboats/airboat5.jpg", "/inspiration/airboats/airboat6.jpg",
          "/inspiration/airboats/airboat7.jpg", "/inspiration/airboats/airboat8.jpg",
          "/inspiration/airboats/airboat9.jpg", "/inspiration/airboats/airboat10.jpg",
          "/inspiration/airboats/airboat11.jpg", "/inspiration/airboats/airboat12.jpg",
          "/inspiration/airboats/airboat13.jpg", "/inspiration/airboats/airboat14.jpg",
          "/inspiration/airboats/airboat15.jpg", "/inspiration/airboats/airboat16.jpg",
          "/inspiration/airboats/airboat17.jpg", "/inspiration/airboats/airboat18.jpg",
          "/inspiration/airboats/ConsoleCover1.jpg",
          "/inspiration/airboats/Rudders1.png", "/inspiration/airboats/Rudders2.jpg",
          "/inspiration/airboats/Rudders3.jpg", "/inspiration/airboats/Rudders4.jpg",
          "/inspiration/airboats/Rudders5.jpg", "/inspiration/airboats/Rudders6.jpg",
          "/inspiration/airboats/Rudders7.jpg", "/inspiration/airboats/Rudders8.jpg",
          "/inspiration/airboats/Rudders9.jpg", "/inspiration/airboats/Rudders10.jpg",
          "/inspiration/airboats/Rudders11.jpg", "/inspiration/airboats/Rudders12.jpg",
          "/inspiration/airboats/Rudders13.jpg", "/inspiration/airboats/Rudders14.jpg",
          "/inspiration/airboats/Rudders15.jpg", "/inspiration/airboats/Rudders16.jpg",
          "/inspiration/airboats/Rudders17.jpg", "/inspiration/airboats/Rudders18.jpg",
          "/inspiration/airboats/Rudders19.jpg", "/inspiration/airboats/Rudders20.jpg",
          "/inspiration/airboats/Rudders21.jpg", "/inspiration/airboats/Rudders22.jpg",
          "/inspiration/airboats/Rudders23.jpg", "/inspiration/airboats/Rudders24.jpg",
          "/inspiration/airboats/Rudders25.jpg", "/inspiration/airboats/Rudders26.jpg",
          "/inspiration/airboats/Rudders27.jpg", "/inspiration/airboats/Rudders28.jpg",
          "/inspiration/airboats/Rudders29.jpg", "/inspiration/airboats/Rudders30.jpg",
          "/inspiration/airboats/Rudders31.jpg", "/inspiration/airboats/Rudders32.jpg",
          "/inspiration/airboats/Rudders33.jpg"
        ]

    setImages(files)
  }, [currentItem?.mainType])

  const selectedImages = currentItem?.inspirationImages || []

  const toggleImage = (img: string) => {
    const updated = selectedImages.includes(img)
      ? selectedImages.filter(i => i !== img)
      : [...selectedImages, img].slice(0, 5)

    updateCurrentItem({ ...currentItem, inspirationImages: updated })
  }

  const handleNext = () => goToStep(currentStep + 1)
  const handleBack = () => goToStep(currentStep - 1)

  return (
    <div className="text-center">
      <StepHeader
        stepNumber={2}
        title="Select Some Inspiration"
        subtitle="Choose up to 5 options which you feel fit the 'style' of design you're looking for."
      />

      <div className="d-flex justify-content-center my-3">
        <StepControls onBack={handleBack} onNext={handleNext} />
      </div>

      <div className="masonry-grid mt-3">
        {images.map((img, i) => (
          <div className="masonry-item" key={i}>
            <img
              src={img}
              alt={`Inspiration ${i}`}
              className="inspiration-image"
              onClick={() => toggleImage(img)}
              style={{
                border: selectedImages.includes(img) ? '3px solid #007bff' : '1px solid #ddd',
                borderRadius: '10px',
                width: '100%',
                display: 'block',
                cursor: 'pointer',
                marginBottom: '10px'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
