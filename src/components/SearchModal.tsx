import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { formatPrice } from '@/lib/shopify';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: products, isLoading } = useProducts(50);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  const filtered = products?.filter(p => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return (
      p.node.title.toLowerCase().includes(q) ||
      p.node.productType?.toLowerCase().includes(q) ||
      p.node.description?.toLowerCase().includes(q)
    );
  }).slice(0, 8) || [];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative w-full max-w-xl mx-auto mt-16 md:mt-24 px-4">
        <div className="bg-background border border-border shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-5 border-b border-border">
            <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="O que você procura?"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="flex-1 h-14 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            )}
            <button onClick={onClose} className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground">
              ESC
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {isLoading && query && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            )}

            {!isLoading && query && filtered.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-sm text-muted-foreground">Nenhum produto encontrado para "{query}"</p>
                <Link to="/collections/all" onClick={onClose} className="text-xs underline text-muted-foreground mt-2 inline-block">
                  Ver todos os produtos
                </Link>
              </div>
            )}

            {filtered.length > 0 && (
              <div>
                <p className="px-5 pt-4 pb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                  {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
                </p>
                {filtered.map(product => {
                  const image = product.node.images.edges[0]?.node;
                  const price = product.node.priceRange.minVariantPrice;
                  return (
                    <Link
                      key={product.node.id}
                      to={`/products/${product.node.handle}`}
                      onClick={onClose}
                      className="flex items-center gap-4 px-5 py-3 hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-14 h-14 bg-muted flex-shrink-0 overflow-hidden">
                        {image && <img src={image.url} alt={image.altText || product.node.title} className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{product.node.title}</p>
                        {product.node.productType && (
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                            Linha {product.node.productType}
                          </p>
                        )}
                      </div>
                      <p className="text-sm font-semibold flex-shrink-0">
                        {formatPrice(price.amount, price.currencyCode)}
                      </p>
                    </Link>
                  );
                })}
                <Link
                  to="/collections/all"
                  onClick={onClose}
                  className="block text-center py-4 text-xs uppercase tracking-wider font-medium text-muted-foreground hover:text-foreground border-t border-border"
                >
                  Ver todos os produtos →
                </Link>
              </div>
            )}

            {!query && (
              <div className="p-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-3">
                  Buscas populares
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Repair', 'Nutritive', 'Silver', 'Hit 10x1', 'Crystal Oil', 'Shampoo', 'Kit'].map(term => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 text-xs border border-border hover:bg-muted/50 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
