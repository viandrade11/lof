import { Link } from 'react-router-dom';
import { ShoppingBag, Loader2 } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice, type ShopifyProduct } from '@/lib/shopify';
import { toast } from 'sonner';

interface ProductCardProps {
  product: ShopifyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const { node } = product;
  const image = node.images.edges[0]?.node;
  const variant = node.variants.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

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
    toast.success('Produto adicionado ao carrinho', {
      position: 'top-center',
    });
  };

  return (
    <Link to={`/produto/${node.handle}`} className="group block">
      <div className="relative aspect-square overflow-hidden bg-muted mb-4">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || node.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <ShoppingBag className="h-12 w-12" />
          </div>
        )}
        <button
          onClick={handleAddToCart}
          disabled={isLoading || !variant?.availableForSale}
          className="absolute bottom-3 right-3 h-10 w-10 bg-foreground text-background rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 disabled:opacity-50"
          aria-label="Adicionar ao carrinho"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingBag className="h-4 w-4" />}
        </button>
      </div>
      <div>
        <h3 className="text-sm font-medium leading-tight group-hover:text-foreground/70 transition-colors">{node.title}</h3>
        <p className="text-sm font-semibold mt-1">{formatPrice(price.amount, price.currencyCode)}</p>
      </div>
    </Link>
  );
}
