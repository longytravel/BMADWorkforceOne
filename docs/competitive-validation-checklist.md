# Competitive Validation Checklist: Product Trials

**Purpose:** Hands-on validation that competitors DON'T have IOI/CvD features. Confirm differentiation gap is real.

**Timeline:** 3 days (Day 22-24 of validation sprint)
**Competitors to Evaluate:** Calabrio (Priority 1), NICE CXone (Priority 2), Workforce.com or Legion (Priority 3 - optional)

---

## Pre-Trial Setup

### **Day 22 Morning: Trial Account Setup**

**For Each Competitor:**
- [ ] Sign up for demo/trial (use personal email if you want stealth research)
- [ ] Or request sales demo (be prepared for discovery call)
- [ ] Set up screen recording tool (Loom, QuickTime) to capture session
- [ ] Create evaluation spreadsheet (see template below)

**Pro Tips:**
- Use incognito browser to avoid tracking/retargeting
- If asked "What's your use case?" say: "Evaluating WFM options for 200-agent contact center"
- Don't reveal you're a competitor (you're a "consultant" or "evaluator")

---

## Evaluation Framework

### **Core Questions to Answer**

For each competitor, evaluate across 5 dimensions:

#### **1. Intelligent Scheduling Features**
- **IOI-Like Features:** Do they show explainable scoring for schedule decisions?
- **Automated Recommendations:** Does the system recommend which agents to schedule (vs. manual search)?
- **Transparency:** Can you see WHY an agent was recommended?

#### **2. Capacity vs. Demand Visualization**
- **Heatmap or Visual:** Do they visualize capacity vs. demand across time intervals?
- **Color Coding:** Red/yellow/green indicators for SLA risk?
- **Real-Time:** Is it live data or historical reports?

#### **3. Agent Experience & Notifications**
- **Tone of Notifications:** Administrative ("You must work X shift") vs. respectful ("We'd like to ask...")?
- **Contextualization:** Do notifications explain WHY/WHAT/WHO/IMPACT?
- **Mobile Experience:** How does mobile app look and feel?

#### **4. WFM Analyst Workflow**
- **Ease of Use:** How many clicks to create a schedule change?
- **Decision Support:** Does the tool help planners make decisions, or just execute their decisions?
- **Intraday Management:** How intuitive is real-time capacity management?

#### **5. Technology & Integration**
- **Cloud-Native:** Is it truly cloud (browser-based) or requires desktop client?
- **API Quality:** Are APIs modern (REST, webhooks) or legacy (SOAP)?
- **Implementation Complexity:** What's the stated implementation timeline?

---

## Competitor-Specific Evaluation Guides

### **Calabrio WFM - Priority 1 (Day 22)**

#### **Trial Access**
- **Website:** https://www.calabrio.com/
- **Request:** Demo or free trial (check if self-serve trial available)
- **Fallback:** Watch product demo videos on YouTube/website if trial unavailable

#### **Evaluation Checklist**

**Part 1: Intelligent Scheduling (30 min)**

Navigate to scheduling module and evaluate:

- [ ] **Schedule Creation Workflow:** How do you create a new schedule or modify existing?
  - Manual agent selection? OR system recommendations?
  - Screenshot the interface

- [ ] **Agent Selection Logic:** When choosing which agent to schedule:
  - Do you see a "recommended agents" list?
  - Is there a score or ranking system?
  - Can you see WHY an agent is recommended?
  - **Finding:** IOI-like feature exists? **YES / NO**

- [ ] **Schedule Optimization:** Is there an "auto-schedule" or "optimize" button?
  - What happens when you click it?
  - Does it explain optimization logic?
  - **Finding:** Automated but opaque? OR Transparent intelligence?

**Part 2: Capacity Visualization (30 min)**

Navigate to capacity planning or dashboard:

- [ ] **CvD Heatmap:** Look for visual capacity vs. demand representation
  - Is there a heatmap view (color-coded grid)?
  - Can you see SLA risk visually (red/yellow/green)?
  - Is it real-time or historical?
  - Screenshot the closest thing to a heatmap
  - **Finding:** CvD heatmap exists? **YES / NO / PARTIAL**

- [ ] **Capacity Reports:** How do planners identify coverage gaps?
  - Spreadsheet export and manual analysis?
  - Built-in reports with alerts?
  - Visual dashboard?
  - **Finding:** User Experience = [Easy / Medium / Complex]

**Part 3: Agent Experience (30 min)**

Navigate to agent portal (if accessible) or review agent-facing features:

- [ ] **Agent Notifications:** Find example notifications (schedule change, shift reminder)
  - What's the tone? (Administrative? Friendly? Respectful?)
  - Does it explain WHY the change was made?
  - Screenshot 2-3 examples
  - **Finding:** Agent notifications = [Administrative / Neutral / Respectful]

- [ ] **Mobile App:** Download mobile app (iOS or Android) and review:
  - Visual design quality (1-10 scale)
  - Ease of navigation
  - Can agents swap shifts, request time off, view schedules easily?
  - **Finding:** Mobile UX score = [1-10]

**Part 4: Overall Impressions (15 min)**

- [ ] **Strengths:** What does Calabrio do really well?
- [ ] **Weaknesses:** What frustrates you as a user?
- [ ] **Differentiation Gap:** Based on trial, what DON'T they have that we're building?
  - IOI scoring? **YES / NO**
  - CvD heatmap? **YES / NO**
  - Respectful agent notifications? **YES / NO**
- [ ] **Velocity Assessment:** Could they build IOI/CvD in 6-12 months? **YES / NO / MAYBE**

**End of Calabrio Evaluation:** 2 hours

---

### **NICE CXone WFM - Priority 2 (Day 23)**

#### **Trial Access**
- **Website:** https://www.nice.com/products/workforce-engagement-management/workforce-management
- **Request:** Demo (self-serve trial unlikely for enterprise product)
- **Fallback:** Deep-dive on documentation, YouTube demos, G2 screenshots

#### **Evaluation Checklist**

**Part 1: Intelligent Scheduling (30 min)**

If demo access available:

- [ ] **Schedule Generation:** How does NICE generate schedules?
  - Rule-based optimization (IF-THEN logic)?
  - AI/ML-powered recommendations?
  - Screenshot schedule creation interface

- [ ] **Agent Recommendations:** When selecting agents for schedule changes:
  - Do you see intelligent recommendations?
  - Is there explainability? (WHY this agent?)
  - **Finding:** IOI-like feature exists? **YES / NO**

- [ ] **Enlighten AI:** NICE markets "Enlighten AI" for WFM
  - What does it actually do? (Forecasting? Scheduling? Both?)
  - Is it live or vaporware?
  - **Finding:** Enlighten AI for scheduling = [Active / Coming Soon / Marketing Only]

**Part 2: Capacity Visualization (30 min)**

- [ ] **Dashboard & Reports:** Navigate to WFM dashboards
  - Is there visual capacity vs. demand representation?
  - Heatmap-like view?
  - Or traditional reports/tables?
  - Screenshot dashboard
  - **Finding:** CvD heatmap exists? **YES / NO / PARTIAL**

- [ ] **Real-Time Management:** How do you monitor intraday capacity?
  - Alerts for SLA risk?
  - Visual indicators (red/yellow/green)?
  - **Finding:** Real-time capacity visibility = [Strong / Medium / Weak]

**Part 3: Agent Experience (30 min)**

- [ ] **Agent Portal:** If accessible, review agent-facing UI
  - Tone of notifications?
  - Mobile experience quality?
  - Screenshot examples
  - **Finding:** Agent UX score = [1-10]

- [ ] **User Reviews:** Search G2.com for NICE WFM reviews
  - Filter for "agent experience" or "ease of use" mentions
  - What do agents say? (Love it? Hate it? Indifferent?)
  - **Finding:** Agent sentiment = [Positive / Neutral / Negative]

**Part 4: Competitive Intel (15 min)**

- [ ] **Pricing:** Any pricing intel from demo or public sources?
- [ ] **Implementation Timeline:** Stated deployment time?
- [ ] **Recent Feature Releases:** Check release notes for Q4 2024 / Q1 2025
  - Any intelligent scheduling features announced?
  - **Finding:** Recent innovation in scheduling? **YES / NO**

**End of NICE Evaluation:** 2 hours (or 1 hour if demo unavailable)

---

### **Workforce.com or Legion - Priority 3 (Day 24 - Optional)**

#### **Trial Access**
- **Workforce.com:** https://www.workjam.com/ (was renamed)
- **Legion:** https://legion.co/
- **Request:** Self-serve trial or demo

#### **Evaluation Focus: Contact Center Readiness**

**Key Questions:**

- [ ] **Contact Center Features:** Do they have:
  - SLA/service level management?
  - Real-time adherence tracking?
  - Interval-level scheduling (15-min intervals)?
  - AHT, occupancy, shrinkage tracking?
  - **Finding:** Contact center-specific features = [Yes / Partial / No]

- [ ] **Five9 Integration:** Check integration marketplace
  - Is Five9 listed?
  - Maturity level (Beta? GA? In progress?)
  - **Finding:** Five9 integration status = [Live / Beta / Planned / None]

- [ ] **Retail vs. Contact Center DNA:** Based on UI/workflows:
  - Does it feel like retail scheduling adapted for contact centers?
  - Or purpose-built for contact centers?
  - **Finding:** Contact center DNA = [Yes / Partial / No]

- [ ] **Timeline Threat Assessment:** Based on what you see:
  - How far away are they from contact center-ready product?
  - **Finding:** Launch timeline estimate = [6 months / 12 months / 18+ months]

**End of Workforce.com/Legion Evaluation:** 1-2 hours

---

## Evaluation Scorecard Template

Use this spreadsheet to track findings:

| Dimension | Calabrio | NICE WFM | Workforce.com | Legion | Notes |
|-----------|----------|----------|---------------|---------|-------|
| **Intelligent Scheduling** |
| IOI-like scoring | ❌ / ⚠️ / ✅ | ❌ / ⚠️ / ✅ | ❌ / ⚠️ / ✅ | ❌ / ⚠️ / ✅ | [Notes] |
| Automated recommendations | ❌ / ⚠️ / ✅ | ❌ / ⚠️ / ✅ | ❌ / ⚠️ / ✅ | ❌ / ⚠️ / ✅ | [Notes] |
| Explainability (WHY) | ❌ / ⚠️ / ✅ | ❌ / ⚠️ / ✅ | ❌ / ⚠️ / ✅ | ❌ / ⚠️ / ✅ | [Notes] |
| **Capacity Visualization** |
| CvD heatmap | ❌ / ⚠️ / ✅ | ❌ / ⚠️ / ✅ | ❌ / ⚠️ / ✅ | ❌ / ⚠️ / ✅ | [Notes] |
| Color-coded SLA risk | ❌ / ⚠️ / ✅ | ❌ / ⚠️ / ✅ | ❌ / ⚠️ / ✅ | ❌ / ⚠️ / ✅ | [Notes] |
| Real-time visibility | ❌ / ⚠️ / ✅ | ❌ / ⚠️ / ✅ | ❌ / ⚠️ / ✅ | ❌ / ⚠️ / ✅ | [Notes] |
| **Agent Experience** |
| Respectful notifications | ❌ / ⚠️ / ✅ | ❌ / ⚠️ / ✅ | ❌ / ⚠️ / ✅ | ❌ / ⚠️ / ✅ | [Notes] |
| Context (WHY/WHAT/WHO) | ❌ / ⚠️ / ✅ | ❌ / ⚠️ / ✅ | ❌ / ⚠️ / ✅ | ❌ / ⚠️ / ✅ | [Notes] |
| Mobile UX quality (1-10) | [Score] | [Score] | [Score] | [Score] | [Notes] |
| **Overall Assessment** |
| Has IOI equivalent? | YES / NO | YES / NO | YES / NO | YES / NO | [Notes] |
| Has CvD heatmap? | YES / NO | YES / NO | YES / NO | YES / NO | [Notes] |
| Agent-centered design? | YES / NO | YES / NO | YES / NO | YES / NO | [Notes] |
| **Threat Level** | LOW / MED / HIGH | LOW / MED / HIGH | LOW / MED / HIGH | LOW / MED / HIGH | [Why?] |

**Legend:**
- ✅ = Full feature, well-executed
- ⚠️ = Partial feature or basic implementation
- ❌ = Missing or significantly lacking

---

## Final Validation Report Template

### **Competitive Differentiation Validation**

**Date:** [Date]
**Evaluator:** [Your Name]
**Competitors Evaluated:** Calabrio, NICE CXone, [Others]

---

#### **Critical Finding: Differentiation Gap Confirmed?**

**Hypothesis:** No competitor has IOI + CvD + Agent Experience combo.

**Result:** **CONFIRMED / PARTIALLY CONFIRMED / INVALIDATED**

**Evidence:**

**IOI Scoring (Explainable Intelligence):**
- Calabrio: **[YES / NO]** - [Description if yes]
- NICE: **[YES / NO]** - [Description if yes]
- Workforce.com: **[YES / NO]** - [Description if yes]
- **Conclusion:** IOI is unique? **[YES / NO]**

**CvD Heatmap Visualization:**
- Calabrio: **[YES / NO]** - [Description if yes]
- NICE: **[YES / NO]** - [Description if yes]
- **Conclusion:** CvD heatmap is unique? **[YES / NO]**

**Agent-Centered Notifications:**
- Calabrio: **[YES / NO]** - [Description if yes]
- NICE: **[YES / NO]** - [Description if yes]
- **Conclusion:** Respectful agent experience is unique? **[YES / NO]**

---

#### **Velocity Assessment: How Fast Could They Build This?**

**Calabrio:**
- **Capability:** [High / Medium / Low] - They have modern tech stack, product velocity
- **Likelihood:** [High / Medium / Low] - Would they prioritize this?
- **Timeline Estimate:** [6 months / 12 months / 18+ months]

**NICE/Verint:**
- **Capability:** [High / Medium / Low] - Large R&D teams but legacy tech debt
- **Likelihood:** [High / Medium / Low] - Would they notice and care?
- **Timeline Estimate:** [6 months / 12 months / 18+ months]

**Workforce.com/Legion:**
- **Capability:** [High / Medium / Low] - Strong ML but lack contact center domain expertise
- **Likelihood:** [High / Medium / Low] - Actively targeting contact centers
- **Timeline Estimate:** [6 months / 12 months / 18+ months]

---

#### **Strategic Implications**

**If Differentiation Gap Confirmed (No Competitor Has IOI + CvD):**
- ✅ **GO SIGNAL:** Strong differentiation exists; proceed with MVP
- **Risk:** Competitors could replicate in 12-18 months → Speed matters
- **Mitigation:** Ship fast, build data moats, continuous innovation

**If Differentiation Gap Partially Exists (1 Competitor Has Similar Features):**
- ⚠️ **CAUTION SIGNAL:** Differentiation less unique than expected
- **Decision:** Can we out-execute them? (Better UX, faster velocity, lower price?)
- **Pivot Option:** Emphasize different differentiator (agent experience? compliance? vertical focus?)

**If Differentiation Gap Invalidated (Multiple Competitors Have IOI/CvD):**
- 🛑 **STOP SIGNAL:** Market already has solution; we're late
- **Decision:** Pivot to different differentiation OR different market OR stop project

---

### **Screenshots & Evidence**

**Attach:**
- [ ] Calabrio screenshots (schedule creation, dashboard, agent notifications)
- [ ] NICE screenshots (if demo access available)
- [ ] Competitive feature comparison table (completed scorecard)
- [ ] G2 review analysis (agent experience sentiment)

---

### **Recommendation**

Based on competitive trials:

**GO / CONDITIONAL GO / PIVOT / STOP**

**Rationale:**
[2-3 paragraphs explaining decision based on findings]

**Next Actions:**
1. [Action item]
2. [Action item]
3. [Action item]

---

## Pro Tips for Effective Trials

### **Do:**
- ✅ Take detailed screenshots (you'll forget details later)
- ✅ Record screen if allowed (Loom, QuickTime)
- ✅ Test as both "planner" and "agent" roles (different perspectives)
- ✅ Ask sales rep: "What's your most advanced intelligent scheduling feature?" (listen for AI/ML buzzwords)
- ✅ Check release notes for Q4 2024 / Q1 2025 (recent innovation signals)

### **Don't:**
- ❌ Rush through evaluation (spend full 2 hours per competitor)
- ❌ Confirm your biases (look for evidence that contradicts your assumptions)
- ❌ Dismiss features because UI is ugly (substance > style)
- ❌ Reveal you're a competitor (maintain "evaluator" persona)

---

## Red Flags: Immediate STOP Signals

**Red Flag 1:** Calabrio shows explainable IOI-like scoring in demo
- **Action:** Deep-dive—is it live or vaporware? Roadmap item or production feature?
- **Decision:** If live and well-executed → STOP or significant pivot required

**Red Flag 2:** NICE announces "Intelligent Scheduling AI" in recent release notes
- **Action:** Validate what it actually does (marketing fluff or real feature?)
- **Decision:** If real → Accelerate our timeline or reconsider differentiation

**Red Flag 3:** Multiple competitors (2+) have CvD heatmaps
- **Action:** Assess execution quality (our heatmap could still be better UX)
- **Decision:** If multiple have good heatmaps → CvD is no longer unique differentiator

---

## Post-Trial Action Items

After completing all competitive trials:

**Day 25 (Friday):**
- [ ] Compile screenshots into shared folder
- [ ] Complete evaluation scorecard
- [ ] Write 1-page summary: "Competitive Differentiation Validation Report"
- [ ] Share with team for discussion

**Day 26 (Weekend or Monday):**
- [ ] Team meeting: Review findings
- [ ] Decision: Does differentiation gap exist?
- [ ] If YES → Proceed to GO/NO-GO decision meeting (Day 27-28)
- [ ] If NO → Immediate pivot discussion (what's our new differentiation?)

---

**Ready to validate your differentiation? Start with Calabrio! 🔍**
