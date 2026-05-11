import { formatPrice } from './shopify';

/** Global automatic discount applied at Shopify checkout. Set to 0 when no automatic discount is active. */
export const CHECKOUT_DISCOUNT_PCT = 0;

export function applyCheckoutDiscount(amount: number | string): number {
  const n = typeof amount === 'string' ? parseFloat(amount) : amount;
  return n * (1 - CHECKOUT_DISCOUNT_PCT);
}

export function formatCheckoutPrice(amount: number | string, currencyCode = 'BRL'): string {
  return formatPrice(applyCheckoutDiscount(amount).toFixed(2), currencyCode);
}

export const CHECKOUT_DISCOUNT_LABEL = `${Math.round(CHECKOUT_DISCOUNT_PCT * 100)}% OFF no checkout`;