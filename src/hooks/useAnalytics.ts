/**
 * useAnalytics — wrapper centralizado para GA4 e eventos customizados
 * 
 * Uso:
 *   const { trackEvent, trackConversion } = useAnalytics();
 *   trackEvent('quiz_started');
 *   trackConversion('lead_whatsapp', { page: '/quiz' });
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

export function useAnalytics() {
  const isAvailable = () =>
    typeof window !== 'undefined' && typeof window.gtag === 'function';

  /**
   * Evento genérico GA4
   */
  const trackEvent = (
    eventName: string,
    params?: Record<string, string | number | boolean>
  ) => {
    if (!isAvailable()) return;
    window.gtag!('event', eventName, params);
  };

  /**
   * Conversão — lead capturado
   */
  const trackConversion = (
    type: 'lead_whatsapp' | 'lead_form' | 'lead_quiz',
    params?: Record<string, string | number | boolean>
  ) => {
    if (!isAvailable()) return;
    window.gtag!('event', 'generate_lead', {
      event_category: 'conversion',
      event_label: type,
      ...params,
    });
  };

  /**
   * Page view manual (útil em SPA após navegação)
   */
  const trackPageView = (path: string, title: string) => {
    if (!isAvailable()) return;
    window.gtag!('config', import.meta.env.VITE_GA4_MEASUREMENT_ID, {
      page_path:  path,
      page_title: title,
    });
  };

  /**
   * Scroll depth (chamar em % de scroll)
   */
  const trackScrollDepth = (percent: 25 | 50 | 75 | 100) => {
    trackEvent('scroll_depth', { percent });
  };

  /**
   * Meta Pixel — evento de lead
   */
  const trackPixelLead = (params?: Record<string, string | number>) => {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', params);
    }
  };

  /**
   * Google Ads — conversão de lead
   * sendTo: formato 'AW-XXXXXXXXX/XXXXXXXXXXXX'
   */
  const trackGoogleAdsConversion = (sendTo: string) => {
    if (!isAvailable()) return;
    window.gtag!('event', 'conversion', { send_to: sendTo });
  };

  return {
    trackEvent,
    trackConversion,
    trackPageView,
    trackScrollDepth,
    trackPixelLead,
    trackGoogleAdsConversion,
  };
}
