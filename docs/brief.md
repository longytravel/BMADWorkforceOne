# Project Brief: Intelligent WFM Scheduling Demo

**Document Version:** 2.0
**Date:** October 18, 2025
**Status:** Demo/Proof-of-Concept Project
**Author:** Business Analyst (Mary)

---

## 🎯 Project Type: DEMO / PROOF-OF-CONCEPT

**This is a demonstration project to showcase:**
- Intelligent scheduling concepts (IOI scoring, CvD awareness, break optimization)
- BMAD™ methodology and analysis framework capabilities
- High-quality product thinking and technical execution

**This is NOT:**
- A production application requiring integrations, authentication, or infrastructure
- A commercial product with customers, pricing, or go-to-market plans
- A funded startup requiring business plans or financial projections

**Audience:** Small group viewing (portfolio showcase, concept demonstration, methodology example)

**Deployment:** Local development or free hosting (Vercel/Netlify) - zero cost constraint

---

## Executive Summary

**Product Concept:**
An intelligent scheduling assistant for contact centers that visualizes service level risk (Capacity vs Demand heatmap), ranks meeting time slots using multi-factor IOI scoring (0-100), and automatically optimizes break schedules to create feasible meeting windows.

**Core Demonstration Features:**
1. **CvD Heatmap** - Color-coded calendar grid showing service level risk by 15-min interval
2. **IOI Scoring** - Explainable 0-100 score ranking time slots by quality (service safety, availability, compliance, fairness)
3. **Smart Scheduling** - Intelligent break adjustment to create meeting slots when none exist naturally
4. **Slick Calendar UI** - Outlook-style schedule interface for viewing/editing agent schedules and off-phone activities
5. **Agent Notification Preview** - Mockup of human-centered notifications
6. **Audit Trail** - Event log showing all scheduling decisions

**Technical Approach:**
- Single-page React app with TypeScript (professional, slick UI)
- All intelligence runs client-side (no backend required)
- Demo data loaded from JSON/CSV (realistic contact center schedules)
- Deploy free on Vercel or run locally

**Success Criteria:**
- Visually impressive and professional (not "prototype" feel)
- Demonstrates intelligent scheduling concepts clearly
- Interactive and responsive (feels like real software)
- Runs on any modern browser without installation

---

## Problem Statement

### The Scheduling Challenge in Contact Centers

**For WFM Planners:**
- Finding a 1-hour meeting slot for 10 agents takes 30-45 minutes of manual calendar checking
- No visibility into whether approving a meeting will breach service level agreements (SLAs)
- Break/lunch policies must be validated manually using spreadsheets
- Scheduling conflicts discovered after booking, requiring rework

**For Contact Center Agents:**
- Schedule changes feel administrative and disrespectful
- No explanation for WHY they were selected for shifts/meetings
- Perceived unfairness in how disruptions are distributed

**For Operations Managers:**
- Can't explain post-mortem why service levels dropped during meetings/training
- Decisions not documented—accountability gaps across systems

### Why Existing WFM Tools Fall Short

**Enterprise WFM Platforms (NICE, Verint, Calabrio):**
- Capacity vs Demand (CvD) data exists in reports but NOT integrated into scheduling workflow
- No AI-driven slot recommendations or explainable scoring
- Meeting scheduling unchanged in 10+ years (calendar-based, manual selection)
- No intelligent break adjustment logic

**Generic Scheduling Tools (Calendly, Microsoft Bookings):**
- No contact center domain knowledge (CvD, adherence rules, service level impact)
- Can't optimize breaks or enforce labor compliance
- Lack operational accountability (audit trails, decision rationale)

### The Opportunity

**Feature Gap:** Zero competitors offer CvD-integrated intelligent scheduling with explainable IOI scoring

**This demo proves:** Intelligent scheduling is technically feasible and visually compelling—a differentiated concept worth pursuing.

---

## Proposed Solution

### Core Concept

An intelligent layer that:
1. **Visualizes service level risk** through interactive CvD heatmap
2. **Quantifies time slot quality** using multi-factor IOI scoring (0-100)
3. **Optimizes schedules automatically** by adjusting breaks within compliance rules to create meeting windows
4. **Provides transparency** through explainable recommendations and complete audit trails

### Key Differentiators

#### 1. **Live CvD Heatmap**
Interactive heat-mapped calendar showing Capacity vs Demand by 15-minute interval:
- **Red:** <90% capacity (SLA risk)
- **Yellow:** 90-105% capacity (tight)
- **Green:** >105% capacity (safe)

Click any cell → see details (agents scheduled, forecasted demand, coverage %, skills)

#### 2. **Intelligent Opportunity Index (IOI) Scoring**
Multi-factor 0-100 algorithm ranking time slots:
- **CvD Safety** (30 pts): Protects service levels
- **Availability Density** (25 pts): How many agents are free
- **Compliance Integrity** (25 pts): Meets break/lunch policies
- **Basic Fairness** (20 pts): Distributes disruption evenly

Visual breakdown: "IOI 85/100: CvD Safety (30), Availability (22), Compliance (25), Fairness (8)"

#### 3. **Intelligent Break Adjustment**
If no perfect slot exists, system proposes moving breaks/lunches within policy limits:
- Example: "No clean slot found. Adjusted Agent A's lunch +30 min (12:00→12:30) to create meeting window. Compliance: ✓"
- All adjustments respect break spacing rules (min 2 hrs between breaks, max 5 hrs without break)
- Visual before/after comparison showing schedule changes

#### 4. **Slick Outlook-Style Calendar Interface**
Professional schedule management UI:
- **Week view:** See all agents' schedules in grid format (like Outlook calendar)
- **Drag-and-drop:** Add meetings, training, off-phone activities
- **Color-coding:** Different activity types (meetings, breaks, lunches, training, off-phone)
- **Zoom levels:** View by day, week, or multi-week
- **Agent panel:** Click agent → see their full schedule with all activities
- **Real-time updates:** CvD heatmap updates as you add/remove activities

#### 5. **Human-Centered Agent Notifications (Preview)**
UI mockup demonstrating respectful communication:
- **What:** "Your 1-2-1 with Sarah needs to move"
- **Why:** "To accommodate team training that protects service levels"
- **Who:** "Requested by Team Lead: Sarah"
- **Impact:** "Your lunch will shift +30 min (12:30→1:00 PM) to maintain compliance"
- **Context:** "You were selected because: Available, high IOI score (85/100), fair rotation"

#### 6. **Audit Trail**
Complete event log for accountability:
- Timestamp, user, action, affected agents, IOI scores, decision rationale
- Coverage impact: CvD % before/after
- CSV export for reporting

---

## Demo Features & Specifications

### Feature 1: CvD Heatmap Visualization

**Description:**
Color-coded calendar grid showing service level risk across the week.

**UI Specifications:**
- **Layout:** Grid with time intervals (rows) x days (columns)
- **Granularity:** 15-minute intervals, 7-day week view
- **Color Coding:**
  - Red background: <90% capacity (immediate SLA risk)
  - Yellow background: 90-105% capacity (tight, watch closely)
  - Green background: >105% capacity (safe buffer)
- **Interactions:**
  - Hover: Show tooltip with quick stats (coverage %, agents, demand)
  - Click cell: Open detailed popup (agents scheduled, skills breakdown, forecasted volume)
- **Demo Data:** 50-100 sample agents, realistic call volume patterns (peaks at 10am-12pm, 2pm-4pm)

**Technical Approach:**
- React component with Recharts or custom SVG
- Calculate coverage % from schedule data + forecasted demand (both in JSON)
- Update in real-time as user adds/removes activities

**Acceptance Criteria:**
- Loads in <2 seconds
- Color-coding accurate (matches calculated coverage %)
- Click interaction shows detailed breakdown
- Mobile-responsive (works on tablet for demo purposes)

---

### Feature 2: IOI Scoring Algorithm

**Description:**
Multi-factor 0-100 score ranking available time slots by quality.

**Scoring Formula:**
```
IOI Score = CvD Safety (0-30) + Availability (0-25) + Compliance (0-25) + Fairness (0-20)
```

**Factor Calculations:**
1. **CvD Safety (0-30 pts):**
   - Green slot (>105% capacity) = 30 pts
   - Yellow slot (90-105%) = 15 pts
   - Red slot (<90%) = 0 pts

2. **Availability Density (0-25 pts):**
   - All required agents free = 25 pts
   - 75% free = 18 pts
   - 50% free = 12 pts
   - <50% free = 0-10 pts (proportional)

3. **Compliance Integrity (0-25 pts):**
   - All break rules satisfied = 25 pts
   - Any violation (break spacing, max hours without break) = 0 pts

4. **Basic Fairness (0-20 pts):**
   - Agent not selected recently (>7 days ago) = 20 pts
   - Selected recently (1-7 days ago) = 10 pts
   - Selected very recently (<24 hrs ago) = 5 pts

**UI Display:**
- Show top 5 ranked slots with scores
- Visual badges: "IOI 92/100" with color (green >80, yellow 60-80, red <60)
- Expandable breakdown: Click to see factor contributions
- Side-by-side comparison of multiple slots

**Technical Approach:**
- Pure JavaScript function: `calculateIOI(slot, agents, schedule, rules) → number`
- Runs client-side for all candidate slots
- Results cached and updated when schedule changes

**Acceptance Criteria:**
- Scores calculate instantly (<500ms for 50+ slots)
- Factor breakdown is explainable (can manually verify math)
- Slots with compliance violations always score 0 (automatic disqualification)

---

### Feature 3: Slick Calendar UI (Outlook-Style)

**Description:**
Professional, interactive schedule management interface for viewing all agent schedules and adding off-phone activities.

**UI Components:**

#### **Main Calendar Grid:**
- **Layout:** Time-of-day (rows) x Agents (columns) OR Days (columns) with expandable agent rows
- **Time Scale:** 15-minute intervals, 7am-7pm workday view
- **Activity Blocks:** Colored rectangles for each scheduled item
  - **Blue:** Regular shift time (on-phone)
  - **Orange:** Breaks (short)
  - **Purple:** Lunch
  - **Green:** Meetings (scheduled by planner)
  - **Teal:** Training sessions
  - **Yellow:** Other off-phone activities (1-2-1s, admin time)

#### **Activity Types & Icons:**
- 🍽️ Lunch (30-60 min)
- ☕ Break (15 min)
- 👥 Team Meeting
- 📚 Training Session
- 💬 1-2-1 Coaching
- 📊 Admin/Off-Phone

#### **Interaction Features:**
- **Drag-and-Drop:** Drag activity blocks to move times
- **Click-to-Add:** Click empty cell → modal opens → select activity type, duration, attendees
- **Resize:** Drag edges of blocks to adjust duration
- **Multi-Select:** Click agents to include in meeting (highlight selected rows)
- **Filter View:** Toggle activity types on/off (hide breaks, show only meetings)
- **Zoom Controls:** Day view / Week view / Multi-week view

#### **Side Panel:**
- **Agent List:** Scrollable list of all agents (50-100)
  - Avatar + Name + Skills tags
  - Click agent → highlight their schedule row
  - Multi-select checkbox for meeting invites
- **Search/Filter:** Find agents by name or skill

#### **Top Bar:**
- **Date Picker:** Navigate to different weeks
- **Add Activity Button:** Quick-add meeting/training (opens modal)
- **IOI Search Button:** Opens smart scheduling search (Feature 4)
- **Export Button:** Download schedule as CSV

**Technical Approach:**
- React component library: FullCalendar or custom with React DnD (Drag-and-Drop)
- Alternative: Big Calendar library (open-source, Outlook-like)
- State management: Zustand or Context API (track all activities, agent schedules)
- Modal components: Radix UI or Headless UI for activity creation

**Acceptance Criteria:**
- Professional aesthetic (looks like Outlook/Google Calendar quality)
- Smooth drag-and-drop (no jank, <50ms response)
- Intuitive controls (user can figure out without tutorial)
- Responsive to demo dataset (50-100 agents load quickly)

**Demo Workflow:**
1. User sees full week calendar with all agents' schedules
2. User clicks "Add Meeting" → modal opens
3. User selects agents, duration, date range
4. User clicks "Find Best Time" → IOI scoring runs (Feature 4)
5. User selects recommended slot → meeting appears on calendar
6. CvD heatmap updates → coverage % recalculated
7. Audit log records decision

---

### Feature 4: Smart Scheduling Workflow with Break Adjustment

**Description:**
End-to-end intelligent scheduling that recommends optimal slots AND adjusts breaks if needed.

**UI Flow:**

#### **Step 1: Search Input**
Modal with fields:
- **Meeting Title:** Text input
- **Duration:** Dropdown (15 min, 30 min, 1 hr, 2 hrs)
- **Attendees:** Multi-select from agent list (with skills filter)
- **Date Range:** "Next 3 days" or "Next week" or custom
- **Priority:** Optional (Low / Medium / High affects break adjustment aggressiveness)

#### **Step 2: IOI Results Display**
Show top 5 ranked slots in card format:

```
┌─────────────────────────────────────┐
│ Slot 1: Tuesday 2:00-3:00 PM       │
│ IOI Score: 92/100 ⭐                │
│                                     │
│ ✅ CvD Safety: 30/30 (Green zone)  │
│ ✅ Availability: 25/25 (All free)  │
│ ✅ Compliance: 25/25 (No violations)│
│ ✅ Fairness: 12/20 (Recent activity)│
│                                     │
│ Coverage: 112% → 98% (safe buffer) │
│                                     │
│ [Select This Slot] button          │
└─────────────────────────────────────┘
```

#### **Step 3: Break Adjustment (If Needed)**
If no "perfect" slot found (all slots have conflicts), system proposes:

```
⚠️ No conflict-free slots available.

Intelligent Break Adjustment Option:
┌────────────────────────────────────┐
│ Create slot: Tuesday 2:00-3:00 PM │
│ by adjusting breaks:               │
│                                    │
│ • Agent Sarah: Lunch 12:00→12:30  │
│ • Agent Mike: Break 2:15→2:45     │
│                                    │
│ ✅ All adjustments comply with:   │
│    - 2hr minimum between breaks   │
│    - 5hr max without break        │
│    - 30min lunch duration         │
│                                    │
│ IOI Score: 78/100                 │
│ (Lower due to break moves)        │
│                                    │
│ [Accept Adjustment] [Find Another]│
└────────────────────────────────────┘
```

#### **Step 4: Confirmation**
After selection:
- Meeting appears on calendar (all attendees)
- CvD heatmap updates (recalculate coverage)
- Audit log records decision
- Success message: "Meeting booked for Tuesday 2:00-3:00 PM. 8/10 agents confirmed. Coverage protected: IOI 92/100."

**Technical Approach:**
- Search algorithm:
  1. Generate all possible time slots in date range
  2. For each slot, check agent availability (scan schedule data)
  3. Calculate IOI score for each candidate
  4. Sort by score descending
  5. Return top 5
- Break adjustment algorithm:
  1. If all slots have conflicts, iterate through slots
  2. For each conflict, check if break can be moved within rules
  3. Calculate "adjustment cost" (how much disruption)
  4. Propose lowest-cost adjustment option
  5. Recalculate IOI after adjustment

**Acceptance Criteria:**
- Search returns results in <2 seconds (for 50-100 agents)
- IOI breakdown is visible and understandable
- Break adjustments respect all compliance rules (no invalid proposals)
- Visual diff shows before/after schedules clearly

---

### Feature 5: Agent Notification Preview (UI Only)

**Description:**
Mockup demonstrating human-centered notification design (no actual delivery in demo).

**UI Display:**
Side panel or modal showing example notification:

```
┌─────────────────────────────────────────┐
│ 📅 Schedule Update for Sarah Johnson    │
├─────────────────────────────────────────┤
│                                          │
│ Your 1-2-1 with Team Lead Sarah needs   │
│ to move to accommodate team training.    │
│                                          │
│ 📍 New Time: Tuesday, Oct 24 @ 2:00 PM  │
│ 👤 Requested by: Sarah (Team Lead)       │
│                                          │
│ 🔄 Impact on Your Schedule:             │
│   • Your lunch will shift:              │
│     12:00 PM → 12:30 PM (+30 min)       │
│   • Compliance: ✅ All rules satisfied  │
│                                          │
│ ℹ️ Why You?                              │
│   You were selected because:            │
│   • You're available at this time       │
│   • High IOI score (85/100)             │
│   • Fair rotation (not selected recently)│
│                                          │
│ [View Full Schedule] [Contact Manager]  │
└─────────────────────────────────────────┘
```

**Agent History View:**
Table showing past schedule changes:
| Date | Change | Requested By | Reason | IOI Score |
|------|--------|--------------|--------|-----------|
| Oct 24 | 1-2-1 moved to 2pm | Sarah | Team training | 85/100 |
| Oct 18 | Break adjusted +15min | System | Compliance | 92/100 |
| Oct 12 | Meeting added | John | Project sync | 78/100 |

**Technical Approach:**
- Static React component (not functional, just mockup)
- Shows 3-4 example notifications in demo
- Agent history view pulls from audit log data

**Acceptance Criteria:**
- Professional design (looks like real notification)
- Tone is respectful and explanatory
- All key context visible (what, why, who, impact)

---

### Feature 6: Audit Trail

**Description:**
Event log showing all scheduling decisions for accountability.

**UI Display:**
Table with columns:
| Timestamp | User | Action | Affected Agents | IOI Score | Coverage Impact | Details |
|-----------|------|--------|-----------------|-----------|-----------------|---------|
| Oct 24 10:45 AM | John (Planner) | Team Meeting Added | Sarah, Mike, Lisa (8 agents) | 92/100 | 112% → 98% | Tuesday 2-3pm, Training session |
| Oct 24 10:43 AM | System | Break Adjusted | Sarah | — | — | Lunch moved +30min for meeting space |
| Oct 23 3:15 PM | Sarah (Team Lead) | 1-2-1 Scheduled | John | 78/100 | 105% → 102% | Wednesday 11am |

**Filters:**
- Date range picker
- User dropdown (All / Planners / Team Leads / System)
- Action type (All / Meetings / Breaks / Training)
- Agent search

**Export Button:** Download filtered results as CSV

**Technical Approach:**
- Array of log events stored in state
- Every scheduling action appends to log
- React Table or Tanstack Table for sortable/filterable display
- CSV export via simple JavaScript function

**Acceptance Criteria:**
- All demo actions logged with full context
- Filters work correctly
- CSV export includes all fields
- Use case validated: "Why did coverage drop Tuesday 2-3 PM?"
  → User filters to Oct 24, 2-3pm → sees "Team training removed 6 agents, IOI 92/100, coverage 112%→98%"

---

## Technical Architecture

### Technology Stack (FREE & Professional)

**Frontend Framework:**
- **React 18+** with TypeScript (industry standard, professional)
- **Vite** as build tool (fast dev experience, optimized builds)

**UI Component Library:**
- **Tailwind CSS** for styling (modern, no custom CSS needed)
- **Shadcn/ui** for components (free, beautiful, accessible)
- **Recharts or Nivo** for CvD heatmap visualization
- **FullCalendar** or **React Big Calendar** for schedule UI (open-source, Outlook-like)
- **React DnD** for drag-and-drop interactions

**State Management:**
- **Zustand** or React Context API (lightweight, no Redux complexity)

**Data:**
- **JSON/CSV files** bundled in `/src/data/` folder
  - `agents.json` - 50-100 sample agents (names, skills, shifts)
  - `schedules.json` - Weekly schedules (shifts, breaks, lunches, activities)
  - `cvd-forecast.json` - Forecasted demand by 15-min interval
  - `compliance-rules.json` - Break spacing rules, labor laws

**Hosting (FREE Options):**
- **Vercel** (recommended) - auto-deploy from GitHub, free tier, fast CDN
- **Netlify** - alternative free hosting
- **GitHub Pages** - simplest but slower
- **Local** - `npm run dev` for demos on your machine

---

### Project Structure

```
/wfm-intelligence-demo
  /src
    /components
      /Calendar          (Outlook-style schedule UI)
      /CvDHeatmap        (color-coded heatmap grid)
      /IOIScoreCard      (score breakdown display)
      /ScheduleSearch    (smart search modal)
      /AuditLog          (event log table)
      /AgentNotification (notification preview mockup)
      /ui                (Shadcn components: buttons, modals, cards)
    /data
      agents.json        (50-100 sample agents)
      schedules.json     (weekly schedule data)
      cvd-forecast.json  (demand forecast)
      compliance-rules.json (break rules)
    /logic
      ioiCalculator.ts   (IOI scoring function)
      breakAdjuster.ts   (intelligent break optimizer)
      conflictDetector.ts (schedule conflict validator)
      coverageCalculator.ts (CvD % calculation)
    /utils
      dateHelpers.ts     (date/time formatting)
      csvExport.ts       (audit log export)
    /types
      index.ts           (TypeScript types for agents, schedules, activities)
    App.tsx              (main application)
    main.tsx             (entry point)
  /public
    demo-data/           (CSV files if needed)
  package.json
  vite.config.ts
  tailwind.config.js
  tsconfig.json
  README.md              (setup instructions)
```

---

### Data Models

#### Agent
```typescript
interface Agent {
  id: string;
  name: string;
  skills: string[]; // ["Phone Support", "Technical", "Spanish"]
  shift: {
    start: string; // "08:00"
    end: string;   // "17:00"
    breaks: Break[];
    lunch: Break;
  };
}
```

#### Schedule Activity
```typescript
interface Activity {
  id: string;
  type: "shift" | "break" | "lunch" | "meeting" | "training" | "admin";
  agentIds: string[];
  startTime: Date;
  endTime: Date;
  title?: string;
  requestedBy?: string;
  ioiScore?: number;
}
```

#### CvD Data Point
```typescript
interface CvDDataPoint {
  timestamp: Date; // 15-min interval
  forecastedDemand: number; // calls expected
  scheduledAgents: number; // agents on-phone
  coveragePercent: number; // (agents / demand) * 100
  riskLevel: "green" | "yellow" | "red";
}
```

#### IOI Calculation Result
```typescript
interface IOIResult {
  slot: { start: Date; end: Date };
  totalScore: number; // 0-100
  breakdown: {
    cvdSafety: number; // 0-30
    availability: number; // 0-25
    compliance: number; // 0-25
    fairness: number; // 0-20
  };
  adjustmentsNeeded?: BreakAdjustment[];
}
```

---

### Key Algorithms (Client-Side Logic)

#### 1. IOI Scoring Function
```typescript
function calculateIOI(
  slot: TimeSlot,
  agents: Agent[],
  schedule: Activity[],
  rules: ComplianceRules
): IOIResult {
  // 1. CvD Safety (0-30)
  const coverage = calculateCoverage(slot, schedule);
  const cvdSafety = coverage > 105 ? 30 : coverage > 90 ? 15 : 0;

  // 2. Availability (0-25)
  const available = agents.filter(a => isAvailable(a, slot, schedule));
  const availability = (available.length / agents.length) * 25;

  // 3. Compliance (0-25)
  const compliant = checkCompliance(slot, agents, schedule, rules);
  const compliance = compliant ? 25 : 0;

  // 4. Fairness (0-20)
  const recentSelections = getRecentActivity(agents, schedule);
  const fairness = calculateFairness(agents, recentSelections);

  return {
    slot,
    totalScore: cvdSafety + availability + compliance + fairness,
    breakdown: { cvdSafety, availability, compliance, fairness }
  };
}
```

#### 2. Break Adjustment Logic
```typescript
function adjustBreaksForSlot(
  slot: TimeSlot,
  agents: Agent[],
  schedule: Activity[],
  rules: ComplianceRules
): BreakAdjustment[] {
  const adjustments: BreakAdjustment[] = [];

  for (const agent of agents) {
    const conflict = findConflict(agent, slot, schedule);
    if (!conflict) continue;

    // Try moving break earlier or later
    const moveOptions = [
      { direction: "earlier", amount: 15 },
      { direction: "earlier", amount: 30 },
      { direction: "later", amount: 15 },
      { direction: "later", amount: 30 }
    ];

    for (const option of moveOptions) {
      const newBreakTime = moveBreak(conflict, option);
      if (meetsCompliance(agent, newBreakTime, rules)) {
        adjustments.push({ agent, from: conflict, to: newBreakTime });
        break;
      }
    }
  }

  return adjustments;
}
```

#### 3. Coverage Calculation
```typescript
function calculateCoverage(
  slot: TimeSlot,
  schedule: Activity[],
  forecast: CvDDataPoint[]
): number {
  const onPhoneAgents = countOnPhoneAgents(slot, schedule);
  const demandAtTime = getDemand(slot, forecast);
  return (onPhoneAgents / demandAtTime) * 100;
}
```

---

## Demo Success Criteria

**Visual Quality:**
- ✅ Professional UI (looks like real enterprise software, not "prototype")
- ✅ Smooth interactions (<200ms response, no jank)
- ✅ Impressive first impression ("Wow, this looks polished")

**Functional Completeness:**
- ✅ All 6 core features working interactively
- ✅ Demo data is realistic (contact center schedules, believable call patterns)
- ✅ IOI scoring logic is explainable (can walk through calculations)
- ✅ Break adjustment respects compliance rules (no invalid proposals)

**Demonstration Flow:**
- ✅ Can run full demo in 5-10 minutes
- ✅ Clear narrative: "Here's the problem → Here's our intelligent solution"
- ✅ Interactive elements work reliably (no crashes during demos)

**Technical Quality:**
- ✅ Code is clean and well-organized
- ✅ TypeScript types prevent bugs
- ✅ Runs on any modern browser without setup
- ✅ Can be deployed/shared easily (Vercel link or local setup <5 min)

**Documentation Quality:**
- ✅ README with setup instructions
- ✅ Code comments explain algorithms
- ✅ This brief serves as comprehensive project reference

---

## Development Plan

### Phase 1: Setup & Foundation (Week 1)

**Tasks:**
1. **Initialize Project**
   - Create React + TypeScript + Vite project
   - Install dependencies (Tailwind, Shadcn, Recharts, date-fns)
   - Set up project structure (folders, routing)

2. **Create Demo Data**
   - Generate 50-100 sample agents (realistic names, skills, shifts)
   - Create weekly schedule data (shifts, breaks, lunches)
   - Generate CvD forecast (realistic call patterns: peaks at 10am-12pm, 2pm-4pm)
   - Define compliance rules (break spacing, labor laws)

3. **Build Foundation Components**
   - Layout shell (header, sidebar, main content)
   - Navigation structure
   - Basic styling (colors, typography, spacing)

**Deliverables:**
- Project compiles and runs (`npm run dev`)
- Demo data loaded successfully
- Basic UI layout visible

---

### Phase 2: CvD Heatmap & Calendar UI (Week 2)

**Tasks:**
1. **Build CvD Heatmap Component**
   - Grid layout (15-min intervals x 7 days)
   - Calculate coverage % from schedule + forecast data
   - Color-code cells (red/yellow/green)
   - Add hover tooltips and click interactions
   - Make responsive (desktop + tablet)

2. **Build Outlook-Style Calendar Component**
   - Week grid layout (time x agents OR time x days)
   - Render activity blocks (color-coded by type)
   - Add click-to-add functionality (modal opens)
   - Implement drag-and-drop (move activities)
   - Add agent side panel (list + multi-select)

**Deliverables:**
- CvD heatmap displays correctly with demo data
- Calendar shows all agents' schedules
- Can add/move activities interactively

---

### Phase 3: IOI Scoring & Smart Search (Week 3)

**Tasks:**
1. **Implement IOI Calculation Logic**
   - Write `calculateIOI()` function (TypeScript)
   - Implement 4 factor calculations (CvD, availability, compliance, fairness)
   - Write unit tests (verify scoring logic)

2. **Build Smart Search Modal**
   - Input form (title, duration, attendees, date range)
   - "Find Best Time" button triggers IOI search
   - Display top 5 ranked slots with score breakdowns
   - Show expandable factor contributions

3. **Implement Break Adjustment Algorithm**
   - Write `adjustBreaksForSlot()` function
   - Detect conflicts (overlap with existing activities)
   - Propose break moves within compliance rules
   - Display before/after comparison UI

**Deliverables:**
- IOI scoring works correctly (manually verified)
- Smart search returns ranked recommendations
- Break adjustment proposes valid solutions

---

### Phase 4: Notifications, Audit Log, Polish (Week 4)

**Tasks:**
1. **Build Agent Notification Preview**
   - Design notification card component
   - Create 3-4 example notifications (different scenarios)
   - Build agent history view (table of past changes)

2. **Build Audit Log Component**
   - Event log table (timestamp, user, action, impact)
   - Add filters (date, user, action type)
   - Implement CSV export function

3. **Polish & Refinement**
   - Add loading states, empty states, error handling
   - Improve visual consistency (spacing, colors, typography)
   - Test on different browsers (Chrome, Firefox, Safari)
   - Optimize performance (ensure <2 sec load time)
   - Write README with setup instructions

**Deliverables:**
- All 6 features complete and interactive
- Demo runs smoothly without bugs
- Professional visual quality throughout

---

### Phase 5: Deployment & Demo Prep (Week 5)

**Tasks:**
1. **Deploy to Vercel**
   - Connect GitHub repository to Vercel
   - Configure build settings
   - Test deployed version
   - Set up custom domain (optional: demo.yourproduct.com)

2. **Create Demo Script**
   - Write 5-10 minute demo flow
   - Prepare talking points for each feature
   - Practice running through demo smoothly

3. **Documentation**
   - Update README with live demo link
   - Document demo data sources and assumptions
   - Add screenshots to README

**Deliverables:**
- Live demo URL (Vercel)
- Demo script and talking points
- Comprehensive README

---

## Appendices

### A. Research Summary

This demo is informed by extensive market research and brainstorming:

**Key Findings from Research:**
- **Feature Gap Validated:** No WFM competitor offers CvD-integrated intelligent scheduling with IOI scoring
- **Pain Points Confirmed:** Planners waste 5-10 hrs/week on manual scheduling, no service level visibility
- **Differentiation Opportunities:** Explainable AI (IOI scores), human-centered agent experience, break optimization
- **Technical Feasibility:** All intelligence can be implemented as deterministic algorithms (no ML required for demo)

**Source Documents:**
- [Brainstorming Session Results](brainstorming-session-results.md) - 47+ concepts, stakeholder perspectives
- [Market Research Report](market-research.md) - Competitive analysis, market sizing, strategic recommendations
- [Customer Interview Guide](customer-interview-guide.md) - Validation framework for future customer discovery

---

### B. Design Inspiration & References

**Calendar/Schedule UIs:**
- Outlook Calendar (week view, drag-and-drop)
- Google Calendar (clean aesthetic, color-coding)
- Calendly (modern, user-friendly booking experience)
- Notion Calendar (beautiful visual design)

**Heatmap Examples:**
- GitHub contribution heatmap (color intensity, hover details)
- Google Analytics heatmaps (time-series visualization)
- Tableau dashboards (professional data visualization)

**Component Libraries:**
- Shadcn/ui: https://ui.shadcn.com/ (beautiful, accessible components)
- FullCalendar: https://fullcalendar.io/ (feature-rich calendar library)
- React Big Calendar: https://github.com/jquense/react-big-calendar (Outlook-like)

---

### C. Future Enhancements (Post-Demo)

If this demo generates interest, potential production features include:

**Production Engineering:**
- Real WFM platform integrations (NICE, Calabrio, Verint APIs)
- Backend API (Node.js/Python) with PostgreSQL database
- Authentication (OAuth2, SSO)
- Real-time data sync (WebSocket/polling)

**Advanced Intelligence:**
- Adaptive learning (ML models tune IOI weights over time)
- Proactive scheduling (pattern recognition suggests meetings before requested)
- Predictive alerts ("Tomorrow's 11am slot trending red if one more session added")

**Enterprise Features:**
- Role-based access control (Planner, Team Lead, Agent, Admin)
- Advanced audit capabilities (forensic timeline, immutable logs)
- SOC 2 compliance preparation
- Multi-tenant architecture (BPO customers)

**Adjacent Markets:**
- Healthcare shift scheduling (nurse staffing, patient acuity)
- Retail workforce management (store scheduling, peak seasons)
- Field service optimization (technician dispatch, coverage)

---

### D. Technical Setup Guide

**Prerequisites:**
- Node.js 18+ installed
- Code editor (VS Code recommended)
- Git

**Setup Steps:**
```bash
# 1. Initialize project
npm create vite@latest wfm-demo -- --template react-ts
cd wfm-demo

# 2. Install dependencies
npm install
npm install -D tailwindcss postcss autoprefixer
npm install @tanstack/react-table date-fns recharts zustand
npm install react-big-calendar  # or fullcalendar

# 3. Initialize Tailwind
npx tailwindcss init -p

# 4. Install Shadcn
npx shadcn-ui@latest init

# 5. Add Shadcn components
npx shadcn-ui@latest add button card dialog table

# 6. Run dev server
npm run dev
```

**Project Available at:** `http://localhost:5173`

**Deploy to Vercel:**
```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main

# 2. Connect to Vercel
# Go to vercel.com → Import Project → Select GitHub repo
# Auto-deploy on every push
```

---

## Next Steps

**Immediate Actions:**
1. ✅ Review this brief - ensure all requirements clear
2. ⬜ Set up development environment (React + TypeScript + Vite)
3. ⬜ Create demo data (50-100 agents, weekly schedules, CvD forecast)
4. ⬜ Start Phase 1 development (foundation + setup)

**Development Phases:**
- **Week 1:** Setup & foundation + demo data
- **Week 2:** CvD heatmap + calendar UI
- **Week 3:** IOI scoring + smart search
- **Week 4:** Notifications, audit log, polish
- **Week 5:** Deploy + demo prep

**Target Completion:** 5 weeks from start

**Demo Readiness:** Professional, interactive, impressive proof-of-concept showcasing intelligent WFM scheduling concepts

---

*Document Created: October 18, 2025*
*Framework: BMAD™ Core*
*Analyst: Mary*
*Project Type: Demo/Proof-of-Concept*
