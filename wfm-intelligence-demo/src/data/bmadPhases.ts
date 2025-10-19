/**
 * BMad Method Workflow Phases - ACTUAL Project Artifacts
 * All paths point to real files in the BMAD Workforce One GitHub repository
 *
 * ⭐ DEVELOPERS: This is the main configuration file for the BMad Flow visualization.
 *
 * TO ADD A NEW ARTIFACT:
 * 1. Commit your document to the GitHub repository
 * 2. Find the phase below where you want to add it (phase-1 through phase-12)
 * 3. Add a new object to the artifacts array with:
 *    - name: Display name
 *    - githubPath: Path in repo (e.g., 'docs/stories/2.1.build-heatmap.md')
 *    - description: Short description
 *    - size: File size (optional, e.g., '18 KB')
 *    - highlights: Array of key points (optional)
 * 4. Save and reload - your artifact will appear!
 *
 * See BMAD_FLOW_DEVELOPER_GUIDE.md for detailed instructions.
 */

export interface PhaseArtifact {
  name: string;
  githubPath: string; // Relative path in repo (e.g., 'docs/stories/1.1.initialize-vite-project.md')
  description: string;
  size?: string; // File size for display (e.g., '24 KB') - OPTIONAL
  highlights?: string[]; // Key highlights to show in preview - OPTIONAL
}

export interface BmadPhase {
  id: string;
  phase: string;
  agentName: string;
  agentIcon: string;
  agentRole: string;
  primaryFunction: string;
  outputs: string[];
  artifacts: PhaseArtifact[];
}

// GitHub repo base for raw content
export const GITHUB_REPO = 'longytravel/BMADWorkforceOne';
export const GITHUB_BRANCH = 'main';

export const BMAD_PHASES: BmadPhase[] = [
  {
    id: 'phase-1',
    phase: 'I. Planning: Project Definition',
    agentName: 'Mary',
    agentIcon: '📊',
    agentRole: 'Business Analyst',
    primaryFunction: 'Research planning, ideation facilitation, brainstorming, competitive analysis. Create Project Brief.',
    outputs: ['Project Brief', 'Market Research', 'Competitive Analysis', 'Brainstorming Results'],
    artifacts: [
      {
        name: 'Brainstorming Session Results',
        githubPath: 'docs/brainstorming-session-results.md',
        description: 'Role Playing & What-If Scenarios - 47+ ideas generated',
        size: '24 KB',
        highlights: [
          'Techniques: Role Playing (4 perspectives), What If Scenarios',
          '47+ distinct concepts and features identified',
          'Key themes: Intelligent Automation, Service Protection, Human-Centered Design',
          'Insights from Team Leads, Agents, Planners, and Executives'
        ]
      },
      {
        name: 'Comprehensive Competitor Analysis',
        githubPath: 'docs/competitor-analysis.md',
        description: 'Deep dive into 8+ WFM competitors with gap analysis',
        size: '140 KB',
        highlights: [
          'Analyzed: Calabrio, Verint, Aspect, NICE, Alvaria, Injixo, Quinyx, Genesys',
          'Feature gap identification and differentiation opportunities',
          'Pricing models and market positioning',
          'Integration capabilities and tech stack analysis'
        ]
      },
      {
        name: 'Market Research & Analysis',
        githubPath: 'docs/market-research.md',
        description: 'Market sizing, trends, and TAM/SAM/SOM calculations',
        size: '91 KB',
        highlights: [
          'Contact center market trends and growth projections',
          'Customer pain points and unmet needs',
          'Technology adoption patterns',
          'Market entry strategy recommendations'
        ]
      },
      {
        name: 'Project Brief',
        githubPath: 'docs/brief.md',
        description: 'Initial project vision and objectives',
        size: '35 KB',
        highlights: [
          'Problem statement and opportunity',
          'Vision for intelligent WFM system',
          'Success criteria and constraints',
          'Stakeholder alignment'
        ]
      },
      {
        name: 'Customer Interview Guide',
        githubPath: 'docs/customer-interview-guide.md',
        description: 'Structured interview framework for user research',
        size: '17 KB',
        highlights: [
          'Question frameworks for different personas',
          'Pain point discovery techniques',
          'Jobs-to-be-done analysis',
          'Validation criteria'
        ]
      }
    ]
  },
  {
    id: 'phase-2',
    phase: 'II. Planning: Requirements',
    agentName: 'John',
    agentIcon: '📋',
    agentRole: 'Product Manager',
    primaryFunction: 'Create Product Requirements Document (PRD) based on business goals, requirements (FRs/NFRs), and feature prioritization.',
    outputs: ['Comprehensive PRD with Epics and Stories defined'],
    artifacts: [
      {
        name: 'PRD: Goals & Background Context',
        githubPath: 'docs/prd/goals-and-background-context.md',
        description: 'Product vision, objectives, and business context',
        highlights: [
          'Product vision and mission',
          'Business objectives and success metrics',
          'Market opportunity and timing',
          'Strategic alignment'
        ]
      },
      {
        name: 'PRD: Epic List & Sequencing',
        githubPath: 'docs/prd/epic-list.md',
        description: 'All 5 epics with goals, deliverables, and value statements',
        highlights: [
          'Epic 1: Foundation & Demo Infrastructure',
          'Epic 2: CvD Heatmap & Coverage Intelligence',
          'Epic 3: Calendar UI & Schedule Management',
          'Epic 4: Intelligent Break Optimization (IOI)',
          'Epic 5: What-If Scenario Planning'
        ]
      },
      {
        name: 'PRD: Requirements (FRs & NFRs)',
        githubPath: 'docs/prd/requirements.md',
        description: 'Functional and Non-Functional Requirements',
        highlights: [
          'Functional requirements by epic',
          'Performance targets (<2s load, <100ms interactions)',
          'Accessibility requirements (WCAG 2.1 AA)',
          'Security and data handling requirements'
        ]
      },
      {
        name: 'PRD: Epic Sequencing Rationale',
        githubPath: 'docs/prd/epic-sequencing-rationale.md',
        description: 'Why epics are ordered this way - dependency logic',
        highlights: [
          'Technical dependency analysis',
          'Risk mitigation strategy',
          'Value delivery sequencing',
          'MVP definition and scope'
        ]
      },
      {
        name: 'PRD: Technical Assumptions',
        githubPath: 'docs/prd/technical-assumptions.md',
        description: 'Technology constraints and assumptions',
        highlights: [
          'Demo vs production scope boundaries',
          'Browser support and compatibility',
          'Data volume assumptions',
          'Integration assumptions'
        ]
      }
    ]
  },
  {
    id: 'phase-3',
    phase: 'III. Planning: UI/UX Design',
    agentName: 'Sally',
    agentIcon: '🎨',
    agentRole: 'UX Expert',
    primaryFunction: 'Create Front End Specification detailing interaction patterns, design system, accessibility, and responsiveness.',
    outputs: ['UI/UX Specification with component library and interaction patterns'],
    artifacts: [
      {
        name: 'Front-End Specification',
        githubPath: 'docs/front-end-spec.md',
        description: 'Complete UI/UX design system and interaction patterns',
        size: '43 KB',
        highlights: [
          'Design system: Colors, typography, spacing',
          'Component library specifications',
          'Interaction patterns and micro-interactions',
          'Accessibility requirements (WCAG 2.1 AA)',
          'Responsive design breakpoints',
          'Animation and transition guidelines'
        ]
      },
      {
        name: 'PRD: UI Design Goals',
        githubPath: 'docs/prd/user-interface-design-goals.md',
        description: 'User experience principles and design philosophy',
        highlights: [
          'Human-centered design principles',
          'Cognitive load reduction strategies',
          'Visual hierarchy and information architecture',
          'User flow optimization'
        ]
      }
    ]
  },
  {
    id: 'phase-4',
    phase: 'IV. Planning: Technical Architecture',
    agentName: 'Winston',
    agentIcon: '🏗️',
    agentRole: 'Solution Architect',
    primaryFunction: 'Design the holistic system architecture, defining the technology stack, data models, components, and deployment strategy.',
    outputs: ['Architecture Document with tech stack, data models, and deployment strategy'],
    artifacts: [
      {
        name: 'Tech Stack Decisions',
        githubPath: 'docs/architecture/tech-stack.md',
        description: 'Complete technology selection with versions and rationale',
        highlights: [
          'Frontend: React 18.2+, TypeScript 5.3+, Vite 5.0+',
          'UI: Tailwind CSS 3.4+, Shadcn/ui components',
          'State: Zustand 4.5+ (1KB, no boilerplate)',
          'Visualization: Recharts 2.10+ for CvD heatmap',
          'Testing: Vitest 1.2+, React Testing Library',
          'Deployment: Vercel with edge CDN',
          'Bundle size: ~380KB gzipped'
        ]
      },
      {
        name: 'Coding Standards',
        githubPath: 'docs/architecture/coding-standards.md',
        description: 'TypeScript conventions, patterns, and best practices',
        highlights: [
          'Type Safety First: No any types, strict mode',
          'Pure Functions for Logic: Testability and portability',
          'Component Composition: Max 200 lines per component',
          'State Immutability with Immer middleware',
          'Accessibility: WCAG 2.1 AA compliance',
          'Data Validation: Zod schemas for all JSON'
        ]
      }
    ]
  },
  {
    id: 'phase-5',
    phase: 'V. Planning: Early QA/Risk Input',
    agentName: 'Quinn',
    agentIcon: '🔍',
    agentRole: 'QA / Test Architect',
    primaryFunction: 'Provide early test strategy input on high-risk areas by running risk profiling and test design.',
    outputs: ['Early Test Architecture Strategy', 'Risk Assessment Matrix', 'Test Scenarios'],
    artifacts: [
      {
        name: 'Early Test Architecture Strategy',
        githubPath: 'docs/qa/early-test-architecture.md',
        description: 'Comprehensive test strategy and risk assessment for the project',
        highlights: [
          'Risk profiling and high-risk area identification',
          'Test strategy by epic and story',
          'NFR testing approach',
          'Test automation strategy',
          'Quality metrics and success criteria'
        ]
      },
      {
        name: 'QA Gate Example (Story 1.1)',
        githubPath: 'docs/qa/gates/1.1-initialize-vite-project.yml',
        description: 'Example quality gate definition in YAML format',
        highlights: [
          'Story-level quality gates',
          'Acceptance criteria validation',
          'Risk assessment',
          'Test coverage requirements'
        ]
      }
    ]
  },
  {
    id: 'phase-6',
    phase: 'VI. Planning: Validation Gate',
    agentName: 'Sarah',
    agentIcon: '✅',
    agentRole: 'Product Owner',
    primaryFunction: 'Run Master Checklist validation to ensure the PRD and Architecture documents are aligned and complete.',
    outputs: ['Validation Report', 'Conditional Approval or Planning Complete'],
    artifacts: [
      {
        name: 'PRD Checklist Results',
        githubPath: 'docs/prd/checklist-results-report.md',
        description: 'Comprehensive validation of PRD completeness and quality',
        highlights: [
          'Requirements completeness check',
          'Architecture alignment verification',
          'Epic definition validation',
          'Acceptance criteria review',
          'Technical feasibility confirmation'
        ]
      }
    ]
  },
  {
    id: 'phase-7',
    phase: 'VII. Transition & Setup',
    agentName: 'Sarah',
    agentIcon: '📦',
    agentRole: 'Product Owner',
    primaryFunction: 'Copy final documents to the IDE project and shard documents (PRD, Architecture) into smaller, manageable files for development.',
    outputs: ['Sharded Epics and Architecture files in project subdirectories'],
    artifacts: [
      {
        name: 'Sharded PRD Files',
        githubPath: 'docs/prd',
        description: 'Individual epic and requirement files broken down for development',
        highlights: [
          'Epic list with sequencing rationale',
          'Requirements by category',
          'Technical assumptions',
          'UI design goals',
          'Next steps and milestones'
        ]
      },
      {
        name: 'Sharded Architecture Files',
        githubPath: 'docs/architecture',
        description: 'Component and system design split into focused modules',
        highlights: [
          'Tech stack decisions',
          'Coding standards',
          'Component patterns',
          'Data models',
          'Deployment architecture'
        ]
      }
    ]
  },
  {
    id: 'phase-8',
    phase: 'VIII. Execution: Story Drafting',
    agentName: 'Bob',
    agentIcon: '✍️',
    agentRole: 'Scrum Master',
    primaryFunction: 'Draft the next sequential story by combining requirements from the sharded PRD and technical details from the sharded Architecture.',
    outputs: ['Detailed User Story files with tasks, acceptance criteria, and dev notes'],
    artifacts: [
      {
        name: 'Story 1.1 - Initialize Vite Project',
        githubPath: 'docs/stories/1.1.initialize-vite-project.md',
        description: 'Foundation: React + TypeScript + Vite project setup',
        highlights: [
          'Status: Ready for Review ✓',
          'All acceptance criteria met',
          'Tasks completed with validation',
          'TypeScript strict mode configured',
          'Git repository initialized'
        ]
      },
      {
        name: 'Story 1.2 - Install Core Dependencies',
        githubPath: 'docs/stories/1.2.install-core-dependencies.md',
        description: 'Install Tailwind, Shadcn/ui, Zustand, and other core libraries',
        highlights: [
          'Status: Ready for Review ✓',
          'All dependencies installed and configured',
          'Shadcn/ui button component added',
          'Tailwind config complete',
          'Testing framework ready'
        ]
      },
      {
        name: 'Story 1.3 - Setup Project Structure',
        githubPath: 'docs/stories/1.3.setup-project-structure.md',
        description: 'Create folder structure and architectural scaffolding',
        highlights: [
          'Status: Ready for Review ✓',
          'Component architecture established',
          'Folder structure follows best practices',
          'Path aliases configured',
          'Import organization standardized'
        ]
      },
      {
        name: 'Story 1.4 - Generate Demo Data JSON',
        githubPath: 'docs/stories/1.4.generate-demo-data-json.md',
        description: 'Create realistic demo data for 100 agents, schedules, CvD forecast',
        highlights: [
          'Status: Ready for Review ✓',
          '100 agents with skills and shifts',
          'Week-long schedules with activities',
          'CvD forecast data (15-min intervals)',
          'Compliance rules defined'
        ]
      },
      {
        name: 'Story 1.5 - Create App Shell',
        githubPath: 'docs/stories/1.5.create-app-shell.md',
        description: 'Build header, layout, error boundaries, and loading states',
        highlights: [
          'Status: Ready for Review ✓',
          'Responsive header with navigation',
          'Error boundaries for fault tolerance',
          'Loading states and skeleton screens',
          'Accessibility features (skip links, ARIA)'
        ]
      },
      {
        name: 'Story 1.6 - Configure Testing Framework',
        githubPath: 'docs/stories/1.6.configure-testing-framework.md',
        description: 'Setup Vitest with coverage and sample tests',
        highlights: [
          'Status: Ready for Review ✓',
          'Vitest configured with jsdom',
          'Coverage reporting enabled',
          'Sample component tests passing',
          'CI-ready test scripts'
        ]
      },
      {
        name: 'Story 1.7 - Deploy to Vercel',
        githubPath: 'docs/stories/1.7.deploy-to-vercel.md',
        description: 'Connect GitHub repo and deploy to production',
        highlights: [
          'Status: Ready for Review ✓',
          'Live URL: bmad-workforce-one.vercel.app',
          'Auto-deploy on git push configured',
          'Environment variables set',
          'Production build optimized'
        ]
      },
      {
        name: 'Story 1.8 - Create README',
        githubPath: 'docs/stories/1.8.create-readme.md',
        description: 'Project documentation and getting started guide',
        highlights: [
          'Status: Ready for Review ✓',
          'Comprehensive project overview',
          'Installation and setup instructions',
          'Architecture documentation',
          'Contributing guidelines'
        ]
      },
      {
        name: 'Story 2.1 - Coverage Calculator & CvD Data',
        githubPath: 'docs/stories/2.1.coverage-calculator-cvd-data.md',
        description: 'Core algorithm for calculating coverage vs demand metrics',
        highlights: [
          'Epic 2: CvD Heatmap & Coverage Intelligence',
          'Pure function coverage calculator',
          'Service level detection (Green/Yellow/Red)',
          '15-minute interval calculations',
          'Zod schema for CvD data validation'
        ]
      },
      {
        name: 'Story 2.2 - Heatmap Visual Component',
        githubPath: 'docs/stories/2.2.heatmap-visual-component.md',
        description: 'Build interactive 7-day x 96-interval heatmap grid using Recharts',
        highlights: [
          'Recharts heatmap implementation',
          '7 days × 96 intervals (15-min) grid',
          'Color-coded service levels',
          'Responsive design with scroll',
          'Performance optimized for 672 cells'
        ]
      },
      {
        name: 'Story 2.3 - Heatmap Hover Tooltips',
        githubPath: 'docs/stories/2.3.heatmap-hover-tooltips.md',
        description: 'Add hover tooltips showing coverage stats for each cell',
        highlights: [
          'Tooltip with demand, coverage, delta',
          'Service level indicator',
          'Time and date display',
          'Smooth animations',
          'Keyboard accessible'
        ]
      },
      {
        name: 'Story 2.4 - Heatmap Detail Modal',
        githubPath: 'docs/stories/2.4.heatmap-detail-modal.md',
        description: 'Click cells to open modal with detailed coverage breakdown',
        highlights: [
          'Modal dialog with full interval details',
          'Agent list and activity breakdown',
          'Schedule adjustments view',
          'Close on ESC and overlay click',
          'Shadcn Dialog component'
        ]
      },
      {
        name: 'Story 2.5 - Heatmap Page Integration',
        githubPath: 'docs/stories/2.5.heatmap-page-integration.md',
        description: 'Integrate CvD heatmap into main Dashboard page',
        highlights: [
          'Dashboard page with heatmap',
          'Navigation integration',
          'Filter controls for date range',
          'Export functionality (optional)',
          'Responsive layout'
        ]
      },
      {
        name: 'Story 2.6 - Real-time Heatmap Updates',
        githubPath: 'docs/stories/2.6.real-time-heatmap-updates.md',
        description: 'Enable live updates when schedule changes affect coverage',
        highlights: [
          'Zustand state integration',
          'Auto-recalculation on data changes',
          'Optimistic UI updates',
          'Debounced recalculations',
          'Visual update indicators'
        ]
      },
      {
        name: 'Story 2.7 - Heatmap Legend & Color Key',
        githubPath: 'docs/stories/2.7.heatmap-legend-color-key.md',
        description: 'Add legend explaining color meanings and service levels',
        highlights: [
          'Color legend for Green/Yellow/Red zones',
          'Service level thresholds explanation',
          'Interactive legend with hover',
          'Accessibility labels',
          'Compact design'
        ]
      },
      {
        name: 'Story 2.8 - Heatmap Performance Testing',
        githubPath: 'docs/stories/2.8.heatmap-performance-testing.md',
        description: 'Performance optimization and testing for large datasets',
        highlights: [
          'Performance benchmarks and profiling',
          'Memoization for expensive calculations',
          'Virtualization for large grids',
          'Bundle size analysis',
          'Load time optimization'
        ]
      }
    ]
  },
  {
    id: 'phase-9',
    phase: 'IX. Execution: Pre-Code QA',
    agentName: 'Quinn',
    agentIcon: '🔬',
    agentRole: 'QA / Test Architect',
    primaryFunction: 'Validate the draft story with risk assessment and create a test strategy plan for the developer.',
    outputs: ['Test Design Document', 'Risk Profile for each story'],
    artifacts: [
      {
        name: 'Early Test Architecture Strategy',
        githubPath: 'docs/qa/early-test-architecture.md',
        description: 'Test strategy and risk assessment guidance',
        highlights: [
          'Risk assessment matrices',
          'Test coverage requirements',
          'Acceptance criteria validation',
          'NFR compliance checks'
        ]
      },
      {
        name: 'Story 1.4 QA Gate Example',
        githubPath: 'docs/qa/gates/1.4-generate-demo-data-json.yml',
        description: 'Example pre-code QA gate for demo data generation',
        highlights: [
          'Data validation requirements',
          'Schema compliance checks',
          'Performance benchmarks',
          'Test data quality criteria'
        ]
      }
    ]
  },
  {
    id: 'phase-10',
    phase: 'X. Execution: Implementation',
    agentName: 'James',
    agentIcon: '💻',
    agentRole: 'Full Stack Developer',
    primaryFunction: 'Implement the story, following sequential tasks and subtasks, writing tests first (TDD), and running local validations.',
    outputs: ['Implemented code', 'Passing unit tests', 'Updated story with completion notes'],
    artifacts: [
      {
        name: 'Implemented Codebase',
        githubPath: 'wfm-intelligence-demo/src',
        description: 'Full React TypeScript implementation following coding standards',
        highlights: [
          'Type-safe components with strict TypeScript',
          'Zustand stores for state management',
          'Shadcn/ui component library integrated',
          'Vitest tests with >80% coverage',
          'Accessibility features built-in'
        ]
      },
      {
        name: 'Demo Data Generation Scripts',
        githubPath: 'scripts',
        description: 'Node.js scripts for generating realistic demo data',
        highlights: [
          'generateSchedules.js - 100 agents, full week',
          'generateCvdForecast.js - 15-min interval forecasts',
          'validateDemoData.js - Zod schema validation',
          'testLoadPerformance.js - Performance benchmarks'
        ]
      }
    ]
  },
  {
    id: 'phase-11',
    phase: 'XI. Execution: Review Gate',
    agentName: 'Quinn',
    agentIcon: '🎯',
    agentRole: 'QA / Test Architect',
    primaryFunction: 'Perform comprehensive quality assessment and Test Architecture Review, generating a quality gate decision based on risk and NFR compliance.',
    outputs: ['Updated Story QA Results section', 'Quality Gate File (PASS/CONCERNS/FAIL)'],
    artifacts: [
      {
        name: 'Story 1.5 QA Gate Results',
        githubPath: 'docs/qa/gates/1.5-create-app-shell.yml',
        description: 'Example QA gate results for app shell story',
        highlights: [
          'Functional testing results',
          'NFR compliance validation',
          'Accessibility audit results',
          'Performance benchmark results',
          'Code quality metrics'
        ]
      },
      {
        name: 'Story 1.6 QA Gate Results',
        githubPath: 'docs/qa/gates/1.6-configure-testing-framework.yml',
        description: 'QA gate results for testing framework setup',
        highlights: [
          'Test framework validation',
          'Coverage configuration check',
          'CI/CD integration verification',
          'Sample test execution results'
        ]
      }
    ]
  },
  {
    id: 'phase-12',
    phase: 'XII. Completion & Repeat',
    agentName: 'James',
    agentIcon: '🎉',
    agentRole: 'Developer',
    primaryFunction: 'If changes are required, apply fixes based on QA feedback, update gate status, commit changes, and mark the story as done.',
    outputs: ['Story marked Done', 'Repository updated with committed code changes'],
    artifacts: [
      {
        name: 'Git Commit History',
        githubPath: 'commits',
        description: 'Version control showing systematic story progression',
        highlights: [
          'Atomic commits per story',
          'Descriptive commit messages',
          'Co-authored with Claude Code',
          'Linear history with clear progression'
        ]
      },
      {
        name: 'Sprint Summary & Velocity',
        githubPath: 'docs/30-day-validation-sprint.md',
        description: '30-day validation sprint plan and progress tracking',
        highlights: [
          'Sprint goals and milestones',
          'Story completion tracking',
          'Velocity metrics',
          'Retrospective findings'
        ]
      }
    ]
  }
];
