import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Settings from './Settings.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Settings/>
  </StrictMode>,
)
