import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Dashboard } from './Dashboard';

// Mock the CvDHeatmap component to avoid complex nested dependencies
vi.mock('@/components/CvDHeatmap', () => ({
  CvDHeatmap: () => <div data-testid="cvd-heatmap">Mocked Heatmap</div>,
}));

describe('Dashboard', () => {
  const originalTitle = document.title;

  beforeEach(() => {
    document.title = originalTitle;
  });

  afterEach(() => {
    document.title = originalTitle;
  });

  it('renders page title', () => {
    render(<Dashboard />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Capacity vs Demand Heatmap'
    );
  });

  it('renders subtitle with description', () => {
    render(<Dashboard />);
    expect(
      screen.getByText(/Real-time coverage visualization across 7 days/i)
    ).toBeInTheDocument();
  });

  it('sets document title for accessibility', () => {
    render(<Dashboard />);
    expect(document.title).toBe('CvD Heatmap - WFM Intelligence Demo');
  });

  it('has proper ARIA label for accessibility', () => {
    render(<Dashboard />);
    const mainContainer = screen.getByRole('main');
    expect(mainContainer).toHaveAttribute(
      'aria-label',
      'Capacity vs Demand Dashboard'
    );
  });

  it('renders CvDHeatmap component', () => {
    render(<Dashboard />);
    expect(screen.getByTestId('cvd-heatmap')).toBeInTheDocument();
  });

  it('has responsive container with overflow handling', () => {
    const { container } = render(<Dashboard />);
    const heatmapContainer = container.querySelector('.overflow-x-auto');
    expect(heatmapContainer).toBeInTheDocument();
  });

  it('applies proper styling for responsive layout', () => {
    const { container } = render(<Dashboard />);
    const mainDiv = container.querySelector('.space-y-6');
    expect(mainDiv).toBeInTheDocument();
  });

  it('has shadow and rounded container for visual hierarchy', () => {
    const { container } = render(<Dashboard />);
    const heatmapCard = container.querySelector('.shadow-lg.rounded-lg');
    expect(heatmapCard).toBeInTheDocument();
  });
});
