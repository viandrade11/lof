import { Header } from '@/components/Header';
import { ProductLinesSection } from '@/components/ProductLinesSection';
import { HighlightBlocks } from '@/components/HighlightBlocks';
import { HeroBanner } from '@/components/HeroBanner';
import { LineScienceSection } from '@/components/LineScienceSection';
import { RoutineSection } from '@/components/RoutineSection';
import { AboutSection } from '@/components/AboutSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-16 md:pt-20">
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
