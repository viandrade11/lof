import { Header } from '@/components/Header';
import { ProductLinesSection } from '@/components/ProductLinesSection';
import { HighlightBlocks } from '@/components/HighlightBlocks';
import { HeroBanner } from '@/components/HeroBanner';
import { LineScienceSection } from '@/components/LineScienceSection';
import { RoutineSection } from '@/components/RoutineSection';
import { AboutSection } from '@/components/AboutSection';
import { Footer } from '@/components/Footer';
import { MainPromoBanner } from '@/components/MainPromoBanner';
import { FloatingCTA } from '@/components/FloatingCTA';
import { SocialProofBar } from '@/components/SocialProofBar';
import { LazySection } from '@/components/LazySection';
import { useSEO } from '@/hooks/useSEO';

const Index = () => {
  useSEO({
    title: 'LOF Professional — Haircare Profissional Sofisticadamente Simples',
    description: 'Cosméticos capilares profissionais LOF: shampoos, condicionadores, máscaras e finalizadores. Repair, Nutritive, Silver, Wavy, Hydrate e o icônico Hit 10x1. Frete grátis acima de R$ 199.',
    keywords: 'cosméticos capilares profissionais, haircare profissional, shampoo profissional, condicionador nutritivo, máscara capilar, leave-in, ativador de cachos, LOF Professional, Hit 10x1, Crystal Oil',
  });
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main className="pt-[88px] md:pt-[108px]">
        <MainPromoBanner />
        <SocialProofBar />
        <ProductLinesSection />
        <HighlightBlocks />
        <LazySection>
          <HeroBanner />
        </LazySection>
        <LazySection>
          <LineScienceSection />
        </LazySection>
        <LazySection>
          <RoutineSection />
        </LazySection>
        <LazySection>
          <AboutSection />
        </LazySection>
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Index;
