import { Link } from 'react-router-dom';
import hitHighlight from '@/assets/hit-highlight.jpg';
import boostersHighlight from '@/assets/boosters-highlight.jpg';

export function HighlightBlocks() {
  return (
    <section className="grid md:grid-cols-2">
      {/* Hit 10x1 Block */}
      <Link to="/hit-10x1" className="group relative overflow-hidden aspect-[4/3]">
        <img
          src={hitHighlight}
          alt="Hit 10x1 - Leave-in multiuso"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
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
      <Link to="/collections/all?linha=Booster" className="group relative overflow-hidden aspect-[4/3]">
        <img
          src={boostersHighlight}
          alt="Boosters - Tratamento intensivo"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
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
