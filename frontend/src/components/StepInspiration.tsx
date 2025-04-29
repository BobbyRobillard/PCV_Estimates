// StepInspiration.tsx

import React, { useEffect, useState } from 'react';
import { EstimateItem } from '../types/EstimateItem';
import StepHeader from './StepHeader';

// Dynamically import inspiration images
const airboatImages = import.meta.glob('/public/inspiration/airboats/{airboat*,Rudder*}.jpg', { as: 'url' });
const boatImages = import.meta.glob('/public/inspiration/boats/boat*.jpg', { as: 'url' });
const digitalImages = import.meta.glob('/public/inspiration/digital/digital*.jpg', { as: 'url' });

interface StepInspirationProps {
  item: EstimateItem;
  updateItem: (updated: EstimateItem) => void;
}

const StepInspiration: React.FC<StepInspirationProps> = ({ item, updateItem }) => {
  const [availableImages, setAvailableImages] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  // 💥 Correctly sync selected images when switching between items
  useEffect(() => {
    if (item && item.inspiration_images) {
      setSelectedImages(item.inspiration_images.map(img => img.image_url));
    } else {
      setSelectedImages([]);
    }
  }, [item.id]);

  useEffect(() => {
    let imagesToUse: Record<string, () => Promise<string>> = {};

    switch (item.canvas_type) {
      case 'Airboat':
        imagesToUse = airboatImages;
        break;
      case 'Boat':
        imagesToUse = boatImages;
        break;
      case 'Digital Graphics':
        imagesToUse = digitalImages;
        break;
      default:
        imagesToUse = {};
    }

    const loadImages = async () => {
      const urls = await Promise.all(
        Object.values(imagesToUse).map(loadFn => loadFn())
      );
      setAvailableImages(urls);
    };

    loadImages();
  }, [item.canvas_type]);

  const toggleImageSelection = (imgUrl: string) => {
    const updatedSelection = selectedImages.includes(imgUrl)
      ? selectedImages.filter(url => url !== imgUrl)
      : [...selectedImages, imgUrl];

    setSelectedImages(updatedSelection);

    const inspirationImagesFormatted = updatedSelection.map((url, i) => ({
      image_url: url,
      preference_order: i + 1
    }));

    updateItem({ ...item, inspiration_images: inspirationImagesFormatted });
  };

  return (
    <div>
      <StepHeader step={2} title="Select Inspiration" />
      <div className="d-flex flex-wrap gap-3">
        {availableImages.map((url, idx) => (
          <div
            key={idx}
            onClick={() => toggleImageSelection(url)}
            style={{
              border: selectedImages.includes(url) ? '3px solid green' : '1px solid #ccc',
              borderRadius: '6px',
              padding: '4px',
              cursor: 'pointer'
            }}
          >
            <img
              src={url}
              alt={`Inspiration ${idx}`}
              style={{ width: '120px', height: '120px', objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepInspiration;
