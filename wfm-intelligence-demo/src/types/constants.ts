// Constants and type definitions for the application

/**
 * Activity types for agent schedules
 */
export const ActivityType = {
  SHIFT: 'shift',
  BREAK: 'break',
  LUNCH: 'lunch',
  MEETING: 'meeting',
  TRAINING: 'training',
  OFF_PHONE: 'off-phone',
  UNAVAILABLE: 'unavailable',
} as const;

export type ActivityType = (typeof ActivityType)[keyof typeof ActivityType];

/**
 * Risk levels for coverage analysis
 */
export const RiskLevel = {
  SAFE: 'safe',
  CAUTION: 'caution',
  RISK: 'risk',
} as const;

export type RiskLevel = (typeof RiskLevel)[keyof typeof RiskLevel];

/**
 * Color mapping for activity types (Outlook-style calendar)
 */
export const ActivityColors: Record<ActivityType, string> = {
  [ActivityType.SHIFT]: '#0078D4', // Microsoft blue
  [ActivityType.BREAK]: '#00B7C3', // Teal
  [ActivityType.LUNCH]: '#8764B8', // Purple
  [ActivityType.MEETING]: '#D13438', // Red
  [ActivityType.TRAINING]: '#CA5010', // Orange
  [ActivityType.OFF_PHONE]: '#498205', // Green
  [ActivityType.UNAVAILABLE]: '#8A8886', // Gray
};
