import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import VideosSearch from './VideosSearch';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';

vi.mock('@/hooks/reduxHooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

describe('VideosSearch component', () => {
  let mockDispatch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockDispatch = vi.fn();
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    vi.mocked(useAppSelector).mockReturnValue({
      query: {
        search: '',
        sortBy: 'newest',
        tags: '',
        startDate: '',
        endDate: '',
        page: 1,
      },
    });

    mockDispatch.mockClear();
  });

  it('renders search input field', () => {
    render(<VideosSearch />);
    expect(screen.getByPlaceholderText(/Search videos/i)).toBeInTheDocument();
  });

  it('renders sort select field', () => {
    render(<VideosSearch />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders tags input field', () => {
    render(<VideosSearch />);
    expect(screen.getByPlaceholderText(/Search tags/i)).toBeInTheDocument();
  });

  it('renders date input fields', () => {
    render(<VideosSearch />);
    expect(screen.getByText(/From/i)).toBeInTheDocument();
    expect(screen.getByText(/To/i)).toBeInTheDocument();
  });

  it('renders Clear and Search buttons', () => {
    render(<VideosSearch />);
    expect(screen.getByRole('button', { name: /Clear/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
  });

  it('updates search input value on user input', () => {
    render(<VideosSearch />);
    const searchInput = screen.getByPlaceholderText(/Search videos/i);
    fireEvent.change(searchInput, { target: { value: ' React' } });
    expect(searchInput).toHaveValue('React');
  });

  it('updates tags input value on user input', () => {
    render(<VideosSearch />);
    const tagsInput = screen.getByPlaceholderText(/Search tags/i);
    fireEvent.change(tagsInput, { target: { value: ' JavaScript, Node.js ' } });
    expect(tagsInput).toHaveValue('JavaScript, Node.js ');
  });

  it('dispatches actions when form is submitted', () => {
    render(<VideosSearch />);
    const searchButton = screen.getByRole('button', { name: /Search/i });
    fireEvent.click(searchButton);
    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });

  it('dispatches actions when "Clear" button is clicked', () => {
    render(<VideosSearch />);
    const clearButton = screen.getByRole('button', { name: /Clear/i });
    fireEvent.click(clearButton);
    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });
});
