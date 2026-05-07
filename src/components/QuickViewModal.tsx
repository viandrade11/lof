import { useState } from 'react';
import { X, ShoppingBag, Loader2, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice, type ShopifyProduct } from '@/lib/shopify';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface QuickViewModalProps {
  product: ShopifyProduct;
  open: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, open, onClose }: QuickViewModalProps) {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  const { node } = product;
  const images = node.images.edges;
  const variants = node.variants.edges;
  const selectedVariant = variants[selectedVariantIdx]?.node;
  const hasMultipleVariants = variants.length > 1 && !(variants.length === 1 && variants[0].node.title === 'Default Title');

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success('Produto adicionado ao carrinho', { position: 'top-center' });
    onClose();
  };

  if (!open) return null;

  const compareAt = selectedVariant?.compareAtPrice;
  const hasDiscount = compareAt && parseFloat(compareAt.amount) > parseFloat(selectedVariant.price.amount);

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl mx-auto mt-8 md:mt-16 px-4 max-h-[90vh] overflow-y-auto">
        <div className="bg-background border border-border shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-background/80 hover:bg-muted transition-colors"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="grid md:grid-cols-2">
            {/* Image */}
            <div className="aspect-square bg-muted overflow-hidden">
              {images[selectedImageIdx] ? (
                <img
                  src={images[selectedImageIdx].node.url}
                  alt={images[selectedImageIdx].node.altText || node.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <ShoppingBag className="h-16 w-16" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-6 md:p-8 flex flex-col">
              {node.productType && (
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                  Linha {node.productType}
                </p>
              )}
              <h2 className="font-display text-xl md:text-2xl font-bold leading-tight">{node.title}</h2>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-2">
                {hasDiscount ? (
                  <>
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(compareAt.amount, compareAt.currencyCode)}
                    </span>
                    <span className="text-xl font-semibold text-green-600">
                      {formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
                    </span>
                  </>
                ) : selectedVariant ? (
                  <span className="text-xl font-semibold">
                    {formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
                  </span>
                ) : null}
              </div>

              {/* Variants */}
              {hasMultipleVariants && node.options && (
                <div className="mt-5">
                  {node.options.map((option: { name: string; values: string[] }) => (
                    <div key={option.name} className="mb-4">
                      <p className="text-xs uppercase tracking-wider font-medium mb-2">{option.name}</p>
                      <div className="flex flex-wrap gap-2">
                        {option.values.map((value: string) => {
                          const variantIdx = variants.findIndex(
                            (v: any) => v.node.selectedOptions.some((o: any) => o.name === option.name && o.value === value)
                          );
                          const isSelected = variantIdx === selectedVariantIdx;
                          return (
                            <button
                              key={value}
                              onClick={() => variantIdx >= 0 && setSelectedVariantIdx(variantIdx)}
                              className={`h-9 min-w-[40px] px-3 text-xs border transition-colors ${
                                isSelected
                                  ? 'border-foreground bg-foreground text-background'
                                  : 'border-border hover:border-foreground'
                              }`}
                            >
                              {value}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 mt-4">
                  {images.slice(0, 4).map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImageIdx(i)}
                      className={`w-12 h-12 overflow-hidden border-2 transition-all ${
                        i === selectedImageIdx ? 'border-foreground' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img.node.url} alt={`Miniatura ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Quantity + Add to Cart */}
              <div className="mt-auto pt-5 space-y-4">
                <div className="flex items-center border border-border w-fit">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="h-10 w-10 flex items-center justify-center hover:bg-muted"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="h-10 w-10 flex items-center justify-center text-sm font-medium border-x border-border">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="h-10 w-10 flex items-center justify-center hover:bg-muted"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={isLoading || !selectedVariant?.availableForSale}
                  className="w-full h-12 uppercase tracking-[0.2em] text-xs font-semibold"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : !selectedVariant?.availableForSale ? (
                    'Esgotado'
                  ) : (
                    <><ShoppingBag className="h-4 w-4 mr-2" /> Adicionar ao Carrinho</>
                  )}
                </Button>

                <Link
                  to={`/products/${node.handle}`}
                  onClick={onClose}
                  className="block text-center text-xs underline text-muted-foreground hover:text-foreground"
                >
                  Ver detalhes completos →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
