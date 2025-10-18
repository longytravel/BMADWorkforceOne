# Early Test Architecture Strategy
# Intelligent WFM Scheduling Demo

**Document Version:** 1.0
**Date:** October 18, 2025
**Author:** Quinn (Test Architect)
**Project Phase:** Pre-Development (Planning Complete, No Code Yet)
**Project Type:** Demo/Proof-of-Concept

---

## Executive Summary

This Early Test Architecture Strategy establishes comprehensive quality assurance for the Intelligent WFM Scheduling Demo **before development begins**. Given this is a demo/POC with critical algorithmic components (IOI scoring, break optimization) and strict performance requirements, a risk-based testing approach ensures quality without over-engineering.

**Key Recommendation:** Prioritize **unit testing for business logic** (IOI calculator, break adjuster, coverage calculator) with **manual validation for UI/UX flows**, balanced against demo scope constraints.

---

## Risk Assessment Matrix

### Critical Risk Areas

| Component | Risk Level | Probability | Impact | Mitigation Strategy |
|-----------|-----------|-------------|--------|---------------------|
| **IOI Scoring Algorithm** | 🔴 HIGH | High | Critical | Comprehensive unit tests with edge cases, performance benchmarks |
| **Break Adjustment Logic** | 🔴 HIGH | Medium | Critical | Compliance rule validation tests, scenario-based testing |
| **CvD Coverage Calculation** | 🟡 MEDIUM | Medium | High | Unit tests + performance profiling (672 intervals) |
| **Performance (NFR2/NFR3)** | 🟡 MEDIUM | High | High | Performance test suite, benchmarking during development |
| **Data Validation (JSON)** | 🟡 MEDIUM | Medium | High | Schema validation tests, malformed data scenarios |
| **Calendar Drag-Drop** | 🟡 MEDIUM | Low | Medium | Manual testing + integration tests for state updates |
| **Accessibility (WCAG 2.1 AA)** | 🟢 LOW | Low | Medium | Automated tools (Axe, Lighthouse) + manual keyboard nav |
| **Browser Compatibility** | 🟢 LOW | Low | Low | Manual testing on Chrome/Firefox/Safari |

**Risk Scoring:** Probability × Impact
- **Critical:** Product differentiation features, compliance requirements
- **High:** User-facing functionality, performance targets
- **Medium:** UX polish, error handling
- **Low:** Edge cases, browser variations

---

## Test Strategy by Component

### 1. IOI Scoring Engine (CRITICAL - Unit Testing Required)

**Why Critical:**
- Core product differentiation ("explainable AI scoring")
- Complex multi-factor calculation (4 factors, 0-100 scale)
- Performance requirement: <500ms for 50+ slots (NFR3)

**Test Coverage Required: 90%+**

#### Test Scenarios

```typescript
// src/logic/ioiCalculator.test.ts

describe('IOI Calculator', () => {
  describe('CvD Safety Factor (0-30 points)', () => {
    test('awards 30 points for green zone (>105% coverage)', () => {
      const result = scoreCvDSafety({ coverage: 120, ... });
      expect(result.score).toBe(30);
      expect(result.reasoning).toContain('safe coverage');
    });

    test('awards 15 points for caution zone (90-105% coverage)', () => {
      const result = scoreCvDSafety({ coverage: 95, ... });
      expect(result.score).toBeGreaterThan(0);
      expect(result.score).toBeLessThan(30);
    });

    test('awards 0 points for risk zone (<90% coverage)', () => {
      const result = scoreCvDSafety({ coverage: 85, ... });
      expect(result.score).toBe(0);
      expect(result.reasoning).toContain('high risk');
    });
  });

  describe('Availability Density Factor (0-25 points)', () => {
    test('awards full points when all required agents available', () => {
      // Test with 100% agent availability
    });

    test('penalizes when agents have conflicts', () => {
      // Test with partial availability
    });
  });

  describe('Compliance Integrity Factor (0-25 points)', () => {
    test('awards full points when no compliance violations', () => {
      // Test break spacing rules respected
    });

    test('penalizes when break adjustments needed', () => {
      // Test scenarios requiring break moves
    });
  });

  describe('Basic Fairness Factor (0-20 points)', () => {
    test('awards full points when agents have equal recent meetings', () => {
      // Test fairness distribution
    });

    test('penalizes when targeting already-burdened agents', () => {
      // Test fairness penalties
    });
  });

  describe('Performance', () => {
    test('calculates IOI for 50 slots in <500ms', () => {
      const start = performance.now();
      const results = calculateIOIForSlots(generate50Slots());
      const duration = performance.now() - start;
      expect(duration).toBeLessThan(500);
    });
  });

  describe('Edge Cases', () => {
    test('handles zero available agents gracefully', () => {
      // Should return IOI score of 0 with clear reasoning
    });

    test('handles NaN in calculations with fallback', () => {
      // Validates NFR13 error resilience
    });
  });
});
```

**Test Data Requirements:**
- Realistic agent roster (50-100 agents)
- Various coverage scenarios (red/yellow/green zones)
- Edge cases: no agents, all agents busy, peak hours, off-hours

---

### 2. Break Adjustment Engine (CRITICAL - Unit Testing Required)

**Why Critical:**
- Compliance violations unacceptable (legal/policy implications)
- Complex logic (multiple rules, time math, constraint solving)
- Must NEVER propose invalid break moves (NFR9)

**Test Coverage Required: 90%+**

#### Test Scenarios

```typescript
// src/logic/breakAdjuster.test.ts

describe('Break Adjustment Engine', () => {
  describe('Compliance Validation', () => {
    test('enforces 2-hour minimum between breaks', () => {
      const adjustment = proposeBreakAdjustment({
        currentBreak: { start: '10:00', end: '10:15' },
        targetSlot: { start: '11:30', end: '12:00' }
      });
      expect(adjustment.complianceCheck.valid).toBe(true);
    });

    test('rejects breaks violating 2-hour minimum', () => {
      const adjustment = proposeBreakAdjustment({
        currentBreak: { start: '10:00', end: '10:15' },
        targetSlot: { start: '10:30', end: '11:00' } // Only 30min gap
      });
      expect(adjustment.complianceCheck.valid).toBe(false);
      expect(adjustment.complianceCheck.violations).toContain('2-hour minimum');
    });

    test('enforces 5-hour maximum without break', () => {
      // Test max hours constraint
    });

    test('enforces 30-minute lunch duration requirement', () => {
      // Test lunch duration validation
    });
  });

  describe('Break Proposal Logic', () => {
    test('proposes earliest compliant slot when no clean slots exist', () => {
      // Test optimization algorithm
    });

    test('minimizes number of break moves required', () => {
      // Test that solution doesn't move unnecessary breaks
    });
  });

  describe('Edge Cases', () => {
    test('handles agents with no movable breaks (all locked)', () => {
      // Should indicate no valid adjustments possible
    });

    test('handles shift boundaries (can\'t move break outside shift)', () => {
      // Validates shift constraint enforcement
    });
  });
});
```

**Test Data Requirements:**
- Compliance rules JSON (from `/public/demo-data/compliance-rules.json`)
- Various shift patterns (8-hour, 10-hour, part-time)
- Edge cases: back-to-back breaks, end-of-shift, lunch positioning

---

### 3. Coverage Calculator (MEDIUM - Unit + Performance Testing)

**Why Medium Priority:**
- Real-time updates critical for UX (NFR2: <200ms)
- 672 intervals to calculate (7 days × 96 15-min slots)
- Impacts heatmap visualization accuracy

**Test Coverage Required: 80%+**

#### Test Scenarios

```typescript
// src/logic/coverageCalculator.test.ts

describe('Coverage Calculator', () => {
  describe('Coverage Computation', () => {
    test('correctly counts agents available in 15-min interval', () => {
      const coverage = calculateCoverage({
        interval: { start: '14:00', end: '14:15' },
        agents: mockAgents,
        activities: mockSchedules
      });
      expect(coverage.scheduledAgents).toBe(45);
      expect(coverage.forecastedCalls).toBe(50);
      expect(coverage.coveragePercent).toBe(90);
    });

    test('assigns correct risk levels based on thresholds', () => {
      expect(getCoverageRiskLevel(120)).toBe('safe');    // >105%
      expect(getCoverageRiskLevel(95)).toBe('caution');  // 90-105%
      expect(getCoverageRiskLevel(85)).toBe('risk');     // <90%
    });
  });

  describe('Performance', () => {
    test('recalculates all 672 intervals in <100ms', () => {
      const start = performance.now();
      recalculateAllCvD(agents, activities, forecast);
      const duration = performance.now() - start;
      expect(duration).toBeLessThan(100);
    });

    test('only recalculates affected intervals (optimization)', () => {
      // Test that changing one meeting doesn't recalc entire week
    });
  });

  describe('Edge Cases', () => {
    test('handles zero agents scheduled (100% risk)', () => {
      // Validates off-hours scenarios
    });

    test('handles zero forecasted demand (safe zone)', () => {
      // Validates low-volume periods
    });
  });
});
```

---

### 4. Data Validation (MEDIUM - Schema Testing)

**Why Medium Priority:**
- Malformed JSON crashes app (poor demo experience)
- PRD requires graceful error handling (FR21, FR24)

**Test Coverage Required: 70%+**

#### Test Scenarios

```typescript
// src/services/dataLoader.test.ts

describe('Data Loader', () => {
  describe('Schema Validation', () => {
    test('accepts valid agents.json structure', async () => {
      const data = await loadAgents();
      expect(data).toHaveLength(50);
      expect(data[0]).toMatchSchema(AgentSchema);
    });

    test('rejects agents.json with missing required fields', async () => {
      mockFetch({ agents: [{ id: '1', /* missing name */ }] });
      await expect(loadAgents()).rejects.toThrow('validation failed');
    });

    test('rejects schedules.json with invalid datetime format', async () => {
      mockFetch({ activities: [{ startDateTime: 'invalid-date' }] });
      await expect(loadSchedules()).rejects.toThrow('Invalid ISO 8601');
    });
  });

  describe('Error Handling', () => {
    test('shows user-friendly message when JSON file missing', async () => {
      mockFetch404();
      await expect(loadAllDemoData()).rejects.toThrow(DataLoadError);
    });

    test('displays validation errors to user (not just console)', async () => {
      // Validates NFR requirement for visible error messages
    });
  });
});
```

---

### 5. React Component Integration Tests (LOW-MEDIUM Priority)

**Why Lower Priority:**
- UI changes frequently during demo iteration
- Manual testing sufficient for demo scope (per PRD)
- Focus effort on algorithmic correctness

**Test Coverage Required: 40%+ (Key flows only)**

#### Test Scenarios

```typescript
// src/components/SmartSearch/SmartSearchModal.test.tsx

describe('Smart Search Workflow', () => {
  test('displays top 5 IOI-ranked slots after search', async () => {
    render(<SmartSearchModal />);

    userEvent.type(screen.getByLabelText('Duration'), '30');
    userEvent.click(screen.getByText('Find Best Time'));

    expect(await screen.findByText('IOI: 92')).toBeInTheDocument();
    expect(screen.getAllByTestId('slot-recommendation')).toHaveLength(5);
  });

  test('shows break adjustment proposal when conflicts detected', async () => {
    // Test conflict detection flow
  });
});

// src/components/Calendar/ScheduleCalendar.test.tsx

describe('Calendar Interactions', () => {
  test('updates activity time on drag-drop', async () => {
    // Test drag-drop state updates
  });

  test('triggers CvD recalculation after activity change', async () => {
    // Test real-time heatmap sync
  });
});
```

---

## Performance Testing Strategy

### Performance Benchmarks (from PRD)

| Metric | Target | Test Method | Frequency |
|--------|--------|-------------|-----------|
| **Initial Load** | <2s | Lighthouse CI | Per PR |
| **Interaction Latency** | <200ms | Manual + Chrome DevTools | Manual validation |
| **IOI Calculation (50 slots)** | <500ms | Vitest performance tests | CI |
| **CvD Recalculation** | <100ms | Vitest performance tests | CI |
| **Demo Reset** | <1s | Manual validation | Manual validation |

### Performance Test Suite

```typescript
// src/logic/performance.test.ts

describe('Performance Benchmarks', () => {
  test('IOI calculation meets <500ms target', () => {
    const slots = generateCandidateSlots(50);
    const start = performance.now();

    const results = slots.map(slot => calculateIOI(slot, agents, cvdData, rules));

    const duration = performance.now() - start;
    expect(duration).toBeLessThan(500);
  });

  test('CvD recalculation meets <100ms target', () => {
    const start = performance.now();

    recalculateAllCvD(agents, activities, forecast);

    const duration = performance.now() - start;
    expect(duration).toBeLessThan(100);
  });
});
```

**Optimization Triggers:**
- If IOI calc >500ms → Investigate Web Workers for parallelization
- If CvD recalc >100ms → Implement memoization, only recalc changed intervals
- If initial load >2s → Code splitting, lazy loading optimization

---

## Accessibility Testing Strategy (WCAG 2.1 AA)

### Automated Testing

**Tools:**
- **Axe DevTools** (browser extension) - Manual audits before demo sign-off
- **Lighthouse** (Chrome DevTools) - Accessibility score validation

**Frequency:**
- Once before demo sign-off (not CI integrated per PRD)
- Re-run after major UI changes

### Manual Keyboard Navigation Testing

**Critical Flows to Validate:**
1. **Tab Order:** Header → Heatmap → Calendar → Agent Panel → Modals
2. **Keyboard Shortcuts:**
   - `Tab` / `Shift+Tab` - Navigate elements
   - `Enter` / `Space` - Activate buttons
   - `Escape` - Close modals
   - `Arrow Keys` - Navigate calendar grid
3. **Focus Indicators:** All interactive elements show 2px outline

**Test Checklist:**
- [ ] All buttons keyboard-accessible
- [ ] Modals trap focus (can't tab outside)
- [ ] Skip links present for repetitive navigation
- [ ] Form inputs have associated labels
- [ ] Error messages announced to screen readers

---

## Test Data Strategy

### Demo Data Files (Source of Truth)

Located in `/public/demo-data/`:

```
agents.json           # 50-100 realistic agents
schedules.json        # Weekly activities pre-populated
cvd-forecast.json     # Forecasted demand (realistic peaks)
compliance-rules.json # Break spacing rules
```

### Test Data Sets

**1. Unit Test Fixtures**
```
src/logic/__fixtures__/
  minimal-agent-set.json      # 5 agents for fast tests
  complex-scenario.json        # Edge cases, conflicts
  performance-benchmark.json   # 100 agents for perf tests
```

**2. Scenario-Based Test Data**
- **Happy Path:** No conflicts, green coverage zones
- **Conflict Resolution:** Overlapping meetings, require break adjustments
- **Edge Cases:** Zero agents, all agents busy, off-hours
- **Performance Stress:** 100 agents, 500 candidate slots

### Data Generation

```typescript
// src/logic/__fixtures__/generators.ts

export function generateMockAgents(count: number): Agent[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `agent-${i}`,
    name: faker.person.fullName(),
    skills: faker.helpers.arrayElements(['Spanish', 'Technical', 'Sales'], 2),
    team: faker.helpers.arrayElement(['Team A', 'Team B', 'Team C']),
    // ... realistic data via faker.js
  }));
}
```

---

## Testing Tools & Setup

### Technology Stack

| Tool | Purpose | Version | Rationale |
|------|---------|---------|-----------|
| **Vitest** | Unit test runner | 1.2+ | Vite-native, fast, Jest-compatible API |
| **React Testing Library** | Component tests | 14.1+ | User-centric testing philosophy |
| **@testing-library/user-event** | User interaction simulation | Latest | Realistic user behavior |
| **@faker-js/faker** | Test data generation | Latest | Realistic demo data |
| **Axe DevTools** | Accessibility audits | Browser extension | WCAG 2.1 AA validation |
| **Lighthouse** | Performance + A11y | Chrome DevTools | Automated audits |

### Configuration Files

#### `vitest.config.ts`
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}'
      ],
      thresholds: {
        'src/logic/**': 80,  // Business logic: 80% minimum
        'src/components/**': 40  // UI components: 40% minimum
      }
    }
  }
});
```

#### `src/test/setup.ts`
```typescript
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
```

---

## Test Execution Plan

### Development Phase Testing

**Per Feature (During Epic Development):**
1. Write unit tests FIRST for business logic (TDD for `/logic` folder)
2. Implement feature
3. Add integration tests for React components (if critical flow)
4. Manual smoke test in browser
5. Run full test suite before PR

**Commands:**
```bash
npm run test               # Run all tests
npm run test:watch         # Watch mode during development
npm run test:coverage      # Generate coverage report
npm run test:unit          # Only unit tests (fast)
npm run test:integration   # Only integration tests
```

### CI/CD Integration

**GitHub Actions Workflow (Optional per PRD):**
```yaml
# .github/workflows/test.yml
name: Test Suite

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run test:coverage
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

### Pre-Demo Validation Checklist

**Before Stakeholder Demo:**
- [ ] All unit tests passing (100% pass rate)
- [ ] Performance benchmarks met (IOI <500ms, CvD <100ms)
- [ ] Lighthouse accessibility score >90
- [ ] Manual keyboard navigation validated
- [ ] Cross-browser tested (Chrome, Firefox, Safari)
- [ ] Demo reset functionality verified (<1s)
- [ ] Error handling scenarios validated (missing JSON, malformed data)

---

## Requirements Traceability Matrix

### Functional Requirements Coverage

| Requirement | Test Type | Test Location | Status |
|-------------|-----------|---------------|--------|
| **FR4:** IOI scoring (4 factors) | Unit | `ioiCalculator.test.ts` | Planned |
| **FR12:** Break adjustments (compliance) | Unit | `breakAdjuster.test.ts` | Planned |
| **FR14:** Real-time CvD updates | Integration | `Calendar.test.tsx` | Planned |
| **FR20:** Data load <2s | Performance | Manual + Lighthouse | Planned |
| **FR21:** Graceful error handling | Unit | `dataLoader.test.ts` | Planned |
| **FR23:** Demo reset functionality | Manual | Pre-demo checklist | Planned |
| **FR24:** JSON validation | Unit | `dataLoader.test.ts` | Planned |

### Non-Functional Requirements Coverage

| Requirement | Test Type | Test Method | Target |
|-------------|-----------|-------------|--------|
| **NFR2:** Interaction latency <200ms | Performance | Manual + DevTools | <200ms |
| **NFR3:** IOI calc <500ms (50 slots) | Performance | Vitest benchmark | <500ms |
| **NFR9:** Compliant break proposals | Unit | `breakAdjuster.test.ts` | 100% pass |
| **NFR11:** WCAG 2.1 AA compliance | Accessibility | Axe + Lighthouse | Score >90 |
| **NFR13:** Error resilience (NaN handling) | Unit | Edge case tests | No crashes |
| **NFR15:** Demo reset <1s | Performance | Manual validation | <1s |

---

## Risk-Based Test Prioritization

### P0 - Must Have (Block Demo if Failing)

1. **IOI Scoring Correctness** - Unit tests for all 4 factors
2. **Compliance Validation** - Break adjustment rules enforced
3. **Data Load + Validation** - Graceful error handling
4. **Performance Benchmarks** - IOI <500ms, CvD <100ms

### P1 - Should Have (Warn if Failing)

5. **CvD Coverage Calculation** - Unit tests for edge cases
6. **Real-Time Updates** - Calendar + Heatmap sync
7. **Accessibility** - Lighthouse score >90

### P2 - Nice to Have (Advisory Only)

8. **Component Integration Tests** - React Testing Library
9. **Cross-Browser** - Manual validation Safari/Firefox
10. **Demo Reset** - Manual validation <1s

---

## Test Maintenance Strategy

### Keeping Tests Green

**Guiding Principles:**
1. **Tests are code** - Refactor tests when refactoring features
2. **Fast feedback** - Unit tests run in <5 seconds
3. **Flake intolerance** - Fix flaky tests immediately or delete
4. **Test data hygiene** - Keep fixtures realistic and minimal

**When to Update Tests:**
- **Requirements change** - Update acceptance criteria → Update tests
- **Algorithm refactor** - Update logic tests to match new implementation
- **UI redesign** - Consider if integration tests still valid (or delete if no longer testing critical flow)

**Test Debt Management:**
- Review test coverage monthly (before each epic)
- Delete tests for removed features (don't accumulate dead tests)
- Refactor brittle integration tests to unit tests if possible

---

## Recommendations for Development Team

### Test-Driven Development (TDD) for Business Logic

**Recommended Workflow for `/logic` folder:**
1. Write test cases FIRST (based on IOI algorithm spec, compliance rules)
2. Run test (should fail - red)
3. Implement minimum code to pass (green)
4. Refactor for performance/clarity (refactor)
5. Commit

**Why TDD for This Project:**
- ✅ IOI scoring is complex (4 factors, edge cases) - tests document expected behavior
- ✅ Break adjustment is compliance-critical - tests catch regressions
- ✅ Pure functions ideal for TDD (no UI complexity)

### Manual Testing for UI/UX

**Recommended Workflow for `/components` folder:**
1. Build component
2. Manual smoke test in browser
3. Add integration tests ONLY for critical flows (Smart Search wizard, drag-drop)
4. Rely on TypeScript for type safety, manual testing for UX quality

**Why Manual > Automated for UI:**
- ✅ Demo UI will iterate quickly (stakeholder feedback)
- ✅ Integration tests brittle during rapid UI changes
- ✅ Visual quality hard to automate (better validated by human eyes)

### Performance Testing Cadence

**When to Benchmark:**
- After implementing IOI calculator
- After implementing CvD recalculator
- Before each demo milestone
- If performance feels sluggish during manual testing

**How to Benchmark:**
```bash
npm run test:performance  # Runs performance.test.ts with timing assertions
```

---

## Open Questions / Decisions Needed

1. **Test Coverage Enforcement:** Should CI fail if coverage drops below thresholds?
   - **Recommendation:** Warning only (not block) given demo scope

2. **Snapshot Testing:** Use for component regression detection?
   - **Recommendation:** No - UI will change frequently, snapshots create noise

3. **E2E Testing Tool:** Playwright/Cypress overkill for demo?
   - **PRD Decision:** Manual validation sufficient ✅

4. **Visual Regression Testing:** Percy/Chromatic for UI consistency?
   - **Recommendation:** No - demo scope doesn't justify cost/complexity

---

## Appendix: Test File Structure

```
wfm-intelligence-demo/
├── src/
│   ├── logic/
│   │   ├── ioiCalculator.ts
│   │   ├── ioiCalculator.test.ts        # ✅ P0 - Critical unit tests
│   │   ├── breakAdjuster.ts
│   │   ├── breakAdjuster.test.ts        # ✅ P0 - Compliance validation
│   │   ├── coverageCalculator.ts
│   │   ├── coverageCalculator.test.ts   # ✅ P1 - Performance + correctness
│   │   ├── conflictDetector.ts
│   │   ├── conflictDetector.test.ts     # ✅ P1 - Edge case handling
│   │   └── __fixtures__/
│   │       ├── minimal-agents.json
│   │       ├── complex-scenario.json
│   │       └── generators.ts
│   │
│   ├── services/
│   │   ├── dataLoader.ts
│   │   ├── dataLoader.test.ts           # ✅ P0 - Schema validation
│   │   └── csvExporter.test.ts          # P2 - Low priority
│   │
│   ├── components/
│   │   ├── SmartSearch/
│   │   │   ├── SmartSearchModal.tsx
│   │   │   └── SmartSearchModal.test.tsx # P1 - Critical user flow
│   │   ├── Calendar/
│   │   │   ├── ScheduleCalendar.tsx
│   │   │   └── ScheduleCalendar.test.tsx # P1 - Real-time sync validation
│   │   └── CvDHeatmap/
│   │       ├── CvDHeatmap.tsx
│   │       └── CvDHeatmap.test.tsx       # P2 - Visual component
│   │
│   └── test/
│       ├── setup.ts                      # Vitest global setup
│       └── utils.tsx                     # Test helpers, render utilities
│
├── vitest.config.ts                      # Test configuration
└── .github/
    └── workflows/
        └── test.yml                       # CI/CD test pipeline (optional)
```

---

## Summary & Next Steps

### Key Takeaways

1. **Prioritize Unit Tests** for business logic (`/logic` folder) - highest ROI
2. **Manual Testing Sufficient** for UI/UX flows - demo scope justifies pragmatism
3. **Performance Benchmarks Critical** - IOI <500ms and CvD <100ms are differentiators
4. **Accessibility Tooling** (Axe + Lighthouse) ensures WCAG 2.1 AA compliance
5. **Risk-Based Approach** - Focus effort where failure impacts demo success

### Immediate Next Steps

1. **Epic 1 (Foundation):**
   - Set up Vitest configuration
   - Create test fixtures (`__fixtures__/` folder)
   - Write first unit test (data loader validation)

2. **Epic 2 (CvD Heatmap):**
   - Write coverage calculator unit tests
   - Add performance benchmarks for 672-interval recalculation

3. **Epic 4 (Smart Scheduling):**
   - TDD for IOI calculator (write tests first!)
   - TDD for break adjuster (compliance-critical)

### Long-Term Test Health

- **Before Each Demo:** Run pre-demo validation checklist
- **After Each Epic:** Review test coverage, add missing critical tests
- **Monthly:** Audit test suite for flaky/outdated tests, refactor or delete

---

**Document Status:** READY FOR DEVELOPMENT

This Early Test Architecture Strategy provides comprehensive guidance for quality assurance throughout the development lifecycle. All recommendations balance demo scope constraints with critical quality requirements.

**Questions or clarifications?** Contact Quinn (Test Architect) via QA agent.
