import { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-3 bg-gradient-to-t from-background via-background/95 to-transparent pt-8 pointer-events-none">
      <Link
        to="/collections/all"
        className="pointer-events-auto flex items-center justify-center gap-2 w-full h-12 bg-foreground text-background text-xs uppercase tracking-[0.2em] font-medium hover:bg-foreground/90 transition-all shadow-lg"
      >
        <ShoppingBag className="h-4 w-4" />
        Ver Produtos
      </Link>
    </div>
  );
}
