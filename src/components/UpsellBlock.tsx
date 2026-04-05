import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Loader2 } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice, type ShopifyProduct } from '@/lib/shopify';
import { toast } from 'sonner';
import type { RecommendedProduct } from '@/lib/productRecommendations';

interface UpsellBlockProps {
  recommendations: RecommendedProduct[];
  title?: string;
}

export function UpsellBlock({ recommendations, title = 'Você também vai gostar' }: UpsellBlockProps) {
  if (recommendations.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="font-display text-base font-semibold mb-3">{title}</h3>
      <div className="space-y-2">
        {recommendations.map((rec) => (
          <UpsellItem key={rec.product.node.id} rec={rec} />
        ))}
      </div>
    </div>
  );
}

function UpsellItem({ rec }: { rec: RecommendedProduct }) {
  const addItem = useCartStore(state => state.addItem);
  const [adding, setAdding] = useState(false);
  const { product } = rec;
  const variant = product.node.variants.edges[0]?.node;
  const price = product.node.priceRange.minVariantPrice;
  const image = product.node.images.edges[0]?.node;

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant || adding) return;
    setAdding(true);
    try {
      await addItem({
        product,
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: 1,
        selectedOptions: variant.selectedOptions || [],
      });
      toast.success('Adicionado ao carrinho', { position: 'top-center' });
    } finally {
      setAdding(false);
    }
  };

  return (
    <Link
      to={`/products/${product.node.handle}`}
      className="flex items-center gap-3 p-3 border border-border rounded hover:bg-muted/50 transition-colors group"
    >
      <div className="w-14 h-14 bg-muted rounded overflow-hidden flex-shrink-0">
        {image && (
          <img src={image.url} alt={image.altText || product.node.title} className="w-full h-full object-cover" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{product.node.title}</p>
        <p className="text-sm font-semibold text-foreground">{formatPrice(price.amount, price.currencyCode)}</p>
      </div>
      <button
        onClick={handleAdd}
        disabled={adding || !variant?.availableForSale}
        className="flex-shrink-0 flex items-center gap-1.5 h-9 px-4 bg-foreground text-background text-xs font-medium rounded hover:bg-foreground/90 transition-colors disabled:opacity-50"
      >
        {adding ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <>
            <Plus className="h-3.5 w-3.5" />
            Adicionar
          </>
        )}
      </button>
    </Link>
  );
}

/** Compact version for cart drawer */
export function CartUpsellBlock({ recommendations }: { recommendations: RecommendedProduct[] }) {
  if (recommendations.length === 0) return null;

  return (
    <div className="py-3 border-t border-border">
      <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">Aproveite e leve também</p>
      <div className="space-y-2">
        {recommendations.map((rec) => (
          <CartUpsellItem key={rec.product.node.id} rec={rec} />
        ))}
      </div>
    </div>
  );
}

function CartUpsellItem({ rec }: { rec: RecommendedProduct }) {
  const addItem = useCartStore(state => state.addItem);
  const [adding, setAdding] = useState(false);
  const { product } = rec;
  const variant = product.node.variants.edges[0]?.node;
  const price = product.node.priceRange.minVariantPrice;
  const image = product.node.images.edges[0]?.node;

  const handleAdd = async () => {
    if (!variant || adding) return;
    setAdding(true);
    try {
      await addItem({
        product,
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: 1,
        selectedOptions: variant.selectedOptions || [],
      });
      toast.success('Adicionado ao carrinho', { position: 'top-center' });
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 bg-muted rounded overflow-hidden flex-shrink-0">
        {image && <img src={image.url} alt={product.node.title} className="w-full h-full object-cover" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium truncate">{product.node.title}</p>
        <p className="text-xs font-semibold">{formatPrice(price.amount, price.currencyCode)}</p>
      </div>
      <button
        onClick={handleAdd}
        disabled={adding || !variant?.availableForSale}
        className="flex-shrink-0 text-xs font-medium px-3 h-7 bg-foreground text-background rounded hover:bg-foreground/90 disabled:opacity-50 flex items-center gap-1"
      >
        {adding ? <Loader2 className="h-3 w-3 animate-spin" /> : <><Plus className="h-3 w-3" /> Adicionar</>}
      </button>
    </div>
  );
}
