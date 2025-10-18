import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingScreen } from './LoadingScreen';

describe('LoadingScreen', () => {
  it('renders loading message', () => {
    render(<LoadingScreen />);
    expect(screen.getByText(/loading demo data/i)).toBeInTheDocument();
  });

  it('has aria-live region for accessibility', () => {
    render(<LoadingScreen />);
    const loadingElement = screen.getByRole('status');
    expect(loadingElement).toHaveAttribute('aria-live', 'polite');
  });

  it('has proper aria-label for screen readers', () => {
    render(<LoadingScreen />);
    const loadingElement = screen.getByRole('status');
    expect(loadingElement).toHaveAttribute('aria-label', 'Loading demo data');
  });
});
