import Dexie, { Table } from 'dexie';
import type { ScanEvent } from '@prisma/client'; // use your Prisma types

export interface OfflineScan {
  id?: number;
  code: string;
  action: string;
  timestamp: string;
  synced: boolean;
}

class HotFitDB extends Dexie {
  scans!: Table<OfflineScan, number>;

  constructor() {
    super('HotFitOfflineDB');
    this.version(1).stores({
      scans: '++id,code,action,timestamp,synced',
      // you could add barcodes or addresses stores here too
    });
  }
}

export const db = new HotFitDB();
