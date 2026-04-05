import { Link } from 'react-router-dom';
import { useProductByHandle } from '@/hooks/useProducts';
import { ArrowRight } from 'lucide-react';
import aliancaGrafismo from '@/assets/alianca-grafismo.png';

export function HighlightBlocks() {
  const { data: hitProduct } = useProductByHandle('leave-in-hit-10x1-200ml-6903bafe7954e');
  const hitImage = hitProduct?.images?.edges?.[0]?.node?.url;

  const { data: crystalProduct } = useProductByHandle('serum-crystal-oil-laranja-60ml-6903bb190ee85');
  const crystalImage = crystalProduct?.images?.edges?.[0]?.node?.url;

  return (
    <section className="grid md:grid-cols-2">
      {/* Hit 10x1 Block — styled like the LP */}
      <Link to="/hit-10x1" className="group relative overflow-hidden aspect-[4/3] bg-[#0a0a0a]">
        {hitImage && (
          <img
            src={hitImage}
            alt="Hit 10x1 - Leave-in multiuso"
            className="absolute inset-0 w-full h-full object-contain object-right opacity-40 group-hover:opacity-50 transition-opacity duration-700 group-hover:scale-105 transition-transform"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
        <img
          src={aliancaGrafismo}
          alt=""
          className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[35%] opacity-[0.04] invert pointer-events-none select-none"
          aria-hidden="true"
        />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex flex-col justify-end h-full">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-semibold">Leave-in Multiuso</span>
          <h3 className="font-display text-4xl md:text-5xl text-white font-bold leading-[1] mt-2">
            Hit 10x1
          </h3>
          <p className="font-display text-sm md:text-base text-white/30 italic mt-1">
            10 benefícios. Um único produto.
          </p>
          <p className="text-xs text-white/50 mt-3 max-w-xs leading-relaxed hidden md:block">
            Proteção térmica, hidratação, anti-frizz, brilho e reconstrução em uma única aplicação.
          </p>
          <span className="inline-flex items-center gap-2 mt-5 text-xs uppercase tracking-[0.2em] text-white/70 group-hover:text-white transition-colors">
            Conhecer Produto <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </Link>

      {/* Boosters Block */}
      <Link to="/products/serum-crystal-oil-laranja-60ml-6903bb190ee85" className="group relative overflow-hidden aspect-[4/3] bg-[#0a0a0a]">
        {crystalImage && (
          <img
            src={crystalImage}
            alt="Crystal Oil - Sérum Multi Óleos"
            className="absolute inset-0 w-full h-full object-contain object-center opacity-40 group-hover:opacity-50 transition-opacity duration-700 group-hover:scale-105 transition-transform"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
        <img
          src={aliancaGrafismo}
          alt=""
          className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[35%] opacity-[0.04] invert pointer-events-none select-none"
          aria-hidden="true"
        />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex flex-col justify-end h-full">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-semibold">Finalizador Premium</span>
          <h3 className="font-display text-4xl md:text-5xl text-white font-bold leading-[1] mt-2">
            Crystal Oil
          </h3>
          <p className="font-display text-sm md:text-base text-white/30 italic mt-1">
            Brilho, maciez e proteção.
          </p>
          <p className="text-xs text-white/50 mt-3 max-w-xs leading-relaxed hidden md:block">
            Sérum multi óleos com Argan, Ojon e Macadâmia. Nutre, sela as pontas e proporciona brilho intenso.
          </p>
          <span className="inline-flex items-center gap-2 mt-5 text-xs uppercase tracking-[0.2em] text-white/70 group-hover:text-white transition-colors">
            Conhecer Produto <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </Link>
    </section>
  );
}
