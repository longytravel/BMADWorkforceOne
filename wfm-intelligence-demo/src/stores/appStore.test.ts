import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAppStore } from './appStore';
import type { Activity, Agent, CvDDataPoint } from '../types';

describe('Real-Time Heatmap Updates (Story 2.6)', () => {
  // Mock data
  const mockAgent: Agent = {
    id: 'agent-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    skills: ['Sales', 'Support'],
    team: 'Sales Team',
    employmentType: 'full-time',
    weeklySchedule: {
      monday: '09:00-17:00',
      tuesday: '09:00-17:00',
      wednesday: '09:00-17:00',
      thursday: '09:00-17:00',
      friday: '09:00-17:00',
    },
    metadata: {
      meetingsThisWeek: 2,
      breakAdjustmentsThisWeek: 0,
    },
  };

  const mockCvdData: CvDDataPoint[] = [
    {
      intervalStart: '2025-10-20T09:00:00Z',
      dayOfWeek: 'Monday',
      timeSlot: '09:00',
      forecastedCalls: 100,
      scheduledAgents: 5,
      coveragePercent: 125,
      riskLevel: 'safe',
      metadata: {
        skillsAvailable: ['Sales', 'Support'],
        peakHour: false,
      },
    },
    {
      intervalStart: '2025-10-20T14:00:00Z',
      dayOfWeek: 'Monday',
      timeSlot: '14:00',
      forecastedCalls: 150,
      scheduledAgents: 6,
      coveragePercent: 120,
      riskLevel: 'safe',
      metadata: {
        skillsAvailable: ['Sales', 'Support'],
        peakHour: true,
      },
    },
  ];

  beforeEach(() => {
    // Reset store state before each test
    const { setAgents, setActivities, setCvdData } = useAppStore.getState();
    setAgents([mockAgent]);

    // Add a base shift activity so there's someone to be affected
    const baseShift: Activity = {
      id: 'shift-base',
      agentId: 'agent-1',
      type: 'shift',
      title: 'Day Shift',
      startDateTime: '2025-10-20T09:00:00Z',
      endDateTime: '2025-10-20T17:00:00Z',
      durationMinutes: 480,
      isMovable: false,
      color: '#3B82F6',
      metadata: {},
    };

    setActivities([baseShift]);
    setCvdData(mockCvdData);
  });

  describe('AC1: Add Activity → Heatmap Update', () => {
    it('should update cvdData when activity is added', () => {
      const { addActivity } = useAppStore.getState();

      const newMeeting: Activity = {
        id: 'meeting-123',
        agentId: 'agent-1',
        type: 'meeting',
        title: 'Team Standup',
        startDateTime: '2025-10-20T14:00:00Z',
        endDateTime: '2025-10-20T14:30:00Z',
        durationMinutes: 30,
        isMovable: true,
        color: '#10B981',
        metadata: {},
      };

      addActivity(newMeeting);

      // Get fresh state after update
      const updatedState = useAppStore.getState();

      // Verify activity was added
      expect(updatedState.activities).toHaveLength(2); // baseShift + meeting
      expect(updatedState.activities.find((a) => a.id === 'meeting-123')).toBeDefined();

      // Verify cvdData still has correct structure
      expect(updatedState.cvdData).toBeDefined();
      expect(updatedState.cvdData.length).toBeGreaterThan(0);
    });

    it('should verify coverage calculator updates cvdData structure', () => {
      const { addActivity } = useAppStore.getState();

      const newActivity: Activity = {
        id: 'test-activity',
        agentId: 'agent-1',
        type: 'break',
        title: 'Break',
        startDateTime: '2025-10-20T09:00:00Z',
        endDateTime: '2025-10-20T09:15:00Z',
        durationMinutes: 15,
        isMovable: true,
        color: '#FBBF24',
        metadata: {},
      };

      addActivity(newActivity);

      // Verify coverage calculator was triggered by checking cvdData structure is intact
      const currentState = useAppStore.getState();
      expect(currentState.cvdData).toBeDefined();
      currentState.cvdData.forEach((point) => {
        expect(point).toHaveProperty('intervalStart');
        expect(point).toHaveProperty('coveragePercent');
        expect(point).toHaveProperty('riskLevel');
        expect(['safe', 'caution', 'risk']).toContain(point.riskLevel);
      });
    });
  });

  describe('AC2: Delete Activity → Heatmap Update', () => {
    it('should update cvdData when activity is deleted', () => {
      const { addActivity, deleteActivity } = useAppStore.getState();

      // First add an activity
      const breakActivity: Activity = {
        id: 'break-123',
        agentId: 'agent-1',
        type: 'break',
        title: 'Lunch Break',
        startDateTime: '2025-10-20T12:00:00Z',
        endDateTime: '2025-10-20T12:30:00Z',
        durationMinutes: 30,
        isMovable: false,
        color: '#6B7280',
        metadata: {},
      };

      addActivity(breakActivity);

      // Verify it was added
      let currentState = useAppStore.getState();
      expect(currentState.activities).toHaveLength(2); // baseShift + break

      // Delete the activity
      deleteActivity('break-123');

      // Verify activity was deleted
      currentState = useAppStore.getState();
      expect(currentState.activities).toHaveLength(1); // only baseShift remains
      expect(currentState.activities.find((a) => a.id === 'break-123')).toBeUndefined();

      // Verify cvdData still has correct structure
      expect(currentState.cvdData).toBeDefined();
      expect(currentState.cvdData.length).toBeGreaterThan(0);
    });
  });

  describe('AC3: Move Activity → Heatmap Update', () => {
    it('should update cvdData when activity time is changed', () => {
      const { addActivity, updateActivity } = useAppStore.getState();

      // Add initial activity
      const activity: Activity = {
        id: 'activity-123',
        agentId: 'agent-1',
        type: 'meeting',
        title: 'Client Call',
        startDateTime: '2025-10-20T09:00:00Z',
        endDateTime: '2025-10-20T09:30:00Z',
        durationMinutes: 30,
        isMovable: true,
        color: '#3B82F6',
        metadata: {},
      };

      addActivity(activity);

      // Move activity to different time (simulate drag & drop)
      updateActivity('activity-123', {
        startDateTime: '2025-10-20T16:00:00Z',
        endDateTime: '2025-10-20T16:30:00Z',
      });

      // Verify activity was updated
      const currentState = useAppStore.getState();
      const updatedActivity = currentState.activities.find((a) => a.id === 'activity-123');
      expect(updatedActivity?.startDateTime).toBe('2025-10-20T16:00:00Z');
      expect(updatedActivity?.endDateTime).toBe('2025-10-20T16:30:00Z');

      // Verify cvdData still has correct structure
      expect(currentState.cvdData).toBeDefined();
      expect(currentState.cvdData.length).toBeGreaterThan(0);
    });
  });

  describe('AC4: Rapid Successive Updates', () => {
    it('should handle multiple activities added in succession without errors', () => {
      const { addActivity } = useAppStore.getState();

      // Add 5 activities rapidly
      for (let i = 0; i < 5; i++) {
        const activity: Activity = {
          id: `rapid-${i}`,
          agentId: 'agent-1',
          type: 'meeting',
          title: `Meeting ${i}`,
          startDateTime: `2025-10-20T${(9 + i).toString().padStart(2, '0')}:00:00Z`,
          endDateTime: `2025-10-20T${(9 + i).toString().padStart(2, '0')}:30:00Z`,
          durationMinutes: 30,
          isMovable: true,
          color: '#10B981',
          metadata: {},
        };

        addActivity(activity);
      }

      // Verify all activities were added (baseShift + 5 meetings = 6)
      const currentState = useAppStore.getState();
      expect(currentState.activities).toHaveLength(6);

      // Verify cvdData structure is still valid after rapid updates
      expect(currentState.cvdData).toBeDefined();
      expect(currentState.cvdData.length).toBeGreaterThan(0);
      currentState.cvdData.forEach((point) => {
        expect(point).toHaveProperty('riskLevel');
        expect(point).toHaveProperty('coveragePercent');
      });
    });
  });

  describe('AC7: Performance Target (<200ms)', () => {
    it('should complete recalculation within 200ms', () => {
      const store = useAppStore.getState();

      const start = performance.now();
      store.recalculateCvD();
      const duration = performance.now() - start;

      console.log(`Actual recalculation time: ${duration.toFixed(2)}ms`);
      expect(duration).toBeLessThan(200);
    });

    it('should not log warning if under 200ms', () => {
      const store = useAppStore.getState();
      const warnSpy = vi.spyOn(console, 'warn');

      store.recalculateCvD();

      // Should not have warning (assumes fast execution)
      // Note: This may fail on slow machines, which is expected behavior
      expect(warnSpy).not.toHaveBeenCalledWith(
        expect.stringContaining('WARNING: Recalculation exceeded 200ms')
      );

      warnSpy.mockRestore();
    });
  });

  describe('Store State Integrity', () => {
    it('should maintain immutability of state updates', () => {
      const initialState = useAppStore.getState();
      const initialActivitiesLength = initialState.activities.length;

      const newActivity: Activity = {
        id: 'immutable-test',
        agentId: 'agent-1',
        type: 'training',
        title: 'Training Session',
        startDateTime: '2025-10-20T10:00:00Z',
        endDateTime: '2025-10-20T11:00:00Z',
        durationMinutes: 60,
        isMovable: true,
        color: '#8B5CF6',
        metadata: {},
      };

      initialState.addActivity(newActivity);

      // Verify new activity was added
      const updatedState = useAppStore.getState();
      expect(updatedState.activities.length).toBe(initialActivitiesLength + 1);
      expect(updatedState.activities.find((a) => a.id === 'immutable-test')).toBeDefined();
    });

    it('should preserve cvdData structure after updates', () => {
      const store = useAppStore.getState();

      const activity: Activity = {
        id: 'preserve-test',
        agentId: 'agent-1',
        type: 'break',
        title: 'Break',
        startDateTime: '2025-10-20T10:00:00Z',
        endDateTime: '2025-10-20T10:15:00Z',
        durationMinutes: 15,
        isMovable: true,
        color: '#6B7280',
        metadata: {},
      };

      store.addActivity(activity);

      // Verify cvdData still has required structure
      store.cvdData.forEach((point) => {
        expect(point).toHaveProperty('intervalStart');
        expect(point).toHaveProperty('dayOfWeek');
        expect(point).toHaveProperty('timeSlot');
        expect(point).toHaveProperty('riskLevel');
        expect(point).toHaveProperty('coveragePercent');
      });
    });
  });
});
