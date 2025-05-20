
import React from 'react'

interface StepHeaderProps {
  stepNumber: number
  title: string
  subtitle: string
}

export default function StepHeader({ stepNumber, title, subtitle }: StepHeaderProps) {
  return (
    <div className="text-center">
      <h2>{title}</h2>
      {subtitle}
    </div>
  )
}
