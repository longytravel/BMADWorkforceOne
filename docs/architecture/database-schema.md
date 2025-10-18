# Database Schema

**Status:** N/A - No Database Required

This demo uses static JSON files stored in `/public/demo-data/` with no persistence layer. All data lives in browser memory (Zustand store) and resets on page refresh.

**Data Storage Strategy:**
- **Source of Truth:** JSON files in `/public/demo-data/`
- **Runtime Storage:** Zustand in-memory store
- **Persistence:** None (intentional per PRD)
- **Reset Mechanism:** Reload JSON files via `resetDemo()` action

---
