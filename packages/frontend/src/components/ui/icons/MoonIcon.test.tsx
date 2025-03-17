import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MoonIcon from './MoonIcon';

describe('MoonIcon Component', () => {
  it('renders correctly', () => {
    render(<MoonIcon />);
    const svgElement = screen.getByRole('img', { hidden: true });
    expect(svgElement).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<MoonIcon className="custom-class" />);
    const svgElement = screen.getByRole('img', { hidden: true });
    expect(svgElement).toHaveClass('custom-class');
  });

  it('sets title when provided', () => {
    render(<MoonIcon title="Dark Mode Icon" />);
    expect(screen.getByTitle('Dark Mode Icon')).toBeInTheDocument();
  });

  it('sets default title if none provided', () => {
    render(<MoonIcon />);
    expect(screen.getByTitle('Moon Icon')).toBeInTheDocument();
  });
});
