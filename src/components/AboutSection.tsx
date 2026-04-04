import aboutImg from '@/assets/about-lifestyle.jpg';

export function AboutSection() {
  return (
    <section id="sobre" className="py-20 md:py-28 bg-secondary/30">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative">
            <img
              src={aboutImg}
              alt="LOF Professional - Sofisticadamente Simples"
              className="w-full aspect-[3/4] object-cover"
              loading="lazy"
              width={800}
              height={1024}
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
            <div className="mt-10 grid grid-cols-3 gap-6">
              <div>
                <p className="font-display text-3xl">100%</p>
                <p className="text-xs text-muted-foreground mt-1">Livre de parabenos</p>
              </div>
              <div>
                <p className="font-display text-3xl">40+</p>
                <p className="text-xs text-muted-foreground mt-1">Anos de experiência</p>
              </div>
              <div>
                <p className="font-display text-3xl">9</p>
                <p className="text-xs text-muted-foreground mt-1">Linhas de produto</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
