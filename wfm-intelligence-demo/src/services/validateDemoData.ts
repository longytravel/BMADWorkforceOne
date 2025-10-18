/**
 * Validation script for demo data JSON files
 * Ensures all data conforms to expected structure using Zod schemas
 */

import { z } from 'zod';

// ============================================================================
// AGENT SCHEMA
// ============================================================================

const DayScheduleSchema = z.object({
  startTime: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  endTime: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  isWorkingDay: z.boolean(),
});

const WeeklyScheduleSchema = z.object({
  monday: DayScheduleSchema,
  tuesday: DayScheduleSchema,
  wednesday: DayScheduleSchema,
  thursday: DayScheduleSchema,
  friday: DayScheduleSchema,
  saturday: DayScheduleSchema,
  sunday: DayScheduleSchema,
});

const AgentSchema = z.object({
  id: z.string().regex(/^agent-\d{3}$/),
  name: z.string().min(1),
  email: z.string().email(),
  skills: z.array(z.enum(['Spanish', 'Technical', 'Sales', 'Billing', 'Retention', 'Manager'])),
  team: z.enum(['Team A', 'Team B', 'Team C', 'Team D']),
  employmentType: z.enum(['full-time', 'part-time']),
  weeklySchedule: WeeklyScheduleSchema,
  metadata: z.object({
    meetingsThisWeek: z.number().min(0).max(5),
    breakAdjustmentsThisWeek: z.number().min(0).max(3),
  }),
});

const AgentsArraySchema = z.array(AgentSchema);

// ============================================================================
// SCHEDULE SCHEMA
// ============================================================================

const ScheduleActivitySchema = z.object({
  id: z.string().regex(/^activity-\d{4}$/),
  agentId: z.string().regex(/^agent-\d{3}$/),
  type: z.enum(['shift', 'break', 'lunch', 'meeting']),
  title: z.string().min(1),
  startDateTime: z.string().datetime(),
  endDateTime: z.string().datetime(),
  durationMinutes: z.number().positive(),
  isMovable: z.boolean(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i),
  metadata: z.object({}).passthrough(),
});

const SchedulesArraySchema = z.array(ScheduleActivitySchema);

// ============================================================================
// CVD FORECAST SCHEMA
// ============================================================================

const CvdIntervalSchema = z.object({
  intervalStart: z.string().datetime(),
  dayOfWeek: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
  timeSlot: z.string().regex(/^\d{2}:\d{2}$/),
  forecastedCalls: z.number().min(0),
  scheduledAgents: z.number().min(0),
  coveragePercent: z.number().min(0),
  riskLevel: z.enum(['safe', 'caution', 'risk']),
  metadata: z.object({
    skillsAvailable: z.array(z.string()),
    peakHour: z.boolean(),
  }),
});

const CvdForecastArraySchema = z.array(CvdIntervalSchema);

// ============================================================================
// COMPLIANCE RULES SCHEMA
// ============================================================================

const ComplianceRuleSchema = z.object({
  id: z.string().regex(/^rule-\d{3}$/),
  type: z.enum(['break-spacing', 'max-hours-without-break', 'lunch-duration', 'min-shift-duration']),
  description: z.string().min(1),
  parameters: z.object({}).passthrough(),
  severity: z.enum(['error', 'warning']),
  enabled: z.boolean(),
});

const ComplianceRulesArraySchema = z.array(ComplianceRuleSchema);

// ============================================================================
// VALIDATION FUNCTION
// ============================================================================

interface ValidationResult {
  fileName: string;
  success: boolean;
  errors?: z.ZodError;
  itemCount?: number;
}

/**
 * Validates a JSON data file against its schema
 */
export function validateJsonFile(
  fileName: string,
  data: unknown,
  schema: z.ZodSchema
): ValidationResult {
  try {
    const parsed = schema.parse(data);
    return {
      fileName,
      success: true,
      itemCount: Array.isArray(parsed) ? parsed.length : undefined,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        fileName,
        success: false,
        errors: error,
      };
    }
    throw error;
  }
}

/**
 * Validates all demo data files
 */
export async function validateAllDemoData(): Promise<ValidationResult[]> {
  const results: ValidationResult[] = [];

  try {
    // Load all JSON files
    const agentsResponse = await fetch('/demo-data/agents.json');
    const agents = await agentsResponse.json();

    const schedulesResponse = await fetch('/demo-data/schedules.json');
    const schedules = await schedulesResponse.json();

    const cvdForecastResponse = await fetch('/demo-data/cvd-forecast.json');
    const cvdForecast = await cvdForecastResponse.json();

    const complianceRulesResponse = await fetch('/demo-data/compliance-rules.json');
    const complianceRules = await complianceRulesResponse.json();

    // Validate each file
    results.push(validateJsonFile('agents.json', agents, AgentsArraySchema));
    results.push(validateJsonFile('schedules.json', schedules, SchedulesArraySchema));
    results.push(validateJsonFile('cvd-forecast.json', cvdForecast, CvdForecastArraySchema));
    results.push(validateJsonFile('compliance-rules.json', complianceRules, ComplianceRulesArraySchema));
  } catch (error) {
    console.error('Failed to load demo data files:', error);
    throw error;
  }

  return results;
}

/**
 * Prints validation results to console
 */
export function printValidationResults(results: ValidationResult[]): void {
  console.log('\n========== DEMO DATA VALIDATION RESULTS ==========\n');

  let allPassed = true;

  results.forEach((result) => {
    if (result.success) {
      console.log(`✅ ${result.fileName} - VALID (${result.itemCount} items)`);
    } else {
      allPassed = false;
      console.log(`❌ ${result.fileName} - INVALID`);
      if (result.errors) {
        console.log('   Errors:');
        result.errors.issues.forEach((issue) => {
          console.log(`   - ${issue.path.join('.')}: ${issue.message}`);
        });
      }
    }
  });

  console.log('\n==================================================\n');

  if (allPassed) {
    console.log('✅ All demo data files are valid!');
  } else {
    console.log('❌ Some demo data files have validation errors.');
  }
}

// Export schemas for use in other modules
export {
  AgentSchema,
  AgentsArraySchema,
  ScheduleActivitySchema,
  SchedulesArraySchema,
  CvdIntervalSchema,
  CvdForecastArraySchema,
  ComplianceRuleSchema,
  ComplianceRulesArraySchema,
};
