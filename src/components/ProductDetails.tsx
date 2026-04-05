import { Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from './ProductCard';
import { getProductRichContent } from '@/data/productRichContent';
import { Droplets, Sparkles, Leaf, Clock, Package } from 'lucide-react';

interface ProductDetailsProps {
  product: {
    title: string;
    handle?: string;
    productType?: string;
    description: string;
  };
}

const lineColors: Record<string, { bg: string; accent: string }> = {
  Repair: { bg: 'bg-lof-repair', accent: 'text-purple-300' },
  Nutritive: { bg: 'bg-lof-nutritive', accent: 'text-green-300' },
  Silver: { bg: 'bg-lof-silver', accent: 'text-gray-300' },
  Wavy: { bg: 'bg-lof-wavy', accent: 'text-blue-300' },
  Hydrate: { bg: 'bg-lof-hydrate', accent: 'text-sky-300' },
  Purifying: { bg: 'bg-lof-purifying', accent: 'text-emerald-300' },
  Finalizadores: { bg: 'bg-lof-hit', accent: 'text-orange-300' },
};

export function ProductDetails({ product }: ProductDetailsProps) {
  const productType = product.productType || '';
  const richContent = getProductRichContent(product.title, productType);
  const colors = lineColors[productType] || lineColors.Repair;

  const { data: relatedProducts } = useProducts(50);
  const sameLine = relatedProducts?.filter(
    (p) => {
      const pType = (p.node as any).productType || '';
      return pType === productType && p.node.title !== product.title;
    }
  )?.slice(0, 4) || [];

  if (!richContent) {
    return <FallbackDetails product={product} sameLine={sameLine} productType={productType} colors={colors} />;
  }

  return (
    <div>
      {/* About the Product */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10 md:gap-20">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Sobre o Produto</p>
              <h2 className="font-display text-2xl md:text-4xl font-bold leading-tight">{richContent.subtitle}</h2>
              {richContent.frequency && (
                <div className="mt-4 inline-flex items-center gap-2 bg-muted px-4 py-2 text-xs uppercase tracking-wider font-medium">
                  <Clock className="h-3.5 w-3.5" />
                  {richContent.frequency}
                </div>
              )}
              {richContent.sizes && (
                <div className="mt-2 inline-flex items-center gap-2 bg-muted px-4 py-2 text-xs uppercase tracking-wider font-medium ml-2">
                  <Package className="h-3.5 w-3.5" />
                  {richContent.sizes}
                </div>
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {richContent.longDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Ingredients */}
      <section className={`py-16 md:py-24 ${colors.bg} text-white`}>
        <div className="container">
          <div className="flex items-center gap-3 mb-3">
            <Leaf className="h-4 w-4 text-white/50" />
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Ingredientes-chave</p>
          </div>
          <h2 className="font-display text-2xl md:text-4xl font-bold mb-10">
            O que torna este produto especial
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {richContent.keyIngredients.map((ingredient, i) => (
              <div key={i} className="border border-white/20 p-6 md:p-8 bg-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Droplets className="h-5 w-5 text-white/70 flex-shrink-0" />
                  <h3 className="font-display text-lg font-bold">{ingredient.name}</h3>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">{ingredient.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10 md:gap-20">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Modo de Uso</p>
              <h2 className="font-display text-2xl md:text-4xl font-bold">Passo a passo para melhores resultados</h2>
              {richContent.tips && (
                <div className="mt-8 bg-secondary/50 border border-border p-5">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs uppercase tracking-wider font-semibold mb-1">Dica de beleza</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{richContent.tips}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-6">
              {richContent.howToUse.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <span className="font-display text-3xl font-bold text-muted-foreground/30 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed pt-2">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-foreground text-background">
        <div className="container">
          <p className="text-xs uppercase tracking-[0.3em] text-background/50 mb-3">Benefícios</p>
          <h2 className="font-display text-2xl md:text-4xl font-bold mb-10">
            O que {product.title} faz pelo seu cabelo
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
            {richContent.benefits.map((b, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="w-6 h-6 border border-background/30 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</span>
                <p className="text-sm text-background/80 leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {sameLine.length > 0 && (
        <section className="py-16 md:py-24 bg-secondary/30 border-t border-border">
          <div className="container">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Complete sua Rotina</p>
              <h2 className="font-display text-2xl md:text-4xl font-bold">
                Combine com outros produtos da linha {productType}
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-8 md:gap-x-5">
              {sameLine.map((p) => (
                <ProductCard key={p.node.id} product={p} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                to={`/collections/all?linha=${productType}`}
                className="inline-flex items-center h-11 px-6 border border-foreground text-foreground text-xs uppercase tracking-[0.2em] font-medium hover:bg-foreground hover:text-background transition-colors"
              >
                Ver toda linha {productType}
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

// Fallback for products without specific rich content
function FallbackDetails({ product, sameLine, productType, colors }: {
  product: ProductDetailsProps['product'];
  sameLine: any[];
  productType: string;
  colors: { bg: string; accent: string };
}) {
  return (
    <div>
      {sameLine.length > 0 && (
        <section className="py-16 md:py-24 bg-secondary/30 border-t border-border">
          <div className="container">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Complete sua Rotina</p>
              <h2 className="font-display text-2xl md:text-4xl font-bold">
                Combine com outros produtos da linha {productType}
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-8 md:gap-x-5">
              {sameLine.map((p) => (
                <ProductCard key={p.node.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
