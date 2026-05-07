// Sitewide discount applied at checkout (e.g. via discount code).
// Used to render De/Por in the storefront when products in Shopify don't
// have an explicit compareAtPrice configured.
export const SITEWIDE_DISCOUNT_PCT = 20;

export interface PriceLike {
  amount: string;
  currencyCode: string;
}

export interface DiscountInfo {
  hasDiscount: true;
  compareAt: PriceLike;
  price: PriceLike;
  pct: number;
  source: 'shopify' | 'sitewide';
}

export interface NoDiscountInfo {
  hasDiscount: false;
  price: PriceLike;
}

/**
 * Returns De/Por info for a price, falling back to the sitewide discount
 * when no explicit compareAtPrice exists on the product/variant.
 */
export function getDiscountInfo(
  price: PriceLike,
  compareAt?: PriceLike | null,
): DiscountInfo | NoDiscountInfo {
  const priceAmount = parseFloat(price.amount);
  if (compareAt && parseFloat(compareAt.amount) > priceAmount) {
    const pct = Math.round((1 - priceAmount / parseFloat(compareAt.amount)) * 100);
    return { hasDiscount: true, compareAt, price, pct, source: 'shopify' };
  }
  if (SITEWIDE_DISCOUNT_PCT > 0) {
    const compareAmount = priceAmount / (1 - SITEWIDE_DISCOUNT_PCT / 100);
    return {
      hasDiscount: true,
      compareAt: { amount: compareAmount.toFixed(2), currencyCode: price.currencyCode },
      price,
      pct: SITEWIDE_DISCOUNT_PCT,
      source: 'sitewide',
    };
  }
  return { hasDiscount: false, price };
}