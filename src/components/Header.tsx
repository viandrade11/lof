import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, ChevronDown, User } from 'lucide-react';
import logoLof from '@/assets/logo-lof.png';
import { CartDrawer } from './CartDrawer';

const linhas = [
  { label: 'Repair', href: '/collections/all?linha=Repair' },
  { label: 'Nutritive', href: '/collections/all?linha=Nutritive' },
  { label: 'Silver', href: '/collections/all?linha=Silver' },
  { label: 'Purifying', href: '/collections/all?linha=Purifying' },
  { label: 'Wavy', href: '/collections/all?linha=Wavy' },
  { label: 'Hydrate', href: '/collections/all?linha=Hydrate' },
  
  { label: 'Crystal Oil', href: '/crystal-oil' },
  { label: 'Hit 10x1', href: '/hit-10x1' },
];

const produtos = [
  { label: 'Todos os Produtos', href: '/collections/all' },
  { label: 'Shampoos', href: '/collections/all?tipo=Shampoo' },
  { label: 'Condicionadores', href: '/collections/all?tipo=Condicionador' },
  { label: 'Máscaras', href: '/collections/all?tipo=Máscara' },
  { label: 'Finalizadores', href: '/collections/all?tipo=Finalizador' },
  { label: 'Tratamentos', href: '/collections/all?tipo=Tratamento' },
];

type DropdownItem = { label: string; href: string };

function NavDropdown({ label, items, onNavigate }: { label: string; items: DropdownItem[]; onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const ref = useRef<HTMLDivElement>(null);

  const enter = () => { clearTimeout(timeout.current); setOpen(true); };
  const leave = () => { timeout.current = setTimeout(() => setOpen(false), 150); };

  return (
    <div ref={ref} className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        className="flex items-center gap-1 text-xs font-medium uppercase tracking-[0.2em] text-foreground/70 hover:text-foreground transition-colors"
        onClick={() => setOpen(!open)}
      >
        {label}
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
          <div className="bg-background border border-border shadow-lg min-w-[200px] py-2">
            {items.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="block px-5 py-2.5 text-xs uppercase tracking-[0.1em] text-foreground/70 hover:text-foreground hover:bg-secondary/50 transition-colors"
                onClick={() => { setOpen(false); onNavigate?.(); }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileLinhasOpen, setMobileLinhasOpen] = useState(false);
  const [mobileProdutosOpen, setMobileProdutosOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-background'
      }`}
    >
      <Link
        to="/collections/all"
        className="block bg-foreground text-background text-center py-1.5 text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium hover:bg-foreground/90 transition-colors"
      >
        🔥 20% OFF EM TODO O SITE — DESCONTO APLICADO NO CHECKOUT
      </Link>
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex-shrink-0">
          <img src={logoLof} alt="LOF Professional" className="h-7 md:h-9 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <NavDropdown label="Linhas" items={linhas} />
          <NavDropdown label="Produtos" items={produtos} />
          <Link to="/hit-10x1" className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/70 hover:text-foreground transition-colors">
            Hit 10x1
          </Link>
          <Link to="/profissional" className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/70 hover:text-foreground transition-colors">
            Atacado
          </Link>
          <Link to="/#sobre" className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/70 hover:text-foreground transition-colors">
            Sobre
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <button className="p-2 text-foreground/70 hover:text-foreground transition-colors" aria-label="Buscar">
            <Search className="h-5 w-5" />
          </button>
          <a href="https://loja-lof.myshopify.com/account" target="_blank" rel="noopener noreferrer" className="p-2 text-foreground/70 hover:text-foreground transition-colors" aria-label="Minha Conta">
            <User className="h-5 w-5" />
          </a>
          <CartDrawer />
          <button
            className="md:hidden p-2 text-foreground/70"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="container py-6 flex flex-col gap-1">
            {/* Linhas accordion */}
            <button
              className="flex items-center justify-between py-3 text-sm font-medium uppercase tracking-[0.15em] text-foreground/70"
              onClick={() => setMobileLinhasOpen(!mobileLinhasOpen)}
            >
              Linhas
              <ChevronDown className={`h-4 w-4 transition-transform ${mobileLinhasOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileLinhasOpen && (
              <div className="pl-4 flex flex-col gap-1 mb-2">
                {linhas.map((item) => (
                  <Link key={item.label} to={item.href} className="py-2 text-sm text-foreground/60 hover:text-foreground" onClick={closeMobile}>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Produtos accordion */}
            <button
              className="flex items-center justify-between py-3 text-sm font-medium uppercase tracking-[0.15em] text-foreground/70"
              onClick={() => setMobileProdutosOpen(!mobileProdutosOpen)}
            >
              Produtos
              <ChevronDown className={`h-4 w-4 transition-transform ${mobileProdutosOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileProdutosOpen && (
              <div className="pl-4 flex flex-col gap-1 mb-2">
                {produtos.map((item) => (
                  <Link key={item.label} to={item.href} className="py-2 text-sm text-foreground/60 hover:text-foreground" onClick={closeMobile}>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            <Link to="/hit-10x1" className="py-3 text-sm font-medium uppercase tracking-[0.15em] text-foreground/70 hover:text-foreground" onClick={closeMobile}>
              Hit 10x1
            </Link>
            <Link to="/profissional" className="py-3 text-sm font-medium uppercase tracking-[0.15em] text-foreground/70 hover:text-foreground" onClick={closeMobile}>
              Atacado
            </Link>
            <Link to="/#sobre" className="py-3 text-sm font-medium uppercase tracking-[0.15em] text-foreground/70 hover:text-foreground" onClick={closeMobile}>
              Sobre
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
