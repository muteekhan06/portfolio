/**
 * Analytics service (optional)
 * Supports Plausible (self-hosted, free)
 */

const PLAUSIBLE_DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN;
const PLAUSIBLE_API_HOST =
  import.meta.env.VITE_PLAUSIBLE_API_HOST || "https://plausible.io";

export interface AnalyticsEvent {
  name: string;
  props?: Record<string, string | number>;
}

/**
 * Initialize analytics
 */
export function initAnalytics(): void {
  if (!PLAUSIBLE_DOMAIN) {
    console.log("Analytics not configured");
    return;
  }

  // Load Plausible script
  const script = document.createElement("script");
  script.defer = true;
  script.dataset.domain = PLAUSIBLE_DOMAIN;
  script.src = `${PLAUSIBLE_API_HOST}/js/script.js`;
  document.head.appendChild(script);
}

/**
 * Track page view
 */
export function trackPageView(url?: string): void {
  if (typeof window === "undefined") return;

  // @ts-ignore
  if (window.plausible) {
    // @ts-ignore
    window.plausible("pageview", { u: url || window.location.href });
  }
}

/**
 * Track custom event
 */
export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;

  // @ts-ignore
  if (window.plausible) {
    // @ts-ignore
    window.plausible(event.name, { props: event.props });
  } else {
    // Fallback: log to console in development
    console.log("Analytics event:", event);
  }
}

/**
 * Track outbound link
 */
export function trackOutboundLink(url: string): void {
  trackEvent({
    name: "Outbound Link",
    props: { url },
  });
}

/**
 * Track download
 */
export function trackDownload(file: string): void {
  trackEvent({
    name: "Download",
    props: { file },
  });
}

/**
 * Track form submission
 */
export function trackFormSubmit(formName: string): void {
  trackEvent({
    name: "Form Submit",
    props: { form: formName },
  });
}
