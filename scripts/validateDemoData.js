/**
 * Node.js script to validate demo data files
 * Can be run without starting the dev server
 */

const fs = require('fs');
const path = require('path');

// Import zod from the wfm-intelligence-demo project
const zodPath = path.join(__dirname, '../wfm-intelligence-demo/node_modules/zod');
const { z } = require(zodPath);

// Load JSON files
const agentsPath = path.join(__dirname, '../wfm-intelligence-demo/public/demo-data/agents.json');
const schedulesPath = path.join(__dirname, '../wfm-intelligence-demo/public/demo-data/schedules.json');
const cvdForecastPath = path.join(__dirname, '../wfm-intelligence-demo/public/demo-data/cvd-forecast.json');
const complianceRulesPath = path.join(__dirname, '../wfm-intelligence-demo/public/demo-data/compliance-rules.json');

const agents = JSON.parse(fs.readFileSync(agentsPath, 'utf-8'));
const schedules = JSON.parse(fs.readFileSync(schedulesPath, 'utf-8'));
const cvdForecast = JSON.parse(fs.readFileSync(cvdForecastPath, 'utf-8'));
const complianceRules = JSON.parse(fs.readFileSync(complianceRulesPath, 'utf-8'));

// ============================================================================
// SCHEMAS (mirrored from TypeScript file)
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
// VALIDATION
// ============================================================================

function validateFile(fileName, data, schema) {
  try {
    const parsed = schema.parse(data);
    return {
      fileName,
      success: true,
      itemCount: Array.isArray(parsed) ? parsed.length : undefined,
    };
  } catch (error) {
    return {
      fileName,
      success: false,
      errors: error,
    };
  }
}

console.log('\n========== DEMO DATA VALIDATION RESULTS ==========\n');

const results = [
  validateFile('agents.json', agents, AgentsArraySchema),
  validateFile('schedules.json', schedules, SchedulesArraySchema),
  validateFile('cvd-forecast.json', cvdForecast, CvdForecastArraySchema),
  validateFile('compliance-rules.json', complianceRules, ComplianceRulesArraySchema),
];

let allPassed = true;

results.forEach((result) => {
  if (result.success) {
    console.log(`✅ ${result.fileName} - VALID (${result.itemCount} items)`);
  } else {
    allPassed = false;
    console.log(`❌ ${result.fileName} - INVALID`);
    if (result.errors) {
      console.log('   First 5 errors:');
      result.errors.issues.slice(0, 5).forEach((issue) => {
        console.log(`   - ${issue.path.join('.')}: ${issue.message}`);
      });
      if (result.errors.issues.length > 5) {
        console.log(`   ... and ${result.errors.issues.length - 5} more errors`);
      }
    }
  }
});

console.log('\n==================================================\n');

if (allPassed) {
  console.log('✅ All demo data files are valid!\n');
  process.exit(0);
} else {
  console.log('❌ Some demo data files have validation errors.\n');
  process.exit(1);
}
