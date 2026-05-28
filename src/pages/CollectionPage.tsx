import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/ProductCard';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SlidersHorizontal, X, ChevronDown, Sparkles, Droplets, Shield, Tag } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { lineData } from '@/data/lineData';

const PAGE_SIZE = 12;
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
  { label: 'Em destaque', value: 'relevance' },
  { label: 'Menor preço', value: 'price-asc' },
  { label: 'Maior preço', value: 'price-desc' },
  { label: 'A–Z', value: 'alpha-asc' },
];

// SEO otimizado por linha (baseado em dados do Google Search Console)
// Título: benefício + linha + CTA/diferencial (máx ~60 chars)
// Descrição: benefício + ativos + CTA + frete (máx ~155 chars)
const LINE_SEO: Record<string, { title: string; description: string; keywords: string }> = {
  Repair: {
    title: 'Repair LOF — Reconstrução Capilar para Cabelos Danificados',
    description: 'Linha Repair LOF Professional: shampoo, condicionador e máscara de reconstrução com queratina vegetal. Recupere cabelos quebradiços. Frete grátis acima de R$ 199.',
    keywords: 'reconstrução capilar, shampoo reconstrutor, máscara reparadora, queratina vegetal, cabelos danificados, LOF Repair',
  },
  Nutritive: {
    title: 'Nutritive LOF — Shampoo e Condicionador Nutritivo Profissional',
    description: 'Linha Nutritive LOF: shampoo e condicionador nutritivo com óleo de macadâmia e karité. Nutrição profunda para cabelos secos. Frete grátis acima de R$ 199.',
    keywords: 'condicionador nutritivo, shampoo nutritivo, nutrição capilar, máscara de nutrição, óleo de macadâmia, cabelos secos, LOF Nutritive',
  },
  Silver: {
    title: 'Silver LOF — Shampoo Matizador Violeta para Loiros e Grisalhos',
    description: 'Linha Silver LOF Professional: shampoo e máscara matizadora violeta que neutraliza o amarelado e hidrata loiros e grisalhos. Frete grátis acima de R$ 199.',
    keywords: 'shampoo matizador, matizador violeta, shampoo para loiros, máscara matizadora, cabelos grisalhos, LOF Silver',
  },
  Purifying: {
    title: 'Purifying LOF — Shampoo Vegano Sem Sulfato para Cabelos Oleosos',
    description: 'Linha Purifying LOF: shampoo e condicionador veganos, sem sulfatos e parabenos. Limpeza profunda e suave para uso diário. Frete grátis acima de R$ 199.',
    keywords: 'shampoo vegano, shampoo sem sulfato, shampoo antirresíduo, cosméticos veganos capilares, cabelos oleosos, LOF Purifying',
  },
  Wavy: {
    title: 'Wavy LOF — Ativador de Cachos e Leave-in para Ondas Definidas',
    description: 'Linha Wavy LOF Professional: shampoo, condicionador e ativador de cachos leave-in. Definição sem frizz para cabelos cacheados e ondulados. Frete grátis acima de R$ 199.',
    keywords: 'ativador de cachos, ativador de cachos leave in, shampoo para cachos, creme para cabelo cacheado, definição de cachos, LOF Wavy',
  },
  Hydrate: {
    title: 'Hydrate LOF — Hidratação Profunda para Cabelos Ressecados',
    description: 'Linha Hydrate LOF: shampoo, condicionador e máscara de hidratação com ácido hialurônico. Devolve maciez e brilho a cabelos porosos. Frete grátis acima de R$ 199.',
    keywords: 'máscara de hidratação, shampoo hidratante, hidratação capilar profunda, ácido hialurônico capilar, cabelos ressecados, LOF Hydrate',
  },
  Finalizadores: {
    title: 'Finalizadores LOF — Leave-in, Sérum e Crystal Oil Profissional',
    description: 'Finalizadores LOF Professional: leave-in Hit 10x1, Crystal Oil e séruns com proteção térmica e brilho intenso. Frete grátis acima de R$ 199.',
    keywords: 'leave-in profissional, sérum capilar, óleo capilar, Crystal Oil, Hit 10x1, proteção térmica, finalizadores capilares',
  },
};

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
  const activeLines = useMemo(() => searchParams.getAll('linha'), [searchParams]);
  const activeTypes = useMemo(() => searchParams.getAll('tipo'), [searchParams]);
  const onlySale = searchParams.get('promo') === '1';
  const sort = searchParams.get('sort') || 'relevance';
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({ linha: true, tipo: true });

  // Reset pagination when filters/sort change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [searchParams]);

  const updateParams = (mutate: (p: URLSearchParams) => void) => {
    const next = new URLSearchParams(searchParams);
    mutate(next);
    setSearchParams(next, { replace: true });
  };

  const setActiveLines = (lines: string[]) => updateParams(p => {
    p.delete('linha');
    lines.forEach(l => p.append('linha', l));
  });
  const setActiveTypes = (types: string[]) => updateParams(p => {
    p.delete('tipo');
    types.forEach(t => p.append('tipo', t));
  });
  const setOnlySale = (v: boolean) => updateParams(p => {
    if (v) p.set('promo', '1'); else p.delete('promo');
  });
  const setSort = (s: string) => updateParams(p => {
    if (s && s !== 'relevance') p.set('sort', s); else p.delete('sort');
  });

  const { data: products, isLoading } = useProducts(50);

  const filteredForSeo = useMemo(() => {
    if (!products) return [];
    return products.filter(p => {
      const title = p.node.title;
      const productType = (p.node as any).productType || '';
      const lineOk = activeLines.length === 0 || activeLines.some(l => matchesLine(title, productType, l));
      const typeOk = activeTypes.length === 0 || activeTypes.some(t => matchesType(title, t));
      return lineOk && typeOk;
    });
  }, [products, activeLines, activeTypes]);

  const seoLine = activeLines[0];
  const seoType = activeTypes[0];
  const lineSeo = seoLine ? LINE_SEO[seoLine] : undefined;
  const seoTitle = seoLine && seoType && lineSeo
    ? `${seoType} ${seoLine} LOF — ${seoType === 'Shampoo' ? 'Lavagem' : 'Tratamento'} Profissional | Frete Grátis R$199`
    : lineSeo
    ? lineSeo.title
    : seoType
    ? `${seoType} Profissional LOF — Cosméticos Capilares | Frete Grátis R$199`
    : 'Cosméticos Capilares Profissionais LOF — Haircare Sofisticado | Frete Grátis';
  const seoDescription = seoLine && seoType && lineSeo
    ? `${seoType} da linha ${seoLine} LOF Professional. ${lineSeo.description.split('. ').slice(1).join('. ')}`
    : lineSeo
    ? lineSeo.description
    : seoType
    ? `${seoType} profissional LOF das linhas Repair, Nutritive, Silver, Wavy, Hydrate e Purifying. Resultados de salão em casa. Frete grátis acima de R$ 199.`
    : 'Cosméticos capilares profissionais LOF: shampoos, condicionadores, máscaras, leave-ins e finalizadores das linhas Repair, Nutritive, Silver, Wavy e Hydrate. Frete grátis acima de R$ 199.';
  const seoKeywords = lineSeo
    ? lineSeo.keywords
    : 'cosméticos capilares profissionais, shampoo profissional, condicionador profissional, máscara capilar, leave-in profissional, sérum capilar, LOF Professional, haircare profissional';
  const seoCanonical = (() => {
    const params = new URLSearchParams();
    if (seoLine) params.set('linha', seoLine);
    if (seoType) params.set('tipo', seoType);
    const q = params.toString();
    return `https://lof.com.br/collections/all${q ? `?${q}` : ''}`;
  })();

  useSEO({
    title: seoTitle,
    description: seoDescription,
    canonical: seoCanonical,
    keywords: seoKeywords,
    breadcrumbs: [
      { name: 'LOF Professional', url: '/' },
      { name: 'Todos os Produtos', url: '/collections/all' },
      ...(seoLine ? [{ name: seoLine, url: `/collections/all?linha=${seoLine}` }] : []),
    ],
    itemList: filteredForSeo.slice(0, 30).map(p => ({
      name: p.node.title,
      url: `/products/${p.node.handle}`,
      image: p.node.images?.edges?.[0]?.node?.url,
    })),
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

      if (onlySale) {
        const cmp = p.node.compareAtPriceRange?.minVariantPrice?.amount;
        const cur = p.node.priceRange.minVariantPrice.amount;
        if (!cmp || parseFloat(cmp) <= parseFloat(cur)) return false;
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
  }, [products, activeLines, activeTypes, onlySale, sort]);

  const toggleLine = (line: string) => {
    setActiveLines(activeLines.includes(line) ? activeLines.filter(l => l !== line) : [...activeLines, line]);
  };

  const toggleType = (type: string) => {
    setActiveTypes(activeTypes.includes(type) ? activeTypes.filter(t => t !== type) : [...activeTypes, type]);
  };

  const clearAll = () => {
    setActiveLines([]);
    setActiveTypes([]);
    setOnlySale(false);
  };

  const hasFilters = activeLines.length > 0 || activeTypes.length > 0 || onlySale;

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
          {onlySale && (
            <button onClick={() => setOnlySale(false)} className="flex items-center gap-1.5 px-2.5 py-1 bg-red-600 text-white text-[11px] uppercase tracking-wider font-medium">
              Promoção <X className="h-2.5 w-2.5" />
            </button>
          )}
        </div>
      )}

      {/* Promo toggle */}
      <button
        onClick={() => setOnlySale(v => !v)}
        className={`flex items-center gap-2 w-full py-2 text-xs uppercase tracking-[0.15em] font-semibold transition-colors ${onlySale ? 'text-red-600' : 'text-muted-foreground hover:text-foreground'}`}
      >
        <Tag className="h-3.5 w-3.5" />
        Apenas em promoção
      </button>

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
              <div className="min-h-[80vh]">
                {isLoading ? (
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-8 md:gap-x-5 md:gap-y-12">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="aspect-square bg-muted mb-3" />
                        <div className="h-4 bg-muted w-3/4 mb-2" />
                        <div className="h-4 bg-muted w-1/3" />
                      </div>
                    ))}
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center py-20 text-muted-foreground">
                    <p className="text-lg">Nenhum produto encontrado.</p>
                    <p className="text-sm mt-2">Tente alterar os filtros.</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-8 md:gap-x-5 md:gap-y-12">
                      {filteredProducts.slice(0, visibleCount).map((product, idx) => (
                        <ProductCard key={product.node.id} product={product} priority={idx < 4} />
                      ))}
                    </div>
                    {visibleCount < filteredProducts.length && (
                      <div className="flex justify-center mt-10">
                        <button
                          onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
                          className="px-8 py-3 border border-foreground text-xs uppercase tracking-[0.2em] font-semibold hover:bg-foreground hover:text-background transition-colors"
                        >
                          Carregar mais ({filteredProducts.length - visibleCount} restantes)
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CollectionPage;
