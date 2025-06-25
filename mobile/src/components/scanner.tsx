// File: mobile/src/components/Scanner.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { useScannerNative } from '../hooks/useScannerNative';

export function Scanner({ onDetected }: { onDetected: (code: string) => void }) {
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;
  const { cameraRef, frameProcessor, cameraPermission } = useScannerNative(onDetected);

  if (cameraPermission !== 'authorized') return null;
  if (device == null) return <View><Text>Loading camera…</Text></View>;

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        ref={cameraRef}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 }
});
