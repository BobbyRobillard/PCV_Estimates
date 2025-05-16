
import React, { useState } from 'react'
import { useEstimateStore } from '../store/EstimateStore'
import StepHeader from '../components/StepHeader'
import StepControls from '../components/StepControls'

export default function StepReview() {
  const { items, editItem, deleteItem, startNewItem, goToStep } = useEstimateStore()

  const [form, setForm] = useState({
    first: '',
    last: '',
    email: '',
    phone: '',
    sms: true
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <div>
      <StepHeader
        stepNumber={8}
        title={"Review Your Estimate"}
        subtitle={"After submitting you should hear back from us with an estimate via a phone call within 24–48 hrs, between 9 AM and 5 PM EST."}
      />

      {items.map((item, idx) => (
        <div key={item.id} style={{
          border: '1px solid #ccc',
          borderRadius: 10,
          padding: 20,
          marginBottom: 20,
          backgroundColor: '#fff',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <h2 style={{ margin: 0 }}>{item.mainType}</h2>
              <p style={{ margin: 0 }}>
                {item.hullType ? `${item.hullType} - ` : ''}
                {(item.subTypes || []).join(', ')}
              </p>
              {item.wrapPurpose && <div><strong>Purpose:</strong> {item.wrapPurpose}</div>}
              {item.wrapLevel && <div><strong>Wrap Level:</strong> {item.wrapLevel}</div>}
              {item.installPlan && <div><strong>Install Plan:</strong> {item.installPlan}</div>}
              {item.shippingToPainterChic !== undefined && <div><strong>Ship to PC:</strong> {item.shippingToPainterChic ? "Yes" : "No"}</div>}
              {item.installState && <div><strong>State:</strong> {item.installState}</div>}
              {item.installCity && <div><strong>City:</strong> {item.installCity}</div>}
              {item.specialNotes && <div><strong>Notes:</strong> {item.specialNotes}</div>}
            </div>
            <div>
              <button onClick={() => editItem(item.id)} style={{
                marginRight: 8,
                padding: '4px 10px',
                border: '1px solid green',
                borderRadius: 20,
                color: 'green',
                background: 'white',
                cursor: 'pointer'
              }}>Edit</button>
              <button onClick={() => deleteItem(item.id)} style={{
                padding: '4px 10px',
                border: '1px solid red',
                borderRadius: 20,
                color: 'red',
                background: 'white',
                cursor: 'pointer'
              }}>Delete</button>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            marginTop: 20,
            gap: 12,
            textAlign: 'center'
          }}>
            <div>
              <h4>Inspiration Images</h4>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                {(item.inspirationIds || []).map((id, i) => (
                  <img key={i} src={`/inspiration/airboats/${id}`} alt={id} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 4 }} />
                ))}
              </div>
            </div>
            <div>
              <h4>Uploaded Files</h4>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                {(item.uploadedImages || []).map((file, i) => (
                  <img key={i} src={URL.createObjectURL(file)} alt={file.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 4 }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <button
          onClick={() => {
            startNewItem('Airboats')
            goToStep(0)
          }}
          style={{
            padding: '8px 20px',
            borderRadius: 24,
            background: 'white',
            border: '2px solid #0033cc',
            color: '#0033cc',
            cursor: 'pointer',
            fontWeight: 500
          }}
        >
          Add Another Item
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12,
        maxWidth: 600,
        margin: '0 auto 12px'
      }}>
        <input name="first" placeholder="Your First Name?" value={form.first} onChange={handleChange} />
        <input name="last" placeholder="Your Last Name?" value={form.last} onChange={handleChange} />
        <input name="email" placeholder="Your Email Address?" value={form.email} onChange={handleChange} />
        <input name="phone" placeholder="Your Phone Number?" value={form.phone} onChange={handleChange} />
      </div>

      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <label>
          Permission to text you at this number?
          <input type="checkbox" checked={form.sms} onChange={handleChange} name="sms" style={{ marginLeft: 6 }} />
        </label>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button style={{
          background: '#0033cc',
          color: 'white',
          padding: '12px 32px',
          fontSize: 16,
          borderRadius: 24,
          border: 'none',
          cursor: 'pointer'
        }}>Submit</button>
      </div>
    </div>
  )
}
