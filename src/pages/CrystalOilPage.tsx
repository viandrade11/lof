import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useProductByHandle, useProducts } from '@/hooks/useProducts';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice } from '@/lib/shopify';
import { ShoppingBag, Loader2, Check, Droplets, Sun, Sparkles, Heart, Star, ChevronDown, ArrowRight, Leaf, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';
import aliancaGrafismo from '@/assets/alianca-grafismo.png';
import { useSEO } from '@/hooks/useSEO';
import { UpsellBlock } from '@/components/UpsellBlock';
import { getSmartRecommendations } from '@/lib/productRecommendations';

const PRODUCT_HANDLE_60 = 'serum-crystal-oil-laranja-60ml-6903bb190ee85';
const PRODUCT_HANDLE_15 = 'serum-crystal-oil-laranja-15ml-6903bb1b03e45';

const oils = [
  { icon: Leaf, title: 'Óleo de Argan', desc: 'Nutre profundamente e devolve a elasticidade natural dos fios.' },
  { icon: Droplets, title: 'Óleo de Ojon', desc: 'Repara a fibra capilar danificada e fortalece as pontas.' },
  { icon: Heart, title: 'Óleo de Macadâmia', desc: 'Hidrata e proporciona maciez sedosa sem pesar nos fios.' },
  { icon: Star, title: 'Semente de Linho', desc: 'Sela as cutículas e cria uma barreira protetora brilhante.' },
  { icon: Sun, title: 'Óleo de Monoi', desc: 'Protege contra raios UV e devolve vitalidade aos cabelos.' },
];

const benefits = [
  'Ação nutritiva, hidratante e umectante',
  'Sela e fortalece as pontas ressecadas',
  'Promove brilho, maciez e vitalidade',
  'Previne a formação de pontas duplas',
  'Filtro solar específico para cabelos',
  'Livre de óleo mineral e parabenos',
];

const howToUse = [
  { step: '01', title: 'Finalize a lavagem', desc: 'Lave e condicione com os produtos da sua linha LOF favorita.' },
  { step: '02', title: 'Aplique o Crystal Oil', desc: 'Com os cabelos úmidos ou secos, aplique 2-3 gotas nas palmas e distribua das pontas para o comprimento.' },
  { step: '03', title: 'Admire o resultado', desc: 'Seque naturalmente ou finalize com secador. Brilho imediato e duradouro!' },
];

const faqs = [
  { q: 'Crystal Oil pesa no cabelo?', a: 'Não! A fórmula é leve e de rápida absorção. Ele nutre e dá brilho sem deixar os fios pesados ou oleosos.' },
  { q: 'Posso usar em cabelos finos?', a: 'Sim. Use apenas 1-2 gotas nas pontas. A fórmula se adapta a todos os tipos de cabelo sem pesar.' },
  { q: 'Qual a diferença entre o 60ml e o 15ml?', a: 'A fórmula é a mesma. O 15ml é ideal para viagens e para ter sempre na bolsa, enquanto o 60ml é o tamanho para uso diário em casa.' },
  { q: 'Pode usar antes da chapinha?', a: 'Sim! O Crystal Oil possui filtro solar e protege os fios do calor. É um excelente finalizador pré-tratamento térmico.' },
  { q: 'Contém silicone?', a: 'A fórmula é livre de óleo mineral e parabenos, formulada com óleos vegetais naturais de alta performance.' },
  { q: 'Com que frequência devo usar?', a: 'Pode ser usado diariamente como finalizador, ou sempre que sentir os fios ressecados ou sem brilho.' },
];

const CrystalOilPage = () => {
  const { data: product, isLoading } = useProductByHandle(PRODUCT_HANDLE_60);
  const { data: product15 } = useProductByHandle(PRODUCT_HANDLE_15);
  const addItem = useCartStore(state => state.addItem);
  const cartLoading = useCartStore(state => state.isLoading);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<'60ml' | '15ml'>('60ml');

  const activeProduct = selectedSize === '60ml' ? product : product15;
  const variant = activeProduct?.variants?.edges?.[0]?.node;
  const images = product?.images?.edges || [];
  const heroImage = images[0]?.node?.url;
  const secondImage = images[1]?.node?.url || product15?.images?.edges?.[0]?.node?.url || heroImage;

  useSEO({
    title: 'Crystal Oil Sérum Multi Óleos — LOF Professional',
    description: 'Sérum Crystal Oil LOF Professional: blend de 5 óleos (Argan, Ojon, Macadâmia, Semente de Linho e Monoi). Nutre, sela as pontas, dá brilho e protege. Livre de parabenos.',
    type: 'product',
    image: heroImage,
    product: variant ? {
      name: `LOF Crystal Oil Sérum ${selectedSize}`,
      price: variant.price.amount,
      currency: variant.price.currencyCode,
      availability: variant.availableForSale ? 'InStock' : 'OutOfStock',
      brand: 'LOF Professional',
      description: 'Sérum multi óleos com Argan, Ojon, Macadâmia, Semente de Linho e Monoi. Ação nutritiva, hidratante e protetora.',
      image: heroImage,
    } : undefined,
  });

  const handleAddToCart = async () => {
    if (!variant || !activeProduct) return;
    await addItem({
      product: { node: activeProduct },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success('Crystal Oil adicionado ao carrinho!', { position: 'top-center' });
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero — warm golden tones */}
      <section className="relative pt-16 md:pt-20">
        <div className="relative h-[90vh] min-h-[600px] max-h-[900px] overflow-hidden bg-[#1a1510]">
          {heroImage && (
            <img src={heroImage} alt="LOF Crystal Oil Sérum" className="absolute inset-0 w-full h-full object-contain object-right opacity-40 md:opacity-60" width={1920} height={1080} />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1510] via-[#1a1510]/80 to-transparent" />
          <img src={aliancaGrafismo} alt="" className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[40vw] max-w-[500px] opacity-[0.04] invert pointer-events-none select-none" aria-hidden="true" />
          <div className="absolute inset-0 flex items-center">
            <div className="container">
              <div className="max-w-xl">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-400/60 font-semibold mb-4">Sérum Multi Óleos</p>
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-[1]">
                  Crystal Oil
                </h1>
                <p className="font-display text-xl md:text-2xl text-white/40 italic mt-2">
                  5 óleos preciosos. Brilho extraordinário.
                </p>
                <p className="mt-6 text-white/60 text-base leading-relaxed max-w-md">
                  O sérum que reúne o poder do Argan, Ojon, Macadâmia, Semente de Linho e Monoi 
                  para nutrir, proteger e dar brilho intenso aos seus fios.
                </p>
                <div className="flex flex-col sm:flex-row items-start gap-4 mt-8">
                  {isLoading ? (
                    <div className="h-14 flex items-center"><Loader2 className="h-5 w-5 animate-spin text-white" /></div>
                  ) : variant ? (
                    <>
                      <Button
                        onClick={handleAddToCart}
                        disabled={cartLoading || !variant.availableForSale}
                        className="h-14 px-10 bg-amber-500 hover:bg-amber-400 text-[#1a1510] uppercase tracking-[0.15em] text-sm font-semibold"
                        size="lg"
                      >
                        {cartLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                          <>
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            Comprar — {formatPrice(variant.price.amount, variant.price.currencyCode)}
                          </>
                        )}
                      </Button>
                      <a href="#oleos" className="inline-flex items-center h-14 px-8 border border-amber-500/30 text-amber-200/80 text-xs uppercase tracking-[0.2em] font-medium hover:border-amber-400 hover:text-amber-100 transition-colors">
                        Saiba mais <ArrowRight className="h-4 w-4 ml-2" />
                      </a>
                    </>
                  ) : (
                    <a href="#oleos" className="inline-flex items-center h-14 px-10 bg-amber-500 text-[#1a1510] text-sm uppercase tracking-[0.15em] font-semibold hover:bg-amber-400 transition-colors">
                      Saiba mais <ArrowRight className="h-4 w-4 ml-2" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-6 w-6 text-amber-400/40" />
          </div>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="bg-[#1a1510] text-amber-100 py-4 border-t border-amber-900/30">
        <div className="container flex flex-wrap items-center justify-center gap-6 md:gap-12 text-center">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Check className="h-4 w-4 text-amber-400" /> 5 óleos preciosos
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <Check className="h-4 w-4 text-amber-400" /> Filtro solar capilar
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <Check className="h-4 w-4 text-amber-400" /> Sem parabenos
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <Check className="h-4 w-4 text-amber-400" /> Para todos os cabelos
          </div>
        </div>
      </section>

      {/* 5 Precious Oils Grid */}
      <section id="oleos" className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold mb-3">A Sinergia Perfeita</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
              5 óleos que transformam<br />
              <span className="italic font-light">seus cabelos</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Cada óleo foi selecionado por suas propriedades únicas, criando uma sinergia perfeita para nutrição, proteção e brilho.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {oils.map((o, i) => (
              <div key={i} className="group text-center p-6 border border-border hover:border-amber-500/30 hover:bg-amber-500/5 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 text-amber-600 mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <o.icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold mb-1">{o.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product + CTA */}
      <section className="py-20 md:py-28 bg-[#1a1510] text-amber-50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-amber-400/50 mb-4">O Produto</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight text-white">
                Sérum multi óleos de alta performance
              </h2>
              <p className="mt-6 text-amber-100/60 leading-relaxed">
                Desenvolvido com a sinergia de 5 óleos vegetais de alta performance, o Crystal Oil
                nutre profundamente, sela as pontas e proporciona brilho extraordinário. Sua fórmula 
                é de rápida absorção e não pesa nos fios.
              </p>

              {/* Size selector */}
              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => setSelectedSize('60ml')}
                  className={`h-12 px-6 text-xs uppercase tracking-wider border transition-colors ${
                    selectedSize === '60ml'
                      ? 'border-amber-400 bg-amber-400 text-[#1a1510] font-semibold'
                      : 'border-amber-400/30 text-amber-200/70 hover:border-amber-400'
                  }`}
                >
                  60ml
                </button>
                <button
                  onClick={() => setSelectedSize('15ml')}
                  className={`h-12 px-6 text-xs uppercase tracking-wider border transition-colors ${
                    selectedSize === '15ml'
                      ? 'border-amber-400 bg-amber-400 text-[#1a1510] font-semibold'
                      : 'border-amber-400/30 text-amber-200/70 hover:border-amber-400'
                  }`}
                >
                  15ml — Travel Size
                </button>
              </div>

              <ul className="mt-8 space-y-3">
                {benefits.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-amber-100/70">
                    <Check className="h-4 w-4 text-amber-400/60 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              {variant && (
                <div className="mt-8 flex items-center gap-4">
                  <Button
                    onClick={handleAddToCart}
                    disabled={cartLoading}
                    className="h-14 px-10 bg-amber-500 hover:bg-amber-400 text-[#1a1510] uppercase tracking-[0.15em] text-sm font-semibold"
                    size="lg"
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Comprar {selectedSize}
                  </Button>
                  <span className="text-2xl font-bold text-white">
                    {formatPrice(variant.price.amount, variant.price.currencyCode)}
                  </span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {images.length > 0 ? (
                images.slice(0, 4).map((img: { node: { url: string; altText: string | null } }, i: number) => (
                  <div key={i} className="aspect-square overflow-hidden bg-amber-900/20">
                    <img src={img.node.url} alt={img.node.altText || `Crystal Oil - ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ))
              ) : (
                <div className="aspect-square overflow-hidden col-span-2 bg-amber-900/20 flex items-center justify-center">
                  <Sparkles className="h-16 w-16 text-amber-400/20" />
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
                <p className="font-display text-6xl font-light text-amber-500/15 mb-4">{step.step}</p>
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
                <img src={secondImage} alt="Resultados Crystal Oil" className="w-full h-full object-cover" loading="lazy" />
              ) : (
                <Sparkles className="h-16 w-16 text-muted-foreground/30" />
              )}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold mb-4">Resultados</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight">
                Brilho que se vê. Nutrição que se sente.
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Desde a primeira aplicação, o Crystal Oil transforma a textura dos fios. Pontas seladas,
                brilho intenso e maciez duradoura. Com o uso contínuo, os fios ficam mais fortes,
                nutridos e protegidos contra agressões externas.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6 text-center">
                <div>
                  <p className="font-display text-4xl font-bold text-foreground">98%</p>
                  <p className="text-xs text-muted-foreground mt-1">Mais brilho</p>
                </div>
                <div>
                  <p className="font-display text-4xl font-bold text-foreground">93%</p>
                  <p className="text-xs text-muted-foreground mt-1">Pontas seladas</p>
                </div>
                <div>
                  <p className="font-display text-4xl font-bold text-foreground">96%</p>
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

      {/* Upsell / Cross-sell */}
      <section className="py-20 md:py-28 bg-[#1a1510] text-amber-50">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400/60 font-semibold mb-3">Complete sua Rotina</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              Potencialize o resultado do Crystal Oil
            </h2>
            <p className="mt-3 text-amber-100/50 max-w-lg mx-auto text-sm">
              Combine com os melhores produtos LOF para nutrição e brilho completos.
            </p>
          </div>
          <CrystalOilUpsell product={activeProduct} />
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
      <section className="py-20 md:py-28 bg-[#1a1510] text-amber-50 relative overflow-hidden">
        <img src={aliancaGrafismo} alt="" className="absolute left-[-10%] top-[-20%] w-[400px] opacity-[0.03] invert pointer-events-none select-none" aria-hidden="true" />
        <div className="container text-center relative">
          <h2 className="font-display text-3xl md:text-5xl font-bold max-w-2xl mx-auto leading-tight text-white">
            Pronta para o brilho que seus cabelos merecem?
          </h2>
          <p className="mt-4 text-amber-100/60 max-w-lg mx-auto">
            5 óleos preciosos em um único sérum. Nutrição, proteção e brilho extraordinário — 
            tudo que seus cabelos precisam.
          </p>
          {variant ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Button
                onClick={handleAddToCart}
                disabled={cartLoading}
                className="h-14 px-12 bg-amber-500 hover:bg-amber-400 text-[#1a1510] uppercase tracking-[0.15em] text-sm font-semibold"
                size="lg"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Comprar Crystal Oil — {formatPrice(variant.price.amount, variant.price.currencyCode)}
              </Button>
              <Link
                to="/collections/all"
                className="inline-flex items-center h-14 px-8 border border-amber-400/30 text-amber-200/70 text-xs uppercase tracking-[0.2em] font-medium hover:border-amber-400 hover:text-amber-100 transition-colors"
              >
                Ver outros produtos
              </Link>
            </div>
          ) : (
            <Link
              to="/collections/all"
              className="inline-flex items-center mt-8 h-14 px-10 bg-amber-500 text-[#1a1510] text-sm uppercase tracking-[0.15em] font-semibold hover:bg-amber-400 transition-colors"
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

function CrystalOilUpsell({ product }: { product: any }) {
  const { data: allProducts } = useProducts(50);
  if (!allProducts || !product) return null;
  const recs = getSmartRecommendations(
    { title: product.title, handle: product.handle, productType: product.productType || 'Finalizadores' },
    allProducts,
    [],
    4,
  );
  return <UpsellBlock recommendations={recs} title="Complete sua rotina capilar" />;
}

export default CrystalOilPage;
