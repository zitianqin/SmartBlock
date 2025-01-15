import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Popup from './Popup.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Popup/>
  </StrictMode>,
)
