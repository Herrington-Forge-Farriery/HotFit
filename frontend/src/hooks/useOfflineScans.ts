// /frontend/src/hooks/useOfflineScans.ts
import { useCallback } from 'react'
import { db, OfflineScan } from '../db'

export function useOfflineScans() {
  // Add a new scan record to IndexedDB
  const addScan = useCallback(async (code: string, action: string) => {
    const scan: OfflineScan = {
      code,
      action,
      timestamp: new Date().toISOString(),
      synced: false,
    }
    await db.scans.add(scan)
  }, [])

  // Read all scans (for debugging or UI)
  const getAllScans = useCallback(() => {
    return db.scans.toArray()
  }, [])

  return { addScan, getAllScans }
}
