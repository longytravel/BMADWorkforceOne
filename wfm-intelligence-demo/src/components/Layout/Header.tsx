interface HeaderProps {
  currentPage: 'dashboard' | 'bmad-video' | 'bmad-flow';
  onNavigate: (page: 'dashboard' | 'bmad-video' | 'bmad-flow') => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <>
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-teal-500 focus:text-white focus:rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
      >
        Skip to main content
      </a>

      <header className="bg-slate-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* App Title */}
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold">
                Intelligent WFM Scheduling Demo
              </h1>
            </div>

            {/* Navigation */}
            <nav aria-label="Main navigation" className="flex items-center gap-6">
              <button
                onClick={() => onNavigate('bmad-video')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  currentPage === 'bmad-video'
                    ? 'bg-teal-600 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-600'
                }`}
                aria-current={currentPage === 'bmad-video' ? 'page' : undefined}
              >
                BMad Video
              </button>
              <button
                onClick={() => onNavigate('bmad-flow')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  currentPage === 'bmad-flow'
                    ? 'bg-teal-600 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-600'
                }`}
                aria-current={currentPage === 'bmad-flow' ? 'page' : undefined}
              >
                BMad Flow
              </button>
              <button
                onClick={() => onNavigate('dashboard')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  currentPage === 'dashboard'
                    ? 'bg-teal-600 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-600'
                }`}
                aria-current={currentPage === 'dashboard' ? 'page' : undefined}
              >
                Heatmap Demo
              </button>
            </nav>

            {/* Version info */}
            <div className="text-sm text-slate-300">
              v2.0
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
