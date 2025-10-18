import React from 'react';
import { Header } from './Header';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="bg-slate-100 py-4 text-center text-sm text-slate-600">
        WFM Intelligence Demo v2.0 | Built October 2025
      </footer>
    </div>
  );
}
