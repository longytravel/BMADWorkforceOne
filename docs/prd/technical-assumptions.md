# Technical Assumptions

## Repository Structure: Monorepo

**Decision:** Single repository containing all frontend code, demo data, configuration, and documentation.

**Rationale:**
- **Demo scope simplicity:** No need for polyrepo complexity with separate frontend/backend/data repos
- **Zero deployment friction:** Single `git clone` → `npm install` → `npm run dev` workflow
- **Vercel/Netlify compatibility:** Both platforms expect single-repo React projects for auto-deploy
- **Open-source readability:** Single-repo organization optimized for GitHub discoverability, not long-term modularity

**Structure:**
```
/wfm-intelligence-demo
  /src              (React components, logic, types, hooks)
  /public
    /demo-data      (agents.json, schedules.json, cvd-forecast.json, compliance-rules.json)
  /docs             (Brief, PRD, architecture diagrams - at root for GitHub visibility)
  package.json
  vite.config.ts
  README.md
```

**Note:** `/public/demo-data/` placement simplifies Vercel's static file serving and clarifies demo scope.

## Service Architecture: Client-Side Monolith (No Backend)

**Decision:** All intelligence and business logic runs in the browser using TypeScript. No server-side APIs, databases, or authentication.

**Rationale:**
- **Demo constraint:** Zero infrastructure cost requirement eliminates backend options
- **Proof-of-concept scope:** Demonstrates scheduling algorithms and UX concepts, not production engineering
- **Deployment simplicity:** Static site hosting (Vercel free tier) with instant global CDN
- **Portability:** Demo runs locally (`npm run dev`) or via shared URL—no server setup required
- **Performance:** Modern browsers handle 50-100 agent calculations client-side without latency

**What Runs Client-Side:**
- IOI scoring algorithm (pure TypeScript function)
- Break adjustment logic (compliance validation, optimization)
- CvD coverage calculation (agents vs. demand)
- State management (Zustand or React Context)
- Data loading (fetch JSON from `/public/demo-data/`)
- Audit log (in-memory array, CSV export)

**Trade-off Statement:**
The chosen architecture **intentionally sacrifices persistence, role management, and API integration in exchange for immediate demo usability and visual impact**. This is not an extensible platform foundation.

## Technical Scope Limitations

**Explicit Exclusions (Not In Scope):**
- ❌ **No offline mode:** Demo requires network connection to load assets
- ❌ **No data editing persistence:** Schedule changes persist only in session memory; refreshing the page resets to initial demo state
- ❌ **No API consumption:** All data is static JSON—no external WFM platform integration
- ❌ **No authentication or multi-user sessions:** Single-user demo with no login, no role-based access control
- ❌ **No environment variables or secrets:** Fully static build with no configuration requirements

**Browser Cache / Refresh Behavior:**
- App resets to initial state on refresh; no caching of schedule edits beyond session memory
- Users can use "Reset Demo" button (FR23) to restore initial state without refreshing

**Purpose:** Prevents scope creep disguised as "tiny enhancements." This is a demonstration, not a production foundation.

## Testing and Validation Strategy

**Philosophy:** Testing effort is designed to **demonstrate algorithm correctness and UI stability**, not production QA coverage.

**Testing Scope:**

**Unit Tests (High Priority):**
- `ioiCalculator.test.ts` - All four IOI factors (CvD safety, availability, compliance, fairness)
- `breakAdjuster.test.ts` - Compliance rules enforcement (2hr min between breaks, 5hr max without break)
- `conflictDetector.test.ts` - Schedule overlap detection
- `coverageCalculator.test.ts` - CvD percentage calculation accuracy

**Integration Tests (Medium Priority):**
- Smart Search workflow (input parameters → IOI ranking → slot selection)
- Calendar state updates (add activity → heatmap recalculates → audit log records)
- Filter/subset logic (skill-based filtering, agent grouping)

**Manual Validation (Primary Assurance Method for End-to-End Flows):**
- Full demo flow walkthrough (5-10 min scenario) on Chrome, Firefox, Safari
- Responsive layout checks (desktop 1920x1080, laptop 1440x900, tablet iPad)
- Error state verification (missing JSON file, malformed data, invalid date ranges)
- **Accessibility audits:** Lighthouse + Axe DevTools run **once before demo sign-off** (not integrated into CI)

**Out of Scope (Not Essential for Demo):**
- ❌ E2E tests (Playwright/Cypress) - manual validation sufficient for POC
- ❌ Visual regression tests (Percy/Chromatic) - no design system to protect
- ❌ Performance benchmarking - demo data size is fixed, manual validation adequate
- ❌ Load/stress testing - single-user client-side app

**Rationale:**
- **Unit tests protect algorithms:** IOI scoring and compliance logic are differentiators—must be provably correct
- **Manual validation confirms UX:** Demo success depends on smooth interactions, not test coverage %
- **Time investment:** Focus effort on features that impress (slick UI, smart recommendations) vs. invisible infrastructure

**Testing Framework:**
- **Vitest** (Vite-native, fast, TypeScript support)
- **React Testing Library** (integration tests for component interactions)

**Accessibility Validation (Not "Testing"):**
- **Axe DevTools** browser extension (manual accessibility audits)
- **Lighthouse** in Chrome DevTools (automated accessibility scoring)
- Note: Accessibility audits validate WCAG compliance (NFR11), not functional correctness

## Performance Targets

**Measurable Benchmarks (Linked to NFRs):**
- **Initial load:** < 2 seconds (FR20)
- **Interaction latency:** < 200ms for clicks, hovers, drag-and-drop (NFR2)
- **IOI recomputation:** < 500ms for 50+ candidate slots (NFR3)
- **Demo reset:** < 1 second (NFR15)

**Optimization Strategies:**
- **Lazy loading** for heavy components (Calendar, Heatmap) via `React.lazy()` + `Suspense`
- **Memoization** for expensive calculations (IOI scoring, coverage) via `useMemo`
- **Virtual scrolling** enabled if active subset exceeds 25 agents via `react-window` or `@tanstack/react-virtual`
- **Debouncing** for search/filter inputs (300ms delay) via `lodash.debounce` or custom hook

**Rationale:** Demo must feel fast and responsive. Benchmarks ensure continuity with NFR performance requirements.

## Additional Technical Assumptions and Requests

### Frontend Framework & Build Tool
- **React 18+** with TypeScript for type safety and modern hooks (useState, useEffect, custom hooks)
- **Vite** as build tool (fastest dev server, optimized production builds, better DX than CRA)
- **Strict TypeScript** (`strict: true` in tsconfig.json) to catch bugs at compile time

**Rationale:** React is industry standard for complex UIs, TypeScript prevents runtime errors during demos, Vite provides instant HMR (<50ms).

### UI Component Library & Styling
- **Tailwind CSS** for utility-first styling (no custom CSS files, consistent design system)
- **Shadcn/ui** for accessible, customizable components (buttons, modals, tables, cards)
- **Recharts** or **Nivo** for CvD heatmap visualization (declarative, React-friendly charting)
- **React Big Calendar** or **FullCalendar** for Outlook-style schedule grid (proven libraries, reduce custom code)
- **React DnD** or **dnd-kit** for drag-and-drop interactions (smooth, touch-friendly)
- **Lucide React** for icons (modern, tree-shakeable, consistent style)

**Rationale:** Shadcn/Tailwind combination provides professional aesthetic with zero design effort. Existing calendar libraries save weeks of custom grid implementation.

### State Management
- **Zustand** (preferred) or **React Context API** for global state
- No Redux—overkill for demo scope

**State to Manage:**
- Agent roster (50-100 agents from `agents.json`)
- Schedule activities (shifts, breaks, lunches, meetings from `schedules.json`)
- CvD forecast data (15-min intervals from `cvd-forecast.json`)
- Compliance rules (break spacing from `compliance-rules.json`)
- UI state (selected agents, active filters, modal open/closed)
- Audit log (in-memory event array)

**Rationale:** Zustand is lightweight (1KB), simple API, no boilerplate. Context API is acceptable fallback if team prefers zero dependencies for state.

### Date/Time Handling
- **date-fns** (preferred) or **Day.js** for date manipulation, formatting, and timezone safety
- Avoid Moment.js (deprecated, large bundle size)

**Rationale:** Date-fns is modular (tree-shakeable), immutable (prevents bugs), well-documented. Contact center scheduling is time-sensitive—need reliable date math.

### Data Format & Storage
- **JSON files** in `/public/demo-data/` folder for demo data (agents, schedules, forecast, rules)
- **CSV export** capability for audit log (use `papaparse` or custom function)
- **No database:** All data loaded into memory on app initialization

**Sample Data Structure:**
- `agents.json` - 50-100 sample agents (realistic names via faker.js, varied skills, realistic shifts)
- `schedules.json` - Weekly schedules with shifts, breaks, lunches, pre-existing meetings
- `cvd-forecast.json` - Forecasted call volume by 15-min interval (realistic peaks: 10am-12pm, 2pm-4pm)
- `compliance-rules.json` - Break spacing rules, max hours without break, lunch duration requirements

**Rationale:** JSON is human-readable, easy to edit for demo variations, no database complexity. Faker.js generates realistic demo data quickly.

### Code Organization & Architecture Patterns
- **Feature-based folder structure:**
  ```
  /src
    /components
      /Calendar       (calendar grid, activity blocks, drag-and-drop)
      /CvDHeatmap     (heatmap visualization, detail modal)
      /SmartSearch    (search modal, IOI results, break adjustment UI)
      /AuditLog       (event log table, filters, CSV export)
      /AgentPanel     (agent list, filtering, multi-select)
      /ui             (Shadcn components: Button, Dialog, Table, Card)
    /logic
      ioiCalculator.ts
      breakAdjuster.ts
      conflictDetector.ts
      coverageCalculator.ts
    /data
      loadDemoData.ts
      validation.ts
    /types
      index.ts        (Agent, Activity, CvDDataPoint, IOIResult interfaces)
    /hooks
      useAgentFilter.ts
      useScheduleState.ts
      useIOIScoring.ts
    /utils
      dateHelpers.ts
      csvExport.ts
  ```

- **Separation of concerns:** Business logic (IOI calculation, compliance) separate from UI components
- **Custom hooks** for reusable stateful logic (filtering, search, state updates)
- **Pure functions** for algorithms (testable, no side effects)

**Rationale:** Feature-based structure scales better than "components/utils/lib" for complex UIs. Pure logic functions enable thorough unit testing.

### Error Handling & Validation
- **JSON schema validation** on data load (validate structure of agents.json, schedules.json) via `zod` or `yup`
- **Graceful degradation:** Missing data files → show error message via visible UI (toast/banner), don't crash
- **Input validation:** Date ranges, duration values, agent selection (prevent invalid Smart Search queries)
- **Fallback values:** IOI score NaN → fallback to 0, display warning in console
- **Validation errors surface via visible UI messages (toast/banner), not console-only**
- **Error boundaries:** React Error Boundary component wraps main app (catch render errors, show friendly message)

**Rationale:** Demo stability is critical—"white screen of death" kills credibility. Validation catches data editing mistakes early. User-facing error messages maintain professional appearance.

### Deployment & Hosting
- **Vercel** (preferred) for auto-deploy from GitHub main branch
  - Free tier: Unlimited deploys, global CDN, automatic HTTPS
  - Zero config: `vite.config.ts` auto-detected
  - Preview URLs for PR branches (useful for stakeholder review)
  - **No environment variables or secrets required**
- **Netlify** (fallback) if Vercel has issues
- **GitHub Pages** (not recommended) - slower deploys, no preview URLs

**Deployment Process:**
1. Push to GitHub `main` branch
2. Vercel auto-builds via `npm run build`
3. Deploys to `wfm-demo.vercel.app` (or custom domain)
4. Share URL for demos/portfolio

**Rationale:** Vercel is zero-config, instant deploys, free for demos. Preview URLs let stakeholders review changes before merging.

### Development Setup

**Prerequisites:**
- **Node.js 18+** (LTS version for stability)
- **pnpm** (preferred) or **npm** for package management

**Code Quality (Required):**
- **ESLint** with TypeScript rules (catch errors, enforce conventions)
- **Prettier** for consistent formatting (2-space indent, single quotes, trailing commas)
- **TypeScript strict mode** (`strict: true`)

**Developer Convenience (Recommended, Not Required):**
- **VS Code** with extensions: ESLint, Prettier, Tailwind IntelliSense, TypeScript
- **Husky** + **lint-staged** for pre-commit hooks (auto-format, run lints) - optional, not architectural
- **Conventional commits** (e.g., `feat: add IOI scoring`) - nice-to-have for readable history

**Rationale:** ESLint, Prettier, and TypeScript strictness prevent bugs and style debates. Pre-commit hooks and VS Code extensions are developer productivity aids, not requirements.

## Dependencies & Constraints Summary

**Hard Constraints:**
- ✅ No backend infrastructure (client-side only)
- ✅ No authentication or user management (single-user demo)
- ✅ No external APIs (all data from local JSON)
- ✅ Zero hosting cost (Vercel free tier)
- ✅ Demo data only (no production data, no PII)
- ✅ No environment variables or secrets

**Key Dependencies (Must Load Before App Initialization):**
1. `/public/demo-data/agents.json` - Agent roster with skills, shifts
2. `/public/demo-data/schedules.json` - Weekly schedule activities
3. `/public/demo-data/cvd-forecast.json` - Forecasted demand data
4. `/public/demo-data/compliance-rules.json` - Break spacing rules

**Technology Stack Summary Table:**

| Area | Decision | Trade-off |
|------|----------|-----------|
| **Architecture** | Client-side monolith | No persistence or multi-user support |
| **Framework** | React 18 + Vite + TypeScript | Browser-only, no SSR |
| **UI Stack** | Tailwind + Shadcn/ui | No custom design system |
| **State** | Zustand (or Context API) | In-memory only, resets on refresh |
| **Testing** | Unit tests + manual validation | No E2E automation |
| **Hosting** | Vercel free tier | No custom backend or APIs |

---
