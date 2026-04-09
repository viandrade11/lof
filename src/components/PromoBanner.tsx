import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export function PromoBanner() {
  return (
    <section className="relative overflow-hidden bg-foreground text-background py-10 md:py-16">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, currentColor 40px, currentColor 41px)',
          }}
        />
      </div>

      <div className="container relative text-center">
        <div className="inline-flex items-center gap-2 bg-background/10 px-4 py-1.5 rounded-full mb-5">
          <Sparkles className="h-3.5 w-3.5" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Promoção Especial</span>
        </div>

        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light leading-[0.95]">
          20<span className="text-2xl md:text-4xl align-top">%</span> OFF
        </h2>
        <p className="text-lg md:text-xl font-light mt-3 text-background/70">
          em <span className="italic font-display">todos</span> os produtos
        </p>
        <p className="text-xs text-background/40 mt-3 uppercase tracking-[0.15em]">
          Desconto aplicado automaticamente no checkout
        </p>

        <Link
          to="/collections/all"
          className="inline-flex items-center mt-7 h-12 px-10 bg-background text-foreground text-xs uppercase tracking-[0.2em] font-medium hover:bg-background/90 transition-colors"
        >
          Aproveitar Agora
        </Link>
      </div>
    </section>
  );
}
