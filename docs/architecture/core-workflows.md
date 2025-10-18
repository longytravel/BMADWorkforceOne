# Core Workflows

Key user journeys illustrated with sequence diagrams showing component interactions.

## Application Initialization Flow

```mermaid
sequenceDiagram
    actor User
    participant Browser
    participant App
    participant DataLoader
    participant Store
    participant Heatmap
    participant Calendar

    User->>Browser: Visits demo URL
    Browser->>App: Loads React app
    App->>App: Shows loading skeleton
    App->>DataLoader: loadAllDemoData()

    par Load JSON Files in Parallel
        DataLoader->>Browser: fetch /demo-data/agents.json
        DataLoader->>Browser: fetch /demo-data/schedules.json
        DataLoader->>Browser: fetch /demo-data/cvd-forecast.json
        DataLoader->>Browser: fetch /demo-data/compliance-rules.json
    end

    Browser-->>DataLoader: Return all JSON data
    DataLoader->>DataLoader: Validate with Zod schemas

    alt Validation Success
        DataLoader-->>App: Return validated data
        App->>Store: initializeData(data)
        Store->>Store: Calculate initial CvD coverage
        Store-->>Heatmap: Trigger render with data
        Store-->>Calendar: Trigger render with data
        App->>User: Display interactive demo
    else Validation Error
        DataLoader-->>App: Throw validation error
        App->>User: Display error message + retry button
    end
```

**Performance Target:** < 2 seconds from URL load to interactive (FR20)

---

## Smart Search Workflow (IOI-Driven Slot Recommendation)

```mermaid
sequenceDiagram
    actor User
    participant UI
    participant SmartSearch
    participant Store
    participant IOIEngine
    participant BreakEngine
    participant Calendar
    participant AuditLog

    User->>UI: Clicks "Find Best Time"
    UI->>SmartSearch: Open modal
    SmartSearch->>User: Show search form

    User->>SmartSearch: Enter params (duration, skills, date range)
    SmartSearch->>Store: Get agents, activities, cvdData, rules
    Store-->>SmartSearch: Return current state

    SmartSearch->>SmartSearch: Generate candidate slots (every 15min in range)

    loop For Each Candidate Slot
        SmartSearch->>IOIEngine: calculateIOI(slot, agents, cvdData, rules)
        IOIEngine->>IOIEngine: Score CvD Safety (0-30)
        IOIEngine->>IOIEngine: Score Availability (0-25)
        IOIEngine->>IOIEngine: Score Compliance (0-25)
        IOIEngine->>IOIEngine: Score Fairness (0-20)
        IOIEngine-->>SmartSearch: Return IOIResult with total score
    end

    SmartSearch->>SmartSearch: Sort by score, take top 5
    SmartSearch->>User: Display ranked recommendations

    User->>SmartSearch: Select slot #2 (IOI: 87)
    SmartSearch->>SmartSearch: Check for conflicts

    alt No Conflicts
        SmartSearch->>Store: addActivity(newMeeting)
        Store->>Store: Update activities array
        Store->>Store: Recalculate CvD coverage
        Store->>AuditLog: Add entry (meeting-added)
        Store-->>Calendar: Trigger re-render
        SmartSearch->>User: Success + close modal
    else Conflicts Detected
        SmartSearch->>BreakEngine: proposeBreakAdjustments(agents, slot, rules)
        BreakEngine->>BreakEngine: Find moveable breaks
        BreakEngine->>BreakEngine: Validate compliance
        BreakEngine-->>SmartSearch: Return break proposals
        SmartSearch->>User: Show before/after comparison

        User->>SmartSearch: Approve adjustments
        SmartSearch->>Store: Update multiple activities (meeting + breaks)
        Store->>AuditLog: Add entries (meeting-added, break-adjusted)
        Store-->>Calendar: Trigger re-render
        SmartSearch->>User: Success + close modal
    end
```

**Performance Target:** IOI calculation for 50+ slots < 500ms (NFR3)

---

## Real-Time CvD Heatmap Update Flow

```mermaid
sequenceDiagram
    actor User
    participant Calendar
    participant Store
    participant CoverageCalc
    participant Heatmap

    User->>Calendar: Drags meeting to new time
    Calendar->>Store: updateActivity(id, { startDateTime, endDateTime })

    Store->>Store: Update activity in state (Immer)
    Store->>CoverageCalc: recalculateAllCvD(agents, activities, forecast)

    loop For Each 15-Min Interval (672 total)
        CoverageCalc->>CoverageCalc: Count available agents in interval
        CoverageCalc->>CoverageCalc: Calculate coverage %
        CoverageCalc->>CoverageCalc: Determine risk level (safe/caution/risk)
    end

    CoverageCalc-->>Store: Return updated CvDDataPoint[]
    Store->>Store: Update cvdData in state

    Store-->>Heatmap: Trigger re-render (memoized, only changed cells)
    Heatmap->>User: Visual update (color change in affected cells)

    Store-->>Calendar: Confirm update
    Calendar->>User: Activity moved successfully
```

**Performance Target:** < 200ms interaction latency (NFR2)

---
