import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MessageCircle, TrendingUp, Package, Headphones, ShieldCheck, Truck, CreditCard, Star } from 'lucide-react';
import b2bHero from '@/assets/b2b-hero.jpg';

const WHATSAPP_URL = 'https://wa.me/5511952134275?text=Ol%C3%A1%2C%20Vi%20no%20Site%20e%20quero%20conhecer%20os%20produtos%20LOF';

const diferenciais = [
  {
    icon: TrendingUp,
    title: 'Lucro maior pra você',
    description: 'Compre direto da fábrica e aumente sua margem — sem revendedor no meio do caminho.',
  },
  {
    icon: Package,
    title: 'Linha completa',
    description: 'Coloração, descoloração, tratamento e matização com fórmulas profissionais. Tudo em uma só marca.',
  },
  {
    icon: Headphones,
    title: 'Atendimento humanizado',
    description: 'Fale com quem resolve. Rápido, próximo e sem enrolação — direto pelo WhatsApp.',
  },
  {
    icon: CreditCard,
    title: 'Facilidade de compra',
    description: 'Parcelamento, Pix com desconto, entrega rápida e produtos prontos para revender ou aplicar.',
  },
];

const linhasProfissionais = [
  {
    name: 'Cold Light',
    tagline: 'Clareamento sem danificar',
    benefits: ['Fórmula avançada para clareamento eficiente', 'Proteção da estrutura capilar', 'Resultados uniformes e brilhantes', 'Minimiza danos e quebras'],
    image: 'https://lp.lof.com.br/img/cold-light.jpg',
  },
  {
    name: 'Repair',
    tagline: 'Reparação e reconstrução',
    benefits: ['Fortalece cutículas sensibilizadas por química', 'Melhora resistência de fios danificados', 'Nutre e repara devolvendo massa capilar', 'Reduz porosidade e devolve elasticidade'],
    image: 'https://lp.lof.com.br/img/repair.jpg',
  },
  {
    name: 'Chroma',
    tagline: 'Intensidade das cores',
    benefits: ['Variedade de cores: dos naturais aos coloridos', 'Blend de 11 óleos e aminoácidos', 'Fragrância que reduz cheiro de amônia', '100% vegetal nos ativos'],
    image: 'https://lp.lof.com.br/img/chroma.jpg',
  },
  {
    name: 'Hit 10x1',
    tagline: 'O aliado de todos os dias',
    benefits: ['Reconstrutor de carga imediata', 'Proteção térmica para todos os cabelos', 'Sela e fortalece pontas ressecadas', 'Hidratação nutritiva e protetora'],
    image: 'https://lp.lof.com.br/img/lof.jpg',
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
                <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4">Para Profissionais</p>
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

      {/* Diferenciais */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Nossos Diferenciais</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Por que os profissionais escolhem a LOF
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {diferenciais.map((d) => (
              <div key={d.title} className="text-center p-6">
                <div className="w-14 h-14 mx-auto mb-5 bg-foreground/5 flex items-center justify-center">
                  <d.icon className="h-6 w-6 text-foreground" />
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{d.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{d.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre a LOF B2B */}
      <section className="py-20 md:py-28 bg-foreground text-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-background/50 mb-3">A LOF é para você</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight">
                Você é cabeleireiro, dono de salão, empreendedor?
              </h2>
              <p className="mt-6 text-background/70 leading-relaxed">
                A LOF nasceu da escuta atenta aos cabeleireiros. Profissionais que vivem a beleza na prática, mas muitas vezes têm pouco controle e pouca margem sobre os produtos que usam.
              </p>
              <p className="mt-4 text-background/70 leading-relaxed">
                Com mais de 40 anos de experiência no mercado profissional, criamos uma marca pensada para quem está no salão todos os dias. Produtos de alta performance, vendidos direto para o salão.
              </p>
              <p className="mt-4 text-background/50 text-sm italic">
                Muito prazer, nós somos a LOF. Feita para quem faz — e quer fazer mais.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 h-12 px-8 border border-background text-background text-xs uppercase tracking-[0.2em] font-medium hover:bg-background hover:text-foreground transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Quero testar os produtos
              </a>
            </div>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="font-display text-4xl md:text-5xl font-bold">40+</p>
                <p className="text-xs uppercase tracking-wider text-background/50 mt-2">Anos de experiência</p>
              </div>
              <div>
                <p className="font-display text-4xl md:text-5xl font-bold">6</p>
                <p className="text-xs uppercase tracking-wider text-background/50 mt-2">Linhas completas</p>
              </div>
              <div>
                <p className="font-display text-4xl md:text-5xl font-bold">35+</p>
                <p className="text-xs uppercase tracking-wider text-background/50 mt-2">Produtos profissionais</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Linhas profissionais */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Portfólio</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Produtos preferidos pelos profissionais
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Qualidade profissional, resultados visíveis e liberdade para usar ou revender com confiança.
            </p>
          </div>

          <div className="space-y-16 md:space-y-20">
            {linhasProfissionais.map((linha, i) => (
              <div key={linha.name} className={`grid md:grid-cols-2 gap-8 md:gap-16 items-center ${i % 2 === 1 ? '' : ''}`}>
                <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                  <img
                    src={linha.image}
                    alt={`Linha ${linha.name}`}
                    className="w-full aspect-[4/3] object-cover"
                    loading="lazy"
                  />
                </div>
                <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                  <h3 className="font-display text-2xl md:text-3xl font-bold uppercase">{linha.name}</h3>
                  <p className="text-muted-foreground mt-1 text-sm uppercase tracking-wider">{linha.tagline}</p>
                  <ul className="mt-6 space-y-3">
                    {linha.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <ShieldCheck className="h-4 w-4 mt-0.5 text-foreground flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios de comprar direto */}
      <section className="py-16 md:py-20 bg-secondary">
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
          <div className="text-center mt-10">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-14 px-10 bg-[#25D366] text-white text-sm uppercase tracking-[0.15em] font-semibold hover:bg-[#20BD5A] transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              Quero conhecer toda a linha
            </a>
          </div>
        </div>
      </section>

      {/* Resultados reais */}
      <section className="py-20 md:py-28">
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
      <section className="py-20 md:py-28 bg-secondary">
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
