import { Link } from 'react-router-dom';
import heroRepairHitDesktop from '@/assets/hero-repair-hit-desktop.png';
import heroDiasMaesMobile from '@/assets/hero-dia-das-maes-mobile.png';

export function MainPromoBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-[#b8675a]">
      <Link to="/kits" aria-label="Kit Repair + Hit 10x1 com 5% OFF — cupom MAIS5" className="block">
        <picture>
          <source media="(min-width: 768px)" srcSet={heroRepairHitDesktop} />
          <img
            src={heroDiasMaesMobile}
            alt="Seu cabelo com reparação de salão — Kit Repair + Hit 10x1 com 5% OFF, cupom MAIS5."
            className="w-full h-auto block"
            fetchPriority="high"
          />
        </picture>
      </Link>
    </section>
  );
}
