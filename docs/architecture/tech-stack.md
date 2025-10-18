# Tech Stack

This is the **DEFINITIVE** technology selection for the entire project. All development must use these exact versions.

## Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
|----------|-----------|---------|---------|-----------|
| **Frontend Language** | TypeScript | 5.3+ | Type-safe React development | Prevents runtime errors during demos; strict mode catches bugs at compile time |
| **Frontend Framework** | React | 18.2+ | UI component library | Industry standard with best-in-class hooks, concurrent features, and ecosystem |
| **UI Component Library** | Shadcn/ui | Latest | Accessible, customizable components | Copy-paste components (not npm dependency), built on Radix UI for WCAG 2.1 AA compliance |
| **CSS Framework** | Tailwind CSS | 3.4+ | Utility-first styling | Zero custom CSS files, consistent design system, tree-shakeable for optimal bundle size |
| **State Management** | Zustand | 4.5+ | Global state store | Lightweight (1KB), simple API, no boilerplate vs Redux; perfect for demo scope |
| **Date/Time Library** | date-fns | 3.0+ | Date manipulation | Tree-shakeable, immutable, modular; critical for contact center scheduling time math |
| **Calendar Component** | React Big Calendar | 1.11+ | Outlook-style calendar grid | Proven library saves weeks of custom grid implementation; drag-drop ready |
| **Charting/Heatmap** | Recharts | 2.10+ | CvD heatmap visualization | Declarative React-friendly API, composable charts, good performance for 672 cells (7 days × 96 intervals) |
| **Drag & Drop** | dnd-kit | 8.0+ | Calendar drag interactions | Modern, touch-friendly, accessible; better DX than react-dnd |
| **Icons** | Lucide React | 0.344+ | UI icons | Tree-shakeable, consistent style, modern alternative to FontAwesome |
| **Data Validation** | Zod | 3.22+ | JSON schema validation | Validates demo data structure on load; TypeScript inference from schemas |
| **Build Tool** | Vite | 5.0+ | Dev server & bundler | <50ms HMR, optimized production builds, native ESM; faster than Webpack/CRA |
| **Frontend Testing** | Vitest | 1.2+ | Unit tests for algorithms | Vite-native, fast, compatible test runner; Jest-like API |
| **Testing Library** | React Testing Library | 14.1+ | Component integration tests | User-centric testing approach for UI interactions |
| **E2E Testing** | Manual | N/A | Full demo walkthrough | Playwright/Cypress overkill for POC; manual validation sufficient per PRD |
| **Linting** | ESLint | 8.56+ | Code quality enforcement | TypeScript rules, React hooks rules, catch errors pre-commit |
| **Formatting** | Prettier | 3.2+ | Consistent code style | 2-space indent, single quotes, trailing commas; no style debates |
| **AI Development Tools** | Chrome DevTools MCP | Latest | AI agent browser debugging | Enables AI coding assistants to inspect live browser, analyze performance, debug React components in real Chrome environment |
| **Deployment Platform** | Vercel | N/A | Static hosting + CDN | Zero-config, free tier, instant deploys, global edge network |
| **CI/CD** | Vercel Auto-Deploy | N/A | Git push → live URL | Automatic on GitHub push to main; no GitHub Actions needed |
| **Monitoring** | Vercel Analytics | Free Tier | Page views, performance | Built-in Web Vitals tracking, zero setup |
| **Error Tracking** | Console + Manual | N/A | Demo error handling | Sentry/Rollbar overkill for demo scope; console.error sufficient |

**Total Bundle Size Estimate:**

| Category | Size (gzipped) |
|----------|----------------|
| React + React DOM | ~45 KB |
| Zustand + date-fns | ~15 KB |
| React Big Calendar | ~80 KB |
| Recharts | ~90 KB |
| dnd-kit | ~40 KB |
| Shadcn components | ~30 KB |
| Demo Data (JSON) | ~80 KB |
| **Total** | **~380 KB** |

**Performance Impact:** 380KB on global CDN = ~800ms load on 3G, ~200ms on 4G, <100ms on broadband
✅ **Meets <2s load target** with room to spare

---
