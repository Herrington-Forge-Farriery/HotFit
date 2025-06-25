// File: mobile/src/App.tsx
import React from 'react';
import { SafeAreaView } from 'react-native';
import Scanner from './components/Scanner';
import BarcodeList from './components/BarcodeList'; // you can share UI too if it’s pure RN

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Scanner action="CLIENT" />
      <BarcodeList />
    </SafeAreaView>
  );
}
