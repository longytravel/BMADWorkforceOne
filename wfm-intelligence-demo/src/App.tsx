import { useState, useEffect } from 'react';
import { AppShell, ErrorBoundary, ErrorScreen, LoadingScreen } from '@/components/Layout';
import { Dashboard } from '@/components/Dashboard';
import { BmadFlowPage } from '@/pages/BmadFlowPage';

type Page = 'dashboard' | 'bmad-flow';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  useEffect(() => {
    // Simulate data loading - will be replaced with actual data loading in future stories
    const loadDemoData = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Data loading will be implemented in Story 1.4
        // For now, just succeed after delay
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load demo data'));
        setIsLoading(false);
      }
    };

    loadDemoData();
  }, []);

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    // Reload the page to retry
    window.location.reload();
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} onRetry={handleRetry} />;
  }

  return (
    <ErrorBoundary>
      <AppShell currentPage={currentPage} onNavigate={handleNavigate}>
        {currentPage === 'dashboard' ? <Dashboard /> : <BmadFlowPage />}
      </AppShell>
    </ErrorBoundary>
  );
}

export default App;
