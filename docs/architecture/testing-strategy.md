# Testing Strategy

## Testing Pyramid

```
        E2E Tests
       (Manual Only)
      /            \
     /              \
    Integration Tests
   (React Testing Lib)
  /                    \
 /                      \
Unit Tests              Unit Tests
(Logic Functions)       (Component Behavior)
```

## Test Organization

### Frontend Tests

```
src/
  logic/
    ioiCalculator.test.ts        # Unit tests for IOI algorithm
    breakAdjuster.test.ts        # Unit tests for break optimization
    coverageCalculator.test.ts   # Unit tests for CvD calculation
    conflictDetector.test.ts     # Unit tests for overlap detection

  components/
    CvDHeatmap/
      CvDHeatmap.test.tsx        # Component integration test
    Calendar/
      ScheduleCalendar.test.tsx  # Component integration test
    SmartSearch/
      SmartSearchModal.test.tsx  # Component integration test
```

### E2E Tests
- **Manual validation** (no Playwright/Cypress per PRD)
- Demo walkthrough script in `docs/demo-script.md`

---

## Test Examples

### Unit Test: IOI Calculator

```typescript
// src/logic/ioiCalculator.test.ts
import { describe, it, expect } from 'vitest';
import { calculateIOI, scoreCvDSafety } from './ioiCalculator';

describe('IOI Calculator', () => {
  describe('scoreCvDSafety', () => {
    it('should return 0 points for red zone (< 90% coverage)', () => {
      const result = scoreCvDSafety(/* params */);
      expect(result.score).toBe(0);
      expect(result.reasoning).toContain('high risk');
    });

    it('should return 30 points for green zone (> 105% coverage)', () => {
      const result = scoreCvDSafety(/* params */);
      expect(result.score).toBe(30);
    });
  });
});
```

### Component Test: CvD Heatmap

```typescript
// src/components/CvDHeatmap/CvDHeatmap.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CvDHeatmap } from './CvDHeatmap';

describe('CvDHeatmap', () => {
  it('should show tooltip on cell hover', async () => {
    const { container } = render(<CvDHeatmap weekStartDate={new Date()} />);

    const cell = container.querySelector('[data-testid="heatmap-cell"]');
    fireEvent.mouseEnter(cell!);

    expect(await screen.findByText(/Coverage: 120%/i)).toBeInTheDocument();
  });
});
```

**Test Coverage Target:**
- ✅ 80%+ for `/logic` folder (pure functions)
- ✅ 50%+ for `/components` (UI components)
- ✅ Focus on critical paths, not 100% coverage

---
