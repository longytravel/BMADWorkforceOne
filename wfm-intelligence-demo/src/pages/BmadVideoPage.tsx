/**
 * BMad Method Introduction Video Page
 *
 * Displays the BMad Method overview video with a professional layout.
 * This page serves as an introduction to the BMad methodology before
 * users explore the detailed workflow diagram.
 */

export function BmadVideoPage() {
  return (
    <div className="max-w-6xl mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-slate-800 mb-4">
          The BMad Method
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Watch this introduction video to learn how the BMad Method transforms
          project planning and execution through AI-powered agent collaboration.
        </p>
      </div>

      {/* Video Player */}
      <div className="bg-slate-900 rounded-lg shadow-2xl overflow-hidden">
        <video
          controls
          className="w-full aspect-video"
          poster="/video-poster.jpg"
          preload="metadata"
        >
          <source src="/The_BMad_Method.mp4" type="video/mp4" />
          <p className="text-white p-8">
            Your browser does not support the video tag.
            <a
              href="/The_BMad_Method.mp4"
              download
              className="text-teal-400 hover:text-teal-300 underline ml-2"
            >
              Download the video
            </a>
            to watch it.
          </p>
        </video>
      </div>

      {/* Video Description */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          What You'll Learn
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📊</span>
              <div>
                <h3 className="font-semibold text-slate-800">Planning Phase</h3>
                <p className="text-sm text-slate-600">
                  How Business Analysts, Product Managers, UX Experts, and Architects
                  collaborate to create comprehensive project documentation
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔍</span>
              <div>
                <h3 className="font-semibold text-slate-800">Quality Gates</h3>
                <p className="text-sm text-slate-600">
                  Built-in validation checkpoints ensure alignment between PRD,
                  architecture, and implementation at every step
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💻</span>
              <div>
                <h3 className="font-semibold text-slate-800">Execution Phase</h3>
                <p className="text-sm text-slate-600">
                  Scrum Masters, QA Engineers, and Developers work together with
                  continuous testing and iterative feedback loops
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎯</span>
              <div>
                <h3 className="font-semibold text-slate-800">AI-Powered</h3>
                <p className="text-sm text-slate-600">
                  Each specialized agent brings domain expertise, powered by Claude
                  Code, to deliver high-quality results faster
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-lg p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to See It in Action?</h2>
        <p className="text-lg text-teal-50 mb-6 max-w-2xl mx-auto">
          After watching the video, explore the interactive workflow diagram to see
          how each phase connects and discover the real artifacts created during
          the BMAD Workforce One project development.
        </p>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            // Navigation will be handled by parent component
            const event = new CustomEvent('navigate', { detail: { page: 'bmad-flow' } });
            window.dispatchEvent(event);
          }}
          className="inline-block bg-white text-teal-600 font-semibold px-8 py-3 rounded-lg hover:bg-teal-50 transition-colors shadow-lg"
        >
          View Interactive Workflow →
        </a>
      </div>

      {/* Additional Resources */}
      <div className="border-t border-slate-200 pt-8">
        <h3 className="text-xl font-semibold text-slate-800 mb-4 text-center">
          Learn More About BMad Method
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-white rounded-lg border border-slate-200 hover:border-teal-400 transition-colors">
            <span className="text-3xl mb-2 block">📋</span>
            <h4 className="font-semibold text-slate-800 mb-1">Documentation</h4>
            <p className="text-sm text-slate-600">
              Comprehensive guides and best practices
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-slate-200 hover:border-teal-400 transition-colors">
            <span className="text-3xl mb-2 block">🎨</span>
            <h4 className="font-semibold text-slate-800 mb-1">Templates</h4>
            <p className="text-sm text-slate-600">
              Ready-to-use PRD, architecture, and story templates
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-slate-200 hover:border-teal-400 transition-colors">
            <span className="text-3xl mb-2 block">🤝</span>
            <h4 className="font-semibold text-slate-800 mb-1">Community</h4>
            <p className="text-sm text-slate-600">
              Join other teams using BMad Method
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
