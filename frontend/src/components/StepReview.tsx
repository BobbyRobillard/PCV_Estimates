import React from 'react';

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  special_requests: string;
}

interface EstimateItem {
  canvas_type?: string;
  sub_type?: string;
  inspiration_images?: { image_url: string; preference_order: number }[];
  uploads?: File[];
}

interface Props {
  formData: FormData;
  items: EstimateItem[];
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  setStep: (step: number) => void;
}

const StepReview: React.FC<Props> = ({ formData, setFormData, items, setStep }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.first_name || !formData.email || items.length === 0) {
      alert("Please complete the form and add at least one item.");
      return;
    }

    const form = new FormData();
    form.append("first_name", formData.first_name);
    form.append("last_name", formData.last_name);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("special_requests", formData.special_requests);

    items.forEach((item, index) => {
      form.append(`items[${index}][canvas_type]`, item.canvas_type || "");
      form.append(`items[${index}][sub_type]`, item.sub_type || "");
      (item.inspiration_images || []).forEach((img, imgIndex) => {
        form.append(`items[${index}][inspiration_images][${imgIndex}]`, img.image_url);
      });
      (item.uploads || []).forEach((file, fileIndex) => {
        form.append(`items[${index}][uploads][${fileIndex}]`, file);
      });
    });

    try {
      const response = await fetch("/api/submit-estimate", {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        alert("Estimate submitted successfully!");
      } else {
        alert("Something went wrong. Try again.");
      }
    } catch (err) {
      alert("Failed to submit: " + err);
    }
  };

  return (
    <div className="container">
      <h4>Your Estimate Items</h4>
      <button
          className="btn btn-outline-primary"
          onClick={() => setStep(0)}
        >
          + Add Another Item
        </button>
        <br /><br />
      {items.map((item, idx) => (
        <div className="card p-3 mb-3" key={idx}>
          <strong>Item {idx + 1}: {item.canvas_type?.toUpperCase() || "No Type Selected"}</strong>
          <p>Subtype: {item.sub_type || "None"}</p>
          <p>Inspiration Images: {(item.inspiration_images || []).length}</p>
          <p>Uploads: {(item.uploads || []).length}</p>
        </div>
      ))}

      <h4 className="mt-4">Your Contact Info</h4>
      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label">First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="col-12">
          <label className="form-label">Special Requests</label>
          <textarea
            name="special_requests"
            value={formData.special_requests}
            onChange={handleInputChange}
            rows={4}
            className="form-control"
          />
        </div>
      </div>

      <div className="text-end mb-3">
        <button
          className="btn btn-outline-primary"
          onClick={() => setStep(0)}
        >
          + Add Another Item
        </button>
      </div>

      <div className="text-end">
        <button className="btn btn-success" onClick={handleSubmit}>
          Submit Estimate
        </button>
      </div>
    </div>
  );
};

export default StepReview;
