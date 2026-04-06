import { formatPrice } from '@/lib/shopify';

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
  const compareAt = variant.compareAtPrice;
  const hasDiscount = compareAt && parseFloat(compareAt.amount) > parseFloat(variant.price.amount);

  if (!hasDiscount) {
    return <span className={textClass}>{formatPrice(variant.price.amount, variant.price.currencyCode)}</span>;
  }

  const pct = Math.round((1 - parseFloat(variant.price.amount) / parseFloat(compareAt.amount)) * 100);

  return (
    <span className="inline-flex items-baseline gap-2 flex-wrap">
      <span className={`line-through opacity-60 ${textClass}`}>
        {formatPrice(compareAt.amount, compareAt.currencyCode)}
      </span>
      <span className={`font-bold ${discountTextClass}`}>
        {formatPrice(variant.price.amount, variant.price.currencyCode)}
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
