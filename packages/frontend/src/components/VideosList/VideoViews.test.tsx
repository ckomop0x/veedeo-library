import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import VideoViews from './VideoViews';

describe('VideoViews component', () => {
  it('renders the view count correctly', () => {
    render(<VideoViews views={123456} />);
    expect(screen.getByText('123,456')).toBeInTheDocument();
  });

  it('renders the eye icon', () => {
    render(<VideoViews views={123456} />);
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  it('sets the correct title attribute', () => {
    render(<VideoViews views={123456} />);
    expect(screen.getByTitle('Views: 123,456')).toBeInTheDocument();
  });
});
