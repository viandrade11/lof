/**
 * Meta Conversions API (CAPI) — server-side event helper.
 * Sends events through our edge function to Meta's Conversions API.
 */

const FUNCTION_URL = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/meta-capi`;

function getCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match?.[2];
}

// SHA-256 hash para user_data (exigido pela Meta)
async function sha256(value: string): Promise<string> {
  const normalized = value.trim().toLowerCase();
  const buffer = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(normalized)
  );
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

interface UserData {
  email?: string;
  phone?: string; // formato E.164 sem +, ex: "5511999999999"
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
  order_id?: string;
  user_data?: UserData;
}

export async function sendCAPIEvent(event: CAPIEvent) {
  const hashedUserData: Record<string, string> = {};
  if (event.user_data?.email) {
    hashedUserData.em = await sha256(event.user_data.email);
  }
  if (event.user_data?.phone) {
    hashedUserData.ph = await sha256(event.user_data.phone);
  }

  const { user_data, ...rest } = event;

  const payload = {
    ...rest,
    event_source_url: event.event_source_url || window.location.href,
    user_agent: navigator.userAgent,
    fbc: getCookie('_fbc') || undefined,
    fbp: getCookie('_fbp') || undefined,
    ...(Object.keys(hashedUserData).length > 0 && { user_data: hashedUserData }),
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

export function capiPurchase(params: {
  orderId: string;
  contentIds: string[];
  contents: Array<{ id: string; quantity: number }>;
  value: number;
  numItems: number;
  currency?: string;
  userData?: UserData;
}) {
  sendCAPIEvent({
    event_name: 'Purchase',
    order_id: params.orderId,
    content_ids: params.contentIds,
    contents: params.contents,
    content_type: 'product',
    value: params.value,
    num_items: params.numItems,
    currency: params.currency || 'BRL',
    user_data: params.userData,
  });
}
