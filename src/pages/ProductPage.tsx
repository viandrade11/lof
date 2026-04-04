import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useProductByHandle } from '@/hooks/useProducts';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice } from '@/lib/shopify';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Loader2, ChevronLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ProductPage = () => {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading } = useProductByHandle(handle || '');
  const addItem = useCartStore(state => state.addItem);
  const cartLoading = useCartStore(state => state.isLoading);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center pt-32 pb-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container pt-32 pb-20 text-center">
          <h1 className="font-display text-3xl mb-4">Produto não encontrado</h1>
          <Link to="/" className="text-sm underline text-muted-foreground">Voltar para a loja</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images?.edges || [];
  const variants = product.variants?.edges || [];
  const selectedVariant = variants[selectedVariantIdx]?.node;
  const hasMultipleVariants = variants.length > 1 && !(variants.length === 1 && variants[0].node.title === 'Default Title');

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success('Produto adicionado ao carrinho', { position: 'top-center' });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container pt-24 md:pt-28 pb-20">
        <Link to="/" className="inline-flex items-center text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground mb-8">
          <ChevronLeft className="h-4 w-4 mr-1" /> Voltar
        </Link>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          {/* Images */}
          <div>
            <div className="aspect-square bg-muted overflow-hidden mb-3">
              {images[selectedImage]?.node ? (
                <img
                  src={images[selectedImage].node.url}
                  alt={images[selectedImage].node.altText || product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <ShoppingBag className="h-16 w-16" />
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((img: { node: { url: string; altText: string | null } }, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 flex-shrink-0 overflow-hidden border-2 transition-colors ${
                      i === selectedImage ? 'border-foreground' : 'border-transparent'
                    }`}
                  >
                    <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-light mb-3">{product.title}</h1>
            <p className="text-2xl font-semibold mb-6">
              {selectedVariant && formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
            </p>

            {hasMultipleVariants && product.options && (
              <div className="mb-8">
                {product.options.map((option: { name: string; values: string[] }) => (
                  <div key={option.name} className="mb-4">
                    <p className="text-xs uppercase tracking-wider font-medium mb-2">{option.name}</p>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value: string) => {
                        const variantIdx = variants.findIndex(
                          (v: { node: { selectedOptions: Array<{ name: string; value: string }> } }) =>
                            v.node.selectedOptions.some(o => o.name === option.name && o.value === value)
                        );
                        const isSelected = variantIdx === selectedVariantIdx;
                        return (
                          <button
                            key={value}
                            onClick={() => variantIdx >= 0 && setSelectedVariantIdx(variantIdx)}
                            className={`h-9 px-4 text-xs border transition-colors ${
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

            <Button
              onClick={handleAddToCart}
              disabled={cartLoading || !selectedVariant?.availableForSale}
              className="w-full h-14 uppercase tracking-[0.2em] text-xs font-semibold"
              size="lg"
            >
              {cartLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : !selectedVariant?.availableForSale ? (
                'Produto Indisponível'
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4 mr-2" /> Adicionar ao Carrinho
                </>
              )}
            </Button>

            <div className="mt-8 border-t border-border pt-8">
              <h3 className="text-xs uppercase tracking-wider font-semibold mb-3">Descrição</h3>
              <div
                className="text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
