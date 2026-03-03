import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'
import { GA_TRACKING_ID } from './hooks/useAnalytics'

// Carica Google Analytics se configurato
if (GA_TRACKING_ID && typeof window !== 'undefined') {
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
  document.head.appendChild(script)

  ;(window as any).dataLayer = (window as any).dataLayer || []
  function gtag(..._args: any[]) {
    ;(window as any).dataLayer.push(arguments)
  }
  ;(window as any).gtag = gtag
  gtag('js', new Date())
  gtag('config', GA_TRACKING_ID)
  if (import.meta.env.DEV) console.log('✅ Google Analytics inizializzato:', GA_TRACKING_ID)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
