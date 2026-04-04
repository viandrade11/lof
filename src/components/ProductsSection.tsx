import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from './ProductCard';
import { Loader2 } from 'lucide-react';

export function ProductsSection() {
  const { data: products, isLoading, error } = useProducts(50);

  return (
    <section id="produtos" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Nossos Produtos</p>
          <h2 className="font-display text-4xl md:text-5xl font-light">
            Alta performance para seus <span className="italic">cabelos</span>
          </h2>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-muted-foreground">
            <p>Erro ao carregar produtos. Tente novamente.</p>
          </div>
        )}

        {!isLoading && !error && products && products.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p>Nenhum produto encontrado.</p>
          </div>
        )}

        {products && products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12">
            {products.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
