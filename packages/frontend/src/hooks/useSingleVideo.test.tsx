import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import useSingleVideo from '@/hooks/useSingleVideo';
import { fetchSingleVideo, clearSingleVideo } from '@/redux/singleVideoSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';

vi.mock('@/hooks/reduxHooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('@/redux/singleVideoSlice', () => ({
  fetchSingleVideo: vi.fn(),
  clearSingleVideo: vi.fn(),
}));

describe('useSingleVideo hook', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    vi.mocked(useAppSelector).mockReturnValue({
      video: null,
      loading: false,
      error: null,
    });
    mockDispatch.mockClear();
  });

  it('dispatches fetchSingleVideo on mount', () => {
    renderHook(() => useSingleVideo('v-001'));
    expect(mockDispatch).toHaveBeenCalledWith(fetchSingleVideo('v-001'));
  });

  it('dispatches clearSingleVideo on unmount', () => {
    const { unmount } = renderHook(() => useSingleVideo('v-001'));
    unmount();
    expect(mockDispatch).toHaveBeenCalledWith(clearSingleVideo());
  });

  it('returns correct Redux state', () => {
    vi.mocked(useAppSelector).mockReturnValue({
      video: { id: 'v-001', title: 'Test Video' },
      loading: false,
      error: null,
    });

    const { result } = renderHook(() => useSingleVideo('v-001'));
    expect(result.current.video).toEqual({ id: 'v-001', title: 'Test Video' });
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });
});
