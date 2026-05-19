import { Link } from 'react-router-dom';
import heroRepairHitDesktop from '@/assets/hero-repair-hit-desktop.webp';
import heroRepairHitMobile from '@/assets/hero-repair-hit-mobile.webp';

export function MainPromoBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-[#b8675a]">
      <Link to="/products/kit-reparacao-definitiva-repair-336060528" aria-label="Kit Reparação Definitiva Repair — Shampoo, Condicionador, Booster e Hit 10x1" className="block">
        <picture>
          <source media="(min-width: 768px)" srcSet={heroRepairHitDesktop} />
          <img
            src={heroRepairHitMobile}
            alt="Seu cabelo com reparação de salão — Kit Repair + Hit 10x1."
            className="w-full h-auto block"
            width={828}
            height={1242}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </Link>
    </section>
  );
}
