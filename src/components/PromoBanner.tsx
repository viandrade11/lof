import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export function PromoBanner() {
  return (
    <section className="relative overflow-hidden bg-foreground text-background py-2.5">
      <div className="container relative">
        <div className="flex items-center justify-center gap-2 md:gap-3 text-center">
          <Sparkles className="h-2.5 w-2.5 md:h-3 md:w-3 shrink-0" />
          <p className="text-[9px] md:text-xs uppercase tracking-[0.18em] md:tracking-[0.25em] font-medium leading-none">
            <span className="font-semibold">20% OFF</span>
            <span className="text-background/60"> · todos os produtos</span>
          </p>
          <Link
            to="/collections/all"
            className="text-[9px] md:text-xs uppercase tracking-[0.18em] md:tracking-[0.25em] font-medium underline underline-offset-4 hover:text-background/80 transition-colors leading-none"
          >
            Aproveitar →
          </Link>
        </div>
      </div>
    </section>
  );
}
