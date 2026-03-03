/**
 * Hook per tracciamento analytics personalizzato
 * Supporta Google Analytics (se GA_TRACKING_ID è definito)
 * e logging locale per debug
 */

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

export const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || ''

export function useAnalytics() {
  const trackPageView = (path: string, title?: string) => {
    if (typeof window !== 'undefined') {
      if (GA_TRACKING_ID && window.gtag) {
        window.gtag('event', 'page_view', {
          page_path: path,
          page_title: title || document.title,
        })
      }
      if (import.meta.env.DEV) console.log(`[Analytics] Page View: ${path}`, { title })
    }
  }

  const trackEvent = (eventName: string, eventData?: Record<string, unknown>) => {
    if (typeof window !== 'undefined') {
      if (GA_TRACKING_ID && window.gtag) {
        window.gtag('event', eventName, eventData)
      }
      if (import.meta.env.DEV) console.log(`[Analytics] Event: ${eventName}`, eventData)
    }
  }

  const trackConversion = (conversionName: string, value?: number) => {
    trackEvent('conversion', {
      conversion_name: conversionName,
      value: value || 1,
      timestamp: new Date().toISOString(),
    })
  }

  return {
    trackPageView,
    trackEvent,
    trackConversion,
    isAnalyticsEnabled: !!GA_TRACKING_ID,
  }
}
