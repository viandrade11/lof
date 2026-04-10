import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/ProductCard';
import { useSEO } from '@/hooks/useSEO';
import {
  Loader2, Package, Gift, BadgePercent, Sparkles, Zap, Shield,
  Droplets, Heart, Sun, FlaskConical, Layers, ArrowRight,
} from 'lucide-react';
import { useMemo } from 'react';

/* ── Quick-win benefits strip ── */
const quickBenefits = [
  { icon: BadgePercent, title: 'Economia Real', desc: 'Preço especial comparado à compra avulsa.' },
  { icon: Package, title: 'Rotina Completa', desc: 'Produtos em sinergia para resultados profissionais.' },
  { icon: Gift, title: 'Presente Perfeito', desc: 'Surpreenda com um cuidado capilar de alto nível.' },
  { icon: Sparkles, title: 'Resultados Imediatos', desc: 'Diferença visível desde a primeira aplicação.' },
];

/* ── Hit 10x1 combos ── */
const hitCombos = [
  {
    line: 'Repair',
    color: 'bg-lof-repair',
    colorLight: 'bg-lof-repair/10',
    title: 'Hit + Repair',
    desc: 'O leave-in Hit 10x1 sela e protege, enquanto a linha Repair reconstrói a fibra capilar de dentro pra fora. Juntos, devolvem força e elasticidade a cabelos danificados por química ou calor.',
    result: 'Cabelos reconstruídos, fortes e com proteção térmica até 230°C.',
  },
  {
    line: 'Nutritive',
    color: 'bg-lof-nutritive',
    colorLight: 'bg-lof-nutritive/10',
    title: 'Hit + Nutritive',
    desc: 'A nutrição profunda de óleos nobres da linha Nutritive complementa os 10 benefícios do Hit 10x1, criando uma barreira lipídica que combate o ressecamento e devolve a maciez.',
    result: 'Fios nutridos, macios e com brilho duradouro sem pesar.',
  },
  {
    line: 'Silver',
    color: 'bg-lof-silver',
    colorLight: 'bg-lof-silver/10',
    title: 'Hit + Silver',
    desc: 'Enquanto a linha Silver matiza e neutraliza tons amarelados, o Hit 10x1 hidrata e protege os fios sensibilizados pela descoloração, mantendo a saúde do cabelo loiro.',
    result: 'Loiros matizados, hidratados e livres de frizz.',
  },
  {
    line: 'Wavy',
    color: 'bg-lof-wavy',
    colorLight: 'bg-lof-wavy/10',
    title: 'Hit + Wavy',
    desc: 'A definição e controle de frizz da Wavy ganham mais duração com a proteção e o desembaraço do Hit 10x1. Cachos definidos com toque natural, sem crocância.',
    result: 'Cachos definidos, soltos e protegidos o dia inteiro.',
  },
];

/* ── Boosters section ── */
const boosterBenefits = [
  {
    icon: FlaskConical,
    title: 'Tratamento Concentrado',
    desc: 'Fórmulas com alta concentração de ativos que penetram na fibra capilar para tratamento intensivo em minutos.',
  },
  {
    icon: Zap,
    title: 'Potencialização Instantânea',
    desc: 'Adicione à máscara ou condicionador para turbinar qualquer tratamento capilar — resultados visíveis na primeira aplicação.',
  },
  {
    icon: Layers,
    title: 'Versatilidade Total',
    desc: 'Combine boosters com qualquer linha LOF para personalizar seu tratamento de acordo com a necessidade do momento.',
  },
  {
    icon: Heart,
    title: 'Recuperação Profunda',
    desc: 'Ideais para cabelos muito danificados, descoloridos ou com processos químicos — recuperação de dentro pra fora.',
  },
];

const KitsPage = () => {
  const { data: products, isLoading } = useProducts(50, 'title:kit');
  const { data: allProducts } = useProducts(50);

  const kitProducts = useMemo(() => {
    if (products && products.length > 0) return products;
    if (!allProducts) return [];
    return allProducts.filter(p => p.node.title.toLowerCase().includes('kit'));
  }, [products, allProducts]);

  useSEO({
    title: 'Kits LOF Professional — Rotina Capilar Completa com Desconto',
    description:
      'Monte sua rotina capilar com os Kits LOF Professional. Combinações de shampoo, condicionador, máscara, Hit 10x1 e boosters com preço especial. Economia e resultados profissionais.',
    keywords:
      'kit capilar, kit shampoo condicionador, kit tratamento capilar, LOF Professional kit, booster capilar, hit 10x1 kit, rotina capilar completa',
    breadcrumbs: [
      { name: 'LOF Professional', url: '/' },
      { name: 'Kits', url: '/kits' },
    ],
  });

  return (
    <div className="min-h-screen">
      <Header />

      <div className="pt-16 md:pt-20">

        {/* ═══════ HERO ═══════ */}
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
                Cada kit reúne produtos que funcionam em sinergia — shampoo, condicionador,
                máscara, finalizadores e boosters — para resultados que você sente
                desde a primeira aplicação.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════ QUICK BENEFITS ═══════ */}
        <section className="border-b border-border">
          <div className="container py-12 md:py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {quickBenefits.map((b) => (
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

        {/* ═══════ HIT 10x1 + LINHAS ═══════ */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12 md:mb-16">
              <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
                A combinação perfeita
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-light mb-4">
                Hit 10x1 <span className="italic">+ Nossas Linhas</span>
              </h2>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
                O leave-in Hit 10x1 foi pensado para complementar cada linha LOF.
                Enquanto ele protege, hidrata e finaliza, a linha cuida do tratamento específico que o seu cabelo precisa.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5 md:gap-6">
              {hitCombos.map((combo) => (
                <div
                  key={combo.line}
                  className="group relative border border-border p-6 md:p-8 hover:border-foreground/20 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`w-3 h-3 rounded-full ${combo.color}`} />
                    <h3 className="text-sm uppercase tracking-[0.15em] font-semibold">{combo.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{combo.desc}</p>
                  <div className={`${combo.colorLight} px-4 py-3 border-l-2`} style={{ borderColor: 'currentColor' }}>
                    <p className="text-xs font-medium flex items-start gap-2">
                      <Sparkles className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-foreground/60" />
                      <span className="text-foreground/80">{combo.result}</span>
                    </p>
                  </div>
                  <Link
                    to={`/collections/all?linha=${combo.line}`}
                    className="inline-flex items-center gap-1.5 mt-5 text-[11px] uppercase tracking-[0.15em] font-semibold text-foreground/60 hover:text-foreground transition-colors"
                  >
                    Ver linha {combo.line} <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                to="/hit-10x1"
                className="inline-flex items-center gap-2 px-6 py-3 border border-foreground text-xs uppercase tracking-[0.2em] font-semibold hover:bg-foreground hover:text-background transition-colors"
              >
                Conheça o Hit 10x1 <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════ BOOSTERS ═══════ */}
        <section className="bg-muted/30 border-y border-border py-16 md:py-24">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              {/* Left: content */}
              <div>
                <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
                  O segredo dos profissionais
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-light mb-4">
                  Boosters: <span className="italic">potência concentrada</span>
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                  Os boosters LOF são ampolas e concentrados de alta performance que transformam
                  qualquer tratamento em uma experiência de salão. Basta adicionar ao condicionador
                  ou máscara para multiplicar os resultados — reconstrução, nutrição ou hidratação
                  intensificadas em poucos minutos.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {boosterBenefits.map((b) => (
                    <div key={b.title} className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-border rounded-full">
                        <b.icon className="h-3.5 w-3.5 text-foreground/70" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-[0.1em] mb-1">{b.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  to="/collections/all?tipo=Booster"
                  className="inline-flex items-center gap-2 mt-8 text-[11px] uppercase tracking-[0.15em] font-semibold text-foreground/60 hover:text-foreground transition-colors"
                >
                  Ver boosters disponíveis <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              {/* Right: visual card */}
              <div className="relative">
                <div className="bg-background border border-border p-8 md:p-10">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-6">Como usar os Boosters</p>

                  <div className="space-y-6">
                    {[
                      { step: '01', title: 'Escolha a linha', desc: 'Lave com o shampoo e condicione com a linha ideal para seu cabelo.' },
                      { step: '02', title: 'Adicione o booster', desc: 'Misture uma ampola de booster à máscara ou condicionador na palma da mão.' },
                      { step: '03', title: 'Aplique e aguarde', desc: 'Distribua nos fios e deixe agir de 3 a 5 minutos. Enxágue normalmente.' },
                      { step: '04', title: 'Finalize com o Hit', desc: 'Aplique o Hit 10x1 nos cabelos úmidos para selar, proteger e finalizar.' },
                    ].map((s) => (
                      <div key={s.step} className="flex gap-4">
                        <span className="font-display text-2xl font-light text-foreground/15 leading-none">{s.step}</span>
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-[0.1em] mb-0.5">{s.title}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Decorative accent */}
                <div className="absolute -bottom-3 -right-3 w-full h-full border border-foreground/5 -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ PRODUCT GRID ═══════ */}
        <section className="container py-16 md:py-24">
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

        {/* ═══════ CTA ═══════ */}
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
