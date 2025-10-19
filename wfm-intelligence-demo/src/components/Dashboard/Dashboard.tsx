import { useEffect } from 'react';
import { CvDHeatmap } from '@/components/CvDHeatmap';

export function Dashboard() {
  // Set document title for accessibility and SEO
  useEffect(() => {
    document.title = 'CvD Heatmap - WFM Intelligence Demo';
  }, []);

  return (
    <div
      className="space-y-6"
      aria-label="Capacity vs Demand Dashboard"
      role="main"
    >
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">
          Capacity vs Demand Heatmap
        </h1>
        <p className="text-slate-600 text-lg">
          Real-time coverage visualization across 7 days showing service level risk
        </p>
      </div>

      {/* Heatmap Container - Responsive with overflow handling */}
      <div className="bg-white rounded-lg shadow-lg p-6 overflow-x-auto">
        <CvDHeatmap />
      </div>
    </div>
  );
}
