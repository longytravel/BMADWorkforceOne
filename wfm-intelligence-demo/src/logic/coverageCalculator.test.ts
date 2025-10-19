// Unit tests for Coverage Calculator

import { describe, it, expect } from 'vitest';
import {
  determineRiskLevel,
  calculateCoveragePercent,
  countScheduledAgents,
  calculateCoverageForInterval,
  generateAllIntervals,
  CoverageCalculator,
} from './coverageCalculator';
import type { Agent, Activity } from '../types';

describe('determineRiskLevel', () => {
  it('should return "risk" for coverage < 90%', () => {
    expect(determineRiskLevel(0)).toBe('risk');
    expect(determineRiskLevel(50)).toBe('risk');
    expect(determineRiskLevel(89)).toBe('risk');
    expect(determineRiskLevel(89.9)).toBe('risk');
  });

  it('should return "caution" for coverage 90-105%', () => {
    expect(determineRiskLevel(90)).toBe('caution');
    expect(determineRiskLevel(95)).toBe('caution');
    expect(determineRiskLevel(100)).toBe('caution');
    expect(determineRiskLevel(105)).toBe('caution');
  });

  it('should return "safe" for coverage > 105%', () => {
    expect(determineRiskLevel(105.1)).toBe('safe');
    expect(determineRiskLevel(106)).toBe('safe');
    expect(determineRiskLevel(120)).toBe('safe');
    expect(determineRiskLevel(200)).toBe('safe');
  });

  it('should handle boundary values correctly', () => {
    expect(determineRiskLevel(89.99)).toBe('risk'); // Just below 90%
    expect(determineRiskLevel(90.0)).toBe('caution'); // Exactly 90%
    expect(determineRiskLevel(105.0)).toBe('caution'); // Exactly 105%
    expect(determineRiskLevel(105.01)).toBe('safe'); // Just above 105%
  });
});

describe('calculateCoveragePercent', () => {
  it('should calculate 100% coverage when agents equal demand', () => {
    const result = calculateCoveragePercent(10, 10);
    expect(result).toBe(100);
  });

  it('should calculate 120% coverage when agents exceed demand', () => {
    const result = calculateCoveragePercent(10, 12);
    expect(result).toBe(120);
  });

  it('should calculate 80% coverage when agents below demand', () => {
    const result = calculateCoveragePercent(10, 8);
    expect(result).toBe(80);
  });

  it('should return 100% coverage when forecasted demand is zero (AC: 3)', () => {
    const result = calculateCoveragePercent(0, 5);
    expect(result).toBe(100);
  });

  it('should return 100% coverage when both demand and agents are zero', () => {
    const result = calculateCoveragePercent(0, 0);
    expect(result).toBe(100);
  });

  it('should handle fractional percentages correctly', () => {
    const result = calculateCoveragePercent(3, 2);
    expect(result).toBeCloseTo(66.67, 1);
  });
});

describe('countScheduledAgents', () => {
  const mockAgents: Agent[] = [
    {
      id: 'agent-1',
      name: 'Alice',
      email: 'alice@example.com',
      skills: ['Sales', 'Support'],
      team: 'Team A',
      employmentType: 'full-time',
      weeklySchedule: {},
      metadata: {
        meetingsThisWeek: 0,
        breakAdjustmentsThisWeek: 0,
      },
    },
    {
      id: 'agent-2',
      name: 'Bob',
      email: 'bob@example.com',
      skills: ['Support', 'Technical'],
      team: 'Team A',
      employmentType: 'full-time',
      weeklySchedule: {},
      metadata: {
        meetingsThisWeek: 0,
        breakAdjustmentsThisWeek: 0,
      },
    },
  ];

  it('should count agents with overlapping shift activities', () => {
    const activities: Activity[] = [
      {
        id: 'activity-1',
        agentId: 'agent-1',
        type: 'shift',
        title: 'Morning Shift',
        startDateTime: '2025-10-20T09:00:00Z',
        endDateTime: '2025-10-20T17:00:00Z',
        durationMinutes: 480,
        isMovable: false,
        color: '#0078D4',
        metadata: {},
      },
      {
        id: 'activity-2',
        agentId: 'agent-2',
        type: 'shift',
        title: 'Morning Shift',
        startDateTime: '2025-10-20T09:00:00Z',
        endDateTime: '2025-10-20T17:00:00Z',
        durationMinutes: 480,
        isMovable: false,
        color: '#0078D4',
        metadata: {},
      },
    ];

    const result = countScheduledAgents(
      '2025-10-20T10:00:00Z',
      '2025-10-20T10:15:00Z',
      activities,
      mockAgents
    );

    expect(result.count).toBe(2);
    expect(result.skillsAvailable).toContain('Sales');
    expect(result.skillsAvailable).toContain('Support');
    expect(result.skillsAvailable).toContain('Technical');
  });

  it('should not count agents with non-shift activities (breaks, meetings)', () => {
    const activities: Activity[] = [
      {
        id: 'activity-1',
        agentId: 'agent-1',
        type: 'break',
        title: 'Break',
        startDateTime: '2025-10-20T10:00:00Z',
        endDateTime: '2025-10-20T10:15:00Z',
        durationMinutes: 15,
        isMovable: false,
        color: '#00B7C3',
        metadata: {},
      },
    ];

    const result = countScheduledAgents(
      '2025-10-20T10:00:00Z',
      '2025-10-20T10:15:00Z',
      activities,
      mockAgents
    );

    expect(result.count).toBe(0);
    expect(result.skillsAvailable).toEqual([]);
  });

  it('should return zero when no activities overlap', () => {
    const activities: Activity[] = [
      {
        id: 'activity-1',
        agentId: 'agent-1',
        type: 'shift',
        title: 'Morning Shift',
        startDateTime: '2025-10-20T09:00:00Z',
        endDateTime: '2025-10-20T10:00:00Z',
        durationMinutes: 60,
        isMovable: false,
        color: '#0078D4',
        metadata: {},
      },
    ];

    const result = countScheduledAgents(
      '2025-10-20T11:00:00Z', // After shift ends
      '2025-10-20T11:15:00Z',
      activities,
      mockAgents
    );

    expect(result.count).toBe(0);
  });

  it('should deduplicate skills from multiple agents', () => {
    const activities: Activity[] = [
      {
        id: 'activity-1',
        agentId: 'agent-1',
        type: 'shift',
        title: 'Shift',
        startDateTime: '2025-10-20T10:00:00Z',
        endDateTime: '2025-10-20T11:00:00Z',
        durationMinutes: 60,
        isMovable: false,
        color: '#0078D4',
        metadata: {},
      },
      {
        id: 'activity-2',
        agentId: 'agent-2',
        type: 'shift',
        title: 'Shift',
        startDateTime: '2025-10-20T10:00:00Z',
        endDateTime: '2025-10-20T11:00:00Z',
        durationMinutes: 60,
        isMovable: false,
        color: '#0078D4',
        metadata: {},
      },
    ];

    const result = countScheduledAgents(
      '2025-10-20T10:00:00Z',
      '2025-10-20T10:15:00Z',
      activities,
      mockAgents
    );

    // Both agents have 'Support', should only appear once
    const supportCount = result.skillsAvailable.filter((s) => s === 'Support').length;
    expect(supportCount).toBe(1);
  });
});

describe('calculateCoverageForInterval', () => {
  const mockAgents: Agent[] = [
    {
      id: 'agent-1',
      name: 'Alice',
      email: 'alice@example.com',
      skills: ['Sales'],
      team: 'Team A',
      employmentType: 'full-time',
      weeklySchedule: {},
      metadata: {
        meetingsThisWeek: 0,
        breakAdjustmentsThisWeek: 0,
      },
    },
  ];

  const mockActivities: Activity[] = [
    {
      id: 'activity-1',
      agentId: 'agent-1',
      type: 'shift',
      title: 'Shift',
      startDateTime: '2025-10-20T10:00:00Z',
      endDateTime: '2025-10-20T11:00:00Z',
      durationMinutes: 60,
      isMovable: false,
      color: '#0078D4',
      metadata: {},
    },
  ];

  it('should return complete CvDDataPoint with all required fields', () => {
    const result = calculateCoverageForInterval(
      '2025-10-20T10:00:00Z',
      'Monday',
      '10:00',
      10, // forecastedCalls
      mockActivities,
      mockAgents
    );

    expect(result).toHaveProperty('intervalStart');
    expect(result).toHaveProperty('dayOfWeek');
    expect(result).toHaveProperty('timeSlot');
    expect(result).toHaveProperty('forecastedCalls');
    expect(result).toHaveProperty('scheduledAgents');
    expect(result).toHaveProperty('coveragePercent');
    expect(result).toHaveProperty('riskLevel');
    expect(result).toHaveProperty('metadata');
    expect(result.metadata).toHaveProperty('skillsAvailable');
    expect(result.metadata).toHaveProperty('peakHour');
  });

  it('should calculate correct coverage percent and risk level', () => {
    const result = calculateCoverageForInterval(
      '2025-10-20T10:00:00Z',
      'Monday',
      '10:00',
      10, // 1 agent, 10 forecasted = 10% coverage = risk
      mockActivities,
      mockAgents
    );

    expect(result.scheduledAgents).toBe(1);
    expect(result.coveragePercent).toBe(10);
    expect(result.riskLevel).toBe('risk');
  });

  it('should flag peak hours correctly (10am-12pm)', () => {
    const result = calculateCoverageForInterval(
      '2025-10-20T10:00:00Z',
      'Monday',
      '10:00',
      10,
      mockActivities,
      mockAgents
    );

    expect(result.metadata.peakHour).toBe(true);
  });

  it('should flag peak hours correctly (2pm-4pm)', () => {
    const result = calculateCoverageForInterval(
      '2025-10-20T14:00:00Z',
      'Monday',
      '14:00',
      10,
      [],
      mockAgents
    );

    expect(result.metadata.peakHour).toBe(true);
  });

  it('should not flag non-peak hours', () => {
    const result = calculateCoverageForInterval(
      '2025-10-20T09:00:00Z', // 9am - not peak
      'Monday',
      '09:00',
      10,
      [],
      mockAgents
    );

    expect(result.metadata.peakHour).toBe(false);
  });

  it('should handle zero demand correctly (AC: 3)', () => {
    const result = calculateCoverageForInterval(
      '2025-10-20T10:00:00Z',
      'Monday',
      '10:00',
      0, // Zero demand
      mockActivities,
      mockAgents
    );

    expect(result.coveragePercent).toBe(100);
    expect(result.riskLevel).toBe('safe');
  });
});

describe('generateAllIntervals', () => {
  it('should generate exactly 672 intervals for a week (AC: 1)', () => {
    const intervals = generateAllIntervals('2025-10-20T00:00:00Z'); // Monday
    expect(intervals).toHaveLength(672);
  });

  it('should start with Monday 00:00', () => {
    const intervals = generateAllIntervals('2025-10-20T00:00:00Z');
    expect(intervals[0].dayOfWeek).toBe('Monday');
    expect(intervals[0].timeSlot).toBe('00:00');
  });

  it('should end with Sunday 23:45', () => {
    const intervals = generateAllIntervals('2025-10-20T00:00:00Z');
    const lastInterval = intervals[intervals.length - 1];
    expect(lastInterval.dayOfWeek).toBe('Sunday');
    expect(lastInterval.timeSlot).toBe('23:45');
  });

  it('should have 15-minute increments', () => {
    const intervals = generateAllIntervals('2025-10-20T00:00:00Z');
    // Check first few intervals
    expect(intervals[0].timeSlot).toBe('00:00');
    expect(intervals[1].timeSlot).toBe('00:15');
    expect(intervals[2].timeSlot).toBe('00:30');
    expect(intervals[3].timeSlot).toBe('00:45');
    expect(intervals[4].timeSlot).toBe('01:00');
  });

  it('should have 96 intervals per day', () => {
    const intervals = generateAllIntervals('2025-10-20T00:00:00Z');
    const mondayIntervals = intervals.filter((i) => i.dayOfWeek === 'Monday');
    expect(mondayIntervals).toHaveLength(96);
  });
});

describe('CoverageCalculator', () => {
  const mockAgents: Agent[] = [
    {
      id: 'agent-1',
      name: 'Alice',
      email: 'alice@example.com',
      skills: ['Sales'],
      team: 'Team A',
      employmentType: 'full-time',
      weeklySchedule: {},
      metadata: {
        meetingsThisWeek: 0,
        breakAdjustmentsThisWeek: 0,
      },
    },
  ];

  const mockActivities: Activity[] = [
    {
      id: 'activity-1',
      agentId: 'agent-1',
      type: 'shift',
      title: 'Shift',
      startDateTime: '2025-10-20T10:00:00Z',
      endDateTime: '2025-10-20T11:00:00Z',
      durationMinutes: 60,
      isMovable: false,
      color: '#0078D4',
      metadata: {},
    },
  ];

  describe('recalculateAll', () => {
    it('should recalculate all intervals from forecast data', () => {
      const calculator = new CoverageCalculator();
      const forecastData = [
        { intervalStart: '2025-10-20T10:00:00Z', forecastedCalls: 10 },
        { intervalStart: '2025-10-20T10:15:00Z', forecastedCalls: 12 },
      ];

      const result = calculator.recalculateAll(
        mockAgents,
        mockActivities,
        forecastData
      );

      expect(result).toHaveLength(2);
      expect(result[0].intervalStart).toBe('2025-10-20T10:00:00Z');
      expect(result[1].intervalStart).toBe('2025-10-20T10:15:00Z');
    });

    it('should calculate 672 intervals in < 500ms (AC: 9)', () => {
      const calculator = new CoverageCalculator();

      // Generate 672 forecast data points
      const intervals = generateAllIntervals('2025-10-20T00:00:00Z');
      const forecastData = intervals.map((interval) => ({
        intervalStart: interval.intervalStart,
        forecastedCalls: 10,
      }));

      const start = performance.now();
      calculator.recalculateAll(mockAgents, mockActivities, forecastData);
      const duration = performance.now() - start;

      expect(duration).toBeLessThan(500);
    });
  });

  describe('recalculateAffected', () => {
    it('should only update intervals within changed time range', () => {
      const calculator = new CoverageCalculator();

      const initialData = [
        {
          intervalStart: '2025-10-20T10:00:00Z',
          dayOfWeek: 'Monday',
          timeSlot: '10:00',
          forecastedCalls: 10,
          scheduledAgents: 0,
          coveragePercent: 0,
          riskLevel: 'risk' as const,
          metadata: { skillsAvailable: [], peakHour: true },
        },
        {
          intervalStart: '2025-10-20T12:00:00Z',
          dayOfWeek: 'Monday',
          timeSlot: '12:00',
          forecastedCalls: 10,
          scheduledAgents: 0,
          coveragePercent: 0,
          riskLevel: 'risk' as const,
          metadata: { skillsAvailable: [], peakHour: false },
        },
      ];

      const result = calculator.recalculateAffected(
        initialData,
        mockAgents,
        mockActivities,
        '2025-10-20T10:00:00Z', // Changed range: 10:00-11:00
        '2025-10-20T11:00:00Z'
      );

      // First interval should be updated (has agent now)
      expect(result[0].scheduledAgents).toBe(1);

      // Second interval should be unchanged (outside affected range)
      expect(result[1].scheduledAgents).toBe(0);
    });
  });
});
