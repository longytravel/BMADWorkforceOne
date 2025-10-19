// Script to generate schedules.json with activities for all agents
const fs = require('fs');
const path = require('path');

// Load agents data
const agents = require('../wfm-intelligence-demo/public/demo-data/agents.json');

// Week start: Monday, October 20, 2025
const weekStart = new Date('2025-10-20T00:00:00Z');

// Activity colors per architecture (Microsoft Outlook style)
// MUST match src/types/constants.ts ActivityColors
const COLORS = {
  shift: '#0078D4',   // Microsoft blue
  break: '#00B7C3',   // Teal
  lunch: '#8764B8',   // Purple
  meeting: '#D13438'  // Red
};

// Day mapping
const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

let activityId = 1;
const schedules = [];

// Helper: Generate UUID-like ID
function generateId() {
  return `activity-${String(activityId++).padStart(4, '0')}`;
}

// Helper: Add minutes to a date
function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

// Helper: Format date to ISO string
function toISO(date) {
  return date.toISOString();
}

// Helper: Parse HH:MM to Date for a specific day
function parseTime(dayIndex, timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const date = new Date(weekStart);
  date.setDate(date.getDate() + dayIndex);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

// Generate activities for each agent
agents.forEach((agent, agentIndex) => {
  DAYS.forEach((dayName, dayIndex) => {
    const daySchedule = agent.weeklySchedule[dayName];

    if (!daySchedule.isWorkingDay) return;

    const startTime = parseTime(dayIndex, daySchedule.startTime);
    const endTime = parseTime(dayIndex, daySchedule.endTime);
    const shiftDuration = (endTime - startTime) / 60000; // in minutes

    // 1. Create shift activity
    schedules.push({
      id: generateId(),
      agentId: agent.id,
      type: 'shift',
      title: 'Regular Shift',
      startDateTime: toISO(startTime),
      endDateTime: toISO(endTime),
      durationMinutes: shiftDuration,
      isMovable: false,
      color: COLORS.shift,
      metadata: {}
    });

    // 2. Add breaks and lunch (only for shifts >= 4 hours)
    if (shiftDuration >= 240) {
      // Morning break (for 8-hour shifts: ~2 hours into shift)
      if (shiftDuration >= 480) {
        const break1Start = addMinutes(startTime, 120);
        schedules.push({
          id: generateId(),
          agentId: agent.id,
          type: 'break',
          title: 'Morning Break',
          startDateTime: toISO(break1Start),
          endDateTime: toISO(addMinutes(break1Start, 15)),
          durationMinutes: 15,
          isMovable: true,
          color: COLORS.break,
          metadata: {}
        });
      }

      // Lunch (midway through shift)
      const lunchStart = addMinutes(startTime, Math.floor(shiftDuration / 2) - 15);
      schedules.push({
        id: generateId(),
        agentId: agent.id,
        type: 'lunch',
        title: 'Lunch Break',
        startDateTime: toISO(lunchStart),
        endDateTime: toISO(addMinutes(lunchStart, 30)),
        durationMinutes: 30,
        isMovable: true,
        color: COLORS.lunch,
        metadata: {}
      });

      // Afternoon break (for 8-hour shifts: ~6 hours into shift)
      if (shiftDuration >= 480) {
        const break2Start = addMinutes(startTime, 360);
        schedules.push({
          id: generateId(),
          agentId: agent.id,
          type: 'break',
          title: 'Afternoon Break',
          startDateTime: toISO(break2Start),
          endDateTime: toISO(addMinutes(break2Start, 15)),
          durationMinutes: 15,
          isMovable: true,
          color: COLORS.break,
          metadata: {}
        });
      }
    }
  });

  // 3. Add meetings (spread across week based on agent metadata)
  const meetingCount = agent.metadata.meetingsThisWeek;
  for (let m = 0; m < meetingCount; m++) {
    // Randomize which working day
    let dayIndex = Math.floor(Math.random() * 7);
    while (!agent.weeklySchedule[DAYS[dayIndex]].isWorkingDay) {
      dayIndex = Math.floor(Math.random() * 7);
    }

    const daySchedule = agent.weeklySchedule[DAYS[dayIndex]];
    const shiftStart = parseTime(dayIndex, daySchedule.startTime);
    const shiftEnd = parseTime(dayIndex, daySchedule.endTime);

    // Random time within shift (avoid first/last hour)
    const meetingStart = addMinutes(shiftStart, 60 + Math.floor(Math.random() * 180));
    const meetingDuration = [30, 60][Math.floor(Math.random() * 2)]; // 30 or 60 min

    schedules.push({
      id: generateId(),
      agentId: agent.id,
      type: 'meeting',
      title: 'Team Meeting',
      startDateTime: toISO(meetingStart),
      endDateTime: toISO(addMinutes(meetingStart, meetingDuration)),
      durationMinutes: meetingDuration,
      isMovable: false,
      color: COLORS.meeting,
      metadata: {}
    });
  }
});

// Write to file
const outputPath = path.join(__dirname, '../wfm-intelligence-demo/public/demo-data/schedules.json');
fs.writeFileSync(outputPath, JSON.stringify(schedules, null, 2));

console.log(`✓ Generated ${schedules.length} activities for ${agents.length} agents`);
console.log(`✓ File written to: ${outputPath}`);
console.log(`✓ File size: ${(fs.statSync(outputPath).size / 1024).toFixed(1)} KB`);
