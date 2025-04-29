// RefreshWarningBanner.tsx

import React, { useState } from 'react';

const RefreshWarningBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="alert alert-warning d-flex justify-content-between align-items-center" role="alert">
      <div>
        <strong>⚠️ Don't refresh the page!</strong> You'll lose your current estimate.
      </div>
      <button
        className="btn-close"
        onClick={() => setDismissed(true)}
        aria-label="Close"
      />
    </div>
  );
};

export default RefreshWarningBanner;
