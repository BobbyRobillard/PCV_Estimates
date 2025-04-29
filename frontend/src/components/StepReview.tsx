// StepReview.tsx

import React from 'react';
import { EstimateItem } from '../types/EstimateItem';
import StepHeader from './StepHeader';

interface FormDataState {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  special_requests: string;
  text_permission: boolean;
}

interface StepReviewProps {
  items: EstimateItem[];
  formData: FormDataState;
  setFormData: React.Dispatch<React.SetStateAction<FormDataState>>;
  setStep: (step: number) => void;
  setActiveItemId: (id: string | null) => void;
  deleteItem: (id: string) => void;
}

const StepReview: React.FC<StepReviewProps> = ({
  items,
  formData,
  setFormData,
  setStep,
  setActiveItemId,
  deleteItem
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    console.log('Submitting estimate with items:', items);
    console.log('Contact info:', formData);
    setStep(0);
    setActiveItemId(null);
  };

  const handleAddAnotherItem = () => {
    setStep(0);
    setActiveItemId(null);
  };

  const handleEditItem = (id: string) => {
    setActiveItemId(id);
    setStep(0);
  };

  return (
    <div>
      <StepHeader step={4} title="Review & Submit" />

      {/* Estimate Items */}
      <div className="mb-4">
        <h5>Estimate Items</h5>
        {items.length === 0 ? (
          <p>No items added yet.</p>
        ) : (
          <ul className="list-group mb-3">
            {items.map((item) => (
              <li key={item.id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-start flex-wrap">
                  <div style={{ flex: 1, minWidth: '250px' }}>
                    <strong>Type:</strong> {item.canvas_type}<br />
                    <strong>Sub-Types:</strong> {item.sub_types.join(', ')}<br />
                    {item.hull_subtype && <><strong>Hull Type:</strong> {item.hull_subtype}<br /></>}
                    {item.inspiration_images?.length > 0 && (
                      <>
                        <strong>Inspiration Images:</strong>
                        <div className="d-flex flex-wrap gap-2 mt-1">
                          {item.inspiration_images.map((img, idx) => (
                            <img
                              key={idx}
                              src={img.image_url}
                              alt={`Selected inspiration ${idx}`}
                              style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                            />
                          ))}
                        </div>
                      </>
                    )}
                    {item.uploads?.length > 0 && (
                      <>
                        <strong className="d-block mt-2">Uploaded Files:</strong>
                        <div className="d-flex flex-wrap gap-2">
                          {item.uploads.map((file, idx) => (
                            <div key={idx} className="text-center">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                              />
                              <div style={{ fontSize: '0.75rem', wordBreak: 'break-word' }}>
                                {file.name.length > 12 ? file.name.slice(0, 10) + '…' : file.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="d-flex flex-column align-items-end mt-2 ms-3">
                    <button className="btn btn-sm btn-outline-secondary mb-2" onClick={() => handleEditItem(item.id)}>
                      Edit
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => deleteItem(item.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <button className="btn btn-outline-primary" onClick={handleAddAnotherItem}>
          + Add Another Item
        </button>
      </div>

      {/* Contact Info */}
      <div className="card p-4 mb-4">
        <h5>Contact Info</h5>
        <div className="mb-3">
          <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} className="form-control mb-2" />
          <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} className="form-control mb-2" />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="form-control mb-2" />
          <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="form-control mb-2" />
          <textarea name="special_requests" placeholder="Special Requests (Optional)" value={formData.special_requests} onChange={handleChange} className="form-control mb-2" />
          <div className="form-check mt-2">
            <input type="checkbox" name="text_permission" checked={formData.text_permission} onChange={handleChange} className="form-check-input" id="textPermission" />
            <label className="form-check-label" htmlFor="textPermission">
              Do we have permission to text you about your estimate?
            </label>
          </div>
        </div>
      </div>

      <button className="btn btn-success btn-lg w-100" onClick={handleSubmit}>
        Submit Estimate
      </button>
    </div>
  );
};

export default StepReview;
