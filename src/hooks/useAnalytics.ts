/**
 * Hook per tracciamento analytics personalizzato
 * Supporta Google Analytics (se GA_TRACKING_ID è definito)
 * e logging locale per debug
 */

export const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || '';

export function useAnalytics() {
  /**
   * Traccia una pagina/evento
   */
  const trackPageView = (path: string, title?: string) => {
    if (typeof window !== 'undefined') {
      // Google Analytics 4
      if (GA_TRACKING_ID && (window as any).gtag) {
        (window as any).gtag('event', 'page_view', {
          page_path: path,
          page_title: title || document.title,
        });
      }
      // Logging locale (solo dev)
      if (import.meta.env.DEV) console.log(`📊 [Analytics] Page View: ${path}`, { title });
    }
  };

  /**
   * Traccia un evento custom
   */
  const trackEvent = (
    eventName: string,
    eventData?: Record<string, any>
  ) => {
    if (typeof window !== 'undefined') {
      // Google Analytics 4
      if (GA_TRACKING_ID && (window as any).gtag) {
        (window as any).gtag('event', eventName, eventData);
      }
      // Logging locale (solo dev)
      if (import.meta.env.DEV) console.log(`📊 [Analytics] Event: ${eventName}`, eventData);
    }
  };

  /**
   * Traccia conversioni (click, form submit, etc.)
   */
  const trackConversion = (conversionName: string, value?: number) => {
    trackEvent('conversion', {
      conversion_name: conversionName,
      value: value || 1,
      timestamp: new Date().toISOString(),
    });
  };

  return {
    trackPageView,
    trackEvent,
    trackConversion,
    isAnalyticsEnabled: !!GA_TRACKING_ID,
  };
}
