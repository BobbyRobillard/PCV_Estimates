// StepUpload.tsx

import React, { useRef, useState } from 'react';
import StepHeader from './StepHeader';
import { EstimateItem } from '../types/EstimateItem';

interface StepUploadProps {
  item: EstimateItem;
  updateItem: (updated: EstimateItem) => void;
}

const StepUpload: React.FC<StepUploadProps> = ({ item, updateItem }) => {
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const validUploads: File[] = [];

    Array.from(files).forEach(file => {
      if (file.size > 250 * 1024 * 1024) {
        setError(`File "${file.name}" is too large. Max 250MB allowed.`);
        return;
      }

      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setError(`File "${file.name}" must be JPEG or PNG.`);
        return;
      }

      validUploads.push(file);
    });

    if (validUploads.length > 0) {
      updateItem({
        ...item,
        uploads: [...item.uploads, ...validUploads]
      });
      setError('');
    }

    // 💥 Reset the input so same files can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveUpload = (index: number) => {
    const newUploads = item.uploads.filter((_, idx) => idx !== index);
    updateItem({
      ...item,
      uploads: newUploads
    });

    // 💥 Reset input again after delete (just in case)
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <StepHeader step={3} title="Upload Inspiration Photos Of Your Own" />
      <h3 className="mb-4">File size limit of 250mb per upload.</h3>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileChange}
        accept="image/jpeg, image/png"
        className="form-control mb-3"
      />

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {item.uploads.length > 0 && (
        <div className="row g-3">
          {item.uploads.map((file, idx) => (
            <div key={idx} className="col-6 col-md-4 col-lg-3 text-center">
              <div className="border rounded p-2 h-100 d-flex flex-column justify-content-between">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Upload ${idx}`}
                  style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '4px' }}
                />
                <div style={{ fontSize: '0.75rem', wordBreak: 'break-word', marginTop: '5px' }}>
                  {file.name.length > 20 ? file.name.slice(0, 17) + "..." : file.name}
                </div>
                <button
                  className="btn btn-sm btn-outline-danger mt-2"
                  onClick={() => handleRemoveUpload(idx)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StepUpload;
