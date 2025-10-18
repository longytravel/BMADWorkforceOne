interface ErrorScreenProps {
  error: Error;
  onRetry: () => void;
}

export function ErrorScreen({ error, onRetry }: ErrorScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="max-w-lg text-center p-8 bg-white rounded-lg shadow-lg">
        <div className="mb-4 text-orange-500">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-semibold text-slate-800 mb-2">
          Failed to Load Demo Data
        </h1>

        <p className="text-slate-600 mb-4">
          We encountered an error while loading the demo data files. This might
          be due to missing JSON files or network issues.
        </p>

        {/* Specific error details */}
        <div className="mb-6 text-left bg-slate-100 p-4 rounded">
          <p className="text-sm font-medium text-slate-700 mb-1">
            Error Details:
          </p>
          <code className="text-sm text-red-600 break-all">
            {error.message}
          </code>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={onRetry}
            className="px-6 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 transition-colors"
          >
            Retry
          </button>
          <a
            href="https://github.com/yourusername/wfm-demo"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 transition-colors"
          >
            View Documentation
          </a>
        </div>

        {/* Helpful hint */}
        <p className="mt-6 text-sm text-slate-500">
          Tip: Ensure all JSON files are present in the{' '}
          <code className="bg-slate-200 px-1 rounded">/public/data</code>{' '}
          directory.
        </p>
      </div>
    </div>
  );
}
