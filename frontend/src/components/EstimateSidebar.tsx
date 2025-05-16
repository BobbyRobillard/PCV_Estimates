
import React from 'react'
import { useEstimateStore } from '../store/EstimateStore'

export default function EstimateSidebar() {
  const { items, editItem, deleteItem, goToStep } = useEstimateStore()

  return (
    <div style={{
      padding: 16,
      border: '1px solid #ccc',
      borderRadius: 8,
      backgroundColor: '#f5f5f5'
    }}>
      <h3 style={{ marginBottom: 16 }}>Your Estimate</h3>

      {items.length === 0 ? (
        <p>No items yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map((item, idx) => (
            <div key={item.id} style={{
              border: '1px solid #ccc',
              borderRadius: 6,
              padding: 10,
              backgroundColor: '#fff'
            }}>
              <strong>{item.mainType}</strong>
              {item.hullType && <div><b>Hull Type:</b> {item.hullType}</div>}
              {item.subTypes?.length > 0 && <div><b>Sub Types:</b> {item.subTypes.join(', ')}</div>}

              <div style={{ marginTop: 8 }}>
                <button onClick={() => editItem(item.id)} style={{
                  marginRight: 6,
                  padding: '2px 10px',
                  fontSize: '0.85rem',
                  background: 'white',
                  border: '1px solid green',
                  color: 'green',
                  borderRadius: 20,
                  cursor: 'pointer'
                }}>
                  Edit
                </button>
                <button onClick={() => deleteItem(item.id)} style={{
                  padding: '2px 10px',
                  fontSize: '0.85rem',
                  background: 'white',
                  border: '1px solid red',
                  color: 'red',
                  borderRadius: 20,
                  cursor: 'pointer'
                }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <button
          onClick={() => goToStep(7)}
          style={{
            marginTop: 20,
            backgroundColor: '#0033cc',
            color: 'white',
            padding: '10px 16px',
            borderRadius: 24,
            border: 'none',
            cursor: 'pointer',
            width: '100%',
            fontWeight: 500
          }}
        >
          Review Your Estimate
        </button>
      )}
    </div>
  )
}
