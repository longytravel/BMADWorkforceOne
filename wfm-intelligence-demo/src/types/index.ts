// Core data model type definitions

import { ActivityType, RiskLevel } from './constants';

/**
 * Weekly schedule structure for agents
 */
export interface WeeklySchedule {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

/**
 * Agent entity representing contact center staff
 */
export interface Agent {
  id: string;
  name: string;
  email: string;
  skills: string[];
  team: string;
  employmentType: 'full-time' | 'part-time';
  weeklySchedule: WeeklySchedule;
  metadata: {
    meetingsThisWeek: number;
    breakAdjustmentsThisWeek: number;
    lastScheduledDate?: string;
  };
}

/**
 * Activity represents a scheduled event for an agent
 * (shift, break, meeting, etc.)
 */
export interface Activity {
  id: string;
  agentId: string;
  type: ActivityType;
  title: string;
  startDateTime: string; // ISO 8601 format
  endDateTime: string; // ISO 8601 format
  durationMinutes: number;
  isMovable: boolean;
  color: string;
  metadata: {
    attendees?: string[];
    reason?: string;
    ioiScore?: number;
  };
}

/**
 * CvD (Coverage vs Demand) data point for heatmap visualization
 * Represents a 15-minute interval's coverage status
 */
export interface CvDDataPoint {
  intervalStart: string; // ISO 8601 format (e.g., "2025-10-20T14:00:00Z")
  dayOfWeek: string; // Monday, Tuesday, etc.
  timeSlot: string; // HH:MM format (e.g., "14:00")
  forecastedCalls: number; // Demand forecast for this interval
  scheduledAgents: number; // Number of agents scheduled (computed real-time)
  coveragePercent: number; // (scheduledAgents / forecastedCalls) * 100
  riskLevel: RiskLevel; // 'safe' >105%, 'caution' 90-105%, 'risk' <90%
  metadata: {
    skillsAvailable: string[]; // Skills of scheduled agents in this interval
    peakHour: boolean; // Flag for 10am-12pm, 2pm-4pm peaks
  };
}

/**
 * Compliance rule for workforce management
 */
export interface ComplianceRule {
  id: string;
  type: 'break' | 'lunch' | 'shift' | 'overtime' | 'rest';
  description: string;
  parameters: {
    minDuration?: number; // minutes
    maxDuration?: number; // minutes
    requiredAfter?: number; // minutes (e.g., break required after 4 hours)
    minGap?: number; // minutes between shifts
    maxConsecutiveDays?: number;
  };
  severity: 'warning' | 'error' | 'info';
  enabled: boolean;
}

// Re-export enums and constants
export { ActivityType, RiskLevel, ActivityColors } from './constants';
