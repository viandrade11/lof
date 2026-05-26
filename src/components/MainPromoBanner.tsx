import { Link } from 'react-router-dom';
import heroKitsDesktop from '@/assets/hero-kits-desktop.png';
import heroKitsMobile from '@/assets/hero-kits-mobile.png';

export function MainPromoBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f3f1ee]">
      <Link to="/kits" aria-label="Kits LOF Professional — Seu cabelo merece um tratamento completo" className="block">
        <picture>
          <source media="(min-width: 768px)" srcSet={heroKitsDesktop} />
          <img
            src={heroKitsMobile}
            alt="Seu cabelo merece um tratamento completo — Conheça os novos Kits LOF."
            className="w-full h-auto block"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </Link>
    </section>
  );
}
