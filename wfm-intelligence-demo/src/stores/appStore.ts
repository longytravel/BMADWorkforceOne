import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Agent, Activity, CvDDataPoint, ComplianceRule } from '../types';
import { CoverageCalculator } from '../logic/coverageCalculator';

interface AppState {
  // Data
  agents: Agent[];
  activities: Activity[];
  cvdData: CvDDataPoint[];
  complianceRules: ComplianceRule[];

  // Loading state
  isLoading: boolean;
  error: string | null;

  // Actions - Data loading
  setAgents: (agents: Agent[]) => void;
  setActivities: (activities: Activity[]) => void;
  setCvdData: (cvdData: CvDDataPoint[]) => void;
  setComplianceRules: (rules: ComplianceRule[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Actions - Activity management
  addActivity: (activity: Activity) => void;
  updateActivity: (activityId: string, updates: Partial<Activity>) => void;
  deleteActivity: (activityId: string) => void;

  // Actions - Coverage recalculation
  recalculateCvD: () => void;
}

export const useAppStore = create<AppState>()(
  immer((set) => ({
    // Initial state
    agents: [],
    activities: [],
    cvdData: [],
    complianceRules: [],
    isLoading: false,
    error: null,

    // Data setters
    setAgents: (agents) =>
      set((state) => {
        state.agents = agents;
      }),

    setActivities: (activities) =>
      set((state) => {
        state.activities = activities;
      }),

    setCvdData: (cvdData) =>
      set((state) => {
        state.cvdData = cvdData;
      }),

    setComplianceRules: (rules) =>
      set((state) => {
        state.complianceRules = rules;
      }),

    setLoading: (loading) =>
      set((state) => {
        state.isLoading = loading;
      }),

    setError: (error) =>
      set((state) => {
        state.error = error;
      }),

    // Activity management with auto-recalculation
    addActivity: (activity) =>
      set((state) => {
        state.activities.push(activity);
        // Auto-recalculate coverage after adding activity
        const calculator = new CoverageCalculator();
        const forecastData = state.cvdData.map((point) => ({
          intervalStart: point.intervalStart,
          forecastedCalls: point.forecastedCalls,
        }));
        state.cvdData = calculator.recalculateAll(
          state.agents,
          state.activities,
          forecastData
        );
      }),

    updateActivity: (activityId, updates) =>
      set((state) => {
        const index = state.activities.findIndex((a) => a.id === activityId);
        if (index !== -1) {
          state.activities[index] = { ...state.activities[index], ...updates };
          // Auto-recalculate coverage after updating activity
          const calculator = new CoverageCalculator();
          const forecastData = state.cvdData.map((point) => ({
            intervalStart: point.intervalStart,
            forecastedCalls: point.forecastedCalls,
          }));
          state.cvdData = calculator.recalculateAll(
            state.agents,
            state.activities,
            forecastData
          );
        }
      }),

    deleteActivity: (activityId) =>
      set((state) => {
        state.activities = state.activities.filter((a) => a.id !== activityId);
        // Auto-recalculate coverage after deleting activity
        const calculator = new CoverageCalculator();
        const forecastData = state.cvdData.map((point) => ({
          intervalStart: point.intervalStart,
          forecastedCalls: point.forecastedCalls,
        }));
        state.cvdData = calculator.recalculateAll(
          state.agents,
          state.activities,
          forecastData
        );
      }),

    // Manual coverage recalculation
    recalculateCvD: () =>
      set((state) => {
        const calculator = new CoverageCalculator();
        const forecastData = state.cvdData.map((point) => ({
          intervalStart: point.intervalStart,
          forecastedCalls: point.forecastedCalls,
        }));
        state.cvdData = calculator.recalculateAll(
          state.agents,
          state.activities,
          forecastData
        );
      }),
  }))
);
