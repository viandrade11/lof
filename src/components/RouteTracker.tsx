import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/tracking';

/**
 * Fires PageView (Pixel + CAPI) and page_view (GA4 via GTM dataLayer)
 * on every SPA route change. The initial PageView is already fired by index.html.
 */
export const RouteTracker = () => {
  const location = useLocation();
  useEffect(() => {
    // Skip the very first render — index.html already fired the initial PageView.
    if ((RouteTracker as any)._initialized) {
      trackPageView(location.pathname + location.search, document.title);
    } else {
      (RouteTracker as any)._initialized = true;
    }
  }, [location.pathname, location.search]);
  return null;
};