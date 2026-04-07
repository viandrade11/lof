import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingBag, Minus, Plus, Trash2, ExternalLink, Loader2, Tag } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";
import { useProducts } from "@/hooks/useProducts";
import { CartUpsellBlock } from "@/components/UpsellBlock";
import { getCartRecommendations } from "@/lib/productRecommendations";
import { capiInitiateCheckout } from "@/lib/metaCapi";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);

  // Calculate savings: items with quantity >= 2 save by buying more
  const savings = calculateSavings(items);

  useEffect(() => { if (isOpen) syncCart(); }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      // Fire Meta Pixel InitiateCheckout event
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'InitiateCheckout', {
          content_ids: items.map(i => i.variantId),
          contents: items.map(i => ({ id: i.variantId, quantity: i.quantity })),
          num_items: totalItems,
          value: totalPrice,
          currency: items[0]?.price.currencyCode || 'BRL',
        });
      }
      // Server-side CAPI
      capiInitiateCheckout({
        contentIds: items.map(i => i.variantId),
        contents: items.map(i => ({ id: i.variantId, quantity: i.quantity })),
        value: totalPrice,
        numItems: totalItems,
        currency: items[0]?.price.currencyCode || 'BRL',
      });
      window.open(checkoutUrl, '_blank');
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="relative p-2 text-foreground/70 hover:text-foreground transition-colors" aria-label="Carrinho">
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px] bg-foreground text-background">
              {totalItems}
            </Badge>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="font-display text-2xl">Seu Carrinho</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? "Seu carrinho está vazio" : `${totalItems} item${totalItems !== 1 ? 's' : ''} no carrinho`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-sm">Seu carrinho está vazio</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-4">
                  {items.map((item) => {
                    const itemTotal = parseFloat(item.price.amount) * item.quantity;
                    return (
                      <div key={item.variantId} className="flex gap-4 py-4 border-b border-border">
                        <div className="w-20 h-20 bg-muted rounded overflow-hidden flex-shrink-0">
                          {item.product.node.images?.edges?.[0]?.node && (
                            <img src={item.product.node.images.edges[0].node.url} alt={item.product.node.title} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.product.node.title}</h4>
                          <p className="text-xs text-muted-foreground mt-0.5">{item.selectedOptions.map(o => o.value).join(' • ')}</p>
                          <div className="flex items-baseline gap-2 mt-1">
                            <p className="font-semibold text-sm">{formatPrice(itemTotal.toString(), item.price.currencyCode)}</p>
                            {item.quantity > 1 && (
                              <p className="text-xs text-muted-foreground">
                                ({formatPrice(item.price.amount, item.price.currencyCode)} un.)
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <button className="h-7 w-7 border border-border rounded flex items-center justify-center hover:bg-muted" onClick={() => updateQuantity(item.variantId, item.quantity - 1)}>
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-6 text-center text-sm">{item.quantity}</span>
                            <button className="h-7 w-7 border border-border rounded flex items-center justify-center hover:bg-muted" onClick={() => updateQuantity(item.variantId, item.quantity + 1)}>
                              <Plus className="h-3 w-3" />
                            </button>
                            <button className="ml-auto text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.variantId)}>
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <CartRecommendations />
              <div className="flex-shrink-0 space-y-3 pt-4 border-t border-border">
                {/* Savings banner */}
                {savings.totalSaved > 0 && (
                  <div className="flex items-center gap-2 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded px-3 py-2">
                    <Tag className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-green-700 dark:text-green-300">
                        Você está economizando {formatPrice(savings.totalSaved.toString(), items[0]?.price.currencyCode || 'BRL')}
                      </p>
                      <p className="text-[10px] text-green-600 dark:text-green-400">
                        {savings.details}
                      </p>
                    </div>
                  </div>
                )}
                {/* Free shipping progress */}
                {totalPrice < 299 && (
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">
                      Faltam <span className="font-semibold text-foreground">{formatPrice((299 - totalPrice).toString(), items[0]?.price.currencyCode || 'BRL')}</span> para <span className="font-semibold text-green-600">frete grátis</span>
                    </p>
                    <div className="w-full bg-muted rounded-full h-1.5 mt-1.5">
                      <div
                        className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, (totalPrice / 299) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
                {totalPrice >= 299 && (
                  <p className="text-xs text-center font-semibold text-green-600">✓ Você ganhou frete grátis!</p>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm uppercase tracking-wider">Total</span>
                  <span className="text-lg font-semibold">{formatPrice(totalPrice.toString(), items[0]?.price.currencyCode || 'BRL')}</span>
                </div>
                <Button onClick={handleCheckout} className="w-full h-12 uppercase tracking-wider text-xs font-semibold" disabled={items.length === 0 || isLoading || isSyncing}>
                  {isLoading || isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ExternalLink className="w-4 h-4 mr-2" />Finalizar Compra</>}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

/** Calculate savings based on quantity discounts and combo benefits */
function calculateSavings(items: ReturnType<typeof useCartStore.getState>['items']) {
  let totalSaved = 0;
  const detailParts: string[] = [];

  // Savings from buying multiple units (volume discount messaging)
  const multiQuantityItems = items.filter(i => i.quantity >= 2);
  if (multiQuantityItems.length > 0) {
    // Estimate ~5% savings per extra unit as a loyalty benefit
    multiQuantityItems.forEach(item => {
      const unitPrice = parseFloat(item.price.amount);
      const saved = unitPrice * (item.quantity - 1) * 0.05;
      totalSaved += saved;
    });
    if (totalSaved > 0) {
      detailParts.push('Desconto por quantidade');
    }
  }

  // Combo savings: buying products from the same line
  const lineMap = new Map<string, number>();
  items.forEach(item => {
    const line = item.product.node.productType;
    if (line) {
      lineMap.set(line, (lineMap.get(line) || 0) + 1);
    }
  });
  const combos = Array.from(lineMap.entries()).filter(([, count]) => count >= 2);
  if (combos.length > 0) {
    // ~3% combo benefit for buying from same line
    combos.forEach(([line]) => {
      const lineItems = items.filter(i => i.product.node.productType === line);
      const lineTotal = lineItems.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);
      totalSaved += lineTotal * 0.03;
    });
    detailParts.push('Combo da mesma linha');
  }

  // Round to 2 decimals
  totalSaved = Math.round(totalSaved * 100) / 100;

  return {
    totalSaved,
    details: detailParts.join(' + ') || '',
  };
}

function CartRecommendations() {
  const items = useCartStore(state => state.items);
  const { data: allProducts } = useProducts(50);
  if (!allProducts || items.length === 0) return null;
  const recs = getCartRecommendations(items, allProducts, 3);
  return <CartUpsellBlock recommendations={recs} />;
}
