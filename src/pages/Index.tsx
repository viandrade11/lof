import { Header } from '@/components/Header';
import { ProductLinesSection } from '@/components/ProductLinesSection';
import { HighlightBlocks } from '@/components/HighlightBlocks';
import { HeroBanner } from '@/components/HeroBanner';
import { LineScienceSection } from '@/components/LineScienceSection';
import { RoutineSection } from '@/components/RoutineSection';
import { AboutSection } from '@/components/AboutSection';
import { Footer } from '@/components/Footer';
import { PromoBanner } from '@/components/PromoBanner';
import { useSEO } from '@/hooks/useSEO';

const Index = () => {
  useSEO({
    title: 'LOF Professional — Cosméticos Capilares Profissionais',
    description: 'LOF Professional: cosméticos capilares profissionais com ingredientes naturais. Linhas Repair, Nutritive, Silver, Wavy, Hydrate e o icônico Hit 10x1. Sofisticadamente simples.',
    keywords: 'cosméticos capilares, shampoo profissional, condicionador profissional, máscara capilar, leave-in, LOF Professional, tratamento capilar, cabelos danificados, proteção térmica',
  });
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <div className="pt-16 md:pt-20">
        <PromoBanner />
        <ProductLinesSection />
        <HighlightBlocks />
        <HeroBanner />
        <LineScienceSection />
        <RoutineSection />
        <AboutSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
