import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: 'website' | 'product';
  image?: string;
  product?: {
    name: string;
    price: string;
    currency: string;
    availability: string;
    brand: string;
    description: string;
    image?: string;
    url?: string;
    rating?: { value: number; count: number };
  };
}

export function useSEO({ title, description, canonical, type = 'website', image, product }: SEOProps) {
  useEffect(() => {
    const fullTitle = title.includes('LOF') ? title : `${title} | LOF Professional`;
    document.title = fullTitle;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:type', type, true);
    if (image) setMeta('og:image', image, true);
    if (canonical) {
      setMeta('og:url', canonical, true);
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    if (image) setMeta('twitter:image', image);

    // JSON-LD for product
    const existingLd = document.querySelector('script[data-seo-ld]');
    if (existingLd) existingLd.remove();

    if (product) {
      const ld: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        brand: { '@type': 'Brand', name: product.brand },
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: product.currency,
          availability: `https://schema.org/${product.availability}`,
          seller: { '@type': 'Organization', name: 'LOF Professional' },
        },
      };
      if (product.image) ld.image = product.image;
      if (product.rating && product.rating.count > 0) {
        ld.aggregateRating = {
          '@type': 'AggregateRating',
          ratingValue: product.rating.value,
          reviewCount: product.rating.count,
        };
      }

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-ld', 'true');
      script.textContent = JSON.stringify(ld);
      document.head.appendChild(script);
    }

    return () => {
      const ld = document.querySelector('script[data-seo-ld]');
      if (ld) ld.remove();
    };
  }, [title, description, canonical, type, image, product]);
}
