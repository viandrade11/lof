import { formatPrice } from '@/lib/shopify';

// Sitewide discount applied at checkout. Used to render De/Por when the
// product itself has no compareAtPrice set in Shopify.
const SITEWIDE_DISCOUNT_PCT = 20;

interface PriceInlineProps {
  variant: {
    price: { amount: string; currencyCode: string };
    compareAtPrice?: { amount: string; currencyCode: string } | null;
  };
  textClass?: string;
  discountTextClass?: string;
  showBadge?: boolean;
}

export function PriceInline({ variant, textClass = '', discountTextClass = 'text-green-400', showBadge = true }: PriceInlineProps) {
  const priceAmount = parseFloat(variant.price.amount);
  const currency = variant.price.currencyCode;
  const realCompare = variant.compareAtPrice;
  const hasRealDiscount = realCompare && parseFloat(realCompare.amount) > priceAmount;

  const compareAmount = hasRealDiscount
    ? parseFloat(realCompare!.amount)
    : priceAmount / (1 - SITEWIDE_DISCOUNT_PCT / 100);
  const pct = hasRealDiscount
    ? Math.round((1 - priceAmount / compareAmount) * 100)
    : SITEWIDE_DISCOUNT_PCT;

  return (
    <span className="inline-flex items-baseline gap-2 flex-wrap">
      <span className={`line-through opacity-60 ${textClass}`}>
        De {formatPrice(compareAmount.toFixed(2), currency)}
      </span>
      <span className={`font-bold ${discountTextClass}`}>
        Por {formatPrice(variant.price.amount, currency)}
      </span>
      {showBadge && (
        <span className="bg-green-500/20 text-green-400 text-xs px-1.5 py-0.5 rounded font-semibold">
          -{pct}%
        </span>
      )}
    </span>
  );
}

export function priceText(variant: { price: { amount: string; currencyCode: string }; compareAtPrice?: { amount: string; currencyCode: string } | null }): string {
  return formatPrice(variant.price.amount, variant.price.currencyCode);
}
