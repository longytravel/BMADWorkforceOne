# Epic Sequencing Rationale

**Why This Order:**

1. **Epic 1 (Foundation)** must come first—establishes infrastructure, validates tooling, de-risks deployment. Delivers working "Hello World" deployed to Vercel.

2. **Epic 2 (Heatmap)** next because it's the **primary differentiator** and provides visual impact early. Also establishes coverage calculation logic needed by Epic 4 (IOI scoring depends on CvD data).

3. **Epic 3 (Calendar)** follows because Smart Search (Epic 4) requires a calendar to display results. Calendar also provides the interaction surface for demonstrating filtered views.

4. **Epic 4 (IOI Scoring)** builds on Epic 2 (uses CvD data) and Epic 3 (displays recommendations in calendar). This is the "intelligence" layer that ties together heatmap awareness with scheduling actions.

5. **Epic 5 (Audit Trail)** can only be populated after scheduling workflows exist (Epic 3-4). Notifications preview requires context from real scheduling actions.

6. **Epic 6 (Polish)** naturally comes last—error handling, accessibility, and performance tuning happen once features are functionally complete.

**Dependencies:**
- Epic 2 → Epic 4 (IOI scoring uses CvD coverage data)
- Epic 3 → Epic 4 (Smart Search displays results in calendar)
- Epic 3 + Epic 4 → Epic 5 (Audit log captures scheduling actions)
- All Epics → Epic 6 (Polish happens after features exist)

**Deployment Cadence:**
Each epic delivers a **fully deployable increment**:
- Epic 1: Working app shell + data pipeline
- Epic 2: Heatmap visualization live
- Epic 3: Calendar + heatmap integrated
- Epic 4: Full smart scheduling workflow
- Epic 5: Complete audit + transparency features
- Epic 6: Demo-ready, polished product

---
