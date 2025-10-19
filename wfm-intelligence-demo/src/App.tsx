import { useState, useEffect } from 'react';
import { AppShell, ErrorBoundary, ErrorScreen, LoadingScreen } from '@/components/Layout';
import { Dashboard } from '@/components/Dashboard';
import { BmadFlowPage } from '@/pages/BmadFlowPage';
import { loadAllDemoData } from '@/services/loadDemoData';
import { useAppStore } from '@/stores/appStore';
import type { Agent, Activity, CvDDataPoint, ComplianceRule } from '@/types';

type Page = 'dashboard' | 'bmad-flow';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const setAgents = useAppStore((state) => state.setAgents);
  const setActivities = useAppStore((state) => state.setActivities);
  const setCvdData = useAppStore((state) => state.setCvdData);
  const setComplianceRules = useAppStore((state) => state.setComplianceRules);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load all demo data
        const { data } = await loadAllDemoData();

        // Populate Zustand store
        setAgents(data.agents as unknown as Agent[]);
        setActivities(data.schedules as unknown as Activity[]);
        setCvdData(data.cvdForecast as unknown as CvDDataPoint[]);
        setComplianceRules(data.complianceRules as unknown as ComplianceRule[]);

        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load demo data'));
        setIsLoading(false);
      }
    };

    loadData();
  }, [setAgents, setActivities, setCvdData, setComplianceRules]);

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
