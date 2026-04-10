import heroBg from '@/assets/hero-bg.webp';

export function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="LOF Professional - Haircare de alta performance"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-lof-black/70 via-lof-black/40 to-transparent" />
      </div>
      <div className="relative container">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-background/70 mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Sofisticadamente Simples
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-background font-light leading-[0.95] animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Cabelos que<br />
            <span className="italic">encantam</span>
          </h1>
          <p className="mt-6 text-background/80 text-sm md:text-base leading-relaxed max-w-md animate-fade-in" style={{ animationDelay: '0.6s' }}>
            Nascemos para estimular o amor próprio com produtos profissionais de altíssima performance. Ingredientes naturais, fórmulas livres de parabenos.
          </p>
          <div className="mt-8 flex gap-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <a
              href="#produtos"
              className="inline-flex items-center h-12 px-8 bg-background text-foreground text-xs uppercase tracking-[0.2em] font-medium hover:bg-background/90 transition-colors"
            >
              Ver Produtos
            </a>
            <a
              href="#sobre"
              className="inline-flex items-center h-12 px-8 border border-background/40 text-background text-xs uppercase tracking-[0.2em] font-medium hover:bg-background/10 transition-colors"
            >
              Nossa História
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
