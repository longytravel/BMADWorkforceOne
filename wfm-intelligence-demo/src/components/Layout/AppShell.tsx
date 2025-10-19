import React from 'react';
import { Header } from './Header';

interface AppShellProps {
  children: React.ReactNode;
  currentPage: 'dashboard' | 'bmad-video' | 'bmad-flow';
  onNavigate: (page: 'dashboard' | 'bmad-video' | 'bmad-flow') => void;
}

export function AppShell({ children, currentPage, onNavigate }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage={currentPage} onNavigate={onNavigate} />
      <main id="main-content" className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="bg-slate-100 py-4 text-center text-sm text-slate-600">
        WFM Intelligence Demo v2.0 | Built October 2025
      </footer>
    </div>
  );
}
