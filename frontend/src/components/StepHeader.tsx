
import React from 'react'

interface StepHeaderProps {
  stepNumber: number
  title: string
  subtitle: string
}

export default function StepHeader({ stepNumber, title, subtitle }: StepHeaderProps) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ fontSize: '2rem', fontWeight: 700 }}>{stepNumber}.</div>
      <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{title}</div>
      <div style={{ fontSize: '1rem', color: '#666' }}>{subtitle}</div>
    </div>
  )
}
