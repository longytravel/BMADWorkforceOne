import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details to console for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    // Clear state and reload
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="max-w-md text-center p-8 bg-white rounded-lg shadow-lg">
            <div className="mb-4 text-red-500">
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-semibold text-slate-800 mb-2">
              Something went wrong
            </h1>

            <p className="text-slate-600 mb-6">
              The application encountered an unexpected error. Please try
              resetting the demo.
            </p>

            {this.state.error && (
              <details className="mb-6 text-left bg-slate-100 p-4 rounded text-sm">
                <summary className="cursor-pointer font-medium text-slate-700 mb-2">
                  Error Details
                </summary>
                <code className="text-red-600 text-xs break-all">
                  {this.state.error.toString()}
                </code>
              </details>
            )}

            <button
              onClick={this.handleReset}
              className="px-6 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 transition-colors"
            >
              Reset Demo
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
