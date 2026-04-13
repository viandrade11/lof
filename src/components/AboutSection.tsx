import { Link } from 'react-router-dom';
import educationBanner from '@/assets/education-banner.webp';
import aboutImg from '@/assets/about-lifestyle.webp';
import aliancaGrafismo from '@/assets/alianca-grafismo.webp';

export function AboutSection() {
  return (
    <section id="sobre" className="relative py-20 md:py-28 overflow-hidden">
      <img src={aliancaGrafismo} alt="" className="absolute left-[-10%] top-[15%] w-[350px] md:w-[500px] opacity-[0.03] pointer-events-none select-none" aria-hidden="true" />
      <div className="container relative">
        {/* Sobre a LOF */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative">
            <img
              src={aboutImg}
              alt="Mulher com cabelos longos e saudáveis representando o conceito sofisticadamente simples da LOF Professional"
              className="w-full aspect-[3/4] object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Sobre a LOF</p>
            <h2 className="font-display text-4xl md:text-5xl font-light leading-tight mb-6">
              Sofisticadamente<br /><span className="italic">simples</span>
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                Nossa história começa com dois cabeleireiros renomados, sócios de um dos salões
                mais prestigiados de São Paulo, que sentiram a necessidade de criar um produto
                nacional para cabelos que fosse tão bom como os produtos importados.
              </p>
              <p>
                Nascemos para estimular o amor próprio, porque pessoas que se amam ajudam a
                tornar o mundo um lugar melhor. Existimos para que qualquer pessoa possa cuidar
                do seu cabelo com produtos de alta qualidade.
              </p>
              <p>
                Defendemos a verdade, a transparência, a empatia e a sustentabilidade.
                Acreditamos em fazer o bem, em ser inclusivos, em usar ingredientes locais,
                em ensinar e desmistificar.
              </p>
            </div>
          </div>
        </div>

        {/* Educação & Ciência */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mt-20 md:mt-28">
          <div className="md:order-2">
            <img
              src={educationBanner}
              alt="Laboratório de pesquisa e desenvolvimento de fórmulas capilares LOF Professional com ingredientes naturais"
              className="w-full aspect-[3/4] object-cover"
              loading="lazy"
            />
          </div>
          <div className="md:order-1">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Educação & Ciência</p>
            <h2 className="font-display text-4xl md:text-5xl font-light leading-tight mb-6">
              Entenda seus <span className="italic">cabelos</span>
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                Na LOF Professional, acreditamos que o conhecimento é a base para cabelos saudáveis. Cada uma das nossas linhas é desenvolvida com ingredientes naturais e tecnologia de ponta, pensados para necessidades capilares específicas.
              </p>
              <p>
                Nossos produtos são formulados sem parabenos, com ativos naturais como óleos essenciais, proteínas vegetais e extratos botânicos que respeitam a fibra capilar enquanto entregam resultados profissionais.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-6">
              <div>
                <p className="font-display text-3xl md:text-4xl font-light">0%</p>
                <p className="text-xs text-muted-foreground mt-1">Parabenos</p>
              </div>
              <div>
                <p className="font-display text-3xl md:text-4xl font-light">40+</p>
                <p className="text-xs text-muted-foreground mt-1">Anos de experiência</p>
              </div>
              <div>
                <p className="font-display text-3xl md:text-4xl font-light">9+</p>
                <p className="text-xs text-muted-foreground mt-1">Linhas</p>
              </div>
            </div>
            <Link
              to="/collections/all"
              className="inline-flex items-center mt-8 h-11 px-6 border border-foreground text-foreground text-xs uppercase tracking-[0.2em] font-medium hover:bg-foreground hover:text-background transition-colors"
            >
              Ver Todos os Produtos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
