import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'; // Import i18n config
import App from './App.tsx'
import { initSafeArea } from './utils/safeArea'

// Initialize safe area insets for native platforms
initSafeArea();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
