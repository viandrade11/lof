import { Star, Truck, ShieldCheck, Award } from 'lucide-react';

export function SocialProofBar() {
  return (
    <section className="border-b border-border bg-muted/30">
      <div className="container py-4 md:py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="flex items-center gap-2.5">
            <Star className="h-4 w-4 text-yellow-500 flex-shrink-0 fill-yellow-500" />
            <div>
              <p className="text-xs font-semibold leading-tight">4.8 ★ Avaliação</p>
              <p className="text-[10px] text-muted-foreground">+5.000 clientes</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Truck className="h-4 w-4 text-green-600 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold leading-tight">Frete Grátis</p>
              <p className="text-[10px] text-muted-foreground">Acima de R$ 299</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="h-4 w-4 text-blue-600 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold leading-tight">Compra Segura</p>
              <p className="text-[10px] text-muted-foreground">Pagamento protegido</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Award className="h-4 w-4 text-purple-600 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold leading-tight">Profissional</p>
              <p className="text-[10px] text-muted-foreground">Qualidade de salão</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
