import { Link } from 'react-router-dom';

const HIT_IMAGE = 'https://cdn.shopify.com/s/files/1/0689/9630/0997/files/9.png?v=1736976018';
const BOOSTER_IMAGE = 'https://cdn.shopify.com/s/files/1/0689/9630/0997/files/1_a0ba0c28-56b5-49ad-ae4d-291086c03418.png?v=1737550535';

export function HighlightBlocks() {
  return (
    <section className="grid md:grid-cols-2">
      {/* Hit 10x1 Block */}
      <Link to="/products/leave-in-hit-10x1-200ml-6903bafe7954e" className="group relative overflow-hidden aspect-square md:aspect-[4/3] bg-lof-hit/10">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <img
            src={HIT_IMAGE}
            alt="Leave-in Hit 10x1 200ml"
            className="max-h-full max-w-[60%] object-contain group-hover:scale-105 transition-transform duration-700 drop-shadow-2xl"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <span className="text-xs uppercase tracking-[0.3em] text-lof-hit font-semibold">Destaque</span>
          <h3 className="font-display text-3xl md:text-5xl text-white font-light mt-2">
            Hit 10x1
          </h3>
          <p className="text-sm text-white/70 mt-2 max-w-sm">
            Leave-in multiuso com 10 benefícios em um único produto. Desembaraça, protege, nutre e muito mais.
          </p>
          <span className="inline-block mt-4 text-xs uppercase tracking-[0.2em] text-white/80 underline underline-offset-4 group-hover:text-white transition-colors">
            Conhecer Produto
          </span>
        </div>
      </Link>

      {/* Boosters Block */}
      <Link to="/collections/all?linha=Booster" className="group relative overflow-hidden aspect-square md:aspect-[4/3] bg-lof-repair/10">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <img
            src={BOOSTER_IMAGE}
            alt="Máscara Líquida Booster"
            className="max-h-full max-w-[60%] object-contain group-hover:scale-105 transition-transform duration-700 drop-shadow-2xl"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <span className="text-xs uppercase tracking-[0.3em] text-lof-chroma font-semibold">Tratamento</span>
          <h3 className="font-display text-3xl md:text-5xl text-white font-light mt-2">
            Boosters
          </h3>
          <p className="text-sm text-white/70 mt-2 max-w-sm">
            Ampolas de tratamento intensivo para potencializar os resultados dos seus cuidados capilares.
          </p>
          <span className="inline-block mt-4 text-xs uppercase tracking-[0.2em] text-white/80 underline underline-offset-4 group-hover:text-white transition-colors">
            Conhecer Produtos
          </span>
        </div>
      </Link>
    </section>
  );
}
