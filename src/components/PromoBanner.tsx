import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export function PromoBanner() {
  return (
    <section className="relative overflow-hidden bg-foreground text-background py-2.5">
      <div className="container relative">
        <div className="flex items-center justify-center gap-3 text-center flex-wrap">
          <Sparkles className="h-3 w-3 shrink-0" />
          <p className="text-[10px] md:text-xs uppercase tracking-[0.25em] font-medium">
            <span className="font-semibold">20% OFF</span>
            <span className="text-background/60"> em todos os produtos · aplicado no checkout</span>
          </p>
          <Link
            to="/collections/all"
            className="text-[10px] md:text-xs uppercase tracking-[0.25em] font-medium underline underline-offset-4 hover:text-background/80 transition-colors"
          >
            Aproveitar →
          </Link>
        </div>
      </div>
    </section>
  );
}
