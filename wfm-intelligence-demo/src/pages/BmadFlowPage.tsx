import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BMAD_PHASES, type PhaseArtifact } from '@/data/bmadPhases';
import { BmadFlowDiagram } from '@/components/BmadFlowDiagram';
import { DocumentViewerModal } from '@/components/DocumentViewerModal';
import { FileText, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

export function BmadFlowPage() {
  const [selectedPhaseId, setSelectedPhaseId] = useState<string | null>(null);
  const [selectedArtifact, setSelectedArtifact] = useState<PhaseArtifact | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedPhase = selectedPhaseId
    ? BMAD_PHASES.find((p) => p.id === selectedPhaseId)
    : null;

  const handlePhaseClick = (phaseId: string) => {
    if (selectedPhaseId === phaseId) {
      setSelectedPhaseId(null); // Collapse if clicking same phase
    } else {
      setSelectedPhaseId(phaseId);
      // Scroll to phase details
      setTimeout(() => {
        document.getElementById('phase-details')?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }, 100);
    }
  };

  const handleArtifactClick = (artifact: PhaseArtifact) => {
    setSelectedArtifact(artifact);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-slate-800 mb-4">
          BMad Method Workflow
        </h1>
        <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
          An interactive visualization of the complete 12-phase BMad methodology.
          Click any phase in the diagram below to explore the actual artifacts
          created during the <strong>BMAD Workforce One</strong> project development.
        </p>
        <div className="mt-6 flex items-center justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-500"></div>
            <span>Planning Phases</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-orange-500"></div>
            <span>Transition</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-teal-500"></div>
            <span>Execution Phases</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-purple-500"></div>
            <span>Quality Gates</span>
          </div>
        </div>
      </div>

      {/* Interactive Mermaid Diagram */}
      <div>
        <BmadFlowDiagram onPhaseClick={handlePhaseClick} />
        <p className="text-center text-sm text-slate-500 mt-3">
          💡 <strong>Tip:</strong> This diagram shows the complete BMad workflow with decision points and feedback loops. Use the phase grid below to view artifacts.
        </p>
      </div>

      {/* Selected Phase Details */}
      {selectedPhase && (
        <div id="phase-details" className="scroll-mt-8">
          <Card className="shadow-xl border-2 border-teal-500 overflow-hidden">
            {/* Phase Header */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{selectedPhase.agentIcon}</span>
                  <div>
                    <h2 className="text-3xl font-bold mb-1">
                      {selectedPhase.phase.split(':')[1] || selectedPhase.phase}
                    </h2>
                    <p className="text-teal-100 text-lg">
                      {selectedPhase.agentRole} - {selectedPhase.agentName}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedPhaseId(null)}
                  className="text-white hover:bg-teal-700"
                >
                  <ChevronUp className="h-5 w-5 mr-2" />
                  Collapse
                </Button>
              </div>
            </div>

            {/* Phase Content */}
            <div className="p-6 space-y-6">
              {/* Primary Function */}
              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  Primary Function
                </h3>
                <p className="text-base text-slate-700 leading-relaxed">
                  {selectedPhase.primaryFunction}
                </p>
              </div>

              {/* Key Outputs */}
              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                  Key Outputs
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedPhase.outputs.map((output, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-3 bg-teal-50 rounded-lg border border-teal-200"
                    >
                      <span className="text-teal-600 font-bold mt-0.5">✓</span>
                      <span className="text-sm text-slate-700">{output}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Artifacts */}
              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
                  Project Artifacts ({selectedPhase.artifacts.length})
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {selectedPhase.artifacts.map((artifact, idx) => (
                    <ArtifactCard
                      key={idx}
                      artifact={artifact}
                      onClick={() => handleArtifactClick(artifact)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* All Phases Quick Reference */}
      <div className="bg-slate-50 rounded-lg p-6">
        <h3 className="text-2xl font-bold text-slate-800 mb-4 text-center">
          All 12 Phases at a Glance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {BMAD_PHASES.map((phase) => (
            <button
              key={phase.id}
              onClick={() => handlePhaseClick(phase.id)}
              className={`text-left p-4 rounded-lg border-2 transition-all ${
                selectedPhaseId === phase.id
                  ? 'border-teal-500 bg-teal-50 shadow-md'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{phase.agentIcon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-500 mb-1">
                    {phase.phase.split(':')[0]}
                  </p>
                  <h4 className="text-sm font-semibold text-slate-800 mb-1">
                    {phase.phase.split(':')[1] || phase.phase}
                  </h4>
                  <p className="text-xs text-slate-600">
                    {phase.agentRole}
                  </p>
                  <p className="text-xs text-teal-600 mt-2">
                    {phase.artifacts.length} artifact{phase.artifacts.length !== 1 ? 's' : ''}
                  </p>
                </div>
                {selectedPhaseId === phase.id && (
                  <ChevronDown className="h-4 w-4 text-teal-600 flex-shrink-0" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">About This Workflow Visualization</h3>
        <div className="space-y-3 text-blue-50 leading-relaxed">
          <p>
            This interactive diagram showcases the complete BMad Method workflow used to
            build the <strong className="text-white">BMAD Workforce One WFM Intelligence Demo</strong>.
            Every phase displays <strong className="text-white">real artifacts</strong> created
            during actual development.
          </p>
          <p>
            The BMad Method emphasizes systematic progression from planning through execution,
            with quality gates, validation checkpoints, and iterative development. Each phase
            has a designated agent (Analyst, PM, UX, Architect, QA, PO, SM, Developer) responsible
            for specific deliverables.
          </p>
          <p className="text-sm">
            <strong>Tip:</strong> Click any artifact to view the full document with all details.
            Documents are loaded directly from the GitHub repository.
          </p>
        </div>
      </div>

      {/* Document Viewer Modal */}
      <DocumentViewerModal
        artifact={selectedArtifact}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

interface ArtifactCardProps {
  artifact: PhaseArtifact;
  onClick: () => void;
}

function ArtifactCard({ artifact, onClick }: ArtifactCardProps) {
  return (
    <button
      onClick={onClick}
      className="text-left w-full p-4 rounded-lg border-2 border-slate-200 bg-white hover:border-teal-400 hover:shadow-md transition-all group"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-5 w-5 text-teal-600 flex-shrink-0" />
            <h4 className="text-base font-semibold text-slate-800 group-hover:text-teal-700">
              {artifact.name}
            </h4>
            {artifact.size && (
              <span className="text-xs font-medium text-teal-600 bg-teal-50 px-2 py-0.5 rounded">
                {artifact.size}
              </span>
            )}
          </div>
          <p className="text-sm text-slate-600 mb-3">{artifact.description}</p>

          {artifact.highlights && artifact.highlights.length > 0 && (
            <div className="space-y-1.5">
              {artifact.highlights.slice(0, 3).map((highlight, idx) => (
                <div
                  key={idx}
                  className="text-xs text-slate-600 flex items-start gap-1.5"
                >
                  <span className="text-teal-500 mt-0.5 flex-shrink-0">•</span>
                  <span className="line-clamp-1">{highlight}</span>
                </div>
              ))}
              {artifact.highlights.length > 3 && (
                <p className="text-xs text-teal-600 italic">
                  +{artifact.highlights.length - 3} more highlights...
                </p>
              )}
            </div>
          )}
        </div>
        <ExternalLink className="h-5 w-5 text-slate-400 group-hover:text-teal-600 flex-shrink-0" />
      </div>
    </button>
  );
}
