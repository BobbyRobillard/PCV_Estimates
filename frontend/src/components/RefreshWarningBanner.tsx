
import React, { useEffect } from 'react'

export default function RefreshWarningBanner() {
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handler)
    return () => {
      window.removeEventListener('beforeunload', handler)
    }
  }, [])

  return (
    <div style={{ background: 'red', color: 'white', padding: 10, textAlign: 'center' }}>
      Don’t refresh or close this tab — your progress may be lost!
    </div>
  )
}
