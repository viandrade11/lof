import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useProductByHandle, useProducts } from '@/hooks/useProducts';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice } from '@/lib/shopify';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductDetails } from '@/components/ProductDetails';
import { UpsellBlock } from '@/components/UpsellBlock';
import { getSmartRecommendations } from '@/lib/productRecommendations';
import { Loader2, ChevronLeft, ShoppingBag, Minus, Plus, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useSEO } from '@/hooks/useSEO';

function PriceDisplay({ variant, size = 'lg' }: { variant: any; size?: 'lg' | 'xl' }) {
  if (!variant) return null;
  const compareAt = variant.compareAtPrice;
  const hasDiscount = compareAt && parseFloat(compareAt.amount) > parseFloat(variant.price.amount);
  const priceSizeClass = size === 'xl' ? 'text-2xl' : 'text-xl';
  const compareSizeClass = size === 'xl' ? 'text-base' : 'text-sm';

  if (hasDiscount) {
    const pct = Math.round((1 - parseFloat(variant.price.amount) / parseFloat(compareAt.amount)) * 100);
    return (
      <div className={`${size === 'xl' ? 'mt-4' : 'mt-2'} flex items-baseline gap-2 flex-wrap`}>
        <span className={`${compareSizeClass} text-muted-foreground line-through`}>
          De {formatPrice(compareAt.amount, compareAt.currencyCode)}
        </span>
        <span className={`${priceSizeClass} font-semibold text-green-600`}>
          Por {formatPrice(variant.price.amount, variant.price.currencyCode)}
        </span>
        <span className="text-xs font-bold uppercase bg-green-100 text-green-700 px-1.5 py-0.5 rounded">-{pct}%</span>
      </div>
    );
  }

  return (
    <div className={`${size === 'xl' ? 'mt-4' : 'mt-2'} flex items-baseline gap-3`}>
      <p className={`${priceSizeClass} font-semibold`}>
        {formatPrice(variant.price.amount, variant.price.currencyCode)}
      </p>
    </div>
  );
}

const ProductPage = () => {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading } = useProductByHandle(handle || '');
  const addItem = useCartStore(state => state.addItem);
  const cartLoading = useCartStore(state => state.isLoading);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const addToCartRef = useRef<HTMLButtonElement>(null);

  const images = product?.images?.edges || [];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const variants = product?.variants?.edges || [];
  const selectedVariant = variants[selectedVariantIdx]?.node;
  const firstImage = images[0]?.node?.url;
  const navigate = useNavigate();

  // Detect size from title (e.g. "300ml", "1L", "60ml", "15ml", "250ml", "1000ml")
  const sizeRegex = /\b(\d+(?:\.\d+)?\s*(?:ml|l|g|kg))\b/i;
  const extractSize = (title: string) => {
    const match = title.match(sizeRegex);
    return match ? match[1].trim() : null;
  };
  const extractBaseName = (title: string) => {
    return title.replace(sizeRegex, '').replace(/\s+/g, ' ').trim();
  };

  const currentSize = product ? extractSize(product.title) : null;
  const baseName = product ? extractBaseName(product.title) : '';

  // Fetch all products to find siblings with different sizes
  const { data: allProducts } = useProducts(100);
  const sizeVariants = useMemo(() => {
    if (!allProducts || !product || !currentSize) return [];
    return allProducts
      .filter(p => {
        const pSize = extractSize(p.node.title);
        const pBase = extractBaseName(p.node.title);
        return pSize && pBase.toLowerCase() === baseName.toLowerCase();
      })
      .map(p => ({
        size: extractSize(p.node.title)!,
        handle: p.node.handle,
        price: p.node.priceRange.minVariantPrice,
        isCurrent: p.node.handle === handle,
      }))
      .sort((a, b) => {
        const toMl = (s: string) => {
          const num = parseFloat(s);
          if (s.toLowerCase().includes('l') && !s.toLowerCase().includes('ml')) return num * 1000;
          return num;
        };
        return toMl(a.size) - toMl(b.size);
      });
  }, [allProducts, product, baseName, currentSize, handle]);

  // Track when the main Add to Cart button goes out of view
  useEffect(() => {
    const btn = addToCartRef.current;
    if (!btn) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(btn);
    return () => observer.disconnect();
  }, [product]);

  useSEO({
    title: product?.title || 'Produto | LOF Professional',
    description: product?.description?.slice(0, 155) || 'Cosméticos capilares profissionais LOF Professional.',
    type: 'product',
    image: firstImage,
    product: selectedVariant ? {
      name: product!.title,
      price: selectedVariant.price.amount,
      currency: selectedVariant.price.currencyCode,
      availability: selectedVariant.availableForSale ? 'InStock' : 'OutOfStock',
      brand: 'LOF Professional',
      description: product!.description || product!.title,
      image: firstImage,
    } : undefined,
  });

  useEffect(() => {
    if (product && selectedVariant && typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'ViewContent', {
        content_name: product.title,
        content_ids: [selectedVariant.id],
        content_type: 'product',
        value: parseFloat(selectedVariant.price.amount),
        currency: selectedVariant.price.currencyCode || 'BRL',
      });
    }
  }, [product?.id]);

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

  const hasMultipleVariants = variants.length > 1 && !(variants.length === 1 && variants[0].node.title === 'Default Title');
  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success('Produto adicionado ao carrinho', { position: 'top-center' });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-16 md:pt-20">
        {/* Breadcrumb */}
        <div className="container py-4 border-b border-border">
          <Link to="/" className="inline-flex items-center text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-3 w-3 mr-1" /> Home
          </Link>
          <span className="text-xs text-muted-foreground mx-2">/</span>
          <Link to="/collections/all" className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground">
            Produtos
          </Link>
          <span className="text-xs text-muted-foreground mx-2">/</span>
          <span className="text-xs text-foreground">{product.title}</span>
        </div>

        {/* Mobile: Title above images */}
        <div className="md:hidden p-6 pb-3">
          {product.productType && (
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Linha {product.productType}
            </p>
          )}
          <h1 className="font-display text-2xl font-bold leading-tight break-words">{product.title}</h1>
          <PriceDisplay variant={selectedVariant} size="lg" />
          {sizeVariants.length > 1 && (
            <div className="mt-4">
              <p className="text-xs uppercase tracking-wider font-medium mb-2">Tamanho</p>
              <div className="flex flex-wrap gap-2">
                {sizeVariants.map(sv => (
                  <button
                    key={sv.handle}
                    onClick={() => !sv.isCurrent && navigate(`/products/${sv.handle}`)}
                    className={`h-9 min-w-[40px] px-3 text-xs border transition-colors ${
                      sv.isCurrent
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border hover:border-foreground'
                    }`}
                  >
                    {sv.size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-[1fr_420px] lg:grid-cols-[1fr_480px]">
          {/* Left: Image Gallery */}
          <div className="flex flex-col">
            {images.length > 0 ? (
              <>
                {/* Main Image */}
                <div className="aspect-square overflow-hidden bg-muted cursor-zoom-in">
                  <img
                    src={images[selectedImageIndex]?.node.url}
                    alt={images[selectedImageIndex]?.node.altText || `${product.title} - Imagem ${selectedImageIndex + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex gap-2 p-3 md:p-4 overflow-x-auto">
                    {images.map((img: { node: { url: string; altText: string | null } }, i: number) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImageIndex(i)}
                        className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 overflow-hidden border-2 transition-all ${
                          i === selectedImageIndex
                            ? 'border-foreground opacity-100'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={img.node.url}
                          alt={img.node.altText || `Miniatura ${i + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="aspect-square flex items-center justify-center bg-muted text-muted-foreground">
                <ShoppingBag className="h-20 w-20" />
              </div>
            )}
          </div>

          {/* Right: Sticky Product Info */}
          <div className="md:sticky md:top-20 md:h-fit md:self-start p-6 md:p-10 lg:p-12 overflow-hidden">
            {/* Desktop: Title (hidden on mobile since it's shown above) */}
            <div className="hidden md:block">
              {product.productType && (
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  Linha {product.productType}
                </p>
              )}
              <h1 className="font-display text-3xl lg:text-4xl font-bold leading-tight break-words">{product.title}</h1>
              <PriceDisplay variant={selectedVariant} size="xl" />
            </div>

            {/* Variant Selector */}
            {hasMultipleVariants && product.options && (
              <div className="mt-6 md:mt-8">
                {product.options.map((option: { name: string; values: string[] }) => (
                  <div key={option.name} className="mb-5">
                    <p className="text-xs uppercase tracking-wider font-medium mb-3">{option.name}</p>
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
                            className={`h-10 min-w-[44px] px-4 text-xs border transition-colors ${
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

            {/* Size Selector (cross-product) */}
            {sizeVariants.length > 1 && (
              <div className="mt-6 md:mt-8">
                <p className="text-xs uppercase tracking-wider font-medium mb-3">Tamanho</p>
                <div className="flex flex-wrap gap-2">
                  {sizeVariants.map(sv => (
                    <button
                      key={sv.handle}
                      onClick={() => !sv.isCurrent && navigate(`/products/${sv.handle}`)}
                      className={`h-10 min-w-[44px] px-4 text-xs border transition-colors ${
                        sv.isCurrent
                          ? 'border-foreground bg-foreground text-background'
                          : 'border-border hover:border-foreground'
                      }`}
                    >
                      {sv.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center border border-border w-fit">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="h-12 w-12 flex items-center justify-center hover:bg-muted transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="h-12 w-12 flex items-center justify-center text-sm font-medium border-x border-border">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="h-12 w-12 flex items-center justify-center hover:bg-muted transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* Add to Cart */}
            <Button
              ref={addToCartRef}
              onClick={handleAddToCart}
              disabled={cartLoading || !selectedVariant?.availableForSale}
              className="w-full h-14 mt-6 uppercase tracking-[0.2em] text-xs font-semibold"
              size="lg"
            >
              {cartLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : !selectedVariant?.availableForSale ? (
                'Esgotado'
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4 mr-2" /> Adicionar ao Carrinho
                </>
              )}
            </Button>

            {/* Free shipping sticker */}
            <div className="flex items-center gap-2 mt-3 px-3 py-2.5 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-md">
              <Truck className="h-4 w-4 text-green-600 flex-shrink-0" />
              <p className="text-xs text-green-700 dark:text-green-400">
                <span className="font-semibold">Frete grátis</span> para compras acima de R$ 299
              </p>
            </div>

            {/* Upsell Block */}
            <ProductPageUpsell product={product} />

            {/* Description */}
            <div className="mt-10 border-t border-border">
              <details className="group" open>
                <summary className="flex items-center justify-between py-4 cursor-pointer text-xs uppercase tracking-wider font-semibold">
                  Descrição
                  <span className="text-muted-foreground group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div
                  className="pb-6 text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }}
                />
              </details>
            </div>
          </div>
        </div>

        {/* Rich Content Sections */}
        <ProductDetails product={product} />
      </div>

      {/* Sticky Add to Cart Bar */}
      {showStickyBar && selectedVariant && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)] animate-in slide-in-from-bottom-4 duration-300">
          <div className="container flex items-center gap-3 py-3">
            <div className="flex-1 min-w-0 hidden sm:block">
              <p className="text-sm font-semibold truncate">{product.title}</p>
              <p className="text-sm text-muted-foreground">
                {formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
              </p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="flex items-center border border-border">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="h-10 w-10 flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="h-10 w-8 flex items-center justify-center text-sm font-medium border-x border-border">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="h-10 w-10 flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <Button
                onClick={handleAddToCart}
                disabled={cartLoading || !selectedVariant.availableForSale}
                className="flex-1 sm:flex-none h-10 sm:h-11 sm:px-8 uppercase tracking-[0.15em] text-xs font-semibold"
              >
                {cartLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    <span className="sm:hidden">{formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}</span>
                    <span className="hidden sm:inline">Adicionar ao Carrinho</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

function ProductPageUpsell({ product }: { product: any }) {
  const { data: allProducts } = useProducts(50);
  if (!allProducts) return null;
  const recs = getSmartRecommendations(
    { title: product.title, handle: product.handle, productType: product.productType },
    allProducts,
    [],
    4,
  );
  return <UpsellBlock recommendations={recs} />;
}

export default ProductPage;
