import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BlockedSite from './BlockedSite.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BlockedSite/>
  </StrictMode>,
)
