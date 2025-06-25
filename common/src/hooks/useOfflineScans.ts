import { Platform } from 'react-native';
import { useOfflineScansWeb } from './useOfflineScans.web'; // uses Dexie from frontend/src/db.ts
import { useOfflineScansNative } from './useOfflineScans.native'; // uses SWLite from mobile/

export const useOfflineScans =
  Platform.OS === 'web' ? useOfflineScansWeb : useOfflineScansNative;
