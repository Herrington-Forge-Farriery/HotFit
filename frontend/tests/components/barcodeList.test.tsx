
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import BarcodeList from '../../src/components/barcodelist'
import * as useBarcodesModule from '../../src/hooks/useBarcodes'

describe('BarcodeList component', () => {
  it('renders no items when empty', () => {
    vi.spyOn(useBarcodesModule, 'useBarcodes').mockReturnValue({
      barcodes: [],
      setActive: vi.fn(),
    })
    render(<BarcodeList />)
    expect(screen.getByText(/Barcodes/)).toBeInTheDocument()
    expect(screen.queryByRole('listitem')).toBeNull()
  })

  it('renders items and toggles active state', () => {
    const setActiveMock = vi.fn()
    vi.spyOn(useBarcodesModule, 'useBarcodes').mockReturnValue({
      barcodes: [
        { id: 1, code: 'C1', type: 'CLIENT', label: 'Client1', active: true },
      ],
      setActive: setActiveMock,
    })
    render(<BarcodeList />)
    expect(screen.getByText(/Client1/)).toBeInTheDocument()
    const button = screen.getByRole('button', { name: /Deactivate/ })
    fireEvent.click(button)
    expect(setActiveMock).toHaveBeenCalledWith(1, false)
  })
})
