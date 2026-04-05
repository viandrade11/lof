import { Star, MessageSquare } from 'lucide-react';

interface Review {
  name: string;
  rating: number;
  text: string;
  date?: string;
  verified?: boolean;
}

interface ReviewsSectionProps {
  reviews?: Review[];
  productName?: string;
  variant?: 'light' | 'dark';
}

export function ReviewsSection({ reviews = [], productName = 'este produto', variant = 'light' }: ReviewsSectionProps) {
  const isDark = variant === 'dark';

  if (reviews.length === 0) {
    return (
      <section className={`py-20 md:py-28 ${isDark ? 'bg-foreground text-background' : ''}`}>
        <div className="container max-w-3xl text-center">
          <p className={`text-xs uppercase tracking-[0.3em] ${isDark ? 'text-background/40' : 'text-muted-foreground'} font-semibold mb-3`}>
            Avaliações
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            O que dizem sobre {productName}
          </h2>
          <div className="mt-12 flex flex-col items-center gap-4">
            <MessageSquare className={`h-12 w-12 ${isDark ? 'text-background/20' : 'text-muted-foreground/30'}`} />
            <p className={`text-sm ${isDark ? 'text-background/50' : 'text-muted-foreground'}`}>
              Ainda não há avaliações para este produto.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-20 md:py-28 ${isDark ? 'bg-foreground text-background' : ''}`}>
      <div className="container">
        <div className="text-center mb-16">
          <p className={`text-xs uppercase tracking-[0.3em] ${isDark ? 'text-background/40' : 'text-muted-foreground'} font-semibold mb-3`}>
            Avaliações
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            O que dizem sobre {productName}
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reviews.map((review, i) => (
            <div
              key={i}
              className={`p-6 border ${isDark ? 'border-background/10' : 'border-border'} flex flex-col`}
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className={`h-4 w-4 ${s < review.rating ? 'fill-current text-foreground' : isDark ? 'text-background/20' : 'text-muted-foreground/30'}`}
                  />
                ))}
              </div>
              <p className={`text-sm leading-relaxed flex-1 ${isDark ? 'text-background/70' : 'text-muted-foreground'}`}>
                "{review.text}"
              </p>
              <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider">{review.name}</p>
                {review.verified && (
                  <span className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-background/40' : 'text-muted-foreground/60'}`}>
                    Compra verificada
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
