// Path: lib/track.ts
// Sends a custom event to Google Analytics, but only if the visitor accepted analytics. Safe to call anywhere in the browser.
export function track(name: string, params?: Record<string, string | number>) {
    if (typeof window === 'undefined') return;
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    if (gtag) gtag('event', name, params || {});
  }