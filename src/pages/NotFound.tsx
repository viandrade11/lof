import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useSEO } from '@/hooks/useSEO';

const NotFound = () => {
  const location = useLocation();

  useSEO({
    title: 'Página Não Encontrada | LOF Professional',
    description: 'A página que você procura não existe. Explore nossos produtos capilares profissionais LOF Professional.',
  });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center pt-20">
        <div className="text-center px-4">
          <h1 className="font-display text-6xl md:text-8xl font-light mb-4">404</h1>
          <p className="text-lg text-muted-foreground mb-8">Página não encontrada</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="inline-flex items-center h-12 px-8 bg-foreground text-background text-xs uppercase tracking-[0.2em] font-medium hover:bg-foreground/90 transition-colors">
              Voltar ao Início
            </Link>
            <Link to="/collections/all" className="inline-flex items-center h-12 px-8 border border-border text-foreground text-xs uppercase tracking-[0.2em] font-medium hover:bg-secondary transition-colors">
              Ver Produtos
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
