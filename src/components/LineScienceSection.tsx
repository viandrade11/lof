import { Link } from 'react-router-dom';
import { lineData } from '@/data/lineData';
import { useProducts } from '@/hooks/useProducts';

function LineImage({ line }: { line: typeof lineData[number] }) {
  const { data: products } = useProducts(4, line.query);
  const image = products?.[0]?.node?.images?.edges?.[0]?.node?.url;

  return (
    <div
      className="relative aspect-[4/3] md:aspect-square overflow-hidden"
      style={{ backgroundColor: `hsl(var(${line.colorVar}))` }}
    >
      {image && (
        <img
          src={image}
          alt={`Linha ${line.name}`}
          className="absolute inset-0 w-full h-full object-contain object-center opacity-40 mix-blend-luminosity"
          loading="lazy"
        />
      )}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to top, hsl(var(${line.colorVar}) / 0.9) 0%, hsl(var(${line.colorVar}) / 0.4) 50%, hsl(var(${line.colorVar}) / 0.15) 100%)`,
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
        <p className="font-display text-4xl md:text-6xl font-bold text-white/20 uppercase">{line.name}</p>
      </div>
    </div>
  );
}

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

              <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                <LineImage line={line} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
