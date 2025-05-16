
import React, { useState } from 'react'
import StepHeader from '../components/StepHeader'
import StepControls from '../components/StepControls'
import { useEstimateStore } from '../store/EstimateStore'

const allImages = import.meta.glob('/public/inspiration/**/*.{jpg,jpeg,png}', { eager: true, as: 'url' })

export default function StepReview() {
  const { items, editItem, deleteItem, startNewItem } = useEstimateStore()

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    alert("Estimate submitted! (Submission logic not yet implemented)")
  }

  return (
    <div>
      <StepHeader
        stepNumber={8}
        title={"Review Your Estimate"}
        subtitle={"Make sure everything looks good before submitting."}
      />

      <div style={{ marginTop: 20 }}>
        <button onClick={() => startNewItem('Airboats')}>
          + Add Another Item
        </button>
      </div>

      <br />

      {items.length === 0 ? (
        <p>No items in estimate.</p>
      ) : (
        <div>
          {items.map((item, index) => (
            <div key={item.id} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 12, marginBottom: 20 }}>
              <h4>Item {index + 1}</h4>
              <p><strong>Main Type:</strong> {item.mainType}</p>
              <p><strong>Parts:</strong> {(item.subTypes || []).join(', ')}</p>
              {item.hullType && <p><strong>Hull Type:</strong> {item.hullType}</p>}
              {item.wrapPurpose && <p><strong>Wrap Purpose:</strong> {item.wrapPurpose}</p>}
              {item.wrapLevel && <p><strong>Wrap Level:</strong> {item.wrapLevel}</p>}
              {item.installPlan && <p><strong>Install Plan:</strong> {item.installPlan}</p>}
              {item.installCity && item.installState && (
                <p><strong>Install Location:</strong> {item.installCity}, {item.installState}</p>
              )}
              {item.specialNotes && <p><strong>Notes:</strong> {item.specialNotes}</p>}

              {item.inspirationIds?.length > 0 && (
                <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {item.inspirationIds.map((name) => {
                    const subfolder = item.mainType === 'Power Boats' ? 'boats' : 'airboats'
                    const match = Object.entries(allImages).find(([path]) =>
                      path.includes(`/inspiration/${subfolder}/`) && path.endsWith(name)
                    )
                    return match ? (
                      <img
                        key={name}
                        src={match[1]}
                        alt={name}
                        style={{ width: 100, height: 80, objectFit: 'cover', borderRadius: 4 }}
                      />
                    ) : null
                  })}
                </div>
              )}

              <div style={{ marginTop: 12 }}>
                <button onClick={() => editItem(item.id)} style={{ marginRight: 10 }}>Edit</button>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </div>
            </div>
          ))}

          <div style={{ marginTop: 30 }}>
            <h4>Contact Info</h4>
            <input
              name="name"
              value={contact.name}
              onChange={handleChange}
              placeholder="Full Name"
              style={{ width: '100%', marginBottom: 10 }}
            />
            <input
              name="email"
              value={contact.email}
              onChange={handleChange}
              placeholder="Email"
              style={{ width: '100%', marginBottom: 10 }}
            />
            <input
              name="phone"
              value={contact.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              style={{ width: '100%', marginBottom: 10 }}
            />
          </div>

          <div style={{ marginTop: 20 }}>
            <button onClick={handleSubmit} style={{ backgroundColor: 'black', color: 'white', padding: '10px 20px', borderRadius: 6 }}>
              Submit Estimate
            </button>
          </div>
        </div>
      )}

      <StepControls />
    </div>
  )
}