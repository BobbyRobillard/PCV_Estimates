
import React, { useEffect } from 'react'
import { useEstimateStore } from './store/EstimateStore'

import RefreshWarningBanner from './components/RefreshWarningBanner'
import StepTracker from './components/StepTracker'
import EstimateSidebar from './components/EstimateSidebar'

import StepCanvas from './steps/StepCanvas'
import StepInspiration from './steps/StepInspiration'
import StepUpload from './steps/StepUpload'
import StepPurpose from './steps/StepPurpose'
import StepLevel from './steps/StepLevel'
import StepInstallPlan from './steps/StepInstallPlan'
import StepSpecialRequests from './steps/StepSpecialRequests'
import StepReview from './steps/StepReview'

export default function App() {
  const { currentItem, items, currentStep, startNewItem } = useEstimateStore()

  useEffect(() => {
    if (!currentItem && items.length === 0) {
      startNewItem('Airboats')
    }
  }, [currentItem, items])

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <StepCanvas />
      case 1: return <StepInspiration />
      case 2: return <StepUpload />
      case 3: return <StepPurpose />
      case 4: return <StepLevel />
      case 5: return <StepInstallPlan />
      case 6: return <StepSpecialRequests />
      case 7: return <StepReview />
      default: return <div>Invalid Step</div>
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <RefreshWarningBanner />
      <StepTracker />
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: '2rem'
      }}>
        <div style={{ flex: 1 }}>
          {renderStep()}
        </div>
        {currentStep < 7 && (
          <div style={{ minWidth: 300 }}>
            <EstimateSidebar />
          </div>
        )}
      </div>
    </div>
  )
}
