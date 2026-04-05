import educationBanner from '@/assets/education-banner.jpg';

export function EducationSection() {
  return (
    <section className="py-20 md:py-28 bg-secondary/50">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="overflow-hidden">
            <img
              src={educationBanner}
              alt="Ciência LOF Professional"
              className="w-full h-[400px] md:h-[500px] object-cover"
              loading="lazy"
              width={800}
              height={500}
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Educação & Ciência</p>
            <h2 className="font-display text-3xl md:text-5xl font-light leading-tight">
              Entenda seus <span className="italic">cabelos</span>
            </h2>
            <div className="mt-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
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
                <p className="font-display text-3xl md:text-4xl font-light">100%</p>
                <p className="text-xs text-muted-foreground mt-1">Vegano</p>
              </div>
              <div>
                <p className="font-display text-3xl md:text-4xl font-light">9+</p>
                <p className="text-xs text-muted-foreground mt-1">Linhas</p>
              </div>
            </div>
            <a
              href="#sobre"
              className="inline-flex items-center mt-8 h-11 px-6 border border-foreground text-foreground text-xs uppercase tracking-[0.2em] font-medium hover:bg-foreground hover:text-background transition-colors"
            >
              Conheça Nossa História
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
