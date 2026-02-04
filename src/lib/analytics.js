// Lightweight GA4 wrapper for Vite + React Router
// Usage:
// - Set VITE_GA_MEASUREMENT_ID in your environment (e.g., .env)
// - Call initAnalytics() once (e.g., in App)
// - Call trackPageView() on route changes and trackEvent() for interactions

let initialized = false;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.async = true;
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

const gtmId = import.meta.env.VITE_GTM_ID;

export async function initAnalytics() {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (initialized || typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line no-undef
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };

  if (!gtmId && measurementId) {
    // Direct GA4 (no GTM)
    await loadScript(`https://www.googletagmanager.com/gtag/js?id=${measurementId}`);
    // Consent defaults handled in index.html when GTM present; here set minimal defaults
    window.gtag('js', new Date());
    window.gtag('config', measurementId, { send_page_view: false });
  }
  initialized = true;
}

export function trackPageView(path, title) {
  if (typeof window === 'undefined' || !window.gtag) return;
  if (gtmId) {
    // Push to dataLayer for GTM
    window.dataLayer.push({
      event: 'page_view',
      page_title: title || document.title,
      page_location: window.location.origin + path,
      page_path: path,
      debug_mode: Boolean(import.meta.env.DEV),
    });
  } else if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
    window.gtag('event', 'page_view', {
      page_title: title || document.title,
      page_location: window.location.origin + path,
      page_path: path,
      debug_mode: Boolean(import.meta.env.DEV),
    });
  }
}

export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined' || !window.gtag) return;
  if (gtmId) {
    window.dataLayer.push({
      event: name,
      ...params,
      debug_mode: Boolean(import.meta.env.DEV),
    });
  } else if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
    window.gtag('event', name, {
      ...params,
      debug_mode: Boolean(import.meta.env.DEV),
    });
  }
}

export function setUserProperties(props = {}) {
  if (typeof window === 'undefined' || !window.gtag) return;
  if (gtmId) {
    window.dataLayer.push({ user_properties: props });
  } else if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
    window.gtag('set', 'user_properties', props);
  }
}

export function updateConsent(granted) {
  if (typeof window === 'undefined' || !window.gtag) return;
  const status = granted ? 'granted' : 'denied';
  window.gtag('consent', 'update', {
    ad_storage: status,
    ad_user_data: status,
    ad_personalization: status,
    analytics_storage: status,
  });
  try {
    window.localStorage.setItem('ga_consent_choice', status);
  } catch {}
}

