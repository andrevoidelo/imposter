import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'; // Import i18n config
import App from './App.tsx'
import { initCapacitor } from './utils/capacitorInit'

// Initialize native platform features (Keyboard, StatusBar, etc.)
initCapacitor();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
