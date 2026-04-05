import type { ShopifyProduct } from '@/lib/shopify';

// Maps product lines to complementary product types within the same line
// e.g., if buying shampoo → suggest conditioner, booster, mask
const PRODUCT_TYPE_COMPLEMENTS: Record<string, string[]> = {
  shampoo: ['condicionador', 'booster', 'máscara', 'leave-in', 'ativador'],
  condicionador: ['shampoo', 'booster', 'máscara', 'leave-in'],
  booster: ['shampoo', 'condicionador', 'leave-in'],
  máscara: ['shampoo', 'condicionador', 'booster'],
  'leave-in': ['shampoo', 'condicionador', 'booster'],
  ativador: ['shampoo', 'condicionador', 'booster'],
};

// Universal upsell handles — always recommend Hit and Crystal Oil
const UNIVERSAL_UPSELL_HANDLES = [
  'leave-in-hit-10x1-200ml-6903bafe7954e',
  'serum-crystal-oil-laranja-60ml-6903bb190ee85',
];

function detectProductCategory(title: string): string | null {
  const lower = title.toLowerCase();
  if (/shampoo/i.test(lower)) return 'shampoo';
  if (/condicionador/i.test(lower)) return 'condicionador';
  if (/booster|máscara líquida/i.test(lower)) return 'booster';
  if (/máscara.*creme|máscara.*capilar/i.test(lower)) return 'máscara';
  if (/leave-in|ativador.*cachos/i.test(lower)) return 'leave-in';
  if (/crystal.*oil|sérum|serum/i.test(lower)) return 'leave-in';
  return null;
}

function detectProductLine(title: string, productType: string): string {
  const combined = `${title} ${productType}`.toLowerCase();
  if (/nutritive/i.test(combined)) return 'nutritive';
  if (/repair/i.test(combined)) return 'repair';
  if (/hydrate/i.test(combined)) return 'hydrate';
  if (/wavy|cachos/i.test(combined)) return 'wavy';
  if (/purifying/i.test(combined)) return 'purifying';
  if (/silver/i.test(combined)) return 'silver';
  if (/hit.*10/i.test(combined)) return 'finalizadores';
  if (/crystal.*oil/i.test(combined)) return 'finalizadores';
  return productType.toLowerCase();
}

export interface RecommendedProduct {
  product: ShopifyProduct;
  reason: string;
  priority: number; // lower = higher priority
}

/**
 * Smart product recommendations based on:
 * 1. Same line complements (shampoo → conditioner same line)
 * 2. Universal upsells (Hit 10x1, Crystal Oil)
 * 3. Excludes current product and already-in-cart items
 */
export function getSmartRecommendations(
  currentProduct: { title: string; handle?: string; productType?: string },
  allProducts: ShopifyProduct[],
  excludeHandles: string[] = [],
  maxResults = 4,
): RecommendedProduct[] {
  const currentHandle = currentProduct.handle || '';
  const currentLine = detectProductLine(currentProduct.title, currentProduct.productType || '');
  const currentCategory = detectProductCategory(currentProduct.title);
  const complements = currentCategory ? PRODUCT_TYPE_COMPLEMENTS[currentCategory] || [] : [];

  const excludeSet = new Set([currentHandle, ...excludeHandles]);
  const results: RecommendedProduct[] = [];

  for (const p of allProducts) {
    if (excludeSet.has(p.node.handle)) continue;

    const pLine = detectProductLine(p.node.title, (p.node as any).productType || '');
    const pCategory = detectProductCategory(p.node.title);

    // Priority 1: Same line complement (e.g., Shampoo Nutritive → Condicionador Nutritive)
    if (pLine === currentLine && pCategory && complements.includes(pCategory)) {
      results.push({
        product: p,
        reason: `Complete sua rotina ${currentLine}`,
        priority: 1,
      });
      continue;
    }

    // Priority 2: Universal upsells (Hit 10x1, Crystal Oil) — only if not same line
    if (UNIVERSAL_UPSELL_HANDLES.includes(p.node.handle) && pLine !== currentLine) {
      results.push({
        product: p,
        reason: p.node.handle.includes('hit') ? 'Finalizador mais vendido' : 'Sérum de alta performance',
        priority: 2,
      });
      continue;
    }

    // Priority 3: Same line, different product
    if (pLine === currentLine) {
      results.push({
        product: p,
        reason: `Da linha ${currentLine}`,
        priority: 3,
      });
    }
  }

  return results
    .sort((a, b) => a.priority - b.priority)
    .slice(0, maxResults);
}

/**
 * Cart-level recommendations: looks at all cart items and suggests
 * complements they haven't added yet.
 */
export function getCartRecommendations(
  cartItems: Array<{ product: ShopifyProduct; variantId: string }>,
  allProducts: ShopifyProduct[],
  maxResults = 3,
): RecommendedProduct[] {
  if (cartItems.length === 0) return [];

  const cartHandles = cartItems.map(i => i.product.node.handle);
  const allRecs: RecommendedProduct[] = [];

  for (const item of cartItems) {
    const recs = getSmartRecommendations(
      {
        title: item.product.node.title,
        handle: item.product.node.handle,
        productType: (item.product.node as any).productType || '',
      },
      allProducts,
      cartHandles,
      6,
    );
    allRecs.push(...recs);
  }

  // Deduplicate by handle, keep highest priority
  const seen = new Map<string, RecommendedProduct>();
  for (const rec of allRecs) {
    const handle = rec.product.node.handle;
    if (!seen.has(handle) || rec.priority < seen.get(handle)!.priority) {
      seen.set(handle, rec);
    }
  }

  return Array.from(seen.values())
    .sort((a, b) => a.priority - b.priority)
    .slice(0, maxResults);
}
