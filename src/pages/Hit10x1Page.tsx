import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useProductByHandle, useProducts } from '@/hooks/useProducts';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice } from '@/lib/shopify';
import { ShoppingBag, Loader2, Check, Shield, Droplets, Sun, Wind, Sparkles, Zap, Heart, Star, ChevronDown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';
import aliancaGrafismo from '@/assets/alianca-grafismo.png';
import { UpsellBlock } from '@/components/UpsellBlock';
import { getSmartRecommendations } from '@/lib/productRecommendations';

import { useSEO } from '@/hooks/useSEO';

const PRODUCT_HANDLE = 'leave-in-hit-10x1-200ml-6903bafe7954e';

const benefits = [
  { icon: Shield, title: 'Proteção Térmica', desc: 'Protege os fios contra danos de chapinha e secador até 230°C.' },
  { icon: Droplets, title: 'Hidratação Intensa', desc: 'Hidrata profundamente sem pesar, devolvendo a maciez natural.' },
  { icon: Wind, title: 'Anti-Frizz', desc: 'Controla o frizz e a eletricidade estática por horas.' },
  { icon: Sparkles, title: 'Brilho Intenso', desc: 'Proporciona brilho saudável e natural de longa duração.' },
  { icon: Zap, title: 'Desembaraço', desc: 'Facilita o pentear e desembaraça instantaneamente.' },
  { icon: Heart, title: 'Reconstrução', desc: 'Repara a fibra capilar e fortalece os fios danificados.' },
  { icon: Sun, title: 'Proteção UV', desc: 'Cria uma barreira contra raios solares que ressecam os fios.' },
  { icon: Star, title: 'Selante de Pontas', desc: 'Sela e fortalece as pontas, reduzindo a quebra.' },
  { icon: Droplets, title: 'Nutrição', desc: 'Nutre com ativos que penetram na fibra capilar.' },
  { icon: Shield, title: 'Antioxidante', desc: 'Protege contra poluição e agressões ambientais do dia a dia.' },
];

const howToUse = [
  { step: '01', title: 'Lave e condicione', desc: 'Lave com shampoo e aplique o condicionador da sua linha favorita LOF.' },
  { step: '02', title: 'Aplique o Hit 10x1', desc: 'Com os cabelos úmidos, borrife o Hit 10x1 mecha por mecha. Não precisa enxaguar.' },
  { step: '03', title: 'Penteie e finalize', desc: 'Penteie para distribuir, seque naturalmente ou com secador. Pronto!' },
];

const faqs = [
  { q: 'Posso usar o Hit 10x1 todos os dias?', a: 'Sim! A fórmula leve do Hit 10x1 foi desenvolvida para uso diário, sem acúmulo nos fios. Ele não pesa e não deixa resíduos.' },
  { q: 'Funciona em todos os tipos de cabelo?', a: 'Sim, o Hit 10x1 é formulado para todos os tipos de cabelo — lisos, ondulados, cacheados e crespos. Adapta-se às necessidades de cada tipo.' },
  { q: 'Substitui o condicionador?', a: 'Não. O Hit 10x1 é um leave-in complementar que age nos fios após a lavagem. Use-o em conjunto com shampoo e condicionador para melhores resultados.' },
  { q: 'Tem proteção térmica real?', a: 'Sim! O Hit 10x1 protege os fios de temperaturas de até 230°C, sendo ideal para uso antes de chapinha, babyliss e secador.' },
  { q: 'Contém parabenos ou sulfatos?', a: 'Não. O Hit 10x1 é livre de parabenos e sulfatos, formulado com ativos naturais de alta performance.' },
  { q: 'Qual o rendimento de um frasco?', a: 'O frasco de 200ml rende em média 2-3 meses com uso diário, dependendo do comprimento e espessura do cabelo.' },
];

const Hit10x1Page = () => {
  const { data: product, isLoading } = useProductByHandle(PRODUCT_HANDLE);
  const addItem = useCartStore(state => state.addItem);
  const cartLoading = useCartStore(state => state.isLoading);
  const [quantity, setQuantity] = useState(1);

  const variant = product?.variants?.edges?.[0]?.node;
  const images = product?.images?.edges || [];
  const heroImage = images[0]?.node?.url;
  const secondImage = images[1]?.node?.url || images[0]?.node?.url;

  useSEO({
    title: 'Hit 10x1 Leave-in — 10 Benefícios em 1 Produto',
    description: 'Leave-in Hit 10x1 LOF Professional: proteção térmica até 230°C, hidratação, anti-frizz, brilho, reconstrução e mais. 10 benefícios em uma aplicação. Para todos os tipos de cabelo.',
    type: 'product',
    image: heroImage,
    product: variant ? {
      name: 'LOF Hit 10x1 Leave-in 200ml',
      price: variant.price.amount,
      currency: variant.price.currencyCode,
      availability: variant.availableForSale ? 'InStock' : 'OutOfStock',
      brand: 'LOF Professional',
      description: 'Leave-in multiuso com 10 benefícios: proteção térmica até 230°C, hidratação intensa, anti-frizz, brilho, desembaraço, reconstrução, proteção UV, selante de pontas, nutrição e antioxidante.',
      image: heroImage,
    } : undefined,
  });

  const handleAddToCart = async () => {
    if (!variant || !product) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success('Hit 10x1 adicionado ao carrinho!', { position: 'top-center' });
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero — full-width cinematic */}
      <section className="relative pt-16 md:pt-20">
        <div className="relative h-[90vh] min-h-[600px] max-h-[900px] overflow-hidden bg-lof-black">
          {heroImage && (
            <img src={heroImage} alt="LOF Hit 10x1 Leave-in" className="absolute inset-0 w-full h-full object-contain object-right opacity-40 md:opacity-60" width={1920} height={1080} />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-lof-black via-lof-black/80 to-transparent" />
          <img src={aliancaGrafismo} alt="" className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[40vw] max-w-[500px] opacity-[0.04] invert pointer-events-none select-none" aria-hidden="true" />
          <div className="absolute inset-0 flex items-center">
            <div className="container">
              <div className="max-w-xl">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50 font-semibold mb-4">Leave-in Multiuso</p>
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-[1]">
                  Hit 10x1
                </h1>
                <p className="font-display text-xl md:text-2xl text-white/40 italic mt-2">
                  10 benefícios. Um único produto.
                </p>
                <p className="mt-6 text-white/60 text-base leading-relaxed max-w-md">
                  O leave-in que revolucionou a rotina capilar. Proteção térmica, hidratação, brilho, 
                  reconstrução e muito mais — tudo em uma aplicação.
                </p>
                <div className="flex flex-col sm:flex-row items-start gap-4 mt-8">
                  {isLoading ? (
                    <div className="h-14 flex items-center"><Loader2 className="h-5 w-5 animate-spin text-white" /></div>
                  ) : variant ? (
                    <>
                      <Button
                        onClick={handleAddToCart}
                        disabled={cartLoading || !variant.availableForSale}
                        className="h-14 px-10 bg-white hover:bg-white/90 text-lof-black uppercase tracking-[0.15em] text-sm font-semibold"
                        size="lg"
                      >
                        {cartLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                          <>
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            Comprar — {formatPrice(variant.price.amount, variant.price.currencyCode)}
                          </>
                        )}
                      </Button>
                      <a href="#beneficios" className="inline-flex items-center h-14 px-8 border border-white/30 text-white/80 text-xs uppercase tracking-[0.2em] font-medium hover:border-white hover:text-white transition-colors">
                        Saiba mais <ArrowRight className="h-4 w-4 ml-2" />
                      </a>
                    </>
                  ) : (
                    <a href="#beneficios" className="inline-flex items-center h-14 px-10 bg-white text-lof-black text-sm uppercase tracking-[0.15em] font-semibold hover:bg-white/90 transition-colors">
                      Saiba mais <ArrowRight className="h-4 w-4 ml-2" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-6 w-6 text-white/40" />
          </div>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="bg-foreground text-background py-4">
        <div className="container flex flex-wrap items-center justify-center gap-6 md:gap-12 text-center">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Check className="h-4 w-4" /> 10 benefícios em 1
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <Check className="h-4 w-4" /> Proteção até 230°C
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <Check className="h-4 w-4" /> Sem parabenos
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <Check className="h-4 w-4" /> Para todos os cabelos
          </div>
        </div>
      </section>

      {/* 10 Benefits Grid */}
      <section id="beneficios" className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold mb-3">Por que Hit 10x1?</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
              10 benefícios que transformam<br />
              <span className="italic font-light">seus cabelos</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Cada aplicação entrega uma combinação poderosa de ativos que protegem, nutrem e embelezam seus fios.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="group text-center p-6 border border-border hover:border-foreground/30 hover:bg-foreground/5 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-foreground/5 text-foreground mb-4 group-hover:bg-foreground group-hover:text-background transition-colors">
                  <b.icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold mb-1">{b.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Images + CTA */}
      <section className="py-20 md:py-28 bg-foreground text-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-background/40 mb-4">O Produto</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight">
                Leave-in multiuso com proteção térmica
              </h2>
              <p className="mt-6 text-background/60 leading-relaxed">
                Desenvolvido com tecnologia profissional, o Hit 10x1 é o leave-in que faltava na sua rotina. 
                Com fórmula leve e de rápida absorção, ele age desde a raiz até as pontas, protegendo, 
                nutrindo e transformando seus cabelos a cada aplicação.
              </p>
              <ul className="mt-8 space-y-3">
                {['Fórmula livre de parabenos e sulfatos', 'Proteção térmica até 230°C', 'Não pesa e não acumula nos fios', 'Fragrância sofisticada e duradoura', 'Embalagem de 200ml com spray prático'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-background/70">
                    <Check className="h-4 w-4 text-background/50 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              {variant && (
                <div className="mt-8 flex items-center gap-4">
                  <Button
                    onClick={handleAddToCart}
                    disabled={cartLoading}
                    className="h-14 px-10 bg-white hover:bg-white/90 text-lof-black uppercase tracking-[0.15em] text-sm font-semibold"
                    size="lg"
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Comprar agora
                  </Button>
                  <span className="text-2xl font-bold text-background">
                    {formatPrice(variant.price.amount, variant.price.currencyCode)}
                  </span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {images.length > 0 ? (
                images.slice(0, 4).map((img, i) => (
                  <div key={i} className="aspect-square overflow-hidden bg-background/5">
                    <img src={img.node.url} alt={img.node.altText || `Hit 10x1 - ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ))
              ) : (
                <div className="aspect-square overflow-hidden col-span-2 bg-background/5 flex items-center justify-center">
                  <ShoppingBag className="h-16 w-16 text-background/20" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold mb-3">Modo de Uso</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Simples como tem que ser
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {howToUse.map((step) => (
              <div key={step.step} className="text-center">
                <p className="font-display text-6xl font-light text-foreground/10 mb-4">{step.step}</p>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-20 md:py-28 bg-secondary/50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="overflow-hidden bg-muted aspect-[4/3] flex items-center justify-center">
              {secondImage ? (
                <img src={secondImage} alt="Resultados Hit 10x1" className="w-full h-full object-cover" loading="lazy" />
              ) : (
                <Sparkles className="h-16 w-16 text-muted-foreground/30" />
              )}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold mb-4">Resultados</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight">
                A diferença que você vê e sente
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Desde a primeira aplicação você nota a diferença: fios mais macios, com brilho natural 
                e muito mais fáceis de pentear. Com o uso contínuo, o Hit 10x1 fortalece e reconstrói 
                a fibra capilar, reduzindo a quebra e as pontas duplas.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6 text-center">
                <div>
                  <p className="font-display text-4xl font-bold text-foreground">95%</p>
                  <p className="text-xs text-muted-foreground mt-1">Mais brilho</p>
                </div>
                <div>
                  <p className="font-display text-4xl font-bold text-foreground">87%</p>
                  <p className="text-xs text-muted-foreground mt-1">Menos frizz</p>
                </div>
                <div>
                  <p className="font-display text-4xl font-bold text-foreground">92%</p>
                  <p className="text-xs text-muted-foreground mt-1">Mais maciez</p>
                </div>
              </div>
              {variant && (
                <Button
                  onClick={handleAddToCart}
                  disabled={cartLoading}
                  className="mt-8 h-14 px-10 bg-foreground hover:bg-foreground/90 text-background uppercase tracking-[0.15em] text-sm font-semibold"
                  size="lg"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Quero experimentar
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      

      {/* FAQ */}
      <section className="py-20 md:py-28">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold mb-3">Dúvidas</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Perguntas frequentes</h2>
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

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-foreground text-background relative overflow-hidden">
        <img src={aliancaGrafismo} alt="" className="absolute left-[-10%] top-[-20%] w-[400px] opacity-[0.03] invert pointer-events-none select-none" aria-hidden="true" />
        <div className="container text-center relative">
          <h2 className="font-display text-3xl md:text-5xl font-bold max-w-2xl mx-auto leading-tight">
            Pronta para transformar seus cabelos?
          </h2>
          <p className="mt-4 text-background/60 max-w-lg mx-auto">
            10 benefícios em uma única aplicação. Proteção, hidratação, brilho e muito mais — 
            tudo que seus cabelos precisam em um único produto.
          </p>
          {variant ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Button
                onClick={handleAddToCart}
                disabled={cartLoading}
                className="h-14 px-12 bg-white hover:bg-white/90 text-lof-black uppercase tracking-[0.15em] text-sm font-semibold"
                size="lg"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Comprar Hit 10x1 — {formatPrice(variant.price.amount, variant.price.currencyCode)}
              </Button>
              <Link
                to="/collections/all"
                className="inline-flex items-center h-14 px-8 border border-background/30 text-background/70 text-xs uppercase tracking-[0.2em] font-medium hover:border-background hover:text-background transition-colors"
              >
                Ver outros produtos
              </Link>
            </div>
          ) : (
            <Link
              to="/collections/all"
              className="inline-flex items-center mt-8 h-14 px-10 bg-white text-lof-black text-sm uppercase tracking-[0.15em] font-semibold hover:bg-white/90 transition-colors"
            >
              Ver todos os produtos
            </Link>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Hit10x1Page;
