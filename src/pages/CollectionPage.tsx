import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/ProductCard';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Loader2, SlidersHorizontal, X } from 'lucide-react';

const LINE_FILTERS = [
  { label: 'Todos', value: '' },
  { label: 'Repair', value: 'Repair' },
  { label: 'Nutritive', value: 'Nutritive' },
  { label: 'Silver', value: 'Silver' },
  { label: 'Purifying', value: 'Purifying' },
  { label: 'Wavy', value: 'Wavy' },
  { label: 'Hydrate', value: 'Hydrate' },
  { label: 'Finalizadores', value: 'Finalizadores' },
];

const TYPE_FILTERS = [
  { label: 'Todos', value: '' },
  { label: 'Shampoo', value: 'shampoo' },
  { label: 'Condicionador', value: 'condicionador' },
  { label: 'Máscara', value: 'mascara' },
  { label: 'Leave-in', value: 'leave-in' },
  { label: 'Booster', value: 'booster' },
  { label: 'Sérum', value: 'serum' },
  { label: 'Kit', value: 'kit' },
];

const CollectionPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeLinhaParam = searchParams.get('linha') || '';
  const [activeLine, setActiveLine] = useState(activeLinhaParam);
  const [activeType, setActiveType] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const { data: products, isLoading } = useProducts(50);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((p) => {
      const title = p.node.title.toLowerCase();
      const productType = (p.node as any).productType?.toLowerCase() || '';
      
      // Filter by line
      if (activeLine) {
        const lineMatch = activeLine.toLowerCase();
        if (!productType.includes(lineMatch) && !title.includes(lineMatch)) {
          return false;
        }
      }

      // Filter by product type
      if (activeType) {
        if (!title.includes(activeType)) {
          return false;
        }
      }

      return true;
    });
  }, [products, activeLine, activeType]);

  const handleLineFilter = (value: string) => {
    setActiveLine(value);
    if (value) {
      setSearchParams({ linha: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-16 md:pt-20">
        {/* Page Header */}
        <div className="border-b border-border">
          <div className="container py-8 md:py-12">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
                  <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
                  <span className="mx-2">/</span>
                  Produtos
                </p>
                <h1 className="font-display text-3xl md:text-4xl font-bold">
                  {activeLine ? `Linha ${activeLine}` : 'Todos os Produtos'}
                </h1>
              </div>
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'produto' : 'produtos'}
              </p>
            </div>
          </div>
        </div>

        {/* Line filter tabs */}
        <div className="border-b border-border overflow-x-auto">
          <div className="container flex gap-0">
            {LINE_FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => handleLineFilter(f.value)}
                className={`px-4 md:px-6 py-3 text-xs uppercase tracking-[0.15em] font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeLine === f.value
                    ? 'border-foreground text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filters bar */}
        <div className="border-b border-border">
          <div className="container py-3 flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filtros
            </button>
            {(activeLine || activeType) && (
              <button
                onClick={() => { setActiveLine(''); setActiveType(''); setSearchParams({}); }}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" /> Limpar filtros
              </button>
            )}
          </div>
          {showFilters && (
            <div className="container pb-4">
              <div className="flex flex-wrap gap-2">
                {TYPE_FILTERS.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setActiveType(f.value)}
                    className={`px-3 py-1.5 text-xs border transition-colors ${
                      activeType === f.value
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Products grid */}
        <div className="container py-8 md:py-12">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg">Nenhum produto encontrado.</p>
              <p className="text-sm mt-2">Tente alterar os filtros.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-8 md:gap-x-5 md:gap-y-12">
              {filteredProducts.map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CollectionPage;
