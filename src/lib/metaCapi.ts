/**
 * Meta Conversions API (CAPI) — server-side event helper.
 * Sends events through our edge function to Meta's Conversions API.
 */

const FUNCTION_URL = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/meta-capi`;

function getCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match?.[2];
}

interface CAPIEvent {
  event_name: string;
  event_id?: string;
  event_source_url?: string;
  content_ids?: string[];
  content_name?: string;
  content_type?: string;
  contents?: Array<{ id: string; quantity: number }>;
  value?: number;
  currency?: string;
  num_items?: number;
}

export function sendCAPIEvent(event: CAPIEvent) {
  const payload = {
    ...event,
    event_source_url: event.event_source_url || window.location.href,
    user_agent: navigator.userAgent,
    fbc: getCookie('_fbc') || undefined,
    fbp: getCookie('_fbp') || undefined,
  };

  // Fire-and-forget — don't block UI
  fetch(FUNCTION_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch((err) => console.warn('CAPI event failed:', err));
}

// Convenience helpers

export function capiPageView() {
  sendCAPIEvent({ event_name: 'PageView' });
}

export function capiViewContent(params: {
  contentIds: string[];
  contentName: string;
  value?: number;
  currency?: string;
}) {
  sendCAPIEvent({
    event_name: 'ViewContent',
    content_ids: params.contentIds,
    content_name: params.contentName,
    content_type: 'product',
    value: params.value,
    currency: params.currency || 'BRL',
  });
}

export function capiAddToCart(params: {
  contentIds: string[];
  contentName: string;
  value: number;
  currency?: string;
}) {
  sendCAPIEvent({
    event_name: 'AddToCart',
    content_ids: params.contentIds,
    content_name: params.contentName,
    content_type: 'product',
    value: params.value,
    currency: params.currency || 'BRL',
  });
}

export function capiInitiateCheckout(params: {
  contentIds: string[];
  contents: Array<{ id: string; quantity: number }>;
  value: number;
  numItems: number;
  currency?: string;
}) {
  sendCAPIEvent({
    event_name: 'InitiateCheckout',
    content_ids: params.contentIds,
    contents: params.contents,
    value: params.value,
    num_items: params.numItems,
    currency: params.currency || 'BRL',
  });
}
