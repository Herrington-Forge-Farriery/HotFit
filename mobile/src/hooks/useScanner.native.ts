import { useEffect, useCallback } from 'react';
import { Camera } from 'react-native-vision-camera';
import { useFrameProcessor } from 'react-native-vision-camera';
import { scanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';

export function useScannerNative(onDetected: (code: string) => void) {
  const [cameraPermission, setCameraPermission] = useState<'authorized'|'denied'|'not-determined'>('not-determined');

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setCameraPermission(status);
    })();
  }, []);

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const barcodes = scanBarcodes(frame, [BarcodeFormat.ALL_FORMATS]);
    if (barcodes.length) {
      runOnJS(onDetected)(barcodes[0].displayValue ?? '');
    }
  }, [onDetected]);

  const cameraRef = useRef<Camera>(null);

  return { cameraRef, frameProcessor, cameraPermission };
}
