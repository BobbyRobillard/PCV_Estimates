import React from 'react';
import { EstimateItem } from '../types/EstimateItem';

interface StepInspirationProps {
  item: EstimateItem;
  updateItem: (updated: EstimateItem) => void;
}

const sampleImages = [
  '/inspiration/airboat1.png',
  '/inspiration/airboat2.png',
  '/inspiration/airboat3.png',
  '/inspiration/airboat4.png',
  '/inspiration/airboat5.png',
];

const StepInspiration: React.FC<StepInspirationProps> = ({ item, updateItem }) => {
  const handleSelect = (imageUrl: string) => {
    let updated = [...(item.inspiration_images || [])];
    const existingIndex = updated.findIndex(img => img.image_url === imageUrl);

    if (existingIndex !== -1) {
      updated.splice(existingIndex, 1);
    } else {
      if (updated.length >= 5) return;
      updated.push({ image_url: imageUrl, preference_order: updated.length + 1 });
    }

    updateItem({ ...item, inspiration_images: updated });
  };

  const getOrder = (imageUrl: string) => {
    const found = (item.inspiration_images || []).find(img => img.image_url === imageUrl);
    return found ? found.preference_order : null;
  };

  return (
    <div className="row g-3">
      {sampleImages.map((url) => {
        const order = getOrder(url);
        return (
          <div
            key={url}
            className="col-6 col-md-4"
            onClick={() => handleSelect(url)}
            style={{ cursor: 'pointer' }}
          >
            <div className={`card position-relative ${order ? 'border-primary' : 'border-secondary'}`}>
              <img src={url} className="card-img-top" alt="inspiration" />
              {order && (
                <span className="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-primary">
                  {order}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StepInspiration;