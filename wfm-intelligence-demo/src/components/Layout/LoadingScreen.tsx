export function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        {/* Spinner */}
        <div className="inline-block mb-4">
          <div className="w-16 h-16 border-4 border-slate-200 border-t-teal-500 rounded-full animate-spin" />
        </div>

        {/* Loading message with ARIA live region for screen readers */}
        <p
          className="text-lg text-slate-600"
          role="status"
          aria-live="polite"
          aria-label="Loading demo data"
        >
          Loading demo data...
        </p>

        {/* Skeleton UI - subtle secondary feedback */}
        <div className="mt-8 space-y-3 w-64 mx-auto">
          <div className="h-4 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 bg-slate-200 rounded animate-pulse w-5/6" />
          <div className="h-4 bg-slate-200 rounded animate-pulse w-4/6" />
        </div>
      </div>
    </div>
  );
}
