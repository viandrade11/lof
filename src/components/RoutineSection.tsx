export function RoutineSection() {
  const steps = [
    {
      step: '01',
      title: 'Limpeza',
      description: 'Use o shampoo da linha ideal para seu tipo de cabelo. Aplique no couro cabeludo massageando suavemente, deixe agir por 2 minutos e enxágue.',
      product: 'Shampoo',
    },
    {
      step: '02',
      title: 'Condicionamento',
      description: 'Aplique o condicionador da mesma linha do meio para as pontas. Desembarace com pente de dentes largos. Deixe agir 3-5 minutos e enxágue.',
      product: 'Condicionador',
    },
    {
      step: '03',
      title: 'Tratamento',
      description: 'Adicione 3-5 gotas do Booster ao condicionador ou máscara para potencializar os resultados. Use 1-2x por semana para tratamento intensivo.',
      product: 'Booster',
    },
    {
      step: '04',
      title: 'Finalização',
      description: 'Com o cabelo úmido, aplique o Hit 10x1 ou leave-in específico da linha. Distribua uniformemente e finalize como preferir — secador, difusor ou natural.',
      product: 'Leave-in / Hit 10x1',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-foreground text-background">
      <div className="container">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-background/50 mb-3">Rotina LOF</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            4 passos para cabelos perfeitos
          </h2>
          <p className="mt-4 text-background/60 max-w-lg mx-auto">
            Uma rotina simples e eficaz para resultados profissionais em casa.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 md:gap-6">
          {steps.map((s) => (
            <div key={s.step} className="text-center md:text-left">
              <p className="font-display text-5xl md:text-6xl font-bold text-background/10">{s.step}</p>
              <h3 className="font-display text-xl font-bold mt-2">{s.title}</h3>
              <p className="text-sm text-background/60 mt-2 leading-relaxed">{s.description}</p>
              <p className="text-xs uppercase tracking-[0.15em] text-background/40 mt-3">{s.product}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
