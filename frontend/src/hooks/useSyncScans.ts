// /frontend/src/hooks/useSyncScans.ts
import { useEffect } from 'react'
import { db, OfflineScan } from '../db'

export function useSyncScans() {
  useEffect(() => {
    let isMounted = true

    const sync = async () => {
      // Fetch unsynced scans
      const unsynced: OfflineScan[] = await db.scans
        .where('synced')
        .equals(false)
        .toArray()

      for (const scan of unsynced) {
        try {
          // Attempt to POST to your backend
          const res = await fetch('/api/scans', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(scan),
          })
          if (!res.ok) throw new Error('Network response not OK')

          // Mark as synced
          await db.scans.update(scan.id!, { synced: true })
        } catch {
          // Stop on first failure (server down or network off)
          break
        }
      }
    }

    // Sync immediately if online
    if (navigator.onLine) sync()

    // Listen for coming back online
    window.addEventListener('online', sync)

    return () => {
      isMounted = false
      window.removeEventListener('online', sync)
    }
  }, [])
}
