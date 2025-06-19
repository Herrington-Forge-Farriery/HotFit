// /frontend/src/components/Scanner.tsx
import React, { useState } from 'react'
import { useOfflineScans } from '../hooks/useOfflineScans'

export default function Scanner() {
  const { addScan } = useOfflineScans()
  const [code, setCode] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await addScan(code, 'INVOICE_START')  // or whatever action
    setCode('')
    alert('Scan saved offline!')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={code}
        onChange={e => setCode(e.target.value)}
        placeholder="Scan or enter code"
        autoFocus
      />
      <button type="submit">Save Scan</button>
    </form>
  )
}
