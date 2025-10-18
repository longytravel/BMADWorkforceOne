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
  intervalStart: string; // ISO 8601 format
  dayOfWeek: string; // Monday, Tuesday, etc.
  timeSlot: string; // HH:MM format (e.g., "09:00")
  coverage: number; // Number of agents available
  demand: number; // Required number of agents
  surplus: number; // coverage - demand
  riskLevel: RiskLevel;
  utilizationPercent: number; // (coverage / demand) * 100
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
