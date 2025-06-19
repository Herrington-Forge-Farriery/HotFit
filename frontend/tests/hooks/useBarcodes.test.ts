// File: frontend/tests/hooks/useBarcodes.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useBarcodes } from '../../src/hooks/useBarcodes';
import { db } from '../../src/db';

describe('useBarcodes hook', () => {
  beforeEach(async () => {
    await db.barcodes.clear();
  });

  it('starts with no barcodes', async () => {
    const { result } = renderHook(() => useBarcodes());
    await waitFor(() => {
      expect(result.current.barcodes).toEqual([]);
    });
  });

  it('can add a new barcode', async () => {
    const { result } = renderHook(() => useBarcodes());

    // Add a barcode and wait for state update
    await act(async () => {
      await result.current.addBarcode({ code: 'C123', type: 'CLIENT', label: 'Client A' });
    });
    
    await waitFor(() => {
      expect(result.current.barcodes).toHaveLength(1);
      expect(result.current.barcodes[0]).toMatchObject({
        code: 'C123',
        type: 'CLIENT',
        label: 'Client A',
        active: true
      });
    });
  });

  it('can toggle active flag', async () => {
    const { result } = renderHook(() => useBarcodes());

    // Create initial barcode
    await act(async () => {
      await result.current.addBarcode({ code: 'B1', type: 'HORSE', label: 'Horse X' });
    });
    await waitFor(() => result.current.barcodes.length === 1);
    const id = result.current.barcodes[0].id!;

    // Toggle active state
    await act(async () => {
      await result.current.setActive(id, false);
    });
    
    await waitFor(() => {
      expect(result.current.barcodes[0].active).toBe(false);
    });
  });
});
