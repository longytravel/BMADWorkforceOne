# Coding Standards

## Critical Fullstack Rules

- **Type Safety First:** All functions must have explicit TypeScript types (no `any`). Use strict mode in `tsconfig.json`.

- **Pure Functions for Logic:** All business logic (IOI, break adjustment, coverage calculation) must be pure functions with no side effects. This enables testability and portability.

- **Component Composition:** Break large components into smaller, reusable pieces. Max 200 lines per component file.

- **State Immutability:** Never mutate state directly. Use Zustand's Immer middleware for "mutating" syntax that maintains immutability.

- **Error Boundaries:** Wrap all major sections in React Error Boundaries. Never let errors crash the entire app.

- **Memoization for Performance:** Use `React.memo()`, `useMemo()`, and `useCallback()` for expensive operations or frequent re-renders.

- **Accessibility Required:** All interactive elements must be keyboard accessible. Use semantic HTML and ARIA labels where needed.

- **Data Validation:** All JSON data must be validated with Zod schemas on load. Display user-friendly error messages for validation failures.

---

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| **Components** | PascalCase | `CvDHeatmap.tsx` |
| **Hooks** | camelCase with 'use' prefix | `useAgentFilter.ts` |
| **Types/Interfaces** | PascalCase | `Agent`, `IOIResult` |
| **Functions** | camelCase | `calculateIOI()`, `proposeBreakAdjustments()` |
| **Constants** | SCREAMING_SNAKE_CASE | `MAX_IOI_SCORE = 100` |
| **Files (logic)** | camelCase | `ioiCalculator.ts` |
| **CSS Classes** | Tailwind utilities only | `className="flex gap-4"` |

---
