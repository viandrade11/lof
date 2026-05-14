import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/ProductCard';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Loader2, SlidersHorizontal, X, ChevronDown, Sparkles, Droplets, Shield } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { lineData } from '@/data/lineData';
const LINE_COLORS: Record<string, string> = {
  Repair: 'bg-lof-repair',
  Nutritive: 'bg-lof-nutritive',
  Silver: 'bg-lof-silver',
  Purifying: 'bg-lof-purifying',
  Wavy: 'bg-lof-wavy',
  Hydrate: 'bg-lof-hydrate',
};

const LINES = ['Repair', 'Nutritive', 'Silver', 'Purifying', 'Wavy', 'Hydrate', 'Finalizadores'];

const TYPE_MAP: Record<string, string[]> = {
  'Shampoo': ['shampoo'],
  'Condicionador': ['condicionador'],
  'Máscara': ['máscara', 'mascara'],
  'Leave-in': ['leave-in'],
  'Finalizador': ['finalizador', 'leave-in', 'sérum', 'serum', 'crystal oil', 'spray'],
  'Tratamento': ['tratamento', 'booster', 'máscara', 'mascara', 'ampola'],
  'Booster': ['booster'],
  'Sérum': ['sérum', 'serum', 'crystal oil'],
  'Kit': ['kit'],
};

const SORT_OPTIONS = [
  { label: 'Relevância', value: 'relevance' },
  { label: 'Menor preço', value: 'price-asc' },
  { label: 'Maior preço', value: 'price-desc' },
  { label: 'A–Z', value: 'alpha-asc' },
];

function matchesLine(title: string, productType: string, line: string) {
  const l = line.toLowerCase();
  return productType.toLowerCase().includes(l) || title.toLowerCase().includes(l);
}

function matchesType(title: string, type: string) {
  const keywords = TYPE_MAP[type] || [type.toLowerCase()];
  const t = title.toLowerCase();
  return keywords.some(k => t.includes(k));
}

const CollectionPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeLinhaParam = searchParams.get('linha') || '';
  const activeTipoParam = searchParams.get('tipo') || '';

  const [activeLines, setActiveLines] = useState<string[]>(activeLinhaParam ? [activeLinhaParam] : []);
  const [activeTypes, setActiveTypes] = useState<string[]>(activeTipoParam ? [activeTipoParam] : []);
  const [sort, setSort] = useState('relevance');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({ linha: true, tipo: true });

  // Sync URL params
  useEffect(() => {
    const linhaParam = searchParams.get('linha');
    const tipoParam = searchParams.get('tipo');
    if (linhaParam && !activeLines.includes(linhaParam)) {
      setActiveLines([linhaParam]);
    }
    if (tipoParam && !activeTypes.includes(tipoParam)) {
      setActiveTypes([tipoParam]);
    }
  }, [searchParams]);

  const { data: products, isLoading } = useProducts(50);

  useSEO({
    title: 'Produtos LOF Professional — Cosméticos Capilares',
    description: 'Todos os produtos LOF Professional: shampoos, condicionadores, máscaras, leave-ins e finalizadores das linhas Repair, Nutritive, Silver e mais.',
    keywords: 'produtos capilares, shampoo sem parabenos, condicionador profissional, máscara capilar, leave-in profissional, sérum capilar, LOF Professional',
    breadcrumbs: [
      { name: 'LOF Professional', url: '/' },
      { name: 'Todos os Produtos', url: '/collections/all' },
    ],
  });

  // Compute counts
  const lineCounts = useMemo(() => {
    if (!products) return {};
    const counts: Record<string, number> = {};
    LINES.forEach(line => {
      counts[line] = products.filter(p => matchesLine(p.node.title, (p.node as any).productType || '', line)).length;
    });
    return counts;
  }, [products]);

  const typeCounts = useMemo(() => {
    if (!products) return {};
    const counts: Record<string, number> = {};
    Object.keys(TYPE_MAP).forEach(type => {
      counts[type] = products.filter(p => matchesType(p.node.title, type)).length;
    });
    return counts;
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    let result = products.filter(p => {
      const title = p.node.title.toLowerCase();
      const productType = ((p.node as any).productType || '').toLowerCase();

      if (activeLines.length > 0) {
        if (!activeLines.some(line => matchesLine(title, productType, line))) return false;
      }

      if (activeTypes.length > 0) {
        if (!activeTypes.some(type => matchesType(title, type))) return false;
      }

      return true;
    });

    // Sort
    if (sort === 'price-asc') {
      result = [...result].sort((a, b) => parseFloat(a.node.priceRange.minVariantPrice.amount) - parseFloat(b.node.priceRange.minVariantPrice.amount));
    } else if (sort === 'price-desc') {
      result = [...result].sort((a, b) => parseFloat(b.node.priceRange.minVariantPrice.amount) - parseFloat(a.node.priceRange.minVariantPrice.amount));
    } else if (sort === 'alpha-asc') {
      result = [...result].sort((a, b) => a.node.title.localeCompare(b.node.title));
    }

    return result;
  }, [products, activeLines, activeTypes, sort]);

  const toggleLine = (line: string) => {
    setActiveLines(prev => {
      const next = prev.includes(line) ? prev.filter(l => l !== line) : [...prev, line];
      if (next.length === 0) {
        setSearchParams({});
      } else if (next.length === 1) {
        setSearchParams({ linha: next[0] });
      }
      return next;
    });
  };

  const toggleType = (type: string) => {
    setActiveTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  const clearAll = () => {
    setActiveLines([]);
    setActiveTypes([]);
    setSearchParams({});
  };

  const hasFilters = activeLines.length > 0 || activeTypes.length > 0;

  const toggleSection = (s: 'linha' | 'tipo') => {
    setExpandedSections(prev => ({ ...prev, [s]: !prev[s] }));
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      {hasFilters && (
        <button onClick={clearAll} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <X className="h-3 w-3" /> Limpar filtros
        </button>
      )}

      {/* Active filter tags */}
      {hasFilters && (
        <div className="flex flex-wrap gap-1.5">
          {activeLines.map(l => (
            <button key={l} onClick={() => toggleLine(l)} className="flex items-center gap-1.5 px-2.5 py-1 bg-foreground text-background text-[11px] uppercase tracking-wider font-medium">
              {LINE_COLORS[l] && <span className={`w-2 h-2 rounded-full ${LINE_COLORS[l]}`} />}
              {l} <X className="h-2.5 w-2.5" />
            </button>
          ))}
          {activeTypes.map(t => (
            <button key={t} onClick={() => toggleType(t)} className="flex items-center gap-1.5 px-2.5 py-1 bg-foreground text-background text-[11px] uppercase tracking-wider font-medium">
              {t} <X className="h-2.5 w-2.5" />
            </button>
          ))}
        </div>
      )}

      {/* Linha filter */}
      <div>
        <button onClick={() => toggleSection('linha')} className="flex items-center justify-between w-full py-2 border-b border-border">
          <span className="text-xs uppercase tracking-[0.15em] font-semibold">Linha</span>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expandedSections.linha ? 'rotate-180' : ''}`} />
        </button>
        {expandedSections.linha && (
          <div className="pt-3 space-y-1">
            {LINES.map(line => (
              <button
                key={line}
                onClick={() => toggleLine(line)}
                className={`flex items-center justify-between w-full py-1.5 text-sm transition-colors ${
                  activeLines.includes(line) ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-sm border transition-colors flex items-center justify-center ${
                    activeLines.includes(line) ? 'bg-foreground border-foreground' : 'border-border'
                  }`}>
                    {activeLines.includes(line) && (
                      <svg className="w-2 h-2 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  {LINE_COLORS[line] && <span className={`w-2.5 h-2.5 rounded-full ${LINE_COLORS[line]}`} />}
                  {line}
                </span>
                <span className="text-xs text-muted-foreground">{lineCounts[line] || 0}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tipo filter */}
      <div>
        <button onClick={() => toggleSection('tipo')} className="flex items-center justify-between w-full py-2 border-b border-border">
          <span className="text-xs uppercase tracking-[0.15em] font-semibold">Tipo de Produto</span>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expandedSections.tipo ? 'rotate-180' : ''}`} />
        </button>
        {expandedSections.tipo && (
          <div className="pt-3 space-y-1">
            {Object.keys(TYPE_MAP).map(type => (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className={`flex items-center justify-between w-full py-1.5 text-sm transition-colors ${
                  activeTypes.includes(type) ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-sm border transition-colors flex items-center justify-center ${
                    activeTypes.includes(type) ? 'bg-foreground border-foreground' : 'border-border'
                  }`}>
                    {activeTypes.includes(type) && (
                      <svg className="w-2 h-2 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  {type}
                </span>
                <span className="text-xs text-muted-foreground">{typeCounts[type] || 0}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const activeLineInfo = activeLines.length === 1
    ? lineData.find(l => l.query.toLowerCase() === activeLines[0].toLowerCase() || l.name.toLowerCase() === activeLines[0].toLowerCase())
    : null;

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-16 md:pt-20">
        {/* Page Header */}
        <div className="border-b border-border">
          <div className="container py-8 md:py-12">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <span className="mx-2">/</span>
              Produtos
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-bold">
              {activeLines.length === 1 ? `Linha ${activeLines[0]}` : 'Todos os Produtos'}
            </h1>
          </div>
        </div>

        {/* Line Info Banner */}
        {activeLineInfo && (
          <div className="border-b border-border" style={{ background: `linear-gradient(135deg, hsl(var(${activeLineInfo.colorVar}) / 0.08) 0%, hsl(var(${activeLineInfo.colorVar}) / 0.03) 100%)` }}>
            <div className="container py-8 md:py-10">
              <div className="grid md:grid-cols-[1fr_auto] gap-6 md:gap-12 items-start">
                <div>
                  <div className={`inline-block px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold text-white ${activeLineInfo.colorClass} mb-3`}>
                    {activeLineInfo.headline}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                    {activeLineInfo.description}
                  </p>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-foreground/70" />
                        <p className="text-[10px] uppercase tracking-[0.15em] font-semibold">Benefícios</p>
                      </div>
                      <ul className="space-y-1">
                        {activeLineInfo.benefits.map(b => (
                          <li key={b} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                            <span className={`mt-1 w-1 h-1 rounded-full flex-shrink-0 ${activeLineInfo.colorClass}`} />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Droplets className="h-3.5 w-3.5 text-foreground/70" />
                        <p className="text-[10px] uppercase tracking-[0.15em] font-semibold">Principais Ativos</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{activeLineInfo.ingredients}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Shield className="h-3.5 w-3.5 text-foreground/70" />
                        <p className="text-[10px] uppercase tracking-[0.15em] font-semibold">Ideal Para</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{activeLineInfo.idealFor}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Toolbar (mobile filter toggle + sort + count) */}
        <div className="border-b border-border">
          <div className="container py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="md:hidden flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filtros
                {hasFilters && (
                  <span className="bg-foreground text-background text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {activeLines.length + activeTypes.length}
                  </span>
                )}
              </button>
              <span className="text-xs text-muted-foreground">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'produto' : 'produtos'}
              </span>
            </div>

            <div className="relative">
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="appearance-none bg-transparent text-xs uppercase tracking-[0.1em] font-medium text-muted-foreground hover:text-foreground cursor-pointer pr-5 focus:outline-none"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Mobile filters drawer */}
        {mobileFiltersOpen && (
          <div className="md:hidden border-b border-border bg-background">
            <div className="container py-6">
              <FilterSidebar />
            </div>
          </div>
        )}

        {/* Main content: sidebar + grid */}
        <div className="container py-8 md:py-12">
          <div className="flex gap-12">
            {/* Desktop sidebar */}
            <aside className="hidden md:block w-56 flex-shrink-0">
              <FilterSidebar />
            </aside>

            {/* Products grid */}
            <div className="flex-1 min-w-0">
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
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-8 md:gap-x-5 md:gap-y-12">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.node.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CollectionPage;
