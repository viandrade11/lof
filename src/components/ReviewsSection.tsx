import { Star, MessageSquare, Loader2, Send } from 'lucide-react';
import { useReviews } from '@/hooks/useReviews';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

interface ReviewsSectionProps {
  productHandle: string | string[];
  productName?: string;
  variant?: 'light' | 'dark';
}

function StarRating({ rating, interactive, onChange }: { rating: number; interactive?: boolean; onChange?: (r: number) => void }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'fill-current text-foreground' : 'text-muted-foreground/30'} ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
          onClick={() => interactive && onChange?.(i + 1)}
        />
      ))}
    </div>
  );
}

function ReviewForm({ productHandle, productTitle, onSuccess }: { productHandle: string; productTitle: string; onSuccess: () => void }) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) {
      toast.error('Preencha todos os campos', { position: 'top-center' });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Faça login para enviar sua avaliação', { position: 'top-center' });
        return;
      }

      const { error } = await supabase.from('reviews').insert({
        product_handle: productHandle,
        product_title: productTitle,
        reviewer_name: name.trim(),
        reviewer_email: user.email,
        rating,
        content: content.trim(),
        user_id: user.id,
        status: 'published',
      });

      if (error) throw error;

      toast.success('Avaliação enviada com sucesso!', { position: 'top-center' });
      setName('');
      setContent('');
      setRating(5);
      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error('Erro ao enviar avaliação', { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-12 max-w-lg mx-auto border border-border p-6">
      <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-6">Deixe sua avaliação</p>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium mb-1 block">Nota</label>
          <StarRating rating={rating} interactive onChange={setRating} />
        </div>
        <div>
          <label className="text-xs font-medium mb-1 block">Nome</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full h-10 px-3 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors"
            placeholder="Seu nome"
            maxLength={100}
            required
          />
        </div>
        <div>
          <label className="text-xs font-medium mb-1 block">Avaliação</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full h-24 px-3 py-2 border border-border bg-transparent text-sm resize-none focus:outline-none focus:border-foreground transition-colors"
            placeholder="Conte sua experiência com o produto..."
            maxLength={1000}
            required
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full h-11 uppercase tracking-[0.15em] text-xs font-semibold">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Send className="h-4 w-4 mr-2" /> Enviar avaliação</>}
        </Button>
      </div>
    </form>
  );
}

export function ReviewsSection({ productHandle, productName = 'este produto', variant = 'light' }: ReviewsSectionProps) {
  const handles = Array.isArray(productHandle) ? productHandle : [productHandle];
  const { data: reviews, isLoading } = useReviews(handles);
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check auth state
  useState(() => {
    supabase.auth.getUser().then(({ data }) => setIsLoggedIn(!!data.user));
  });

  const avgRating = reviews?.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['reviews', handles] });
    setShowForm(false);
  };

  return (
    <section className={`py-20 md:py-28 ${variant === 'dark' ? 'bg-foreground text-background' : ''}`}>
      <div className="container">
        <div className="text-center mb-16">
          <p className={`text-xs uppercase tracking-[0.3em] ${variant === 'dark' ? 'text-background/40' : 'text-muted-foreground'} font-semibold mb-3`}>
            Avaliações
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            O que dizem sobre {productName}
          </h2>
          {avgRating && reviews && reviews.length > 0 && (
            <div className="flex items-center justify-center gap-3 mt-4">
              <StarRating rating={Math.round(parseFloat(avgRating))} />
              <span className="text-lg font-semibold">{avgRating}</span>
              <span className={`text-sm ${variant === 'dark' ? 'text-background/50' : 'text-muted-foreground'}`}>
                ({reviews.length} {reviews.length === 1 ? 'avaliação' : 'avaliações'})
              </span>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : !reviews || reviews.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className={`h-12 w-12 mx-auto mb-4 ${variant === 'dark' ? 'text-background/20' : 'text-muted-foreground/30'}`} />
            <p className={`text-sm ${variant === 'dark' ? 'text-background/50' : 'text-muted-foreground'}`}>
              Ainda não há avaliações para este produto. Seja o primeiro!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {reviews.slice(0, 9).map((review) => (
              <div key={review.id} className={`p-6 border ${variant === 'dark' ? 'border-background/10' : 'border-border'} flex flex-col`}>
                <StarRating rating={review.rating} />
                <p className={`mt-3 text-sm leading-relaxed flex-1 ${variant === 'dark' ? 'text-background/70' : 'text-muted-foreground'}`}>
                  "{review.content}"
                </p>
                <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider">{review.reviewer_name}</p>
                  <span className={`text-[10px] ${variant === 'dark' ? 'text-background/30' : 'text-muted-foreground/50'}`}>
                    {new Date(review.created_at).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Review form for logged-in users */}
        {isLoggedIn && !showForm && (
          <div className="text-center mt-10">
            <Button
              variant="outline"
              onClick={() => setShowForm(true)}
              className="h-11 px-8 uppercase tracking-[0.15em] text-xs font-semibold"
            >
              Escrever avaliação
            </Button>
          </div>
        )}

        {showForm && (
          <ReviewForm
            productHandle={handles[0]}
            productTitle={productName}
            onSuccess={handleSuccess}
          />
        )}
      </div>
    </section>
  );
}
