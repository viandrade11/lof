import { Link } from 'react-router-dom';
import heroBannerProdutos from '@/assets/hero-banner-produtos.webp';
import aliancaGrafismo from '@/assets/alianca-grafismo.webp';

export function HeroBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f5f0eb]">
      <div className="relative min-h-[500px] md:min-h-[600px]">
        {/* Product image - bottom aligned */}
        <div className="absolute inset-0 flex items-end justify-center">
          <img
            src={heroBannerProdutos}
            alt="LOF Professional - Linha completa de produtos capilares"
            className="w-full max-w-[1400px] object-contain object-bottom"
            loading="lazy"
            width={1200}
            height={800}
          />
        </div>

        {/* Subtle warm gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5f0eb] via-[#f5f0eb]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f5f0eb]/90 via-[#f5f0eb]/50 to-transparent" />

        {/* Decorative grafismo */}
        <img
          src={aliancaGrafismo}
          alt=""
          className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[40vw] max-w-[500px] opacity-[0.04] pointer-events-none select-none"
          aria-hidden="true"
        />

        {/* Content */}
        <div className="absolute inset-0 flex items-start pt-12 md:pt-20">
          <div className="container">
            <div className="max-w-lg">
              <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 mb-3">
                Sofisticadamente Simples
              </p>
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground font-light leading-[0.95]">
                Alta performance<br />
                <span className="italic">capilar</span>
              </h2>
              <p className="mt-5 text-foreground/60 text-sm md:text-base leading-relaxed max-w-md">
                A LOF Professional desenvolve produtos de altíssima performance com ingredientes naturais e fórmulas livres de parabenos. Ciência e natureza juntas para transformar seus cabelos.
              </p>
              <Link
                to="/collections/all"
                className="inline-flex items-center mt-6 h-12 px-8 bg-foreground text-background text-xs uppercase tracking-[0.2em] font-medium hover:bg-foreground/90 transition-colors"
              >
                Conheça Nossas Linhas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
