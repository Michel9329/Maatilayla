import { useEffect, useCallback } from 'react'

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined

let scriptLoaded = false

function loadScript(siteKey: string) {
  if (scriptLoaded || document.querySelector('script[src*="recaptcha"]')) {
    scriptLoaded = true
    return
  }
  const s = document.createElement('script')
  s.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
  s.async = true
  s.defer = true
  document.head.appendChild(s)
  scriptLoaded = true
}

/**
 * Hook per reCAPTCHA v3.
 * Carica lo script e restituisce una funzione per ottenere il token.
 * Se la site key non è configurata, il token ritorna null (form funziona senza reCAPTCHA).
 */
export function useRecaptcha() {
  useEffect(() => {
    if (SITE_KEY) loadScript(SITE_KEY)
  }, [])

  const getToken = useCallback(async (action: string): Promise<string | null> => {
    if (!SITE_KEY || !window.grecaptcha) return null

    return new Promise((resolve) => {
      window.grecaptcha.ready(async () => {
        try {
          const token = await window.grecaptcha.execute(SITE_KEY, { action })
          resolve(token)
        } catch {
          resolve(null)
        }
      })
    })
  }, [])

  return { getToken, enabled: !!SITE_KEY }
}
