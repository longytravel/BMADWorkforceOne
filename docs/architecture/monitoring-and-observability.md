# Monitoring and Observability

## Monitoring Stack

- **Frontend Monitoring:** Vercel Analytics (Free Tier)
- **Backend Monitoring:** N/A (no backend)
- **Error Tracking:** Browser console + manual observation (no Sentry for demo scope)
- **Performance Monitoring:** Chrome DevTools + Lighthouse

## Key Metrics

**Frontend Metrics:**
- **Core Web Vitals:**
  - LCP (Largest Contentful Paint): < 2.5s
  - FID (First Input Delay): < 100ms
  - CLS (Cumulative Layout Shift): < 0.1
- **JavaScript errors:** Tracked via console.error
- **Page load time:** < 2s (FR20)
- **Interaction latency:** < 200ms (NFR2)

**Demo-Specific Metrics:**
- IOI calculation time (target: < 500ms)
- CvD recalculation time (target: < 100ms)
- Demo reset time (target: < 1s)

---
