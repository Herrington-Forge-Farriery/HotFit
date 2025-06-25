// File: frontend/src/components/barcodelist.tsx
import React from 'react'
import { useBarcodes } from '../hooks/useBarcodes'

export default function BarcodeList() {
  const { barcodes, setActive } = useBarcodes()

  return (
    <div>
      <h2>Barcodes</h2>
      <ul>
        {barcodes.map((bc) => (
          <li key={bc.id}>
            {bc.label} ({bc.code}) - {bc.type} - {bc.active ? 'Active' : 'Inactive'}
            <button onClick={() => bc.id && setActive(bc.id, !bc.active)}>
              {bc.active ? 'Deactivate' : 'Activate'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
