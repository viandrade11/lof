import { Header } from '@/components/Header';
import { ProductLinesSection } from '@/components/ProductLinesSection';
import { HighlightBlocks } from '@/components/HighlightBlocks';
import { HeroBanner } from '@/components/HeroBanner';
import { ProductsSection } from '@/components/ProductsSection';
import { EducationSection } from '@/components/EducationSection';
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
        <ProductsSection />
        <EducationSection />
        <AboutSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
