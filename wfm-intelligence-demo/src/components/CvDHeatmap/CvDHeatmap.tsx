import React, { useMemo } from 'react';
import { useAppStore } from '@/stores/appStore';
import { CvDDataPoint } from '@/types';
import { HeatmapCell } from './HeatmapCell';

/**
 * Day names for column headers
 */
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

/**
 * Short day names for display
 */
const DAY_ABBR: Record<string, string> = {
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
  Sunday: 'Sun',
};

/**
 * Generate all 96 time slots (15-minute intervals from 00:00 to 23:45)
 */
const generateTimeSlots = (): string[] => {
  const slots: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const timeSlot = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push(timeSlot);
    }
  }
  return slots;
};

const TIME_SLOTS = generateTimeSlots();

/**
 * Grid structure for organizing CvD data points
 */
interface GridData {
  [day: string]: {
    [timeSlot: string]: CvDDataPoint | null;
  };
}

/**
 * Props for CvDHeatmap component
 */
interface CvDHeatmapProps {
  weekStartDate?: Date; // Optional: for future multi-week support
  highlightedIntervals?: string[]; // Optional: for highlighting specific times
  onCellClick?: (dataPoint: CvDDataPoint) => void; // Optional: for cell interaction
}

/**
 * Main CvD Heatmap component
 * Displays a 7×96 grid of coverage data with color-coded risk levels
 *
 * @component
 * @param {CvDHeatmapProps} props - Component props
 * @returns {JSX.Element} Rendered heatmap grid
 */
export function CvDHeatmap({
  // Reserved for future multi-week support
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  weekStartDate,
  // Reserved for future highlighting feature
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  highlightedIntervals = [],
  onCellClick,
}: CvDHeatmapProps) {
  // Read coverage data from Zustand store
  const cvdData = useAppStore((state) => state.cvdData);

  /**
   * Transform flat cvdData array into 2D grid structure
   * Memoized to prevent recalculation on every render
   */
  const gridData = useMemo<GridData>(() => {
    const grid: GridData = {};

    // Initialize grid structure
    DAYS.forEach((day) => {
      grid[day] = {};
      TIME_SLOTS.forEach((timeSlot) => {
        grid[day][timeSlot] = null;
      });
    });

    // Populate grid with actual data points
    cvdData.forEach((dataPoint) => {
      const day = dataPoint.dayOfWeek;
      const timeSlot = dataPoint.timeSlot;

      if (grid[day] && grid[day][timeSlot] !== undefined) {
        grid[day][timeSlot] = dataPoint;
      }
    });

    return grid;
  }, [cvdData]);

  /**
   * Handle cell click events
   */
  const handleCellClick = (dataPoint: CvDDataPoint | null) => {
    if (dataPoint && onCellClick) {
      onCellClick(dataPoint);
    }
  };

  return (
    <div className="w-full h-full overflow-auto bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Grid container with 8 columns (1 time column + 7 day columns) */}
      <div className="grid grid-cols-8 gap-0 min-w-max">
        {/* HEADER ROW */}
        <div className="sticky top-0 left-0 z-20 bg-white border-b border-r border-gray-300 p-2 text-xs font-semibold text-gray-700">
          Time
        </div>
        {DAYS.map((day) => (
          <div
            key={day}
            className="sticky top-0 z-10 bg-white border-b border-gray-300 p-2 text-xs font-semibold text-center text-gray-700"
          >
            {DAY_ABBR[day]}
          </div>
        ))}

        {/* DATA ROWS (96 time slots) */}
        {TIME_SLOTS.map((timeSlot, rowIndex) => (
          <React.Fragment key={timeSlot}>
            {/* Time label (sticky left column) */}
            <div
              className={`sticky left-0 z-10 bg-white border-r border-gray-300 p-1 text-xs text-right text-gray-600 ${
                rowIndex % 4 === 0 ? 'font-medium' : 'font-normal'
              }`}
              style={{ lineHeight: '0.5rem' }}
            >
              {/* Show time label every hour (every 4th row) */}
              {rowIndex % 4 === 0 ? timeSlot : ''}
            </div>

            {/* Data cells for each day */}
            {DAYS.map((day) => {
              const dataPoint = gridData[day][timeSlot];
              return (
                <div key={`${day}-${timeSlot}`} className="border-b border-gray-200 p-0">
                  <HeatmapCell
                    dataPoint={dataPoint}
                    onClick={() => handleCellClick(dataPoint)}
                  />
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

CvDHeatmap.displayName = 'CvDHeatmap';
