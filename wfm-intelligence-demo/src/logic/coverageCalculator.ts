// Coverage Calculator - Pure functions for CvD (Coverage vs Demand) analysis

import type { CvDDataPoint, Agent, Activity } from '../types';
import { RiskLevel } from '../types';
import { parseISO, addMinutes } from 'date-fns';

/**
 * Constants for coverage calculation
 */
const RISK_THRESHOLD_LOW = 90; // Below 90% = 'risk'
const RISK_THRESHOLD_HIGH = 105; // Above 105% = 'safe'
const INTERVAL_MINUTES = 15; // 15-minute intervals
const INTERVALS_PER_DAY = 96; // 24 hours * 4 intervals/hour
const DAYS_IN_WEEK = 7;

/**
 * Peak hours for metadata flagging
 * 10:00-12:00 and 14:00-16:00
 */
const PEAK_HOURS = [
  { start: 10, end: 12 },
  { start: 14, end: 16 },
];

/**
 * Determine risk level based on coverage percentage
 * Special case: 100% coverage with zero demand = 'safe' (no calls to handle)
 * @param coveragePercent - Coverage percentage (0-Infinity)
 * @param forecastedCalls - Demand forecast (for zero-demand edge case)
 * @returns RiskLevel - 'safe', 'caution', or 'risk'
 */
export function determineRiskLevel(
  coveragePercent: number,
  forecastedCalls: number = 1
): RiskLevel {
  // Zero demand edge case: return 'safe' (no calls = no risk)
  if (forecastedCalls === 0) {
    return 'safe';
  }

  if (coveragePercent < RISK_THRESHOLD_LOW) {
    return 'risk';
  } else if (coveragePercent <= RISK_THRESHOLD_HIGH) {
    return 'caution';
  } else {
    return 'safe';
  }
}

/**
 * Calculate coverage percentage with zero-demand handling
 * @param forecastedCalls - Demand forecast for interval
 * @param scheduledAgents - Number of agents scheduled
 * @returns Coverage percentage (0-100+ for overstaffing)
 */
export function calculateCoveragePercent(
  forecastedCalls: number,
  scheduledAgents: number
): number {
  // Zero demand edge case: return 100% (no calls to handle = perfect coverage)
  if (forecastedCalls === 0) {
    return 100;
  }

  return (scheduledAgents / forecastedCalls) * 100;
}

/**
 * Check if a time is within peak hours
 * @param hour - Hour of day (0-23)
 * @returns true if within peak hours
 */
function isPeakHour(hour: number): boolean {
  return PEAK_HOURS.some((peak) => hour >= peak.start && hour < peak.end);
}

/**
 * Count how many agents are scheduled during a specific interval
 * @param intervalStart - ISO 8601 datetime string for interval start
 * @param intervalEnd - ISO 8601 datetime string for interval end
 * @param activities - All agent activities
 * @param agents - All agents (for skill lookup)
 * @returns Object with count and skills
 */
export function countScheduledAgents(
  intervalStart: string,
  intervalEnd: string,
  activities: Activity[],
  agents: Agent[]
): { count: number; skillsAvailable: string[] } {
  const start = parseISO(intervalStart);
  const end = parseISO(intervalEnd);

  const agentIdsInInterval = new Set<string>();
  const skillsSet = new Set<string>();

  // Find all agents with shift activities overlapping this interval
  activities.forEach((activity) => {
    // Only count 'shift' activities as available capacity
    if (activity.type !== 'shift') {
      return;
    }

    const activityStart = parseISO(activity.startDateTime);
    const activityEnd = parseISO(activity.endDateTime);

    // Check if activity overlaps with interval
    const overlaps =
      activityStart < end && activityEnd > start;

    if (overlaps) {
      agentIdsInInterval.add(activity.agentId);
    }
  });

  // Collect skills from scheduled agents
  agentIdsInInterval.forEach((agentId) => {
    const agent = agents.find((a) => a.id === agentId);
    if (agent) {
      agent.skills.forEach((skill) => skillsSet.add(skill));
    }
  });

  return {
    count: agentIdsInInterval.size,
    skillsAvailable: Array.from(skillsSet),
  };
}

/**
 * Calculate coverage for a single interval
 * @param intervalStart - ISO 8601 datetime string
 * @param dayOfWeek - Day name (e.g., "Monday")
 * @param timeSlot - Time in HH:MM format
 * @param forecastedCalls - Demand forecast
 * @param activities - All activities
 * @param agents - All agents
 * @returns CvDDataPoint with calculated coverage
 */
export function calculateCoverageForInterval(
  intervalStart: string,
  dayOfWeek: string,
  timeSlot: string,
  forecastedCalls: number,
  activities: Activity[],
  agents: Agent[]
): CvDDataPoint {
  const start = parseISO(intervalStart);
  const end = addMinutes(start, INTERVAL_MINUTES);
  const intervalEnd = end.toISOString();

  // Count scheduled agents and collect skills
  const { count: scheduledAgents, skillsAvailable } = countScheduledAgents(
    intervalStart,
    intervalEnd,
    activities,
    agents
  );

  // Calculate coverage percentage
  const coveragePercent = calculateCoveragePercent(
    forecastedCalls,
    scheduledAgents
  );

  // Determine risk level (pass forecastedCalls for zero-demand handling)
  const riskLevel = determineRiskLevel(coveragePercent, forecastedCalls);

  // Check if peak hour (use UTC hours to match ISO datetime)
  const hour = start.getUTCHours();
  const peakHour = isPeakHour(hour);

  return {
    intervalStart,
    dayOfWeek,
    timeSlot, // Use the provided timeSlot (already formatted correctly by caller)
    forecastedCalls,
    scheduledAgents,
    coveragePercent,
    riskLevel,
    metadata: {
      skillsAvailable,
      peakHour,
    },
  };
}

/**
 * Generate all 672 interval slots for a week
 * @param weekStartDate - ISO 8601 datetime for Monday 00:00
 * @returns Array of interval metadata (start time, day, time slot)
 */
export function generateAllIntervals(weekStartDate: string): Array<{
  intervalStart: string;
  dayOfWeek: string;
  timeSlot: string;
}> {
  const intervals: Array<{
    intervalStart: string;
    dayOfWeek: string;
    timeSlot: string;
  }> = [];

  const dayNames = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const startDate = parseISO(weekStartDate);

  for (let day = 0; day < DAYS_IN_WEEK; day++) {
    const dayOfWeek = dayNames[day];

    for (let intervalIdx = 0; intervalIdx < INTERVALS_PER_DAY; intervalIdx++) {
      const totalMinutes = day * 24 * 60 + intervalIdx * INTERVAL_MINUTES;
      const intervalStart = addMinutes(startDate, totalMinutes);

      // Format time slot using UTC to match ISO datetime
      const hours = intervalStart.getUTCHours().toString().padStart(2, '0');
      const minutes = intervalStart.getUTCMinutes().toString().padStart(2, '0');
      const timeSlot = `${hours}:${minutes}`;

      intervals.push({
        intervalStart: intervalStart.toISOString(),
        dayOfWeek,
        timeSlot,
      });
    }
  }

  return intervals;
}

/**
 * Coverage Calculator class for managing recalculations
 */
export class CoverageCalculator {
  /**
   * Recalculate all CvD data points
   * @param agents - All agents
   * @param activities - All activities
   * @param forecastData - Forecast data with intervalStart and forecastedCalls
   * @returns Updated CvDDataPoint array
   */
  recalculateAll(
    agents: Agent[],
    activities: Activity[],
    forecastData: Array<{ intervalStart: string; forecastedCalls: number }>
  ): CvDDataPoint[] {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return forecastData.map((forecast) => {
      const start = parseISO(forecast.intervalStart);
      const dayOfWeek = dayNames[start.getUTCDay()]; // Use UTC day

      // Format time slot using UTC
      const hours = start.getUTCHours().toString().padStart(2, '0');
      const minutes = start.getUTCMinutes().toString().padStart(2, '0');
      const timeSlot = `${hours}:${minutes}`;

      return calculateCoverageForInterval(
        forecast.intervalStart,
        dayOfWeek,
        timeSlot,
        forecast.forecastedCalls,
        activities,
        agents
      );
    });
  }

  /**
   * Recalculate only intervals affected by a time range
   * @param cvdData - Current CvD data
   * @param agents - All agents
   * @param activities - All activities
   * @param changedStart - Start of changed time range
   * @param changedEnd - End of changed time range
   * @returns Updated CvDDataPoint array (optimized - only affected intervals)
   */
  recalculateAffected(
    cvdData: CvDDataPoint[],
    agents: Agent[],
    activities: Activity[],
    changedStart: string,
    changedEnd: string
  ): CvDDataPoint[] {
    const changeStart = parseISO(changedStart);
    const changeEnd = parseISO(changedEnd);

    return cvdData.map((dataPoint) => {
      const intervalStart = parseISO(dataPoint.intervalStart);
      const intervalEnd = addMinutes(intervalStart, INTERVAL_MINUTES);

      // Check if this interval overlaps with the changed time range
      const overlaps = intervalStart < changeEnd && intervalEnd > changeStart;

      if (!overlaps) {
        // No overlap, return unchanged
        return dataPoint;
      }

      // Recalculate this interval
      return calculateCoverageForInterval(
        dataPoint.intervalStart,
        dataPoint.dayOfWeek,
        dataPoint.timeSlot,
        dataPoint.forecastedCalls,
        activities,
        agents
      );
    });
  }
}
