# Unified Project Structure

```
wfm-intelligence-demo/
├── .github/
│   └── workflows/
│       └── vercel-deploy.yml          # Optional: explicit deploy config
│
├── public/
│   ├── demo-data/                     # Static JSON data files
│   │   ├── agents.json                # 50-100 agents (~25KB)
│   │   ├── schedules.json             # Weekly activities (~40KB)
│   │   ├── cvd-forecast.json          # 7 days × 96 intervals (~15KB)
│   │   └── compliance-rules.json      # Break rules (~2KB)
│   ├── favicon.ico
│   └── index.html
│
├── src/
│   ├── components/                    # React UI components
│   │   ├── CvDHeatmap/
│   │   │   ├── CvDHeatmap.tsx
│   │   │   ├── HeatmapCell.tsx
│   │   │   ├── HeatmapTooltip.tsx
│   │   │   ├── HeatmapDetailModal.tsx
│   │   │   └── index.ts
│   │   ├── Calendar/
│   │   │   ├── ScheduleCalendar.tsx
│   │   │   ├── ActivityBlock.tsx
│   │   │   ├── AgentSidePanel.tsx
│   │   │   ├── ViewModeSwitcher.tsx
│   │   │   ├── CalendarToolbar.tsx
│   │   │   └── index.ts
│   │   ├── SmartSearch/
│   │   │   ├── SmartSearchModal.tsx
│   │   │   ├── SearchForm.tsx
│   │   │   ├── SlotRecommendations.tsx
│   │   │   ├── IOIScoreCard.tsx
│   │   │   ├── BreakAdjustmentView.tsx
│   │   │   └── index.ts
│   │   ├── AuditLog/
│   │   │   ├── AuditLog.tsx
│   │   │   ├── AuditLogFilters.tsx
│   │   │   ├── AuditLogRow.tsx
│   │   │   ├── ExportButton.tsx
│   │   │   └── index.ts
│   │   ├── NotificationPreview/
│   │   │   ├── NotificationPanel.tsx
│   │   │   ├── NotificationCard.tsx
│   │   │   └── index.ts
│   │   ├── Layout/
│   │   │   ├── AppShell.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── LoadingScreen.tsx
│   │   │   └── index.ts
│   │   └── ui/                        # Shadcn components (copied)
│   │       ├── button.tsx
│   │       ├── dialog.tsx
│   │       ├── table.tsx
│   │       ├── card.tsx
│   │       ├── accordion.tsx
│   │       ├── select.tsx
│   │       ├── input.tsx
│   │       ├── tooltip.tsx
│   │       └── ...
│   │
│   ├── logic/                         # Business logic (pure functions)
│   │   ├── ioiCalculator.ts           # IOI scoring algorithm
│   │   ├── ioiCalculator.test.ts      # Unit tests
│   │   ├── breakAdjuster.ts           # Break optimization
│   │   ├── breakAdjuster.test.ts
│   │   ├── coverageCalculator.ts      # CvD computation
│   │   ├── coverageCalculator.test.ts
│   │   ├── conflictDetector.ts        # Schedule overlap detection
│   │   ├── conflictDetector.test.ts
│   │   └── index.ts
│   │
│   ├── services/                      # Data loading & utilities
│   │   ├── dataLoader.ts              # JSON fetch & validation
│   │   ├── csvExporter.ts             # Audit log export
│   │   └── index.ts
│   │
│   ├── stores/                        # State management
│   │   ├── appStore.ts                # Zustand store
│   │   └── index.ts
│   │
│   ├── types/                         # TypeScript definitions
│   │   ├── index.ts                   # Main type exports
│   │   ├── schemas.ts                 # Zod validation schemas
│   │   └── constants.ts               # Enums, color maps, etc.
│   │
│   ├── hooks/                         # Custom React hooks
│   │   ├── useAgentFilter.ts          # Agent filtering logic
│   │   ├── useScheduleState.ts        # Schedule manipulation
│   │   ├── useIOIScoring.ts           # IOI calculation wrapper
│   │   └── index.ts
│   │
│   ├── utils/                         # Helper functions
│   │   ├── dateHelpers.ts             # Date/time utilities
│   │   ├── formatters.ts              # Display formatting
│   │   └── index.ts
│   │
│   ├── styles/                        # Global styles
│   │   ├── globals.css                # Tailwind directives
│   │   └── theme.css                  # Custom CSS variables
│   │
│   ├── App.tsx                        # Root component
│   ├── main.tsx                       # Vite entry point
│   └── vite-env.d.ts                  # Vite type definitions
│
├── docs/                              # Documentation
│   ├── prd.md                         # Product Requirements
│   ├── architecture.md                # This document
│   └── demo-script.md                 # Demo walkthrough guide
│
├── .env.example                       # Environment template (mostly empty)
├── .eslintrc.cjs                      # ESLint configuration
├── .gitignore                         # Git ignore rules
├── .prettierrc                        # Prettier config
├── index.html                         # HTML entry point
├── package.json                       # Dependencies & scripts
├── tsconfig.json                      # TypeScript config (strict mode)
├── tsconfig.node.json                 # TS config for Vite
├── vite.config.ts                     # Vite build configuration
├── vitest.config.ts                   # Test configuration
├── tailwind.config.js                 # Tailwind customization
├── postcss.config.js                  # PostCSS for Tailwind
└── README.md                          # Setup & deployment guide
```

---
