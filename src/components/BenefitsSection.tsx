import { Leaf, Award, Heart, Recycle } from 'lucide-react';

const benefits = [
  { icon: Leaf, title: 'Livre de Parabenos', description: 'Formulações limpas e seguras para seus cabelos' },
  { icon: Award, title: 'Qualidade Profissional', description: 'Criados por cabeleireiros renomados de São Paulo' },
  { icon: Heart, title: 'Amor Próprio', description: 'Nascemos para estimular o cuidado com você' },
  { icon: Recycle, title: 'Sustentável', description: 'Comprometidos com o meio ambiente e a sociedade' },
];

export function BenefitsSection() {
  return (
    <section className="py-16 md:py-20 border-y border-border">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {benefits.map((b) => (
            <div key={b.title} className="text-center">
              <b.icon className="h-6 w-6 mx-auto mb-3 text-foreground/70" strokeWidth={1.5} />
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-1">{b.title}</h3>
              <p className="text-xs text-muted-foreground">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
