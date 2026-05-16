import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Loader2, Eye } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice, type ShopifyProduct } from '@/lib/shopify';
import { applyCheckoutDiscount, CHECKOUT_DISCOUNT_PCT } from '@/lib/checkoutDiscount';
import { shopifyImg } from '@/lib/shopifyImage';
import { toast } from 'sonner';
import { QuickViewModal } from './QuickViewModal';

interface ProductCardProps {
  product: ShopifyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const { node } = product;
  const images = node.images.edges;
  const variant = node.variants.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;
  const [hovered, setHovered] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success('Produto adicionado ao carrinho', { position: 'top-center' });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewOpen(true);
  };

  return (
    <>
      <Link
        to={`/products/${node.handle}`}
        className="group block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative aspect-square overflow-hidden bg-muted mb-3">
          {images[0] ? (
            <>
              <img
                src={shopifyImg(images[0].node.url, 600)}
                alt={images[0].node.altText || node.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hovered && images[1] ? 'opacity-0' : 'opacity-100'}`}
                loading="lazy"
                decoding="async"
                width={600}
                height={600}
              />
              {images[1] && (
                <img
                  src={shopifyImg(images[1].node.url, 600)}
                  alt={images[1].node.altText || node.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`}
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={600}
                />
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <ShoppingBag className="h-12 w-12" />
            </div>
          )}

          {/* Desktop: hover buttons */}
          <div className="hidden md:flex absolute bottom-3 right-3 gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={handleQuickView}
              className="h-10 w-10 bg-background text-foreground rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md"
              aria-label="Visualização rápida"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              onClick={handleAddToCart}
              disabled={isLoading || !variant?.availableForSale}
              className="h-10 w-10 bg-foreground text-background rounded-full flex items-center justify-center hover:scale-110 transition-transform disabled:opacity-50"
              aria-label="Adicionar ao carrinho"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingBag className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium leading-tight group-hover:text-foreground/70 transition-colors">{node.title}</h3>
          {(() => {
            const compareAt = node.compareAtPriceRange?.minVariantPrice;
            const hasDiscount = compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount);
            const finalPrice = applyCheckoutDiscount(price.amount);
            const reference = hasDiscount ? compareAt!.amount : price.amount;
            const showCheckoutDiscount = CHECKOUT_DISCOUNT_PCT > 0;
            return (
              <div className="mt-1 space-y-0.5">
                <div className="flex items-baseline gap-2 flex-wrap">
                  {(showCheckoutDiscount || hasDiscount) && (
                    <p className="text-xs text-muted-foreground line-through">{formatPrice(reference, price.currencyCode)}</p>
                  )}
                  <p className={`text-sm font-semibold ${showCheckoutDiscount || hasDiscount ? 'text-green-600' : 'text-foreground'}`}>
                    {formatPrice(finalPrice.toFixed(2), price.currencyCode)}
                  </p>
                </div>
                {showCheckoutDiscount && (
                  <p className="text-[10px] uppercase tracking-wider text-green-700 font-semibold">
                    com {Math.round(CHECKOUT_DISCOUNT_PCT * 100)}% off no checkout
                  </p>
                )}
              </div>
            );
          })()}
        </div>

        {/* Mobile: always-visible buy button */}
        <button
          onClick={handleAddToCart}
          disabled={isLoading || !variant?.availableForSale}
          className="md:hidden w-full mt-2.5 flex items-center justify-center gap-2 h-10 bg-foreground text-background text-xs uppercase tracking-[0.15em] font-medium transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <>
              <ShoppingBag className="h-3.5 w-3.5" />
              Comprar
            </>
          )}
        </button>
      </Link>

      <QuickViewModal product={product} open={quickViewOpen} onClose={() => setQuickViewOpen(false)} />
    </>
  );
}
