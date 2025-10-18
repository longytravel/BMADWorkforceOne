# Data Models

These are the core data models/entities that define the domain. All TypeScript interfaces enable strict type checking.

## Agent

**Purpose:** Represents a contact center agent with skills, availability, and scheduling metadata.

**Key Attributes:**
- `id`: string - Unique identifier (UUID or sequential)
- `name`: string - Full name for display
- `email`: string - Contact email (for notification previews)
- `skills`: string[] - Array of skill tags (e.g., ["Spanish", "Technical", "Sales"])
- `team`: string - Team/department grouping
- `employmentType`: "full-time" | "part-time" - Affects scheduling rules
- `weeklySchedule`: WeeklySchedule - Standard shift times
- `metadata`: object - Fairness tracking (meetings scheduled this week, etc.)

### TypeScript Interface

```typescript
interface Agent {
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
    lastScheduledDate?: string; // ISO date
  };
}

interface WeeklySchedule {
  monday?: DayShift;
  tuesday?: DayShift;
  wednesday?: DayShift;
  thursday?: DayShift;
  friday?: DayShift;
  saturday?: DayShift;
  sunday?: DayShift;
}

interface DayShift {
  startTime: string; // "09:00" (24-hour format)
  endTime: string;   // "17:00"
  isWorkingDay: boolean;
}
```

### Relationships
- **Agent → Activities** (one-to-many): Each agent has multiple scheduled activities
- **Agent → CvDDataPoint** (many-to-many): Agents contribute to coverage in time intervals
- **Agent → IOIResult** (computed): IOI scoring evaluates agents for time slots

---

## Activity

**Purpose:** Represents any scheduled block on an agent's calendar (shift, break, lunch, meeting, training).

**Key Attributes:**
- `id`: string - Unique activity identifier
- `agentId`: string - Foreign key to Agent
- `type`: ActivityType - Enum of activity categories
- `title`: string - Display name
- `startDateTime`: string - ISO 8601 datetime
- `endDateTime`: string - ISO 8601 datetime
- `durationMinutes`: number - Calculated or explicit
- `isMovable`: boolean - Whether drag-drop is allowed
- `color`: string - Hex color for calendar display
- `metadata`: object - Additional context (meeting attendees, etc.)

### TypeScript Interface

```typescript
type ActivityType =
  | 'shift'
  | 'break'
  | 'lunch'
  | 'meeting'
  | 'training'
  | 'off-phone'
  | 'unavailable';

interface Activity {
  id: string;
  agentId: string;
  type: ActivityType;
  title: string;
  startDateTime: string; // ISO 8601: "2025-10-20T14:30:00Z"
  endDateTime: string;
  durationMinutes: number;
  isMovable: boolean;
  color: string; // "#3B82F6" (Tailwind blue-500)
  metadata: {
    attendees?: string[]; // Agent IDs for meetings
    reason?: string;      // For training/off-phone
    ioiScore?: number;    // If scheduled via Smart Search
  };
}

// Color scheme constants
const ActivityColors: Record<ActivityType, string> = {
  shift: '#3B82F6',      // Blue
  break: '#FB923C',      // Orange
  lunch: '#A855F7',      // Purple
  meeting: '#10B981',    // Green
  training: '#14B8A6',   // Teal
  'off-phone': '#FBBF24', // Yellow
  unavailable: '#94A3B8'  // Gray
};
```

### Relationships
- **Activity → Agent** (many-to-one): Each activity belongs to one agent
- **Activity → AuditLogEntry** (one-to-one): Each activity change creates audit entry

---

## CvDDataPoint

**Purpose:** Represents forecasted demand and actual capacity for a 15-minute time interval.

**Key Attributes:**
- `intervalStart`: string - ISO 8601 datetime (interval start)
- `dayOfWeek`: string - "Monday" through "Sunday"
- `timeSlot`: string - "14:00" (for display)
- `forecastedCalls`: number - Expected call volume
- `scheduledAgents`: number - Computed from Agent schedules
- `coveragePercent`: number - (scheduledAgents / forecastedCalls) × 100
- `riskLevel`: RiskLevel - Enum based on coverage thresholds

### TypeScript Interface

```typescript
type RiskLevel = 'safe' | 'caution' | 'risk';

interface CvDDataPoint {
  intervalStart: string; // "2025-10-20T14:00:00Z"
  dayOfWeek: string;     // "Monday"
  timeSlot: string;      // "14:00" (display format)
  forecastedCalls: number;
  scheduledAgents: number; // Computed real-time
  coveragePercent: number; // (scheduledAgents / forecastedCalls) * 100
  riskLevel: RiskLevel;    // 'safe' >105%, 'caution' 90-105%, 'risk' <90%
  metadata: {
    skillsAvailable: string[]; // Skills of scheduled agents
    peakHour: boolean;         // Flag for 10am-12pm, 2pm-4pm peaks
  };
}
```

### Relationships
- **CvDDataPoint → IOIResult** (one-to-many): Coverage data feeds IOI scoring
- **CvDDataPoint → Agent** (computed): Derived from agent schedules + activities

---

## IOIResult

**Purpose:** Intelligent Opportunity Index scoring result for a candidate time slot.

**Key Attributes:**
- `slotStart`: string - ISO 8601 datetime
- `slotEnd`: string - ISO 8601 datetime
- `totalScore`: number - Sum of all factor scores (0-100)
- `factors`: object - Breakdown of 4 scoring factors
- `recommendedAgents`: string[] - Agent IDs proposed for this slot
- `requiresBreakAdjustment`: boolean - Whether break moves needed
- `breakAdjustments`: BreakAdjustment[] - Proposed break moves if applicable

### TypeScript Interface

```typescript
interface IOIResult {
  slotStart: string;
  slotEnd: string;
  totalScore: number; // 0-100
  factors: {
    cvdSafety: IOIFactor;        // 0-30 points
    availabilityDensity: IOIFactor; // 0-25 points
    complianceIntegrity: IOIFactor; // 0-25 points
    basicFairness: IOIFactor;       // 0-20 points
  };
  recommendedAgents: string[]; // Agent IDs
  requiresBreakAdjustment: boolean;
  breakAdjustments?: BreakAdjustment[];
  metadata: {
    coverageBeforeAdd: number; // Coverage % before scheduling
    coverageAfterAdd: number;  // Coverage % after scheduling
    conflictsDetected: number;
  };
}

interface IOIFactor {
  score: number;
  maxScore: number;
  reasoning: string; // Explainability text
}

interface BreakAdjustment {
  agentId: string;
  currentBreak: Activity;
  proposedBreak: Activity;
  reason: string;
  complianceCheck: {
    valid: boolean;
    violations: string[];
  };
}
```

### Relationships
- **IOIResult → Agent** (many-to-many): Recommends multiple agents
- **IOIResult → CvDDataPoint** (many-to-one): Uses coverage data for scoring
- **IOIResult → BreakAdjustment** (one-to-many): May propose multiple break moves

---

## ComplianceRule

**Purpose:** Labor law and company policy rules for break scheduling.

**Key Attributes:**
- `id`: string - Rule identifier
- `type`: RuleType - Category of rule
- `description`: string - Human-readable rule text
- `parameters`: object - Rule-specific configuration

### TypeScript Interface

```typescript
type RuleType =
  | 'break-spacing'
  | 'max-hours-without-break'
  | 'lunch-duration'
  | 'min-shift-duration';

interface ComplianceRule {
  id: string;
  type: RuleType;
  description: string;
  parameters: {
    minMinutesBetweenBreaks?: number;  // 120 (2 hours)
    maxHoursWithoutBreak?: number;     // 5
    lunchDurationMinutes?: number;     // 30
    minShiftHours?: number;            // 4
  };
  severity: 'error' | 'warning';
  enabled: boolean;
}
```

### Relationships
- **ComplianceRule → BreakAdjustment** (validation): Rules validate proposed break moves
- **ComplianceRule → IOIResult** (scoring): Compliance integrity factor

---

## AuditLogEntry

**Purpose:** Immutable record of all scheduling actions for transparency and accountability.

**Key Attributes:**
- `id`: string - Unique log entry ID
- `timestamp`: string - ISO 8601 datetime
- `action`: AuditAction - Type of action taken
- `userId`: string - "demo-user" (placeholder for demo)
- `affectedAgents`: string[] - Agent IDs impacted
- `details`: object - Action-specific data
- `ioiScore`: number - If action involved IOI scoring
- `coverageImpact`: number - Change in coverage % (delta)

### TypeScript Interface

```typescript
type AuditAction =
  | 'meeting-added'
  | 'meeting-moved'
  | 'meeting-deleted'
  | 'break-adjusted'
  | 'activity-created'
  | 'demo-reset';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: AuditAction;
  userId: string; // "demo-user"
  affectedAgents: string[];
  details: {
    activityId?: string;
    activityType?: ActivityType;
    activityTitle?: string;
    slotStart?: string;
    slotEnd?: string;
    reason?: string;
  };
  ioiScore?: number;
  coverageImpact: number; // Delta: +2.5% or -1.8%
  metadata: {
    beforeState?: any; // Snapshot for undo (future enhancement)
    afterState?: any;
  };
}
```

### Relationships
- **AuditLogEntry → Agent** (many-to-many): Tracks impacted agents
- **AuditLogEntry → Activity** (optional one-to-one): References specific activity

---
