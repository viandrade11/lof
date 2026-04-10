import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/ProductCard';
import { useSEO } from '@/hooks/useSEO';
import { Loader2, Package, Gift, BadgePercent, Sparkles } from 'lucide-react';
import { useMemo } from 'react';

const benefits = [
  {
    icon: BadgePercent,
    title: 'Economia Real',
    desc: 'Kits com preço especial — mais barato do que comprar cada produto separadamente.',
  },
  {
    icon: Package,
    title: 'Rotina Completa',
    desc: 'Produtos que funcionam em sinergia para resultados profissionais em casa.',
  },
  {
    icon: Gift,
    title: 'Presente Perfeito',
    desc: 'Ideal para presentear quem merece um cuidado capilar de alto nível.',
  },
  {
    icon: Sparkles,
    title: 'Resultados Potencializados',
    desc: 'A combinação certa de ativos para cada tipo e necessidade capilar.',
  },
];

const KitsPage = () => {
  const { data: products, isLoading } = useProducts(50, 'title:kit');

  // fallback: also search in all products for "kit" in title
  const { data: allProducts } = useProducts(50);
  const kitProducts = useMemo(() => {
    if (products && products.length > 0) return products;
    if (!allProducts) return [];
    return allProducts.filter(p => p.node.title.toLowerCase().includes('kit'));
  }, [products, allProducts]);

  useSEO({
    title: 'Kits LOF Professional — Rotina Capilar Completa com Desconto',
    description:
      'Monte sua rotina capilar com os Kits LOF Professional. Combinações de shampoo, condicionador, máscara e finalizadores com preço especial. Economia e resultados profissionais.',
    keywords:
      'kit capilar, kit shampoo condicionador, kit tratamento capilar, LOF Professional kit, presente capilar, rotina capilar completa',
    breadcrumbs: [
      { name: 'LOF Professional', url: '/' },
      { name: 'Kits', url: '/kits' },
    ],
  });

  return (
    <div className="min-h-screen">
      <Header />

      <div className="pt-16 md:pt-20">
        {/* Hero Banner */}
        <section className="relative bg-gradient-to-br from-foreground via-foreground/95 to-foreground/85 text-background overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
          <div className="container relative py-16 md:py-24">
            <div className="max-w-2xl">
              <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-background/50 mb-4">
                <Link to="/" className="hover:text-background/70 transition-colors">Home</Link>
                <span className="mx-2">/</span>
                Kits
              </p>
              <h1 className="font-display text-4xl md:text-6xl font-light leading-[1.1] mb-5">
                Kits <span className="italic">Profissionais</span>
              </h1>
              <p className="text-background/60 text-sm md:text-base leading-relaxed max-w-lg">
                Rotinas capilares completas, combinadas por especialistas. 
                Cada kit reúne produtos que funcionam em sinergia — para resultados 
                que você sente desde a primeira aplicação.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="border-b border-border">
          <div className="container py-12 md:py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {benefits.map((b) => (
                <div key={b.title} className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 mb-3 border border-border rounded-full">
                    <b.icon className="h-4 w-4 text-foreground/70" />
                  </div>
                  <h3 className="text-xs uppercase tracking-[0.15em] font-semibold mb-1.5">{b.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="container py-12 md:py-20">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Escolha o seu</p>
            <h2 className="font-display text-3xl md:text-4xl font-light">
              Nossos <span className="italic">Kits</span>
            </h2>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : kitProducts.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg">Nenhum kit disponível no momento.</p>
              <p className="text-sm mt-2">Novos kits estão chegando em breve!</p>
              <Link
                to="/collections/all"
                className="inline-block mt-6 text-xs uppercase tracking-[0.15em] font-semibold border-b border-foreground pb-0.5 hover:opacity-70 transition-opacity"
              >
                Ver todos os produtos
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-8 md:gap-x-5 md:gap-y-12">
              {kitProducts.map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="border-t border-border bg-muted/30">
          <div className="container py-12 md:py-16 text-center">
            <h3 className="font-display text-2xl md:text-3xl font-light mb-3">
              Não encontrou o kit <span className="italic">ideal?</span>
            </h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
              Explore todos os nossos produtos e monte sua própria rotina capilar personalizada.
            </p>
            <Link
              to="/collections/all"
              className="inline-block px-8 py-3 bg-foreground text-background text-xs uppercase tracking-[0.2em] font-semibold hover:bg-foreground/90 transition-colors"
            >
              Ver Todos os Produtos
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default KitsPage;
