import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

export function PromoSticker() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[60] animate-fade-in">
      <Link
        to="/collections/all"
        className="relative block bg-foreground text-background rounded-full shadow-2xl px-5 py-3 pr-10 hover:scale-105 transition-transform group"
      >
        <div className="text-center">
          <span className="block font-display text-xl font-bold leading-none">20% OFF</span>
          <span className="block text-[9px] uppercase tracking-[0.2em] text-background/60 mt-0.5">Todo o site</span>
        </div>
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setDismissed(true); }}
          className="absolute -top-1.5 -right-1.5 bg-background text-foreground rounded-full p-0.5 shadow-md hover:scale-110 transition-transform"
          aria-label="Fechar"
        >
          <X className="h-3 w-3" />
        </button>
      </Link>
    </div>
  );
}
