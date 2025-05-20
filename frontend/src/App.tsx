import React, { useEffect } from 'react'
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
import RefreshWarningBanner from './components/RefreshWarningBanner'
import { useEstimateStore } from './store/EstimateStore'

// Start on first step (index 0)
const START_STEP = 0

export default function App() {
  const {
    items,
    currentStep,
    currentItem,
    startNewItem,
    goToStep
  } = useEstimateStore()

  useEffect(() => {
    if (!currentItem && items.length === 0) {
      startNewItem()
      goToStep(START_STEP)
    }
  }, [])

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
      default: return <StepCanvas />
    }
  }

  return (
    <div className="container mt-4">
      <RefreshWarningBanner />
      <div className="row">
        <div className="col-lg-8 col-md-12 mb-4">
          {currentStep < 8 && <StepTracker />}
          <br />
          {renderStep()}
        </div>
        {/* Hide sidebar on the review step (index 7) */}
        {currentStep < 7 && (
          <div className="col-lg-4 col-md-12">
            <EstimateSidebar />
          </div>
        )}
      </div>
    </div>
  )
}
