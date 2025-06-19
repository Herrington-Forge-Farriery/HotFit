// File: frontend/src/db.ts
// Polyfill IndexedDB API for tests
import 'fake-indexeddb/auto';
import Dexie, { Table } from 'dexie';

export interface OfflineScan {
  id?: number;
  code: string;
  action: string;
  timestamp: string;
  synced: boolean;
}

export interface Barcode {
  id?: number;
  code: string;
  type: string;      // e.g. 'CLIENT', 'HORSE', etc.
  label: string;     // human-friendly name
  active: boolean;
}

class HotFitDB extends Dexie {
  scans!: Table<OfflineScan, number>;
  barcodes!: Table<Barcode, number>;

  constructor() {
    super('HotFitOfflineDB');
    this.version(1).stores({
      scans: '++id,code,action,timestamp,synced',
      barcodes: '++id,code,type,label,active',
    });
  }
}

export const db = new HotFitDB();
