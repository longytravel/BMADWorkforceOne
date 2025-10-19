# Intelligent WFM Scheduling Demo

> Interactive demo showcasing CvD-integrated intelligent scheduling with explainable IOI scoring

[![React](https://img.shields.io/badge/React-18.2+-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?logo=vercel&logoColor=white)](https://bmad-workforce-one.vercel.app/)

[**🚀 Live Demo**](https://bmad-workforce-one.vercel.app/) | [**📚 Documentation**](docs/)

---

## Overview

Contact center WFM planners spend **30-45 minutes** manually finding meeting slots for 10 agents, checking capacity charts, compliance rules, and agent calendars across multiple systems. This demo proves the technical feasibility of **CvD-integrated intelligent scheduling with explainable AI scoring** to reduce this to under 2 minutes.

**Key Features:**

- 🔥 **CvD Heatmap** - Real-time capacity vs demand visualization with 15-minute interval granularity
- 🧠 **IOI Scoring** - Intelligent Opportunity Index using 4-factor algorithm (Coverage Impact + Break Availability + Compliance Risk + Agent Efficiency)
- 📅 **Smart Calendar** - Drag-and-drop scheduling with automatic conflict detection and validation
- ⚡ **Break Optimization** - Compliance-aware break adjustment proposals with minimal agent impact
- 📊 **Audit Trail** - Full transparency and decision traceability for all scheduling actions
- 🎯 **Demo Mode** - Reset button for repeatable presentations without data persistence

**Project Type:** Demo/Proof-of-Concept (not production-ready)

---

## 🎭 BMad Flow Visualization

**NEW:** Interactive visualization of the complete 12-phase BMad methodology workflow!

**Access:** Click **"BMad Flow"** in the navigation bar or visit `/bmad-flow`

**Features:**
- 🎨 **Interactive Mermaid Flowchart** - Click phase nodes to explore details
- 📄 **Real Project Artifacts** - View actual documents from project development
- 📊 **140KB+ of Documentation** - Brainstorming results, competitor analysis, market research, PRD, architecture, stories
- 📖 **Full Document Viewer** - Scroll through complete markdown files loaded from GitHub
- 🔄 **Easy to Update** - Single configuration file to add new artifacts

**For Developers:**
See [BMAD_FLOW_DEVELOPER_GUIDE.md](wfm-intelligence-demo/BMAD_FLOW_DEVELOPER_GUIDE.md) for detailed instructions on:
- Adding new artifacts to phases
- Updating existing content
- Customizing the flowchart
- Troubleshooting

**Live Demo:** [https://bmad-workforce-one.vercel.app/bmad-flow](https://bmad-workforce-one.vercel.app/bmad-flow)

---

## Tech Stack

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Frontend Framework** | React | 18.2+ | UI component library |
| **Language** | TypeScript | 5.3+ | Type-safe development |
| **Build Tool** | Vite | 5.0+ | <50ms HMR, optimized builds |
| **Styling** | Tailwind CSS | 3.4+ | Utility-first CSS framework |
| **State Management** | Zustand | 4.5+ | Lightweight global state (1KB) |
| **UI Components** | Shadcn/ui | Latest | Accessible, customizable components |
| **Calendar** | React Big Calendar | 1.11+ | Outlook-style calendar grid |
| **Charts/Heatmap** | Recharts | 2.10+ | CvD visualization |
| **Drag & Drop** | dnd-kit | 8.0+ | Modern, accessible DnD |
| **Icons** | Lucide React | 0.344+ | Tree-shakeable icon library |
| **Date Handling** | date-fns | 3.0+ | Date manipulation utilities |
| **Data Validation** | Zod | 3.22+ | JSON schema validation |
| **Testing** | Vitest | 1.2+ | Unit tests for algorithms |
| **Testing Library** | React Testing Library | 14.1+ | Component integration tests |
| **Linting** | ESLint | 8.56+ | Code quality enforcement |
| **Formatting** | Prettier | 3.2+ | Consistent code style |
| **Deployment** | Vercel | Free Tier | Global CDN, auto-deploy |

**Total Bundle Size:** ~380KB gzipped (meets <2s load target on 4G)

---

## Quick Start

### Prerequisites

- **Node.js** 18.0+ ([Download](https://nodejs.org/))
- **npm** 9.0+ or **pnpm** 8+
- **Git** 2.30+ ([Download](https://git-scm.com/))
- **VS Code** (recommended) ([Download](https://code.visualstudio.com/))

### Local Development

```bash
# Clone repository
git clone https://github.com/longytravel/BMADWorkforceOne.git
cd BMADWorkforceOne/wfm-intelligence-demo

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

The app will automatically load demo data from `public/demo-data/` and display the dashboard with 300 agents, 7 days of schedules, and CvD forecast data.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (http://localhost:5173) |
| `npm run build` | Build for production (`dist/` folder) |
| `npm run preview` | Preview production build locally |
| `npm run test` | Run unit tests with Vitest |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

---

## Project Structure

```
BMADWorkforceOne/
├── wfm-intelligence-demo/          # Main application
│   ├── src/
│   │   ├── components/             # React UI components
│   │   │   ├── Layout.tsx          # App shell with header/navigation
│   │   │   ├── CvDHeatmap.tsx      # Capacity vs Demand heatmap
│   │   │   ├── AgentCalendar.tsx   # Calendar with drag-drop scheduling
│   │   │   ├── AgentSearch.tsx     # Intelligent agent search with IOI
│   │   │   └── ...
│   │   ├── logic/                  # Business logic (pure functions)
│   │   │   ├── ioiCalculator.ts    # IOI scoring algorithm
│   │   │   ├── breakAdjuster.ts    # Break optimization logic
│   │   │   └── coverageCalculator.ts
│   │   ├── services/               # Data loading and utilities
│   │   │   └── dataLoader.ts       # JSON demo data loading
│   │   ├── stores/                 # Zustand state management
│   │   │   └── appStore.ts         # Global application state
│   │   ├── types/                  # TypeScript interfaces
│   │   │   └── index.ts            # Agent, Schedule, CvD types
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── utils/                  # Helper functions
│   │   └── App.tsx                 # Root component
│   ├── public/
│   │   └── demo-data/              # JSON demo data files
│   │       ├── agents.json         # 300 agents with skills/locations
│   │       ├── schedules.json      # 7 days of scheduling data
│   │       ├── cvd-forecast.json   # Capacity vs Demand forecast
│   │       └── compliance-rules.json
│   ├── tests/                      # Vitest tests
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
├── docs/                           # Project documentation
│   ├── prd/                        # Product Requirements (sharded)
│   ├── architecture/               # Architecture docs (sharded)
│   ├── stories/                    # User stories (Epic 1-4)
│   └── qa/                         # QA strategy and test plans
├── scripts/                        # Data generation scripts
│   ├── generateSchedules.js        # Generate demo schedules
│   ├── generateCvdForecast.js      # Generate CvD forecast data
│   └── validateDemoData.js         # Validate JSON schemas
├── .bmad-core/                     # BMAD methodology configs
└── README.md                       # This file
```

---

## Deployment

The app is **automatically deployed to Vercel** on every push to the `main` branch.

**Production URL:** [https://bmad-workforce-one.vercel.app/](https://bmad-workforce-one.vercel.app/)

**Deployment Flow:**
1. Push code to GitHub (`main` branch)
2. Vercel webhook triggers automatically
3. Vercel runs `npm install && npm run build`
4. Deploys `dist/` folder to global CDN
5. Live URL updated (~60 seconds total)

**Preview Deployments:** Every Pull Request gets a unique preview URL for testing changes before merging.

**Performance:**
- Initial load: <2 seconds on 4G
- Bundle size: ~380KB gzipped
- CDN delivery: <100ms from edge locations worldwide

---

## Documentation

- [**Product Requirements Document (PRD)**](docs/prd.md) - Sharded into Epic sections
- [**Architecture Document**](docs/architecture.md) - Technical design and patterns
- [**User Stories**](docs/stories/) - Epic 1-4 with detailed acceptance criteria
- [**QA Strategy**](docs/qa/early-test-architecture.md) - Testing approach and standards

**Core Documentation:**
- [Tech Stack Details](docs/architecture/tech-stack.md)
- [Coding Standards](docs/architecture/coding-standards.md)
- [Data Models](docs/architecture/data-models.md)

---

## Contributing

This project uses the **BMAD™ (Business Methodology for Agile Development) Core** methodology for AI-driven development.

**Development Workflow:**
1. Read the relevant user story in [docs/stories/](docs/stories/)
2. Follow the acceptance criteria and tasks defined in the story
3. Run tests: `npm run test`
4. Run linting: `npm run lint`
5. Format code: `npm run format` (or auto-format on save in VS Code)
6. Build: `npm run build`
7. Create Pull Request (Vercel will create preview deployment)

**Code Style:**
- ESLint + Prettier enforced
- 2-space indentation
- Single quotes for strings
- Trailing commas
- No semicolons (Prettier default)
- Type safety: No `any` types allowed

**See [Architecture Document](docs/architecture.md) for detailed coding standards and patterns.**

---

## License

MIT License - See [LICENSE](LICENSE) file for details.

---

## Credits

**Built with:**
- [React](https://react.dev/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [Shadcn/ui](https://ui.shadcn.com/) - Component library
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [React Big Calendar](https://jquense.github.io/react-big-calendar/) - Calendar component
- [Recharts](https://recharts.org/) - Charting library
- [dnd-kit](https://dndkit.com/) - Drag and drop

**Developed using BMAD™ Core methodology.**

---

## Important Notes

⚠️ **This is a demo/proof-of-concept.** Not intended for production use without significant enhancements:

- **No backend:** All data is static JSON files loaded from `public/` folder
- **No persistence:** Changes are lost on page refresh (uses in-memory state only)
- **No authentication:** No user login or role-based access control
- **No API integration:** Would need REST/GraphQL API for real WFM system
- **Limited error handling:** Focuses on happy path for demo scenarios
- **No multi-tenancy:** Single company view only

**For production use, you would need:**
- Backend API (Node.js/Python/Java)
- Database (PostgreSQL/MongoDB)
- Authentication system (OAuth 2.0, SAML)
- Real-time updates (WebSockets)
- Role-based access control
- Comprehensive error handling
- Data persistence layer
- Multi-tenancy support
- Security hardening (OWASP Top 10)

---

**Live Demo:** [https://bmad-workforce-one.vercel.app/](https://bmad-workforce-one.vercel.app/)

**Questions?** See [documentation](docs/) or create an issue in the GitHub repository.
