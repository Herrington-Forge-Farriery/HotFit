import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Scanner from '../../src/components/scanner'
import * as useOfflineScansModule from '../../src/hooks/useOfflineScans';

describe('Scanner component', () => {
  const addScanMock = vi.fn();

  beforeEach(() => {
    vi.spyOn(useOfflineScansModule, 'useOfflineScans').mockReturnValue({ addScan: addScanMock });
    addScanMock.mockClear();
  });

  it('renders input and button', () => {
    render(<Scanner action="TEST_ACTION" />);
    expect(screen.getByPlaceholderText(/scan or enter code/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit scan/i })).toBeInTheDocument();
  });

  it('calls addScan with code and action on submit', () => {
    render(<Scanner action="TEST_ACTION" />);
    fireEvent.change(screen.getByPlaceholderText(/scan or enter code/i), { target: { value: 'ABC123' } });
    fireEvent.click(screen.getByRole('button', { name: /submit scan/i }));
    expect(addScanMock).toHaveBeenCalledTimes(1);
    expect(addScanMock).toHaveBeenCalledWith('ABC123', 'TEST_ACTION');
  });
});
