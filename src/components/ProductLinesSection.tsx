import { Link } from 'react-router-dom';

const productLines = [
  {
    name: 'Repair',
    description: 'Reparação profunda\n+ Reconstrução capilar',
    colorClass: 'bg-lof-repair',
    textColor: 'text-white',
    query: 'repair',
  },
  {
    name: 'Nutritive',
    description: 'Nutrição intensa\n+ Saúde capilar',
    colorClass: 'bg-lof-nutritive',
    textColor: 'text-white',
    query: 'nutritive',
  },
  {
    name: 'Silver',
    description: 'Matização perfeita\n+ Hidratação loiros',
    colorClass: 'bg-lof-silver',
    textColor: 'text-white',
    query: 'silver',
  },
  {
    name: 'Purifying',
    description: 'Limpeza vegana\n+ Livre de sulfatos',
    colorClass: 'bg-lof-purifying',
    textColor: 'text-white',
    query: 'purifying',
  },
  {
    name: 'Wavy',
    description: 'Definição de cachos\n+ Controle de frizz',
    colorClass: 'bg-lof-wavy',
    textColor: 'text-white',
    query: 'wavy',
  },
  {
    name: 'Crystal Oil',
    description: 'Sérum multi óleos\n+ Brilho intenso',
    colorClass: 'bg-lof-crystal',
    textColor: 'text-white',
    query: 'crystal',
  },
  {
    name: 'Cold Plex',
    description: 'Proteção térmica\n+ Blindagem capilar',
    colorClass: 'bg-lof-cold',
    textColor: 'text-white',
    query: 'cold',
  },
];

export function ProductLinesSection() {
  return (
    <section className="w-full">
      <div className="flex overflow-x-auto scrollbar-hide">
        {productLines.map((line) => (
          <Link
            key={line.name}
            to={`/#produtos`}
            className={`group relative flex-1 min-w-[180px] md:min-w-0 ${line.colorClass} flex flex-col items-center justify-center py-12 md:py-20 px-4 transition-all duration-300 hover:flex-[1.3]`}
          >
            <h3 className={`font-display text-2xl md:text-3xl lg:text-4xl font-light uppercase tracking-wider ${line.textColor} text-center`}>
              {line.name}
            </h3>
            <p className={`text-xs md:text-sm ${line.textColor}/80 text-center mt-2 whitespace-pre-line leading-relaxed`}>
              {line.description}
            </p>
            <span className={`mt-4 text-xs uppercase tracking-[0.2em] ${line.textColor}/60 group-hover:${line.textColor} underline underline-offset-4 transition-colors`}>
              Comprar
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
