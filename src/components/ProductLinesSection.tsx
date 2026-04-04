const productLines = [
  { name: 'Repair', description: 'Reparação profunda para cabelos danificados', colorVar: 'bg-lof-repair', query: 'title:repair' },
  { name: 'Nutritive', description: 'Nutrição e saúde para todos os tipos de cabelos', colorVar: 'bg-lof-nutritive', query: 'title:nutritive' },
  { name: 'Silver', description: 'Matização e hidratação para cabelos loiros', colorVar: 'bg-lof-silver', query: 'title:silver' },
  { name: 'Purifying', description: 'Limpeza vegana, livre de sulfatos e silicones', colorVar: 'bg-lof-purifying', query: 'title:purifying' },
  { name: 'Wavy', description: 'Definição e cuidado para cachos e ondulados', colorVar: 'bg-lof-wavy', query: 'title:wavy' },
  { name: 'Hit 10x1', description: 'Leave-in multiuso com 10 benefícios', colorVar: 'bg-lof-hit', query: 'title:hit' },
  { name: 'Crystal Oil', description: 'Sérum multi óleos para brilho e nutrição', colorVar: 'bg-lof-crystal', query: 'title:crystal' },
];

export function ProductLinesSection() {
  return (
    <section id="linhas" className="py-20 md:py-28 bg-secondary/50">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Nossas Linhas</p>
          <h2 className="font-display text-4xl md:text-5xl font-light">
            Uma linha para cada <span className="italic">necessidade</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {productLines.map((line, i) => (
            <a
              key={line.name}
              href={`#produtos`}
              className="group relative overflow-hidden bg-card p-6 md:p-8 hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`w-10 h-1 ${line.colorVar} mb-4 group-hover:w-16 transition-all duration-300`} />
              <h3 className="font-display text-xl md:text-2xl mb-2">{line.name}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{line.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
