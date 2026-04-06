import { Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { ArrowRight } from 'lucide-react';
import aliancaGrafismo from '@/assets/alianca-grafismo.png';

const productLines = [
  {
    name: 'Repair',
    subtitle: 'Reparação profunda',
    description: 'Reconstrução capilar com aminoácidos e queratina vegetal.',
    colorVar: '--lof-repair',
    query: 'Repair',
  },
  {
    name: 'Nutritive',
    subtitle: 'Nutrição intensa',
    description: 'Saúde capilar com óleos nobres e vitaminas.',
    colorVar: '--lof-nutritive',
    query: 'Nutritive',
  },
  {
    name: 'Silver',
    subtitle: 'Matização perfeita',
    description: 'Hidratação e neutralização para loiros impecáveis.',
    colorVar: '--lof-silver',
    query: 'Silver',
  },
  {
    name: 'Purifying',
    subtitle: 'Limpeza vegana',
    description: 'Livre de sulfatos e parabenos. Pureza absoluta.',
    colorVar: '--lof-purifying',
    query: 'Purifying',
  },
  {
    name: 'Wavy',
    subtitle: 'Definição de cachos',
    description: 'Controle de frizz e definição natural.',
    colorVar: '--lof-wavy',
    query: 'Wavy',
  },
  {
    name: 'Hydrate',
    subtitle: 'Hidratação profunda',
    description: 'Maciez, brilho e proteção com ativos botânicos.',
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
      className="group relative overflow-hidden bg-[#0a0a0a] flex flex-col justify-end min-h-[260px] md:min-h-[380px]"
    >
      {/* Product image */}
      {image && (
        <img
          src={image}
          alt={`Linha ${line.name}`}
          className="absolute inset-0 w-full h-full object-contain object-center opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700"
          loading="lazy"
        />
      )}

      {/* Gradient overlay with line color accent */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />

      {/* Color accent bar at top */}
      <div
        className="absolute top-0 left-0 right-0 h-1 opacity-80 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: `hsl(var(${line.colorVar}))` }}
      />

      {/* Grafismo */}
      <img
        src={aliancaGrafismo}
        alt=""
        className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[50%] opacity-[0.03] invert pointer-events-none select-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 p-6 md:p-8">
        <span
          className="text-[9px] uppercase tracking-[0.3em] font-semibold"
          style={{ color: `hsl(var(${line.colorVar}) / 0.7)` }}
        >
          {line.subtitle}
        </span>
        <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-white font-bold leading-[1] mt-1">
          {line.name}
        </h3>
        <p className="text-[11px] text-white/40 mt-2 leading-relaxed max-w-[200px] hidden md:block">
          {line.description}
        </p>
        <span className="inline-flex items-center gap-1.5 mt-4 text-[10px] uppercase tracking-[0.2em] text-white/50 group-hover:text-white transition-colors">
          Explorar <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>

      {/* Color glow on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at bottom, hsl(var(${line.colorVar})), transparent 70%)` }}
      />
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
