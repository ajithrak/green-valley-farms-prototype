import React from 'react';

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // Hook up an error reporter (e.g. Sentry) here in production.
    console.error('Unhandled UI error', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="min-h-screen flex items-center justify-center p-6 text-center">
          <div className="max-w-sm space-y-3">
            <h1 className="font-serif text-2xl font-bold text-[#0F261E]">Something went wrong</h1>
            <p className="text-sm text-gray-600">Please refresh the page. If the problem continues, contact support.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-xl bg-[#1E4A3B] text-white text-sm font-bold min-h-[44px]"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
