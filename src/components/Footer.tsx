import { Instagram, Facebook, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoLof from '@/assets/logo-lof.png';

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container py-16 md:py-20">
        <div className="grid md:grid-cols-4 gap-10 md:gap-12">
          <div className="md:col-span-1">
            <img src={logoLof} alt="LOF Professional" className="h-8 invert mb-4" />
            <p className="text-xs text-background/60 leading-relaxed">
              Sofisticadamente simples. Produtos profissionais de altíssima performance para seus cabelos.
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold mb-4">Linhas</h4>
            <ul className="space-y-2 text-xs text-background/60">
              <li><Link to="/collections/all?linha=Repair" className="hover:text-background transition-colors">Repair</Link></li>
              <li><Link to="/collections/all?linha=Nutritive" className="hover:text-background transition-colors">Nutritive</Link></li>
              <li><Link to="/collections/all?linha=Silver" className="hover:text-background transition-colors">Silver</Link></li>
              <li><Link to="/collections/all?linha=Wavy" className="hover:text-background transition-colors">Wavy</Link></li>
              <li><Link to="/collections/all?linha=Purifying" className="hover:text-background transition-colors">Purifying</Link></li>
              <li><Link to="/collections/all?linha=Hydrate" className="hover:text-background transition-colors">Hydrate</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold mb-4">Institucional</h4>
            <ul className="space-y-2 text-xs text-background/60">
              <li><Link to="/#sobre" className="hover:text-background transition-colors">Sobre a LOF</Link></li>
              <li><Link to="/produtos" className="hover:text-background transition-colors">Todos os Produtos</Link></li>
              <li><a href="#" className="hover:text-background transition-colors">Contato</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold mb-4">Siga-nos</h4>
            <div className="flex gap-4">
              <a href="https://instagram.com/lof_professional" target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-background transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com/lofprofessional" target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-background transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-background transition-colors" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-6">
              <p className="text-xs text-background/40">contato@lof.com.br</p>
              <p className="text-xs text-background/40 mt-1">www.lof.com.br</p>
            </div>
          </div>
        </div>
        <div className="border-t border-background/10 mt-12 pt-8 text-center">
          <p className="text-xs text-background/40">&copy; {new Date().getFullYear()} LOF Professional. Neuf Cosmétique. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
