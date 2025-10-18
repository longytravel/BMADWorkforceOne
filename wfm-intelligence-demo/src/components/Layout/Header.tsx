export function Header() {
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

            {/* Navigation placeholder - will be filled in future stories */}
            <nav aria-label="Main navigation" className="flex items-center gap-6">
              {/* Empty for now, populated in later stories */}
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
