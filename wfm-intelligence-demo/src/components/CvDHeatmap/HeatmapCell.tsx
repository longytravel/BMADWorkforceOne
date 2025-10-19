import React from 'react';
import { CvDDataPoint, RiskLevel } from '@/types';

/**
 * Color constants for risk levels (Tailwind color palette)
 */
const RISK_COLORS: Record<RiskLevel, string> = {
  safe: '#10B981', // Green (Tailwind green-500)
  caution: '#FBBF24', // Yellow (Tailwind yellow-400)
  risk: '#EF4444', // Red (Tailwind red-500)
} as const;

/**
 * Props for HeatmapCell component
 */
interface HeatmapCellProps {
  dataPoint: CvDDataPoint | null;
  onClick?: () => void;
}

/**
 * Individual cell in the CvD heatmap grid
 * Displays coverage status with color-coded risk levels
 *
 * @component
 * @param {HeatmapCellProps} props - Component props
 * @returns {JSX.Element} Rendered heatmap cell
 */
export const HeatmapCell = React.memo(({ dataPoint, onClick }: HeatmapCellProps) => {
  // Handle null/missing data points (should be rare)
  if (!dataPoint) {
    return (
      <div
        className="w-full h-2 bg-gray-200 border border-gray-300"
        data-testid="heatmap-cell-empty"
      />
    );
  }

  const backgroundColor = RISK_COLORS[dataPoint.riskLevel];

  return (
    <div
      className="w-full h-2 cursor-pointer transition-opacity hover:opacity-80"
      style={{ backgroundColor }}
      data-testid="heatmap-cell"
      data-risk={dataPoint.riskLevel}
      data-time={dataPoint.timeSlot}
      data-day={dataPoint.dayOfWeek}
      onClick={onClick}
      role="gridcell"
      aria-label={`${dataPoint.dayOfWeek} ${dataPoint.timeSlot}: ${dataPoint.riskLevel} risk, ${dataPoint.coveragePercent.toFixed(0)}% coverage`}
    />
  );
});

HeatmapCell.displayName = 'HeatmapCell';
