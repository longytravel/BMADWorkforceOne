import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeatmapLegend } from './HeatmapLegend';

describe('HeatmapLegend', () => {
  it('should render legend title', () => {
    render(<HeatmapLegend />);
    expect(screen.getByText(/Coverage Risk Levels/i)).toBeInTheDocument();
  });

  it('should render three legend items', () => {
    const { container } = render(<HeatmapLegend />);
    const legendItems = container.querySelectorAll('li');
    expect(legendItems).toHaveLength(3);
  });

  it('should display correct labels and descriptions', () => {
    render(<HeatmapLegend />);

    expect(screen.getByText(/Safe/i)).toBeInTheDocument();
    expect(screen.getByText(/>105% coverage/i)).toBeInTheDocument();

    expect(screen.getByText(/Caution/i)).toBeInTheDocument();
    expect(screen.getByText(/90-105% coverage/i)).toBeInTheDocument();

    expect(screen.getByText('Risk')).toBeInTheDocument();
    expect(screen.getByText(/<90% coverage/i)).toBeInTheDocument();
  });

  it('should apply correct colors to swatches', () => {
    const { container } = render(<HeatmapLegend />);

    const swatches = container.querySelectorAll('.w-4.h-4.rounded');

    expect(swatches).toHaveLength(3);
    expect(swatches[0]).toHaveStyle({ backgroundColor: 'rgb(16, 185, 129)' }); // Green
    expect(swatches[1]).toHaveStyle({ backgroundColor: 'rgb(251, 191, 36)' }); // Yellow
    expect(swatches[2]).toHaveStyle({ backgroundColor: 'rgb(239, 68, 68)' }); // Red
  });

  it('should have proper accessibility attributes', () => {
    const { container } = render(<HeatmapLegend />);

    const region = container.querySelector('[role="region"]');
    expect(region).toBeInTheDocument();
    expect(region).toHaveAttribute('aria-label', 'Coverage risk level legend');

    const title = screen.getByText(/Coverage Risk Levels/i);
    expect(title).toHaveAttribute('id', 'legend-title');

    const list = container.querySelector('ul');
    expect(list).toHaveAttribute('aria-labelledby', 'legend-title');
  });

  it('should render color swatches with aria-hidden', () => {
    const { container } = render(<HeatmapLegend />);

    const swatches = container.querySelectorAll('[style*="backgroundColor"]');
    swatches.forEach((swatch) => {
      expect(swatch).toHaveAttribute('aria-hidden', 'true');
    });
  });
});
