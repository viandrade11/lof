import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { BenefitsSection } from '@/components/BenefitsSection';
import { ProductLinesSection } from '@/components/ProductLinesSection';
import { ProductsSection } from '@/components/ProductsSection';
import { AboutSection } from '@/components/AboutSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <BenefitsSection />
      <ProductLinesSection />
      <ProductsSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
