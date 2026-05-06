import { Link } from 'react-router-dom';
import heroDiasMaes from '@/assets/hero-dia-das-maes.webp';

export function MainPromoBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-[#b8675a]">
      <Link to="/kits" aria-label="Dia das Mães — Oferta especial em kits profissionais LOF" className="block">
        <img
          src={heroDiasMaes}
          alt="Dia das Mães — Ela cuida de tudo, cuide dela. Kits profissionais LOF com condição exclusiva até 10 de maio."
          className="w-full h-auto block"
          width={1920}
          height={760}
          fetchPriority="high"
        />
      </Link>
    </section>
  );
}
