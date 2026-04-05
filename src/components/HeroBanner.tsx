import heroBanner from '@/assets/hero-banner.jpg';

export function HeroBanner() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[60vh] md:h-[80vh] min-h-[400px]">
        <img
          src={heroBanner}
          alt="LOF Professional - Alta performance capilar"
          className="w-full h-full object-cover"
          loading="lazy"
          width={1920}
          height={800}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-lof-black/60 via-lof-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <div className="max-w-lg">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-3">
                Sofisticadamente Simples
              </p>
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-white font-light leading-[0.95]">
                Cabelos que<br />
                <span className="italic">encantam</span>
              </h2>
              <p className="mt-5 text-white/70 text-sm md:text-base leading-relaxed max-w-md">
                Ingredientes naturais, fórmulas livres de parabenos. Produtos profissionais de altíssima performance para todos os tipos de cabelo.
              </p>
              <a
                href="#produtos"
                className="inline-flex items-center mt-6 h-12 px-8 bg-white text-foreground text-xs uppercase tracking-[0.2em] font-medium hover:bg-white/90 transition-colors"
              >
                Ver Produtos
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
