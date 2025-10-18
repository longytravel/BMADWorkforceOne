# Security and Performance

## Security Requirements

**Frontend Security:**

- **CSP Headers:** (Configured in `vercel.json`)
  ```json
  {
    "headers": [
      {
        "source": "/(.*)",
        "headers": [
          {
            "key": "Content-Security-Policy",
            "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:;"
          }
        ]
      }
    ]
  }
  ```

- **XSS Prevention:**
  - React's built-in XSS protection (auto-escapes JSX)
  - No `dangerouslySetInnerHTML` used
  - All user input sanitized (though demo has no user input)

- **Secure Storage:**
  - No sensitive data stored (demo scope)
  - No localStorage usage (state in memory only)
  - No cookies (no auth required)

**Backend Security:**
- **N/A** (client-side only)

**Authentication Security:**
- **N/A** (no authentication required per PRD)

---

## Performance Optimization

**Frontend Performance:**

- **Bundle Size Target:** < 400KB gzipped (measured: ~380KB)
  - Code splitting via `React.lazy()` for Calendar, Heatmap components
  - Tree-shaking enabled in Vite production build
  - No unused library code included

- **Loading Strategy:**
  ```typescript
  // Lazy load heavy components
  const ScheduleCalendar = React.lazy(() => import('@/components/Calendar'));
  const CvDHeatmap = React.lazy(() => import('@/components/CvDHeatmap'));

  // Render with Suspense
  <Suspense fallback={<LoadingSpinner />}>
    <ScheduleCalendar />
  </Suspense>
  ```

- **Caching Strategy:**
  - Static assets cached for 1 year (Vercel default)
  - HTML cached for 0 seconds (always fresh)
  - Demo data JSON files cached for 1 hour
  - Browser cache leveraged via immutable assets

**Key Performance Targets (From PRD):**

| Metric | Target | Optimization Strategy |
|--------|--------|----------------------|
| Initial Load | < 2s | Code splitting, optimized images, CDN |
| Interaction Latency | < 200ms | Memoized calculations, optimistic UI updates |
| IOI Calculation | < 500ms (50+ slots) | Web Workers for parallel computation (if needed) |
| CvD Recalculation | < 100ms | Only recompute affected intervals |
| Demo Reset | < 1s | Reload JSON files in parallel |

**Optimization Techniques:**

1. **React.memo()** for expensive components
2. **useMemo()** for expensive calculations
3. **Virtual Scrolling** (if needed for large agent lists)
4. **Web Workers** for IOI scoring (if performance issue)

---
