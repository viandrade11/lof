import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MessageCircle, TrendingUp, Package, Headphones, ShieldCheck, CreditCard, Star, Truck, ArrowRight } from 'lucide-react';
import b2bHero from '@/assets/b2b-hero.webp';
import aliancaGrafismo from '@/assets/alianca-grafismo.webp';
import { useSEO } from '@/hooks/useSEO';

const WHATSAPP_URL = 'https://wa.me/5511952134275?text=Ol%C3%A1%2C%20Vi%20no%20Site%20e%20quero%20conhecer%20os%20produtos%20LOF';

const linhasProfissionais = [
  {
    name: 'Repair',
    tagline: 'Reparação e reconstrução',
    color: 'bg-lof-repair',
    benefits: ['Fortalece cutículas sensibilizadas por química', 'Melhora resistência de fios danificados', 'Nutre e repara devolvendo massa capilar', 'Reduz porosidade e devolve elasticidade'],
    image: 'https://lp.lof.com.br/img/repair.jpg',
  },
  {
    name: 'Nutritive',
    tagline: 'Nutrição profunda',
    color: 'bg-lof-nutritive',
    benefits: ['Reposição lipídica profunda com óleos nobres', 'Combate ao ressecamento crônico', 'Maciez e brilho duradouros', 'Proteção contra agressões externas'],
    image: null,
  },
  {
    name: 'Silver',
    tagline: 'Matização profissional',
    color: 'bg-lof-silver',
    benefits: ['Neutraliza tons amarelados e alaranjados', 'Pigmentos violeta de alta concentração', 'Hidratação profunda para loiros', 'Brilho prateado intenso e uniforme'],
    image: null,
  },
  {
    name: 'Purifying',
    tagline: 'Limpeza vegana',
    color: 'bg-lof-purifying',
    benefits: ['Fórmula livre de sulfatos e parabenos', 'Limpeza profunda sem agredir', '100% vegana e sustentável', 'Ideal para uso frequente no salão'],
    image: null,
  },
  {
    name: 'Wavy',
    tagline: 'Definição de cachos',
    color: 'bg-lof-wavy',
    benefits: ['Definição duradoura sem crocância', 'Controle de frizz e volume', 'Hidratação leve que não pesa', 'Toque suave e natural'],
    image: null,
  },
  {
    name: 'Hydrate',
    tagline: 'Hidratação profunda',
    color: 'bg-lof-hydrate',
    benefits: ['Hidratação intensa e prolongada', 'Maciez e brilho imediatos', 'Fortalecimento da fibra capilar', 'Ideal para cabelos porosos e ressecados'],
    image: null,
  },
  {
    name: 'Chroma',
    tagline: 'Coloração profissional',
    color: 'bg-lof-chroma',
    benefits: ['Variedade de cores: dos naturais aos coloridos', 'Blend de 11 óleos e aminoácidos', 'Fragrância que reduz cheiro de amônia', '100% vegetal nos ativos'],
    image: 'https://lp.lof.com.br/img/chroma.jpg',
  },
  {
    name: 'Cold Light',
    tagline: 'Clareamento profissional',
    color: 'bg-lof-cold',
    benefits: ['Fórmula avançada para clareamento eficiente', 'Proteção da estrutura capilar', 'Resultados uniformes e brilhantes', 'Minimiza danos e quebras'],
    image: 'https://lp.lof.com.br/img/cold-light.jpg',
  },
  {
    name: 'Hit 10x1',
    tagline: 'Leave-in multiuso',
    color: 'bg-lof-hit',
    benefits: ['Reconstrutor de carga imediata', 'Proteção térmica para todos os cabelos', 'Sela e fortalece pontas ressecadas', '10 benefícios em um único produto'],
    image: 'https://lp.lof.com.br/img/lof.jpg',
  },
  {
    name: 'Crystal Oil',
    tagline: 'Sérum reparador',
    color: 'bg-lof-crystal',
    benefits: ['Sérum com óleos nobres concentrados', 'Brilho intenso e imediato', 'Reduz frizz e pontas duplas', 'Proteção térmica e UV'],
    image: null,
  },
];

const resultados = [
  'https://lp.lof.com.br/img/1.jpg',
  'https://lp.lof.com.br/img/2.jpg',
  'https://lp.lof.com.br/img/3.jpg',
  'https://lp.lof.com.br/img/4.jpg',
  'https://lp.lof.com.br/img/5.jpg',
  'https://lp.lof.com.br/img/6.jpg',
];

const faqs = [
  { q: 'Já tenho fornecedor. Por que testar a LOF?', a: 'Não pedimos exclusividade. Mas te mostramos na prática como a margem pode ser maior e o atendimento mais próximo.' },
  { q: 'Tem suporte depois da compra?', a: 'Sim! Atendimento pelo WhatsApp, com gente real que resolve.' },
  { q: 'Posso parcelar ou pagar no Pix?', a: 'Sim! Parcelamos e oferecemos Pix com desconto.' },
  { q: 'Os produtos são registrados?', a: 'Todos os produtos seguem as normas da Anvisa e são 100% nacionais.' },
  { q: 'Qual o pedido mínimo?', a: 'Consulte nossa equipe pelo WhatsApp para saber as condições atuais e formas de pagamento.' },
];

const B2BPage = () => {
  useSEO({
    title: 'LOF Profissional — Revenda e Distribuição B2B',
    description: 'Seja um revendedor LOF Professional. Margem competitiva, suporte dedicado, produtos profissionais registrados na Anvisa. Fale pelo WhatsApp.',
    keywords: 'revenda cosméticos, distribuição capilar, atacado cosméticos, LOF Professional B2B, revender shampoo profissional',
    breadcrumbs: [
      { name: 'LOF Professional', url: '/' },
      { name: 'Profissional B2B', url: '/profissional' },
    ],
    faq: faqs.map(f => ({ question: f.q, answer: f.a })),
  });

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative pt-16 md:pt-20">
        <div className="relative h-[85vh] min-h-[600px]">
          <img src={b2bHero} alt="Profissional em salão" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-lof-black/85 via-lof-black/60 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container">
              <div className="max-w-xl">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4">Atacado para Profissionais</p>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-[1.05]">
                  Compre direto da fábrica e aumente sua margem
                </h1>
                <p className="mt-6 text-white/70 text-base md:text-lg leading-relaxed max-w-md">
                  A LOF entrega produtos profissionais de alta performance direto para você, cabeleireiro. Sem intermediários. Mais resultado. Mais margem.
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-8 h-14 px-10 bg-[#25D366] text-white text-sm uppercase tracking-[0.15em] font-semibold hover:bg-[#20BD5A] transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  Falar com a equipe LOF
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais — redesigned for conversion */}
      <section className="py-20 md:py-28 bg-foreground text-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-background/40 mb-4">Por que a LOF?</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight">
                Tudo que seu salão precisa em uma só marca
              </h2>
              <p className="mt-4 text-background/60 leading-relaxed">
                Mais de 35 produtos profissionais, atendimento direto e margem que faz diferença no seu caixa.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 h-12 px-8 bg-[#25D366] text-white text-xs uppercase tracking-[0.15em] font-semibold hover:bg-[#20BD5A] transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Solicitar catálogo
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: TrendingUp, title: 'Margem até 3x maior', desc: 'Direto da fábrica, sem distribuidores.' },
                { icon: Package, title: 'Linha completa', desc: '10 linhas, +35 produtos profissionais.' },
                { icon: Headphones, title: 'WhatsApp direto', desc: 'Atendimento real, rápido e humanizado.' },
                { icon: CreditCard, title: 'Pix com desconto', desc: 'Parcelamento e condições especiais.' },
                { icon: Truck, title: 'Entrega rápida', desc: 'Logística otimizada para todo Brasil.' },
                { icon: Star, title: 'Revenda no salão', desc: 'Nova fonte de faturamento para você.' },
              ].map((d) => (
                <div key={d.title} className="border border-background/10 p-5 hover:border-background/30 transition-colors">
                  <d.icon className="h-5 w-5 text-[#25D366] mb-3" />
                  <h3 className="text-sm font-semibold mb-1">{d.title}</h3>
                  <p className="text-xs text-background/50 leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sobre a LOF B2B */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <img src={aliancaGrafismo} alt="" className="absolute right-[-8%] top-[10%] w-[350px] md:w-[450px] opacity-[0.03] pointer-events-none select-none" aria-hidden="true" />
        <div className="container relative">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">A LOF é para você</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight">
                Você é cabeleireiro, dono de salão, empreendedor?
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                A LOF nasceu da escuta atenta aos cabeleireiros. Profissionais que vivem a beleza na prática, mas muitas vezes têm pouco controle e pouca margem sobre os produtos que usam.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Com mais de 40 anos de experiência no mercado profissional, criamos uma marca pensada para quem está no salão todos os dias. Produtos de alta performance, vendidos direto para o salão.
              </p>
              <p className="mt-4 text-muted-foreground/60 text-sm italic">
                Muito prazer, nós somos a LOF. Feita para quem faz — e quer fazer mais.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="font-display text-4xl md:text-5xl font-bold">40+</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mt-2">Anos</p>
              </div>
              <div>
                <p className="font-display text-4xl md:text-5xl font-bold">10</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mt-2">Linhas</p>
              </div>
              <div>
                <p className="font-display text-4xl md:text-5xl font-bold">35+</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mt-2">Produtos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Todas as linhas */}
      <section className="py-20 md:py-28 bg-secondary/50">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Portfólio Completo</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Nossas linhas profissionais
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Qualidade profissional, resultados visíveis e liberdade para usar ou revender com confiança. Todas disponíveis nas versões salão e consumo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {linhasProfissionais.map((linha) => (
              <div key={linha.name} className="bg-background border border-border overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex">
                  {/* Color bar */}
                  <div className={`w-2 flex-shrink-0 ${linha.color}`} />
                  <div className="p-6 md:p-8 flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-display text-xl md:text-2xl font-bold uppercase">{linha.name}</h3>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground mt-0.5">{linha.tagline}</p>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {linha.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <ShieldCheck className="h-3.5 w-3.5 mt-0.5 text-foreground/60 flex-shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-14 px-10 bg-[#25D366] text-white text-sm uppercase tracking-[0.15em] font-semibold hover:bg-[#20BD5A] transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              Solicitar tabela de preços
            </a>
          </div>
        </div>
      </section>

      {/* Benefícios de comprar direto */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold">Ao comprar direto da LOF você:</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center p-6">
              <TrendingUp className="h-8 w-8 mx-auto mb-4 text-foreground" />
              <h3 className="font-semibold mb-2">Aumenta sua margem</h3>
              <p className="text-sm text-muted-foreground">Sem intermediários, o lucro fica com você.</p>
            </div>
            <div className="text-center p-6">
              <Package className="h-8 w-8 mx-auto mb-4 text-foreground" />
              <h3 className="font-semibold mb-2">Controle de estoque</h3>
              <p className="text-sm text-muted-foreground">Compre na quantidade certa para seu salão.</p>
            </div>
            <div className="text-center p-6">
              <Star className="h-8 w-8 mx-auto mb-4 text-foreground" />
              <h3 className="font-semibold mb-2">Nova fonte de receita</h3>
              <p className="text-sm text-muted-foreground">Revenda para seus clientes com confiança.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Resultados reais */}
      <section className="py-20 md:py-28 bg-secondary/50">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Resultados</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Cabelos reais feitos com LOF</h2>
            <p className="mt-3 text-muted-foreground">Você não precisa confiar em nós — confie nos resultados.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {resultados.map((img, i) => (
              <div key={i} className="aspect-square overflow-hidden">
                <img src={img} alt={`Resultado LOF ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Perguntas Frequentes</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Dúvidas?</h2>
          </div>
          <div className="space-y-0">
            {faqs.map((faq) => (
              <details key={faq.q} className="group border-b border-border">
                <summary className="flex items-center justify-between py-5 cursor-pointer text-sm font-medium hover:text-foreground/70 transition-colors list-none">
                  {faq.q}
                  <span className="ml-4 text-muted-foreground group-open:rotate-45 transition-transform text-xl">+</span>
                </summary>
                <p className="pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 md:py-28 bg-foreground text-background">
        <div className="container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold max-w-2xl mx-auto leading-tight">
            Comece agora a transformar seu lucro com uma marca que fala sua língua
          </h2>
          <p className="mt-4 text-background/60 max-w-lg mx-auto">
            Chega de burocracia. Compre direto, ganhe mais, receba rápido. A LOF é sua parceira no crescimento.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-14 px-10 bg-[#25D366] text-white text-sm uppercase tracking-[0.15em] font-semibold hover:bg-[#20BD5A] transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              Falar com a equipe LOF
            </a>
            <a
              href="tel:+5511952134275"
              className="inline-flex items-center h-14 px-10 border border-background/30 text-background/70 text-xs uppercase tracking-[0.2em] font-medium hover:border-background hover:text-background transition-colors"
            >
              (11) 95213-4275
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default B2BPage;
