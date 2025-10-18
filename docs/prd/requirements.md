# Requirements

## Functional Requirements

**FR1:** The system shall display an interactive CvD (Capacity vs Demand) heatmap showing coverage percentage by 15-minute interval across a 7-day week view, with color-coding (red <90%, yellow 90-105%, green >105%).

**FR2:** The system shall provide hover tooltips on heatmap cells showing quick stats (coverage %, agents scheduled, forecasted demand).

**FR3:** The system shall open a detailed popup when a heatmap cell is clicked, displaying agents scheduled, skills breakdown, and forecasted call volume.

**FR4:** The system shall calculate an Intelligent Opportunity Index (IOI) score (0-100) for candidate time slots based on four factors: CvD Safety (0-30 pts), Availability Density (0-25 pts), Compliance Integrity (0-25 pts), and Basic Fairness (0-20 pts).

**FR5:** The system shall display top 5 ranked time slots with IOI scores and expandable factor breakdowns when users search for meeting times.

**FR6:** The system shall provide a visual Outlook-style calendar interface showing agent schedules in a grid format (time x agents or time x days).

**FR7:** The system shall display color-coded activity blocks for different types: shifts (blue), breaks (orange), lunch (purple), meetings (green), training (teal), off-phone activities (yellow).

**FR8:** The system shall allow users to add new activities via click-to-add functionality that opens a modal for selecting activity type, duration, and attendees.

**FR9:** The system shall support drag-and-drop interactions to move activity blocks to different times.

**FR10:** The system shall provide an agent side panel with scrollable list, multi-select checkboxes, and search/filter by name or skill.

**FR11:** The system shall implement a smart scheduling search workflow that accepts meeting parameters (title, duration, attendees, date range, priority) and returns IOI-ranked recommendations.

**FR12:** The system shall propose intelligent break adjustments when no conflict-free slots exist, moving breaks/lunches within compliance rules (2hr minimum between breaks, 5hr max without break, 30min lunch duration).

**FR13:** The system shall display before/after schedule comparison when break adjustments are proposed.

**FR14:** The system shall update the CvD heatmap in real-time as users add or remove activities from the calendar.

**FR15:** The system shall maintain an audit trail event log capturing timestamp, user, action, affected agents, IOI scores, coverage impact, and decision rationale.

**FR16:** The system shall provide filters on the audit log (date range, user, action type, agent search).

**FR17:** The system shall export audit log data to CSV format.

**FR18:** The system shall display agent notification preview mockups showing human-centered communication (what, why, who, impact, selection rationale).

**FR19:** The system shall show agent history view displaying past schedule changes in table format.

**FR20:** The system shall load demo data from JSON files (50-100 agents, weekly schedules, CvD forecast, compliance rules) within 2 seconds (stretch target: 1 second).

**FR21:** The system shall gracefully handle invalid inputs, missing data files, and out-of-range dates without crashing, displaying user-friendly error messages.

**FR22:** The system shall display clear loading indicators during data load and informative empty states for filtered-out views (heatmap, audit log, search results).

**FR23:** The system shall include a reset/demo mode button that restores initial demo data and state for multiple demonstration run-throughs.

**FR24:** The system shall validate demo data (JSON structure, required fields) at load time and display an error message if malformed data is detected.

**FR25:** The system shall display version information and build timestamp (e.g., "v2.0, Built Oct 2025") in the application footer or about section.

## Non-Functional Requirements

**NFR1:** The system shall run entirely client-side in modern browsers (Chrome, Firefox, Safari) without requiring backend infrastructure or external APIs.

**NFR2:** The system shall respond to user interactions (clicks, hovers, drag-and-drop) within 200ms to ensure smooth, professional feel.

**NFR3:** The system shall calculate IOI scores for 50+ candidate time slots within 500ms.

**NFR4:** The system shall be mobile-responsive and functional on tablet devices for demo purposes.

**NFR5:** The system shall maintain professional visual quality comparable to enterprise software (not prototype appearance).

**NFR6:** The system shall be deployable to free hosting platforms (Vercel, Netlify) or run locally with zero infrastructure cost.

**NFR7:** The system shall use TypeScript for type safety to prevent runtime bugs during demos.

**NFR8:** The system shall support a 5-10 minute demonstration flow without crashes or errors.

**NFR9:** The system shall ensure all break adjustment proposals comply with defined labor rules (no invalid suggestions shown to user).

**NFR10:** The system shall provide explainable IOI calculations that can be manually verified for transparency.

**NFR11:** The system shall meet basic WCAG 2.1 AA accessibility standards for color contrast and keyboard navigation where practical.

**NFR12:** The interface shall be intuitive enough for a first-time viewer to understand core functionality without a detailed walkthrough.

**NFR13:** The system shall continue running if minor computation errors occur (e.g., IOI score NaN handled with fallback values), logging errors to console for debugging.

**NFR14:** The system shall be verified on latest versions of Chrome, Firefox, and Safari, with graceful degradation on Edge.

**NFR15:** Resetting the demo state (FR23) shall complete within 1 second to support seamless live presentation flow.

## Requirements Context & Dependencies

**Data Dependencies:**
All feature components require successful loading of core demo data files before initialization:
- `agents.json` - Agent roster with skills and shifts
- `schedules.json` - Weekly schedule data (shifts, breaks, lunches, activities)
- `cvd-forecast.json` - Forecasted demand by 15-minute interval
- `compliance-rules.json` - Break spacing rules and labor constraints

**Scope Constraints:**
- No external APIs or authentication systems per demo scope
- No server-side processing or database storage
- No integration with real WFM platforms (NICE, Verint, Calabrio)
- No actual notification delivery (preview mockups only)

**Testing & Sign-Off:**
- Performance targets validated under demo data load (50-100 agents)
- Error handling scenarios include: missing files, malformed JSON, invalid date ranges, empty search results
- Accessibility validated via automated tools (Axe, Lighthouse) and manual keyboard navigation testing

---
