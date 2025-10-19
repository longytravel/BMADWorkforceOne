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

          // Add click handlers to nodes
          const nodes = mermaidRef.current.querySelectorAll('.node');
          nodes.forEach((node) => {
            const nodeElement = node as HTMLElement;
            const nodeId = nodeElement.id;

            // Extract phase number from node ID (e.g., "flowchart-phase-1-XX" -> "phase-1")
            const match = nodeId.match(/flowchart-(phase-\d+)/);
            if (match) {
              const phaseId = match[1];
              nodeElement.style.cursor = 'pointer';
              nodeElement.addEventListener('click', () => {
                onPhaseClick(phaseId);
              });
            }
          });
        }
      });
    }
  }, [onPhaseClick]);

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 shadow-inner">
      <div ref={mermaidRef} className="mermaid-diagram" />
    </div>
  );
}

function getMermaidDefinition(): string {
  return `
flowchart TB
    start([Start BMad Method])

    %% Planning Phase
    phase-1[I. Project Definition<br/>📊 Mary - Analyst<br/>Brainstorming & Research]
    phase-2[II. Requirements<br/>📋 John - PM<br/>PRD Creation]
    phase-3[III. UI/UX Design<br/>🎨 Sally - UX Expert<br/>Design System]
    phase-4[IV. Architecture<br/>🏗️ Winston - Architect<br/>Tech Stack]
    phase-5[V. Early QA/Risk<br/>🔍 Quinn - QA<br/>Test Strategy]
    phase-6[VI. Validation Gate<br/>✅ Sarah - PO<br/>Approval]

    %% Transition
    phase-7[VII. Transition & Setup<br/>📦 Sarah - PO<br/>Document Sharding]

    %% Execution Phase
    phase-8[VIII. Story Drafting<br/>✍️ Bob - SM<br/>User Stories]
    phase-9[IX. Pre-Code QA<br/>🔬 Quinn - QA<br/>Risk Assessment]
    phase-10[X. Implementation<br/>💻 James - Dev<br/>Code & Tests]
    phase-11[XI. Review Gate<br/>🎯 Quinn - QA<br/>Quality Check]
    phase-12[XII. Completion<br/>🎉 James - Dev<br/>Done & Repeat]

    done([Story Complete])

    %% Flow connections
    start --> phase-1
    phase-1 --> phase-2
    phase-2 --> phase-3
    phase-3 --> phase-4
    phase-4 --> phase-5
    phase-5 --> phase-6
    phase-6 --> phase-7
    phase-7 --> phase-8
    phase-8 --> phase-9
    phase-9 --> phase-10
    phase-10 --> phase-11
    phase-11 -.Pass.-> phase-12
    phase-11 -.Concerns/Fail.-> phase-10
    phase-12 -.Next Story.-> phase-8
    phase-12 --> done

    %% Styling
    classDef planning fill:#3b82f6,stroke:#1e40af,stroke-width:3px,color:#fff
    classDef execution fill:#0d9488,stroke:#0f766e,stroke-width:3px,color:#fff
    classDef gate fill:#8b5cf6,stroke:#6d28d9,stroke-width:3px,color:#fff
    classDef transition fill:#f59e0b,stroke:#d97706,stroke-width:3px,color:#fff

    class phase-1,phase-2,phase-3,phase-4,phase-5 planning
    class phase-6,phase-11 gate
    class phase-7 transition
    class phase-8,phase-9,phase-10,phase-12 execution

    linkStyle default stroke:#64748b,stroke-width:2px
    linkStyle 12,13,14 stroke:#dc2626,stroke-width:2px,stroke-dasharray:5
  `;
}
