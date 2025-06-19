import { useState, useEffect, useCallback } from 'react'
import { db, Barcode } from '../db'

export function useBarcodes() {
  const [barcodes, setBarcodes] = useState<Barcode[]>([])

  // load all barcodes
  const load = useCallback(async () => {
    const all = await db.barcodes.toArray()
    setBarcodes(all)
  }, [])

  // add a new one
  const addBarcode = useCallback(async (data: Omit<Barcode, 'id' | 'active'>) => {
    await db.barcodes.add({ ...data, active: true })
    await load()
  }, [load])

  // toggle active
  const setActive = useCallback(async (id: number, active: boolean) => {
    await db.barcodes.update(id, { active })
    await load()
  }, [load])

  useEffect(() => {
    load()
  }, [load])

  return { barcodes, addBarcode, setActive }
}
