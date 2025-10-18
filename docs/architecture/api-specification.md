# API Specification

**Status:** N/A - Client-Side Only Architecture

This demo runs entirely in the browser with no backend APIs. All data is loaded from static JSON files in `/public/demo-data/` and processed client-side.

**Data Loading Pattern:**

```typescript
// src/services/dataLoader.ts
import type { Agent, Activity, CvDDataPoint, ComplianceRule } from '@/types';

export class DataLoader {
  private baseUrl = '/demo-data';

  async loadAgents(): Promise<Agent[]> {
    const response = await fetch(`${this.baseUrl}/agents.json`);
    if (!response.ok) throw new Error('Failed to load agents data');
    return response.json();
  }

  async loadSchedules(): Promise<Activity[]> {
    const response = await fetch(`${this.baseUrl}/schedules.json`);
    if (!response.ok) throw new Error('Failed to load schedules data');
    return response.json();
  }

  async loadCvDForecast(): Promise<CvDDataPoint[]> {
    const response = await fetch(`${this.baseUrl}/cvd-forecast.json`);
    if (!response.ok) throw new Error('Failed to load CvD forecast');
    return response.json();
  }

  async loadComplianceRules(): Promise<ComplianceRule[]> {
    const response = await fetch(`${this.baseUrl}/compliance-rules.json`);
    if (!response.ok) throw new Error('Failed to load compliance rules');
    return response.json();
  }

  // Loads all data in parallel for optimal performance
  async loadAllDemoData() {
    const [agents, schedules, cvdForecast, rules] = await Promise.all([
      this.loadAgents(),
      this.loadSchedules(),
      this.loadCvDForecast(),
      this.loadComplianceRules()
    ]);

    return { agents, schedules, cvdForecast, rules };
  }
}
```

**Why No API Layer:**
- ✅ Zero infrastructure cost (PRD requirement)
- ✅ Sub-second data load (~200ms for 80KB JSON)
- ✅ Simpler architecture (no API contracts to maintain)
- ✅ Offline-capable (once loaded, works without network)

---
