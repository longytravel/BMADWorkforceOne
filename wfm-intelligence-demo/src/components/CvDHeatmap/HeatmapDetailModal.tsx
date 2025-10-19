import { useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { CvDDataPoint } from '@/types';
import { useScheduledAgentsForInterval } from '@/hooks/useScheduledAgentsForInterval';
import type { ScheduledAgent } from '@/hooks/useScheduledAgentsForInterval';

/**
 * Props for HeatmapDetailModal component
 */
interface HeatmapDetailModalProps {
  dataPoint: CvDDataPoint | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Activity type color mapping for badges
 */
const ACTIVITY_COLORS: Record<string, string> = {
  shift: 'bg-blue-500 hover:bg-blue-600',
  break: 'bg-orange-500 hover:bg-orange-600',
  lunch: 'bg-purple-500 hover:bg-purple-600',
  meeting: 'bg-green-500 hover:bg-green-600',
  training: 'bg-teal-500 hover:bg-teal-600',
  'off-phone': 'bg-yellow-500 hover:bg-yellow-600',
  unavailable: 'bg-gray-500 hover:bg-gray-600',
} as const;

/**
 * Risk level color mapping for coverage badge
 */
const RISK_BADGE_COLORS: Record<string, string> = {
  safe: 'bg-green-100 text-green-800 border-green-300',
  caution: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  risk: 'bg-red-100 text-red-800 border-red-300',
} as const;

/**
 * Helper to format time interval (e.g., "14:00" → "14:15")
 */
const getEndTime = (startTime: string): string => {
  const [hours, minutes] = startTime.split(':').map(Number);
  const endMinutes = (minutes + 15) % 60;
  const endHours = (minutes + 15 >= 60 ? hours + 1 : hours) % 24;
  return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
};

/**
 * Helper to aggregate skills from scheduled agents
 */
function aggregateSkills(
  scheduledAgents: ScheduledAgent[]
): Record<string, number> {
  const skillCounts: Record<string, number> = {};

  scheduledAgents.forEach((agent) => {
    agent.skills.forEach((skill) => {
      skillCounts[skill] = (skillCounts[skill] || 0) + 1;
    });
  });

  // Sort by count descending
  return Object.entries(skillCounts)
    .sort(([, a], [, b]) => b - a)
    .reduce(
      (acc, [skill, count]) => {
        acc[skill] = count;
        return acc;
      },
      {} as Record<string, number>
    );
}

/**
 * Modal component displaying detailed coverage information for a heatmap cell
 * Shows coverage summary, scheduled agents, and skills breakdown
 *
 * @component
 * @param {HeatmapDetailModalProps} props - Component props
 * @returns {JSX.Element} Rendered detail modal
 */
export function HeatmapDetailModal({
  dataPoint,
  isOpen,
  onClose,
}: HeatmapDetailModalProps) {
  const [showAllAgents, setShowAllAgents] = useState(false);

  // Fetch scheduled agents for this interval
  const scheduledAgents = useScheduledAgentsForInterval(
    dataPoint?.intervalStart ?? ''
  );

  // Aggregate skills from scheduled agents
  const skillsBreakdown = useMemo(
    () => aggregateSkills(scheduledAgents),
    [scheduledAgents]
  );

  // Determine displayed agents (limit to 20 unless "Show more" is clicked)
  const displayedAgents = showAllAgents
    ? scheduledAgents
    : scheduledAgents.slice(0, 20);

  if (!dataPoint) return null;

  const endTime = getEndTime(dataPoint.timeSlot);
  const riskText =
    dataPoint.riskLevel === 'safe'
      ? 'Safe'
      : dataPoint.riskLevel === 'caution'
        ? 'Caution'
        : 'Risk';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {dataPoint.dayOfWeek} {dataPoint.timeSlot}-{endTime}
          </DialogTitle>
        </DialogHeader>

        {/* Coverage Summary Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Coverage Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">Coverage:</span>
              <Badge
                className={RISK_BADGE_COLORS[dataPoint.riskLevel]}
                variant="outline"
              >
                {dataPoint.coveragePercent.toFixed(0)}% ({riskText})
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Scheduled Agents:</span>
              <span>{dataPoint.scheduledAgents}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Forecasted Demand:</span>
              <span>{dataPoint.forecastedCalls} calls</span>
            </div>
          </CardContent>
        </Card>

        {/* Scheduled Agents Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Scheduled Agents</CardTitle>
          </CardHeader>
          <CardContent>
            {scheduledAgents.length === 0 ? (
              <p className="text-gray-500 italic">
                No agents scheduled for this interval
              </p>
            ) : (
              <>
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {displayedAgents.map((agent) => (
                    <div
                      key={`${agent.id}-${agent.activityType}`}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200"
                    >
                      <span className="font-medium">{agent.name}</span>
                      <Badge
                        className={`${ACTIVITY_COLORS[agent.activityType] || 'bg-gray-500'} text-white`}
                      >
                        {agent.activityType}
                      </Badge>
                    </div>
                  ))}
                </div>

                {/* Show More Button for >20 agents */}
                {!showAllAgents && scheduledAgents.length > 20 && (
                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={() => setShowAllAgents(true)}
                  >
                    Show {scheduledAgents.length - 20} more agents
                  </Button>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Skills Breakdown Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Skills Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.keys(skillsBreakdown).length === 0 ? (
              <p className="text-gray-500 italic">No skills data available</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {Object.entries(skillsBreakdown).map(([skill, count]) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="text-sm px-3 py-1"
                  >
                    {skill}: {count}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
