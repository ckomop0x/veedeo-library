import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Nav from './Nav';

describe('Nav component', () => {
  it('renders the site title', () => {
    render(<Nav />);
    expect(screen.getByText(/Veedeo Library/i)).toBeInTheDocument();
  });

  it('renders the home link correctly', () => {
    render(<Nav />);
    const homeLink = screen.getByRole('link', { name: /Veedeo Library/i });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders the ThemeToggle component', () => {
    render(<Nav />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
