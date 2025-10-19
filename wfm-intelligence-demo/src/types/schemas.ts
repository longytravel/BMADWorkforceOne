// Zod validation schemas for runtime data validation

import { z } from 'zod';

/**
 * Schema for validating RiskLevel values
 */
export const RiskLevelSchema = z.enum(['safe', 'caution', 'risk']);

/**
 * Schema for validating ActivityType values
 */
export const ActivityTypeSchema = z.enum([
  'shift',
  'break',
  'lunch',
  'meeting',
  'training',
  'off-phone',
  'unavailable',
]);

/**
 * Schema for CvD data point validation
 * Validates structure from cvd-forecast.json and computed fields
 */
export const CvDDataPointSchema = z.object({
  intervalStart: z.string().datetime(), // ISO 8601 datetime string
  dayOfWeek: z.string(),
  timeSlot: z.string().regex(/^\d{2}:\d{2}$/), // HH:MM format
  forecastedCalls: z.number().nonnegative(),
  scheduledAgents: z.number().nonnegative(),
  coveragePercent: z.number().nonnegative(),
  riskLevel: RiskLevelSchema,
  metadata: z.object({
    skillsAvailable: z.array(z.string()),
    peakHour: z.boolean(),
  }),
});

/**
 * Schema for Agent validation
 */
export const AgentSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  skills: z.array(z.string()),
  team: z.string(),
  employmentType: z.enum(['full-time', 'part-time']),
  weeklySchedule: z.object({
    monday: z.string().optional(),
    tuesday: z.string().optional(),
    wednesday: z.string().optional(),
    thursday: z.string().optional(),
    friday: z.string().optional(),
    saturday: z.string().optional(),
    sunday: z.string().optional(),
  }),
  metadata: z.object({
    meetingsThisWeek: z.number(),
    breakAdjustmentsThisWeek: z.number(),
    lastScheduledDate: z.string().optional(),
  }),
});

/**
 * Schema for Activity validation
 */
export const ActivitySchema = z.object({
  id: z.string(),
  agentId: z.string(),
  type: ActivityTypeSchema,
  title: z.string(),
  startDateTime: z.string().datetime(),
  endDateTime: z.string().datetime(),
  durationMinutes: z.number().positive(),
  isMovable: z.boolean(),
  color: z.string(),
  metadata: z.object({
    attendees: z.array(z.string()).optional(),
    reason: z.string().optional(),
    ioiScore: z.number().optional(),
  }),
});

/**
 * Schema for arrays of data
 */
export const CvDDataArraySchema = z.array(CvDDataPointSchema);
export const AgentArraySchema = z.array(AgentSchema);
export const ActivityArraySchema = z.array(ActivitySchema);
