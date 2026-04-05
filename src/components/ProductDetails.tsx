import { Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from './ProductCard';
import { ReviewsSection } from './ReviewsSection';

interface ProductDetailsProps {
  product: {
    title: string;
    handle?: string;
    productType?: string;
    description: string;
  };
}

const lineInfo: Record<string, {
  color: string;
  howToUse: string[];
  benefits: string[];
  competitors: { feature: string; lof: string; others: string }[];
}> = {
  Repair: {
    color: 'bg-lof-repair',
    howToUse: [
      'Aplique o shampoo Repair no couro cabeludo, massageie suavemente e enxágue',
      'Aplique o condicionador Repair do meio para as pontas, desembarace e deixe agir 3 min',
      'Adicione 3-5 gotas do Booster Repair ao condicionador para potencializar',
      'Finalize com o Hit 10x1 nos fios úmidos para proteção e brilho',
    ],
    benefits: [
      'Reconstrução da fibra capilar danificada por química e calor',
      'Restauração de elasticidade e resistência dos fios',
      'Selagem de cutículas para brilho e maciez',
      'Prevenção contra quebra e pontas duplas',
    ],
    competitors: [
      { feature: 'Sem parabenos', lof: '✓', others: 'Nem sempre' },
      { feature: 'Vegano', lof: '✓', others: 'Raramente' },
      { feature: 'Proteína vegetal', lof: '✓', others: 'Proteína animal' },
      { feature: 'Concentração de ativos', lof: 'Alta (profissional)', others: 'Baixa a média' },
      { feature: 'Resultado na 1ª aplicação', lof: '✓', others: 'Varia' },
    ],
  },
  Nutritive: {
    color: 'bg-lof-nutritive',
    howToUse: [
      'Aplique o shampoo Nutritive massageando suavemente e enxágue',
      'Aplique o condicionador Nutritive do meio para as pontas, deixe 3-5 min',
      'Para nutrição intensa, adicione gotas do Booster Nutritive ao condicionador',
      'Finalize com leave-in ou Hit 10x1 para selar a nutrição',
    ],
    benefits: [
      'Reposição lipídica profunda para cabelos ressecados',
      'Maciez, brilho e movimento naturais',
      'Proteção contra ressecamento por sol e vento',
      'Nutrição duradoura sem pesar nos fios',
    ],
    competitors: [
      { feature: 'Óleos nobres naturais', lof: '✓ Macadâmia + Karité', others: 'Silicones sintéticos' },
      { feature: 'Sem sulfatos agressivos', lof: '✓', others: 'Nem sempre' },
      { feature: 'Resultado profissional', lof: '✓', others: 'Variável' },
      { feature: 'Vegano e cruelty-free', lof: '✓', others: 'Raramente' },
    ],
  },
  Silver: {
    color: 'bg-lof-silver',
    howToUse: [
      'Aplique o shampoo Silver nos cabelos molhados, massageie e deixe 2-3 min',
      'Enxágue e aplique o condicionador ou máscara Silver, deixe 5-10 min',
      'Para matização mais intensa, aumente o tempo de ação da máscara',
      'Use 2-3x por semana para manutenção da cor ideal',
    ],
    benefits: [
      'Neutralização de tons amarelados e alaranjados',
      'Matização uniforme e duradoura',
      'Hidratação profunda para cabelos loiros',
      'Brilho prateado sem ressecar os fios',
    ],
    competitors: [
      { feature: 'Pigmentos concentrados', lof: '✓ Alta concentração', others: 'Diluídos' },
      { feature: 'Hidrata enquanto matiza', lof: '✓', others: 'Resseca' },
      { feature: 'Sem parabenos', lof: '✓', others: 'Contém' },
      { feature: 'Mantém cor natural', lof: '✓ Sem escurecer', others: 'Pode alterar tom' },
    ],
  },
  Wavy: {
    color: 'bg-lof-wavy',
    howToUse: [
      'Lave com shampoo Wavy e enxágue suavemente, sem esfregar',
      'Aplique o condicionador Wavy com os dedos, sem desembaraçar com pente',
      'Amasse os cachos de baixo para cima (scrunch) para definir',
      'Aplique o Leave-in Wavy com o cabelo ainda molhado e deixe secar naturalmente',
    ],
    benefits: [
      'Definição de cachos sem crocância',
      'Controle total de frizz e volume',
      'Hidratação leve que não pesa nos fios',
      'Toque suave e flexível o dia todo',
    ],
    competitors: [
      { feature: 'Sem silicones pesados', lof: '✓', others: 'Contém' },
      { feature: 'Anti-frizz eficaz', lof: '✓ Duradouro', others: 'Temporário' },
      { feature: 'Definição sem crocância', lof: '✓', others: 'Efeito duro' },
      { feature: 'Vegano', lof: '✓', others: 'Nem sempre' },
    ],
  },
  Hydrate: {
    color: 'bg-lof-hydrate',
    howToUse: [
      'Aplique o shampoo Hydrate massageando suavemente o couro cabeludo',
      'Aplique a máscara Hydrate do meio para as pontas e deixe 5-10 min',
      'Enxágue bem e finalize com leave-in ou Hit 10x1',
      'Use a máscara 1-2x por semana para máxima hidratação',
    ],
    benefits: [
      'Hidratação profunda e duradoura',
      'Maciez extrema e brilho intenso',
      'Restauração da barreira de umidade natural',
      'Fios mais maleáveis e fáceis de pentear',
    ],
    competitors: [
      { feature: 'Hidratação profunda real', lof: '✓', others: 'Superficial' },
      { feature: 'Sem parabenos', lof: '✓', others: 'Contém' },
      { feature: 'Ativos naturais', lof: '✓', others: 'Químicos sintéticos' },
      { feature: 'Resultado profissional', lof: '✓', others: 'Doméstico' },
    ],
  },
  Purifying: {
    color: 'bg-lof-purifying',
    howToUse: [
      'Aplique o shampoo Purifying no couro cabeludo e massageie',
      'Deixe agir por 2 minutos para limpeza profunda',
      'Enxágue e aplique o condicionador Purifying do meio para as pontas',
      'Ideal para uso antes de tratamentos ou quando sentir acúmulo nos fios',
    ],
    benefits: [
      'Limpeza profunda sem ressecar',
      'Remove acúmulo de produtos e impurezas',
      'Fórmula 100% vegana e sem sulfatos',
      'Prepara os fios para absorver tratamentos',
    ],
    competitors: [
      { feature: '100% vegano', lof: '✓', others: 'Nem sempre' },
      { feature: 'Sem sulfatos', lof: '✓', others: 'Com sulfatos' },
      { feature: 'Limpa sem agredir', lof: '✓', others: 'Resseca' },
      { feature: 'Cruelty-free', lof: '✓', others: 'Nem sempre' },
    ],
  },
  Finalizadores: {
    color: 'bg-lof-hit',
    howToUse: [
      'Lave e condicione com a linha adequada para seu tipo de cabelo',
      'Com os fios úmidos, aplique o Hit 10x1 distribuindo uniformemente',
      'Para brilho extra, finalize com 2-3 gotas do Crystal Oil nas pontas',
      'Pode ser usado antes do secador como protetor térmico',
    ],
    benefits: [
      '10 benefícios em um único produto (Hit 10x1)',
      'Proteção térmica contra secador e chapinha',
      'Desembaraço instantâneo e brilho intenso',
      'Sérum multi-óleos para nutrição das pontas (Crystal Oil)',
    ],
    competitors: [
      { feature: '10 benefícios em 1', lof: '✓ Hit 10x1', others: '3-5 benefícios' },
      { feature: 'Proteção até 230°C', lof: '✓', others: 'Até 180°C' },
      { feature: 'Sem silicone insolúvel', lof: '✓', others: 'Contém' },
      { feature: 'Vegano', lof: '✓', others: 'Raramente' },
    ],
  },
};

export function ProductDetails({ product }: ProductDetailsProps) {
  const productType = product.productType || '';
  const info = lineInfo[productType] || lineInfo.Repair;

  // Get related products from same line
  const { data: relatedProducts } = useProducts(50);
  const sameLine = relatedProducts?.filter(
    (p) => {
      const pType = (p.node as any).productType || '';
      return pType === productType && p.node.title !== product.title;
    }
  )?.slice(0, 4) || [];

  return (
    <div>
      {/* How to Use */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10 md:gap-20">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Modo de Uso</p>
              <h2 className="font-display text-2xl md:text-4xl font-bold">Como usar para melhores resultados</h2>
            </div>
            <div className="space-y-6">
              {info.howToUse.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <span className="font-display text-3xl font-bold text-muted-foreground/30 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed pt-2">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className={`py-16 md:py-24 ${info.color} text-white`}>
        <div className="container">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-3">Benefícios</p>
          <h2 className="font-display text-2xl md:text-4xl font-bold mb-10">
            O que {product.title} faz pelo seu cabelo
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {info.benefits.map((b, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="w-6 h-6 border border-white/30 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</span>
                <p className="text-sm text-white/90 leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitor Comparison */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Comparativo</p>
            <h2 className="font-display text-2xl md:text-4xl font-bold">LOF vs. Concorrentes</h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="border border-border">
              <div className="grid grid-cols-3 bg-foreground text-background">
                <div className="p-3 md:p-4 text-xs uppercase tracking-wider font-semibold">Característica</div>
                <div className="p-3 md:p-4 text-xs uppercase tracking-wider font-semibold text-center">LOF</div>
                <div className="p-3 md:p-4 text-xs uppercase tracking-wider font-semibold text-center">Concorrentes</div>
              </div>
              {info.competitors.map((row, i) => (
                <div key={i} className={`grid grid-cols-3 border-t border-border ${i % 2 === 0 ? 'bg-muted/30' : ''}`}>
                  <div className="p-3 md:p-4 text-sm">{row.feature}</div>
                  <div className="p-3 md:p-4 text-sm text-center font-medium">{row.lof}</div>
                  <div className="p-3 md:p-4 text-sm text-center text-muted-foreground">{row.others}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ReviewsSection productName={product.title} />

      {/* Combine with other products */}
      {sameLine.length > 0 && (
        <section className="py-16 md:py-24 bg-secondary/30 border-t border-border">
          <div className="container">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Complete sua Rotina</p>
              <h2 className="font-display text-2xl md:text-4xl font-bold">
                Combine com outros produtos da linha {productType}
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-8 md:gap-x-5">
              {sameLine.map((p) => (
                <ProductCard key={p.node.id} product={p} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                to={`/collections/all?linha=${productType}`}
                className="inline-flex items-center h-11 px-6 border border-foreground text-foreground text-xs uppercase tracking-[0.2em] font-medium hover:bg-foreground hover:text-background transition-colors"
              >
                Ver toda linha {productType}
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
