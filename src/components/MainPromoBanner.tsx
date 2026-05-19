import { Link } from 'react-router-dom';
import heroRepairHitDesktop from '@/assets/hero-repair-hit-desktop.webp';
import heroRepairHitMobile from '@/assets/hero-repair-hit-mobile.webp';
import heroRepairHitMobile640 from '@/assets/hero-repair-hit-mobile-640.webp';
import heroRepairHitMobile828 from '@/assets/hero-repair-hit-mobile-828.webp';

export function MainPromoBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-[#b8675a]">
      <Link to="/products/kit-reparacao-definitiva-repair-336060528" aria-label="Kit Reparação Definitiva Repair — Shampoo, Condicionador, Booster e Hit 10x1" className="block">
        <picture>
          <source media="(min-width: 768px)" srcSet={heroRepairHitDesktop} />
          <img
            src={heroRepairHitMobile}
            srcSet={`${heroRepairHitMobile640} 640w, ${heroRepairHitMobile828} 828w, ${heroRepairHitMobile} 1280w`}
            sizes="(max-width: 767px) 100vw, 1280px"
            alt="A linha certa para o seu cabelo — LOF Professional Nutritive."
            className="w-full h-auto block max-h-[70vh] md:max-h-none object-cover object-top"
            width={1280}
            height={1920}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </Link>
    </section>
  );
}
