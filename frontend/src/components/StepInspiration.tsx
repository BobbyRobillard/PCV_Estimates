// components/StepInspiration.tsx

import React, { useEffect, useState } from 'react';
import { EstimateItem } from '../types/EstimateItem';

interface StepInspirationProps {
  item: EstimateItem;
  updateItem: (updated: EstimateItem) => void;
}

// Preload all matching images using Vite import.meta.glob
const airboatImages = import.meta.glob('/public/inspiration/airboats/{airboat*,Rudder*}.jpg', { as: 'url' });
const boatImages = import.meta.glob('/public/inspiration/boats/boat*.jpg', { as: 'url' });
const digitalImages = import.meta.glob('/public/inspiration/digital/digital*.jpg', { as: 'url' });

const StepInspiration: React.FC<StepInspirationProps> = ({ item, updateItem }) => {
  const [availableImages, setAvailableImages] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>(() => {
    if (item?.inspiration_images?.length > 0) {
      return item.inspiration_images.map(img => img.image_url);
    }
    return [];
  });

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
    const newSelection = selectedImages.includes(imgUrl)
      ? selectedImages.filter(url => url !== imgUrl)
      : [...selectedImages, imgUrl];

    setSelectedImages(newSelection);

    const updated = newSelection.map((url, i) => ({
      image_url: url,
      preference_order: i + 1
    }));

    updateItem({ ...item, inspiration_images: updated });
  };

  return (
    <div>
      <h3>Select Inspirations</h3>
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
            <img src={url} style={{ width: '120px', height: '120px', objectFit: 'cover' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepInspiration;
