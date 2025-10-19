/**
 * Interactive Mermaid Flowchart Component
 *
 * Renders a clickable flowchart showing all 12 BMad Method phases.
 * When user clicks a phase node, it calls onPhaseClick with the phase ID.
 *
 * DEVELOPERS:
 * - To change colors: Edit themeVariables in useEffect
 * - To change diagram structure: Edit getMermaidDefinition() function
 * - Phase IDs must match those in bmadPhases.ts (e.g., 'phase-1', 'phase-2')
 */

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface BmadFlowDiagramProps {
  onPhaseClick: (phaseId: string) => void; // Callback when user clicks a phase node
}

export function BmadFlowDiagram({ onPhaseClick }: BmadFlowDiagramProps) {
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Mermaid
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis',
      },
      themeVariables: {
        primaryColor: '#0d9488',
        primaryTextColor: '#fff',
        primaryBorderColor: '#0f766e',
        lineColor: '#64748b',
        secondaryColor: '#8b5cf6',
        tertiaryColor: '#3b82f6',
      },
    });

    // Render the diagram
    if (mermaidRef.current) {
      mermaid.render('bmad-flowchart', getMermaidDefinition()).then(({ svg }) => {
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = svg;
          // Note: Phase clicking is now handled via the "All Phases" grid below the diagram
          // The workflow diagram shows the complete process flow with decisions and loops
        }
      });
    }
  }, [onPhaseClick]);

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 shadow-inner">
      <div
        ref={mermaidRef}
        className="mermaid-diagram flex justify-center items-start overflow-x-auto"
        style={{ minHeight: '600px' }}
      />
    </div>
  );
}

function getMermaidDefinition(): string {
  return `
graph TD
    A["Start: Project Idea"] --> B{"Optional: Analyst Research"}
    B -->|Yes| C["Analyst: Brainstorming"]
    B -->|No| G{"Project Brief Available?"}
    C --> C2["Analyst: Market Research"]
    C2 --> C3["Analyst: Competitor Analysis"]
    C3 --> D["Analyst: Create Project Brief"]
    D --> G
    G -->|Yes| E["PM: Create PRD from Brief<br/>Fast Track"]
    G -->|No| E2["PM: Interactive PRD Creation<br/>More Questions"]
    E --> F["PRD Created with FRs, NFRs,<br/>Epics & Stories"]
    E2 --> F
    F --> F2{"UX Required?"}
    F2 -->|Yes| F3["UX Expert: Create Front End Spec"]
    F2 -->|No| H["Architect: Create Architecture<br/>from PRD"]
    F3 --> F4["UX Expert: Generate UI Prompt<br/>for Lovable/V0 (Optional)"]
    F4 --> H2["Architect: Create Architecture<br/>from PRD + UX Spec"]
    H --> Q{"Early Test Strategy?<br/>(Optional)"}
    H2 --> Q
    Q -->|Yes| R["QA: Early Test Architecture Input<br/>on High-Risk Areas"]
    Q -->|No| I["PO: Run Master Checklist"]
    R --> I
    I --> J{"Documents Aligned?"}
    J -->|Yes| K["Planning Complete"]
    J -->|No| L["PO: Update Epics & Stories"]
    L --> M["Update PRD/Architecture<br/>as needed"]
    M --> I
    K --> N["📁 Switch to IDE<br/>(If in Web Agent Platform)"]
    N --> O["PO: Shard Documents"]
    O --> P["Ready for SM/Dev Cycle"]
    P --> P1["SM: Draft Next Story"]
    P1 --> P2["QA: Pre-Code Review"]
    P2 --> P3["Dev: Implement Story"]
    P3 --> P4{"QA Review Gate"}
    P4 -->|Pass| P5["Story Complete"]
    P4 -->|Fail/Concerns| P3
    P5 --> P6{"More Stories?"}
    P6 -->|Yes| P1
    P6 -->|No| END["Project Complete"]

    %% Styling
    classDef start fill:#f5f5f5,color:#000,stroke:#333,stroke-width:2px
    classDef decision fill:#e3f2fd,color:#000,stroke:#1976d2,stroke-width:2px
    classDef analyst fill:#e8f5e9,color:#000,stroke:#388e3c,stroke-width:2px
    classDef pm fill:#fff3e0,color:#000,stroke:#f57c00,stroke-width:2px
    classDef ux fill:#e1f5fe,color:#000,stroke:#0288d1,stroke-width:2px
    classDef architect fill:#f3e5f5,color:#000,stroke:#7b1fa2,stroke-width:2px
    classDef qa fill:#ffd54f,color:#000,stroke:#f57f17,stroke-width:3px
    classDef po fill:#f9ab00,color:#fff,stroke:#e65100,stroke-width:3px
    classDef success fill:#34a853,color:#fff,stroke:#1e7e34,stroke-width:3px
    classDef transition fill:#1a73e8,color:#fff,stroke:#0d47a1,stroke-width:3px
    classDef dev fill:#9c27b0,color:#fff,stroke:#6a1b9a,stroke-width:2px

    class A start
    class B,F2,G,J,Q,P4,P6 decision
    class C,C2,C3,D analyst
    class E,E2,F pm
    class F3,F4 ux
    class H,H2 architect
    class R,P2 qa
    class I,L,O po
    class K,P5,END success
    class M pm
    class N,P transition
    class P1 dev
    class P3 dev
  `;
}
