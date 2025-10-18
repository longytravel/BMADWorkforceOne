import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-slate-800">
          WFM Scheduling Demo
        </h1>
        <div className="text-sm text-slate-500">
          Ready for Development
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome to the WFM Intelligence Demo</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 mb-4">
            This is a placeholder dashboard that will be replaced with actual
            scheduling features in upcoming stories.
          </p>
          <div className="bg-slate-50 p-4 rounded border border-slate-200">
            <p className="text-sm text-slate-700 font-medium mb-2">
              App Status: Initialized
            </p>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>✓ Vite + React + TypeScript configured</li>
              <li>✓ Tailwind CSS + Shadcn/ui installed</li>
              <li>✓ App shell and layout components created</li>
              <li>⏳ Demo data loading (coming soon)</li>
              <li>⏳ Calendar view (coming soon)</li>
              <li>⏳ CvD heatmap (coming soon)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
