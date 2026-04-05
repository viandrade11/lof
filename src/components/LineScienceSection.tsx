import { Link } from 'react-router-dom';

const lineData = [
  {
    name: 'Repair',
    headline: 'Reconstrução capilar de dentro pra fora',
    description: 'A linha Repair foi desenvolvida para cabelos danificados por química, calor e processos mecânicos. Com proteínas vegetais e aminoácidos, reconstrói a fibra capilar devolvendo força, elasticidade e brilho.',
    benefits: ['Reconstrói a fibra capilar', 'Restaura elasticidade e força', 'Sela as cutículas danificadas', 'Proteção contra quebra'],
    ingredients: 'Queratina vegetal, proteína do trigo, óleo de argan',
    idealFor: 'Cabelos com danos químicos, descoloridos ou quebradiços',
    colorClass: 'bg-lof-repair',
    query: 'Repair',
  },
  {
    name: 'Nutritive',
    headline: 'Nutrição profunda para cabelos saudáveis',
    description: 'Formulada com óleos nobres e manteigas vegetais, a linha Nutritive repõe os lipídios naturais do cabelo, combatendo o ressecamento e devolvendo maciez, brilho e vida.',
    benefits: ['Reposição lipídica profunda', 'Combate ao ressecamento', 'Maciez e brilho duradouros', 'Proteção contra agressões externas'],
    ingredients: 'Óleo de macadâmia, manteiga de karité, vitamina E',
    idealFor: 'Cabelos secos, opacos e sem vida',
    colorClass: 'bg-lof-nutritive',
    query: 'Nutritive',
  },
  {
    name: 'Silver',
    headline: 'Matização profissional para loiros perfeitos',
    description: 'A linha Silver neutraliza tons amarelados e alaranjados com pigmentos violeta de alta concentração. Além de matizar, hidrata profundamente mantendo a saúde dos fios loiros.',
    benefits: ['Neutraliza o amarelado', 'Matização uniforme e duradoura', 'Hidratação para loiros', 'Brilho prateado intenso'],
    ingredients: 'Pigmentos violeta, proteína da seda, pantenol',
    idealFor: 'Cabelos loiros, descoloridos, grisalhos ou com mechas',
    colorClass: 'bg-lof-silver',
    query: 'Silver',
  },
  {
    name: 'Wavy',
    headline: 'Cachos definidos sem frizz',
    description: 'Desenvolvida especialmente para cabelos cacheados e ondulados, a linha Wavy proporciona definição, controle de frizz e hidratação sem pesar nos fios.',
    benefits: ['Definição de cachos', 'Controle de frizz e volume', 'Hidratação leve e eficaz', 'Toque suave sem crocância'],
    ingredients: 'Óleo de coco, extrato de aloe vera, pantenol',
    idealFor: 'Cabelos cacheados, ondulados e com frizz',
    colorClass: 'bg-lof-wavy',
    query: 'Wavy',
  },
];

export function LineScienceSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Ciência Capilar</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Cada linha, uma solução específica
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Nossos produtos são formulados com ingredientes naturais e tecnologia de ponta para atender necessidades capilares reais.
          </p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {lineData.map((line, index) => (
            <div
              key={line.name}
              className={`grid md:grid-cols-2 gap-8 md:gap-16 items-center ${index % 2 === 1 ? 'md:direction-rtl' : ''}`}
            >
              <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                <div className={`inline-block px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold text-white ${line.colorClass} mb-4`}>
                  Linha {line.name}
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight">
                  {line.headline}
                </h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {line.description}
                </p>
                <div className="mt-6">
                  <p className="text-xs uppercase tracking-[0.15em] font-semibold mb-3">Benefícios Principais</p>
                  <ul className="space-y-2">
                    {line.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${line.colorClass}`} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] font-semibold mb-1">Ativos</p>
                    <p className="text-sm text-muted-foreground">{line.ingredients}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] font-semibold mb-1">Ideal para</p>
                    <p className="text-sm text-muted-foreground">{line.idealFor}</p>
                  </div>
                </div>
                <Link
                  to={`/collections/all?linha=${line.query}`}
                  className="inline-flex items-center mt-6 h-11 px-6 border border-foreground text-foreground text-xs uppercase tracking-[0.2em] font-medium hover:bg-foreground hover:text-background transition-colors"
                >
                  Ver Produtos {line.name}
                </Link>
              </div>

              <div className={`${line.colorClass} aspect-[4/3] md:aspect-square flex items-center justify-center ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="text-center text-white p-8">
                  <p className="font-display text-6xl md:text-8xl font-bold opacity-20 uppercase">{line.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
