import React, { useRef } from 'react';
import { EstimateItem } from '../types/EstimateItem';

interface StepUploadProps {
  item: EstimateItem;
  updateItem: (updated: EstimateItem) => void;
}

const StepUpload: React.FC<StepUploadProps> = ({ item, updateItem }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    updateItem({ ...item, uploads: fileArray, isDraft: false });
  };

  return (
    <div className="mb-4">
      <div className="mb-3">
        <button
          className="btn btn-primary"
          onClick={() => fileInputRef.current?.click()}
        >
          Upload Files
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="d-none"
        />
      </div>

      <div>
        <h5 className="mb-2">Uploaded Files</h5>
        {item.uploads?.length === 0 ? (
          <p className="text-muted">No files uploaded.</p>
        ) : (
          <ul className="list-group">
            {item.uploads.map((file, i) => (
              <li key={i} className="list-group-item d-flex align-items-center">
                {file.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StepUpload;