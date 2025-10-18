// Script to generate cvd-forecast.json with 672 intervals (7 days × 96 15-minute slots)
const fs = require('fs');
const path = require('path');

// Load agents to calculate scheduled coverage
const agents = require('../wfm-intelligence-demo/public/demo-data/agents.json');

// Week start: Monday, October 20, 2025
const weekStart = new Date('2025-10-20T00:00:00Z');

// Day mapping
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DAY_KEYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

// Skills
const ALL_SKILLS = ['Spanish', 'Technical', 'Sales', 'Billing', 'Retention', 'Manager'];

const intervals = [];

// Helper: Format time as HH:MM
function formatTime(date) {
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

// Helper: Count agents scheduled at a given time
function countScheduledAgents(dayIndex, hour, minute) {
  const dayKey = DAY_KEYS[dayIndex];
  const timeStr = formatTime(new Date(Date.UTC(2000, 0, 1, hour, minute)));

  return agents.filter(agent => {
    const schedule = agent.weeklySchedule[dayKey];
    if (!schedule.isWorkingDay) return false;

    const [startH, startM] = schedule.startTime.split(':').map(Number);
    const [endH, endM] = schedule.endTime.split(':').map(Number);

    const currentMinutes = hour * 60 + minute;
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    return currentMinutes >= startMinutes && currentMinutes < endMinutes;
  }).length;
}

// Helper: Get skills available at a given time
function getAvailableSkills(dayIndex, hour, minute) {
  const dayKey = DAY_KEYS[dayIndex];
  const timeStr = formatTime(new Date(Date.UTC(2000, 0, 1, hour, minute)));
  const skillSet = new Set();

  agents.forEach(agent => {
    const schedule = agent.weeklySchedule[dayKey];
    if (!schedule.isWorkingDay) return;

    const [startH, startM] = schedule.startTime.split(':').map(Number);
    const [endH, endM] = schedule.endTime.split(':').map(Number);

    const currentMinutes = hour * 60 + minute;
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
      agent.skills.forEach(skill => skillSet.add(skill));
    }
  });

  return Array.from(skillSet);
}

// Helper: Calculate realistic call volume
function calculateCallVolume(dayIndex, hour) {
  const isWeekend = dayIndex >= 5; // Saturday, Sunday
  let baseVolume;

  // Weekday patterns
  if (!isWeekend) {
    if (hour >= 10 && hour < 12) {
      // Morning peak: 10am-12pm
      baseVolume = 80 + Math.floor(Math.random() * 21); // 80-100
    } else if (hour >= 14 && hour < 16) {
      // Afternoon peak: 2pm-4pm
      baseVolume = 70 + Math.floor(Math.random() * 21); // 70-90
    } else if (hour >= 7 && hour < 9) {
      // Morning low: 7am-9am
      baseVolume = 30 + Math.floor(Math.random() * 21); // 30-50
    } else if (hour >= 17 && hour < 19) {
      // Evening low: 5pm-7pm
      baseVolume = 40 + Math.floor(Math.random() * 21); // 40-60
    } else {
      // Standard volume
      baseVolume = 50 + Math.floor(Math.random() * 21); // 50-70
    }
  } else {
    // Weekend: 50% of weekday volume
    baseVolume = Math.floor((30 + Math.floor(Math.random() * 41)) / 2); // ~15-35
  }

  return baseVolume;
}

// Helper: Calculate risk level
function getRiskLevel(coveragePercent) {
  if (coveragePercent > 105) return 'safe';
  if (coveragePercent >= 90) return 'caution';
  return 'risk';
}

// Generate 672 intervals (7 days × 96 15-minute intervals)
for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
  for (let hour = 0; hour < 24; hour++) {
    for (let minute of [0, 15, 30, 45]) {
      const intervalDate = new Date(weekStart);
      intervalDate.setDate(intervalDate.getDate() + dayIndex);
      intervalDate.setHours(hour, minute, 0, 0);

      const forecastedCalls = calculateCallVolume(dayIndex, hour);
      const scheduledAgents = countScheduledAgents(dayIndex, hour, minute);
      const coveragePercent = forecastedCalls > 0
        ? Math.round((scheduledAgents / forecastedCalls) * 100)
        : 100;
      const riskLevel = getRiskLevel(coveragePercent);
      const skillsAvailable = getAvailableSkills(dayIndex, hour, minute);
      const isPeakHour = (hour >= 10 && hour < 12) || (hour >= 14 && hour < 16);

      intervals.push({
        intervalStart: intervalDate.toISOString(),
        dayOfWeek: DAYS[dayIndex],
        timeSlot: formatTime(intervalDate),
        forecastedCalls: forecastedCalls,
        scheduledAgents: scheduledAgents,
        coveragePercent: coveragePercent,
        riskLevel: riskLevel,
        metadata: {
          skillsAvailable: skillsAvailable,
          peakHour: isPeakHour
        }
      });
    }
  }
}

// Write to file
const outputPath = path.join(__dirname, '../wfm-intelligence-demo/public/demo-data/cvd-forecast.json');
fs.writeFileSync(outputPath, JSON.stringify(intervals, null, 2));

console.log(`✓ Generated ${intervals.length} intervals (7 days × 96 15-minute slots)`);
console.log(`✓ File written to: ${outputPath}`);
console.log(`✓ File size: ${(fs.statSync(outputPath).size / 1024).toFixed(1)} KB`);

// Calculate summary stats
const riskCounts = { safe: 0, caution: 0, risk: 0 };
intervals.forEach(i => riskCounts[i.riskLevel]++);
console.log(`✓ Risk distribution: Safe=${riskCounts.safe}, Caution=${riskCounts.caution}, Risk=${riskCounts.risk}`);
