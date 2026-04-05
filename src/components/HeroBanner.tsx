import { Link } from 'react-router-dom';
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
        <div className="absolute inset-0 bg-gradient-to-r from-lof-black/80 via-lof-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <div className="max-w-lg">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-3">
                Sofisticadamente Simples
              </p>
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-white font-light leading-[0.95]">
                Alta performance<br />
                <span className="italic">capilar</span>
              </h2>
              <p className="mt-5 text-white/70 text-sm md:text-base leading-relaxed max-w-md">
                A LOF Professional desenvolve produtos de altíssima performance com ingredientes naturais e fórmulas livres de parabenos. Ciência e natureza juntas para transformar seus cabelos.
              </p>
              <Link
                to="/collections/all"
                className="inline-flex items-center mt-6 h-12 px-8 bg-white text-foreground text-xs uppercase tracking-[0.2em] font-medium hover:bg-white/90 transition-colors"
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
