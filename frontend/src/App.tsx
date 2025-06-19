import React from 'react'
import viteLogo from '/vite.svg'
import reactLogo from './assets/react.svg'
import './App.css'

import Scanner from './components/Scanner'
import { useSyncScans } from './hooks/useSyncScans'

export function App() {
  // Initialize offline sync for scanned events
  useSyncScans()

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-container">
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Scanner</h1>
      </header>

      <main>
        <Scanner />
      </main>
    </div>
  )
}


export default App
