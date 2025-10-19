import { useMemo } from 'react';
import { useAppStore } from '@/stores/appStore';
import { parseISO, addMinutes } from 'date-fns';
import type { Agent, Activity, ActivityType } from '@/types';

/**
 * Represents an agent scheduled during a specific interval with their activity
 */
export interface ScheduledAgent extends Agent {
  activityType: ActivityType;
  activityTitle: string;
}

/**
 * Custom hook to fetch agents scheduled for a specific 15-minute interval
 * Combines agent data with their activities for the time slot
 *
 * @param intervalStart - ISO 8601 timestamp of interval start
 * @returns Array of agents with their activity information
 */
export function useScheduledAgentsForInterval(
  intervalStart: string
): ScheduledAgent[] {
  const agents = useAppStore((state) => state.agents);
  const activities = useAppStore((state) => state.activities);

  return useMemo(() => {
    // Handle undefined/null data from store
    if (!agents || !activities) {
      return [];
    }

    const intervalStartDate = parseISO(intervalStart);
    const intervalEndDate = addMinutes(intervalStartDate, 15);

    // Find all activities overlapping this interval
    const overlappingActivities = activities.filter((activity) => {
      const activityStart = parseISO(activity.startDateTime);
      const activityEnd = parseISO(activity.endDateTime);

      // Activity overlaps if it starts before interval ends AND ends after interval starts
      return activityStart < intervalEndDate && activityEnd > intervalStartDate;
    });

    // Map activities to agents with activity details
    const scheduledAgents = overlappingActivities
      .map((activity: Activity): ScheduledAgent | null => {
        const agent = agents.find((a) => a.id === activity.agentId);
        if (!agent) return null;

        return {
          ...agent,
          activityType: activity.type,
          activityTitle: activity.title,
        };
      })
      .filter((agent): agent is ScheduledAgent => agent !== null);

    return scheduledAgents;
  }, [intervalStart, agents, activities]);
}
