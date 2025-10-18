# Frontend Architecture

## Component Architecture

### Component Organization

```
/src
  /components
    /CvDHeatmap
      CvDHeatmap.tsx          # Main heatmap component
      HeatmapCell.tsx         # Individual cell with hover
      HeatmapTooltip.tsx      # Quick stats tooltip
      HeatmapDetailModal.tsx  # Click detail popup
      index.ts                # Barrel export

    /Calendar
      ScheduleCalendar.tsx    # Main calendar wrapper
      ActivityBlock.tsx       # Draggable activity component
      AgentSidePanel.tsx      # Agent list with filters
      ViewModeSwitcher.tsx    # Summary/Filtered/Individual toggle
      CalendarToolbar.tsx     # Date picker, actions
      index.ts

    /SmartSearch
      SmartSearchModal.tsx    # Wizard dialog container
      SearchForm.tsx          # Step 1: Input params
      SlotRecommendations.tsx # Step 2: Top 5 IOI results
      IOIScoreCard.tsx        # Individual slot card with breakdown
      BreakAdjustmentView.tsx # Step 3: Before/after comparison
      index.ts

    /AuditLog
      AuditLog.tsx            # Main log table
      AuditLogFilters.tsx     # Filter controls
      AuditLogRow.tsx         # Individual log entry
      ExportButton.tsx        # CSV download
      index.ts

    /NotificationPreview
      NotificationPanel.tsx   # Container
      NotificationCard.tsx    # Mock notification
      index.ts

    /ui                       # Shadcn components (copied, not installed)
      button.tsx
      dialog.tsx
      table.tsx
      card.tsx
      accordion.tsx
      select.tsx
      input.tsx
      tooltip.tsx
      ...

    /Layout
      AppShell.tsx            # Root layout
      Header.tsx              # Top nav bar
      ErrorBoundary.tsx       # Error catching
      LoadingScreen.tsx       # Initial load skeleton
      index.ts
```

### Component Template Example

```typescript
// src/components/CvDHeatmap/CvDHeatmap.tsx
import React, { useMemo } from 'react';
import { ResponsiveContainer, HeatMap } from 'recharts';
import { useStore } from '@/stores/appStore';
import type { CvDDataPoint } from '@/types';
import { HeatmapTooltip } from './HeatmapTooltip';
import { HeatmapDetailModal } from './HeatmapDetailModal';

interface CvDHeatmapProps {
  weekStartDate: Date;
  highlightedIntervals?: string[];
}

export function CvDHeatmap({ weekStartDate, highlightedIntervals = [] }: CvDHeatmapProps) {
  const cvdData = useStore((state) => state.cvdData);
  const [selectedCell, setSelectedCell] = React.useState<CvDDataPoint | null>(null);

  // Memoize data transformation for performance
  const heatmapData = useMemo(() => {
    return transformCvDDataForRecharts(cvdData, weekStartDate);
  }, [cvdData, weekStartDate]);

  const getCellColor = (dataPoint: CvDDataPoint) => {
    if (dataPoint.riskLevel === 'safe') return '#10B981'; // Green
    if (dataPoint.riskLevel === 'caution') return '#FBBF24'; // Yellow
    return '#EF4444'; // Red
  };

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <HeatMap
          data={heatmapData}
          onClick={(cell) => setSelectedCell(cell.payload)}
        >
          <HeatmapTooltip />
        </HeatMap>
      </ResponsiveContainer>

      {selectedCell && (
        <HeatmapDetailModal
          dataPoint={selectedCell}
          onClose={() => setSelectedCell(null)}
        />
      )}
    </div>
  );
}
```

---

## State Management Architecture

### State Structure

```typescript
// src/stores/appStore.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import type { Agent, Activity, CvDDataPoint, ComplianceRule, AuditLogEntry } from '@/types';

interface AppState {
  // ============ DATA STATE ============
  agents: Agent[];
  activities: Activity[];
  cvdData: CvDDataPoint[];
  complianceRules: ComplianceRule[];
  auditLog: AuditLogEntry[];

  // ============ UI STATE ============
  isLoading: boolean;
  error: string | null;
  selectedAgentIds: string[];
  viewMode: 'summary' | 'filtered' | 'individual';
  currentWeekStart: Date;

  // ============ FILTER STATE ============
  agentFilters: {
    searchQuery: string;
    skillFilters: string[];
    teamFilters: string[];
    showTopNByAvailability?: number;
  };

  auditLogFilters: {
    dateRange: { start: Date; end: Date };
    actionTypes: string[];
    agentSearch: string;
  };

  // ============ DATA ACTIONS ============
  initializeData: (data: DemoData) => void;
  resetDemo: () => void;

  // Activity management
  addActivity: (activity: Activity) => void;
  updateActivity: (id: string, updates: Partial<Activity>) => void;
  deleteActivity: (id: string) => void;

  // CvD recalculation
  recalculateCvD: () => void;

  // Audit logging
  addAuditEntry: (entry: Omit<AuditLogEntry, 'id' | 'timestamp'>) => void;

  // ============ UI ACTIONS ============
  setSelectedAgents: (agentIds: string[]) => void;
  setViewMode: (mode: 'summary' | 'filtered' | 'individual') => void;
  setCurrentWeek: (date: Date) => void;
  updateAgentFilters: (filters: Partial<AppState['agentFilters']>) => void;
  updateAuditLogFilters: (filters: Partial<AppState['auditLogFilters']>) => void;
}

export const useStore = create<AppState>()(
  devtools(
    immer((set, get) => ({
      // Initial state
      agents: [],
      activities: [],
      cvdData: [],
      complianceRules: [],
      auditLog: [],
      isLoading: true,
      error: null,
      selectedAgentIds: [],
      viewMode: 'summary',
      currentWeekStart: new Date(),
      agentFilters: {
        searchQuery: '',
        skillFilters: [],
        teamFilters: [],
      },
      auditLogFilters: {
        dateRange: { start: new Date(), end: new Date() },
        actionTypes: [],
        agentSearch: '',
      },

      // Actions implementation
      initializeData: (data) => set((state) => {
        state.agents = data.agents;
        state.activities = data.schedules;
        state.cvdData = data.cvdForecast;
        state.complianceRules = data.rules;
        state.isLoading = false;
        state.error = null;
      }),

      resetDemo: async () => {
        set({ isLoading: true });
        const loader = new DataLoader();
        const data = await loader.loadAllDemoData();
        get().initializeData(data);
      },

      addActivity: (activity) => set((state) => {
        state.activities.push(activity);
        get().recalculateCvD();
        get().addAuditEntry({
          action: 'activity-created',
          userId: 'demo-user',
          affectedAgents: [activity.agentId],
          details: {
            activityId: activity.id,
            activityType: activity.type,
            activityTitle: activity.title,
          },
          coverageImpact: 0,
        });
      }),

      updateActivity: (id, updates) => set((state) => {
        const index = state.activities.findIndex(a => a.id === id);
        if (index !== -1) {
          Object.assign(state.activities[index], updates);
          get().recalculateCvD();
        }
      }),

      deleteActivity: (id) => set((state) => {
        state.activities = state.activities.filter(a => a.id !== id);
        get().recalculateCvD();
      }),

      recalculateCvD: () => set((state) => {
        const calculator = new CoverageCalculator();
        state.cvdData = calculator.recalculateAll(
          state.agents,
          state.activities,
          state.cvdData
        );
      }),

      addAuditEntry: (entry) => set((state) => {
        const newEntry: AuditLogEntry = {
          ...entry,
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
        };
        state.auditLog.unshift(newEntry);
      }),

      setSelectedAgents: (agentIds) => set({ selectedAgentIds: agentIds }),
      setViewMode: (mode) => set({ viewMode: mode }),
      setCurrentWeek: (date) => set({ currentWeekStart: date }),
      updateAgentFilters: (filters) => set((state) => {
        Object.assign(state.agentFilters, filters);
      }),
      updateAuditLogFilters: (filters) => set((state) => {
        Object.assign(state.auditLogFilters, filters);
      }),
    }))
  )
);
```

### State Management Patterns

- **Immer Middleware:** Enables "mutating" syntax while maintaining immutability
- **DevTools Middleware:** Redux DevTools integration for debugging (dev only)
- **Computed Selectors:** Create derived state with `useMemo` in components
- **Action Co-location:** Related actions grouped together
- **Auto-triggering:** Some actions (addActivity) automatically trigger side effects (recalculateCvD)

---

## Routing Architecture

### Route Organization

**Decision:** Single-page application with no routing library needed.

```typescript
// src/App.tsx - Conditional rendering, no router
import { useStore } from '@/stores/appStore';
import { AppShell } from '@/components/Layout';
import { LoadingScreen } from '@/components/Layout/LoadingScreen';
import { ErrorScreen } from '@/components/Layout/ErrorScreen';
import { Dashboard } from '@/pages/Dashboard';

export function App() {
  const isLoading = useStore((state) => state.isLoading);
  const error = useStore((state) => state.error);

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} />;

  return (
    <AppShell>
      <Dashboard />
    </AppShell>
  );
}
```

**Rationale:**
- ✅ Demo is single-view (no need for /login, /settings, etc.)
- ✅ Eliminates React Router dependency (~30KB saved)
- ✅ Simpler mental model for demo scope

---

## Frontend Services Layer

### API Client Setup

```typescript
// src/services/dataLoader.ts
import { z } from 'zod';
import type { Agent, Activity, CvDDataPoint, ComplianceRule } from '@/types';
import { AgentSchema, ActivitySchema, CvDSchema, ComplianceRuleSchema } from '@/types/schemas';

export class DataLoader {
  private baseUrl = '/demo-data';

  async loadAgents(): Promise<Agent[]> {
    const response = await fetch(`${this.baseUrl}/agents.json`);
    if (!response.ok) throw new DataLoadError('Failed to load agents');
    const data = await response.json();
    return z.array(AgentSchema).parse(data); // Zod validation
  }

  async loadSchedules(): Promise<Activity[]> {
    const response = await fetch(`${this.baseUrl}/schedules.json`);
    if (!response.ok) throw new DataLoadError('Failed to load schedules');
    const data = await response.json();
    return z.array(ActivitySchema).parse(data);
  }

  async loadCvDForecast(): Promise<CvDDataPoint[]> {
    const response = await fetch(`${this.baseUrl}/cvd-forecast.json`);
    if (!response.ok) throw new DataLoadError('Failed to load CvD forecast');
    const data = await response.json();
    return z.array(CvDSchema).parse(data);
  }

  async loadComplianceRules(): Promise<ComplianceRule[]> {
    const response = await fetch(`${this.baseUrl}/compliance-rules.json`);
    if (!response.ok) throw new DataLoadError('Failed to load compliance rules');
    const data = await response.json();
    return z.array(ComplianceRuleSchema).parse(data);
  }

  async loadAllDemoData() {
    try {
      const [agents, schedules, cvdForecast, rules] = await Promise.all([
        this.loadAgents(),
        this.loadSchedules(),
        this.loadCvDForecast(),
        this.loadComplianceRules(),
      ]);

      return { agents, schedules, cvdForecast, rules };
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new DataValidationError('Demo data validation failed', error);
      }
      throw error;
    }
  }
}

class DataLoadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DataLoadError';
  }
}

class DataValidationError extends Error {
  constructor(message: string, public zodError: z.ZodError) {
    super(message);
    this.name = 'DataValidationError';
  }
}
```

### Service Example: CSV Export

```typescript
// src/services/csvExporter.ts
import type { AuditLogEntry } from '@/types';
import { format } from 'date-fns';

export class CSVExporter {
  exportAuditLog(entries: AuditLogEntry[]): void {
    const headers = ['Timestamp', 'Action', 'User', 'Affected Agents', 'IOI Score', 'Coverage Impact', 'Details'];

    const rows = entries.map(entry => [
      format(new Date(entry.timestamp), 'yyyy-MM-dd HH:mm:ss'),
      entry.action,
      entry.userId,
      entry.affectedAgents.join(', '),
      entry.ioiScore?.toString() || 'N/A',
      `${entry.coverageImpact > 0 ? '+' : ''}${entry.coverageImpact.toFixed(1)}%`,
      entry.details.activityTitle || entry.details.reason || '',
    ]);

    const csv = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `audit-log-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
  }
}
```

---
