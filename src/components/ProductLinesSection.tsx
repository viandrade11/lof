import { Link } from 'react-router-dom';

const productLines = [
  {
    name: 'Repair',
    description: 'Reparação profunda\n+ Reconstrução capilar',
    colorClass: 'bg-lof-repair',
    query: 'Repair',
  },
  {
    name: 'Nutritive',
    description: 'Nutrição intensa\n+ Saúde capilar',
    colorClass: 'bg-lof-nutritive',
    query: 'Nutritive',
  },
  {
    name: 'Silver',
    description: 'Matização perfeita\n+ Hidratação loiros',
    colorClass: 'bg-lof-silver',
    query: 'Silver',
  },
  {
    name: 'Purifying',
    description: 'Limpeza vegana\n+ Livre de sulfatos',
    colorClass: 'bg-lof-purifying',
    query: 'Purifying',
  },
  {
    name: 'Wavy',
    description: 'Definição de cachos\n+ Controle de frizz',
    colorClass: 'bg-lof-wavy',
    query: 'Wavy',
  },
  {
    name: 'Hydrate',
    description: 'Hidratação profunda\n+ Maciez e brilho',
    colorClass: 'bg-lof-hydrate',
    query: 'Hydrate',
  },
];

export function ProductLinesSection() {
  return (
    <section className="w-full">
      {/* Desktop: horizontal row | Mobile: 2-column grid */}
      <div className="grid grid-cols-2 md:flex">
        {productLines.map((line) => (
          <Link
            key={line.name}
            to={`/collections/all?linha=${line.query}`}
            className={`group relative md:flex-1 ${line.colorClass} flex flex-col items-center justify-center py-14 md:py-20 px-4 transition-all duration-300 md:hover:flex-[1.3] min-h-[180px]`}
          >
            <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-wider text-white text-center">
              {line.name}
            </h3>
            <p className="text-[10px] md:text-xs text-white/80 text-center mt-2 whitespace-pre-line leading-relaxed">
              {line.description}
            </p>
            <span className="mt-3 text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/60 group-hover:text-white underline underline-offset-4 transition-colors">
              Comprar
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
