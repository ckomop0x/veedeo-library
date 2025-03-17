import { describe, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DateRange from '@/components/DateRange/DateRange';

describe('DateRange component', () => {
  const mockOnStartDateChange = vi.fn();
  const mockOnEndDateChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders date inputs', () => {
    render(
      <DateRange
        startDate="03/16/2024"
        endDate="03/20/2024"
        onStartDateChange={mockOnStartDateChange}
        onEndDateChange={mockOnEndDateChange}
      />,
    );

    expect(screen.getByLabelText(/From/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/To/i)).toBeInTheDocument();
  });

  it('updates start date input value', () => {
    render(
      <DateRange
        startDate=""
        endDate=""
        onStartDateChange={mockOnStartDateChange}
        onEndDateChange={mockOnEndDateChange}
      />,
    );

    const startDateInput = screen.getByLabelText(/From/i);
    fireEvent.change(startDateInput, { target: { value: '16/03/2024' } });

    expect(mockOnStartDateChange).toHaveBeenCalledWith('03/16/2024');
  });

  it('updates end date input value', () => {
    render(
      <DateRange
        startDate=""
        endDate=""
        onStartDateChange={mockOnStartDateChange}
        onEndDateChange={mockOnEndDateChange}
      />,
    );

    const endDateInput = screen.getByLabelText(/To/i);
    fireEvent.change(endDateInput, { target: { value: '20/03/2024' } });

    expect(mockOnEndDateChange).toHaveBeenCalledWith('03/20/2024');
  });

  it('calls onStartDateChange when a date is selected', () => {
    render(
      <DateRange
        startDate=""
        endDate=""
        onStartDateChange={mockOnStartDateChange}
        onEndDateChange={mockOnEndDateChange}
      />,
    );

    const startDateInput = screen.getByLabelText(/From/i);
    fireEvent.change(startDateInput, { target: { value: '10/03/2024' } });

    expect(mockOnStartDateChange).toHaveBeenCalledTimes(1);
  });

  it('calls onEndDateChange when a date is selected', () => {
    render(
      <DateRange
        startDate=""
        endDate=""
        onStartDateChange={mockOnStartDateChange}
        onEndDateChange={mockOnEndDateChange}
      />,
    );

    const endDateInput = screen.getByLabelText(/To/i);
    fireEvent.change(endDateInput, { target: { value: '15/03/2024' } });

    expect(mockOnEndDateChange).toHaveBeenCalledTimes(1);
  });
});
