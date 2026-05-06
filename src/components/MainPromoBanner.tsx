import { Link } from 'react-router-dom';
import heroDiasMaesDesktop from '@/assets/hero-dia-das-maes-v2.png';
import heroDiasMaesMobile from '@/assets/hero-dia-das-maes-mobile.png';

export function MainPromoBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-[#b8675a]">
      <Link to="/kits" aria-label="Dia das Mães — Oferta especial em kits profissionais LOF" className="block">
        <picture>
          <source media="(min-width: 768px)" srcSet={heroDiasMaesDesktop} />
          <img
            src={heroDiasMaesMobile}
            alt="Dia das Mães — Ela cuida de tudo, cuide dela. Kits profissionais LOF com condição exclusiva até 10 de maio."
            className="w-full h-auto block"
            fetchPriority="high"
          />
        </picture>
      </Link>
    </section>
  );
}
