import React, { useState } from 'react';
import { useOfflineScans } from '../hooks/useOfflineScans';

interface ScannerProps {
  action?: string;
}

export default function Scanner({ action = 'SCAN' }: ScannerProps) {
  const { addScan } = useOfflineScans();
  const [code, setCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    await addScan(code, action);
    setCode('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Scan or enter code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button type="submit">Submit Scan</button>
    </form>
  );
}
