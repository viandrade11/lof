import { Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { ArrowRight } from 'lucide-react';

const productLines = [
  {
    name: 'Repair',
    subtitle: 'Reparação profunda',
    colorVar: '--lof-repair',
    query: 'Repair',
  },
  {
    name: 'Nutritive',
    subtitle: 'Nutrição intensa',
    colorVar: '--lof-nutritive',
    query: 'Nutritive',
  },
  {
    name: 'Silver',
    subtitle: 'Matização perfeita',
    colorVar: '--lof-silver',
    query: 'Silver',
  },
  {
    name: 'Purifying',
    subtitle: 'Limpeza vegana',
    colorVar: '--lof-purifying',
    query: 'Purifying',
  },
  {
    name: 'Wavy',
    subtitle: 'Definição de cachos',
    colorVar: '--lof-wavy',
    query: 'Wavy',
  },
  {
    name: 'Hydrate',
    subtitle: 'Hidratação profunda',
    colorVar: '--lof-hydrate',
    query: 'Hydrate',
  },
];

function LineCard({ line }: { line: typeof productLines[number] }) {
  const { data: products } = useProducts(4, line.query);
  const image = products?.[0]?.node?.images?.edges?.[0]?.node?.url;

  return (
    <Link
      to={`/collections/all?linha=${line.query}`}
      className="group relative overflow-hidden flex flex-col justify-end min-h-[220px] md:min-h-[360px]"
      style={{ backgroundColor: `hsl(var(${line.colorVar}))` }}
    >
      {/* Product image */}
      {image && (
        <img
          src={image}
          alt={`Linha ${line.name}`}
          className="absolute inset-0 w-full h-full object-contain object-center opacity-30 group-hover:opacity-45 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity"
          loading="lazy"
        />
      )}

      {/* Subtle darkening gradient at bottom for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to top, hsl(var(${line.colorVar}) / 0.9) 0%, hsl(var(${line.colorVar}) / 0.4) 50%, hsl(var(${line.colorVar}) / 0.15) 100%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-5 md:p-7">
        <span className="text-[9px] uppercase tracking-[0.3em] font-semibold text-white/60">
          {line.subtitle}
        </span>
        <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-white font-bold leading-[1] mt-1 drop-shadow-md">
          {line.name}
        </h3>
        <span className="inline-flex items-center gap-1.5 mt-3 text-[10px] uppercase tracking-[0.2em] text-white/70 group-hover:text-white transition-colors">
          Explorar <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}

export function ProductLinesSection() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {productLines.map((line) => (
          <LineCard key={line.name} line={line} />
        ))}
      </div>
    </section>
  );
}
