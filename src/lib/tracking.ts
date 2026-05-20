/**
 * Unified client-side tracking: Meta Pixel + GA4 (via GTM dataLayer) + Meta CAPI server-side.
 * Every event carries a shared event_id so Pixel + CAPI are deduplicated by Meta.
 */
import { sendCAPIEvent } from './metaCapi';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

function uuid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function pushDL(payload: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  // clear previous ecommerce object to avoid GA4 merging across pushes
  if ('ecommerce' in payload) window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push(payload);
}

function fbqTrack(event: string, params: Record<string, unknown>, eventID: string) {
  if (typeof window === 'undefined' || !window.fbq) return;
  window.fbq('track', event, params, { eventID });
}

// ---------- Page View (fired on every SPA route change) ----------
export function trackPageView(path: string, title: string) {
  const eventID = uuid();
  fbqTrack('PageView', {}, eventID);
  pushDL({
    event: 'page_view',
    page_path: path,
    page_title: title,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
  });
  sendCAPIEvent({ event_name: 'PageView', event_id: eventID });
}

// ---------- View Content ----------
interface ProductTrackingItem {
  id: string;
  name: string;
  price: number;
  currency?: string;
  quantity?: number;
  category?: string;
  brand?: string;
}

export function trackViewContent(item: ProductTrackingItem) {
  const eventID = uuid();
  const currency = item.currency || 'BRL';
  fbqTrack('ViewContent', {
    content_name: item.name,
    content_ids: [item.id],
    content_type: 'product',
    value: item.price,
    currency,
  }, eventID);
  pushDL({
    event: 'view_item',
    ecommerce: {
      currency,
      value: item.price,
      items: [{
        item_id: item.id,
        item_name: item.name,
        item_brand: item.brand || 'LOF Professional',
        item_category: item.category,
        price: item.price,
        quantity: 1,
      }],
    },
  });
  sendCAPIEvent({
    event_name: 'ViewContent',
    event_id: eventID,
    content_ids: [item.id],
    content_name: item.name,
    content_type: 'product',
    value: item.price,
    currency,
  });
}

// ---------- Add To Cart ----------
export function trackAddToCart(item: ProductTrackingItem) {
  const eventID = uuid();
  const currency = item.currency || 'BRL';
  const quantity = item.quantity ?? 1;
  const value = item.price * quantity;
  fbqTrack('AddToCart', {
    content_name: item.name,
    content_ids: [item.id],
    content_type: 'product',
    value,
    currency,
  }, eventID);
  pushDL({
    event: 'add_to_cart',
    ecommerce: {
      currency,
      value,
      items: [{
        item_id: item.id,
        item_name: item.name,
        item_brand: item.brand || 'LOF Professional',
        item_category: item.category,
        price: item.price,
        quantity,
      }],
    },
  });
  sendCAPIEvent({
    event_name: 'AddToCart',
    event_id: eventID,
    content_ids: [item.id],
    content_name: item.name,
    content_type: 'product',
    value,
    currency,
  });
}

// ---------- Begin Checkout / Initiate Checkout ----------
export function trackBeginCheckout(params: {
  items: ProductTrackingItem[];
  value: number;
  currency?: string;
}) {
  const eventID = uuid();
  const currency = params.currency || 'BRL';
  const numItems = params.items.reduce((s, i) => s + (i.quantity ?? 1), 0);
  fbqTrack('InitiateCheckout', {
    content_ids: params.items.map(i => i.id),
    contents: params.items.map(i => ({ id: i.id, quantity: i.quantity ?? 1 })),
    num_items: numItems,
    value: params.value,
    currency,
  }, eventID);
  pushDL({
    event: 'begin_checkout',
    ecommerce: {
      currency,
      value: params.value,
      items: params.items.map(i => ({
        item_id: i.id,
        item_name: i.name,
        item_brand: i.brand || 'LOF Professional',
        item_category: i.category,
        price: i.price,
        quantity: i.quantity ?? 1,
      })),
    },
  });
  sendCAPIEvent({
    event_name: 'InitiateCheckout',
    event_id: eventID,
    content_ids: params.items.map(i => i.id),
    contents: params.items.map(i => ({ id: i.id, quantity: i.quantity ?? 1 })),
    num_items: numItems,
    value: params.value,
    currency,
  });
}