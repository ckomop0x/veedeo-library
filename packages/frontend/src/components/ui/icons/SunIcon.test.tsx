import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SunIcon from './SunIcon';

describe('SunIcon Component', () => {
  it('renders correctly', () => {
    render(<SunIcon />);
    const svgElement = screen.getByRole('img', { hidden: true });
    expect(svgElement).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<SunIcon className="custom-class" />);
    const svgElement = screen.getByRole('img', { hidden: true });
    expect(svgElement).toHaveClass('custom-class');
  });

  it('sets title when provided', () => {
    render(<SunIcon title="Light Mode Icon" />);
    expect(screen.getByTitle('Light Mode Icon')).toBeInTheDocument();
  });

  it('sets default title if none provided', () => {
    render(<SunIcon />);
    expect(screen.getByTitle('Sun Icon')).toBeInTheDocument();
  });
});
