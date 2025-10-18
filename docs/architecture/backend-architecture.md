# Backend Architecture

**Status:** N/A - Client-Side Only Demo

This demo has no backend services. All "backend" logic (IOI scoring, break optimization, coverage calculation) runs as pure TypeScript functions in the browser.

**Architecture Pattern:** "Backend in the Frontend" (BFF)

The business logic that would traditionally live in backend services is implemented as:
- **Pure functions** in `/src/logic/` folder
- **Fully unit tested** with Vitest
- **Portable** (can be extracted to serverless functions if productionized later)

---
