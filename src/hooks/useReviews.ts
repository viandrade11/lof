import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Review {
  id: string;
  product_handle: string;
  product_title: string;
  reviewer_name: string;
  rating: number;
  content: string;
  created_at: string;
}

export function useReviews(productHandle: string | string[]) {
  const handles = Array.isArray(productHandle) ? productHandle : [productHandle];

  return useQuery({
    queryKey: ['reviews', handles],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('id, product_handle, product_title, reviewer_name, rating, content, created_at')
        .in('product_handle', handles)
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Review[];
    },
    enabled: handles.length > 0,
  });
}

export function useAllReviews(limit = 50) {
  return useQuery({
    queryKey: ['reviews', 'all', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('id, product_handle, product_title, reviewer_name, rating, content, created_at')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as Review[];
    },
  });
}
