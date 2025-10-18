# Epic List

## Epic 1: Foundation & Demo Infrastructure
**Goal:** Establish project setup, foundational UI layout, demo data pipeline, and basic health-check functionality to validate the full development-to-deployment workflow.

**Deliverables:**
- React + TypeScript + Vite project initialized with Tailwind + Shadcn/ui
- Demo data files created and loading successfully (50-100 agents, schedules, CvD forecast, compliance rules)
- Basic app shell (header, navigation, layout structure)
- Simple "health check" view displaying loaded agent count and data validation status
- Deployed to Vercel with working live URL
- Unit test framework (Vitest) configured with sample test

**Value:** Proves end-to-end pipeline (code → build → deploy) works; establishes technical foundation for all subsequent features; de-risks tooling and infrastructure decisions early.

---

## Epic 2: CvD Heatmap & Coverage Intelligence
**Goal:** Deliver the core differentiation feature—interactive Capacity vs Demand heatmap showing service level risk visualization with drill-down capabilities.

**Deliverables:**
- CvD heatmap component (15-min intervals x 7 days, color-coded red/yellow/green)
- Coverage calculation logic (agents vs. forecasted demand)
- Hover tooltips showing quick stats (coverage %, agents, demand)
- Click interaction opening detail modal (agents scheduled, skills breakdown, forecasted volume)
- Real-time heatmap updates when schedule changes
- Unit tests for coverage calculator

**Value:** Showcases primary product differentiation ("no competitor offers CvD-integrated scheduling"); provides visual "wow factor" for demos; establishes intelligent data layer.

---

## Epic 3: Calendar UI & Schedule Management
**Goal:** Enable users to view, add, and manage agent schedules through an Outlook-style calendar interface with filtered/contextual views.

**Deliverables:**
- Calendar grid component (time x agents/days) with view mode switcher (summary/filtered/individual)
- Activity blocks rendering (color-coded: shifts, breaks, lunches, meetings, training, off-phone)
- Agent side panel (list, multi-select, search/filter by name or skill)
- Click-to-add functionality (modal for creating meetings/activities)
- Drag-and-drop interactions for moving activities
- Filtered/focused views (top N by availability, skill groups, selected subset)
- Integration: Calendar updates trigger heatmap recalculation

**Value:** Provides core scheduling workflow; demonstrates intelligent focus (filtered views) vs. mass visibility; enables interactive demo scenarios.

---

## Epic 4: Smart Scheduling with IOI Scoring
**Goal:** Implement intelligent slot recommendation engine using multi-factor IOI scoring with break adjustment capabilities.

**Deliverables:**
- IOI scoring algorithm (CvD safety 0-30, availability 0-25, compliance 0-25, fairness 0-20)
- Smart Search modal workflow (input parameters → ranked recommendations → selection)
- Dynamic agent selection (system proposes optimal agents based on IOI)
- Top 5 slot display with score breakdowns (expandable factor contributions)
- Break adjustment logic (propose compliant break moves when no clean slots exist)
- Before/after schedule comparison UI for break adjustments
- Unit tests for IOI calculator, break adjuster, conflict detector
- Integration: Selected slot updates calendar and heatmap

**Value:** Delivers core "intelligent scheduling" value proposition; demonstrates explainable AI (IOI breakdowns); proves compliance-aware optimization works.

---

## Epic 5: Audit Trail & Transparency Features
**Goal:** Provide accountability and decision traceability through comprehensive audit logging and human-centered agent notification previews.

**Deliverables:**
- Audit log component (event table with timestamp, user, action, affected agents, IOI scores, coverage impact)
- Filters (date range, user, action type, agent search)
- CSV export functionality
- Agent notification preview panel (3-4 example cards showing human-centered communication)
- Agent history view (past schedule changes table)
- Integration: All scheduling actions append to audit log automatically

**Value:** Demonstrates accountability and transparency ("why did coverage drop?"); showcases human-centered design for agent experience; completes the decision justification narrative.

---

## Epic 6: Polish, Error Handling & Demo Readiness
**Goal:** Achieve professional demo quality through error handling, accessibility validation, performance optimization, and demo-specific features.

**Deliverables:**
- Error handling (graceful degradation for missing files, malformed data, invalid inputs)
- Loading states and empty states for all views
- Reset/demo mode button (FR23)
- Version info display (FR25)
- Accessibility validation (Lighthouse + Axe audits, keyboard nav verification)
- Performance validation (< 2s load, < 200ms interactions, < 500ms IOI calc)
- Cross-browser testing (Chrome, Firefox, Safari)
- Responsive layout verification (desktop, laptop, tablet)
- Demo script and walkthrough documentation
- README with setup instructions and live demo link

**Value:** Ensures demo stability ("no white screen of death"); validates WCAG compliance (NFR11); provides professional polish that separates "prototype" from "quality demo"; enables repeatable demo presentations.

---
