import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { CvDDataPoint, RiskLevel } from '@/types';

/**
 * Border color mapping for risk levels
 */
const BORDER_COLORS: Record<RiskLevel, string> = {
  safe: 'border-green-500',
  caution: 'border-yellow-400',
  risk: 'border-red-500',
} as const;

/**
 * Props for HeatmapTooltip component
 */
interface HeatmapTooltipProps {
  dataPoint: CvDDataPoint;
  children: React.ReactNode;
}

/**
 * Calculate end time for a 15-minute interval
 * @param startTime - Time in HH:MM format (e.g., "14:00")
 * @returns End time in HH:MM format (e.g., "14:15")
 */
const getEndTime = (startTime: string): string => {
  const [hours, minutes] = startTime.split(':').map(Number);
  const endMinutes = (minutes + 15) % 60;
  const endHours = minutes + 15 >= 60 ? hours + 1 : hours;
  return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
};

/**
 * HeatmapTooltip component
 * Displays coverage stats on hover for heatmap cells
 *
 * Features:
 * - Coverage percentage
 * - Scheduled agents count
 * - Forecasted demand
 * - Time interval (day + time range)
 * - Color-coded border matching risk level
 * - Auto-positioning to avoid screen edges
 * - Accessible with ARIA attributes
 *
 * @component
 * @param {HeatmapTooltipProps} props - Component props
 * @returns {JSX.Element} Tooltip-wrapped content
 */
export const HeatmapTooltip = React.memo(({ dataPoint, children }: HeatmapTooltipProps) => {
  const timeRange = `${dataPoint.timeSlot}-${getEndTime(dataPoint.timeSlot)}`;
  const borderColor = BORDER_COLORS[dataPoint.riskLevel];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent
        className={`border-2 ${borderColor} bg-white shadow-lg`}
        role="tooltip"
        aria-label={`Coverage ${dataPoint.coveragePercent}%, ${dataPoint.scheduledAgents} agents, ${dataPoint.forecastedCalls} calls`}
      >
        <div className="text-sm space-y-1">
          <p className="font-semibold text-gray-900">
            {dataPoint.dayOfWeek} {timeRange}
          </p>
          <p className="text-gray-700">Coverage: {dataPoint.coveragePercent}%</p>
          <p className="text-gray-700">Agents: {dataPoint.scheduledAgents}</p>
          <p className="text-gray-700">Demand: {dataPoint.forecastedCalls} calls</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
});

HeatmapTooltip.displayName = 'HeatmapTooltip';
