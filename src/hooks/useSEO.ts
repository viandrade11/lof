import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: 'website' | 'product';
  image?: string;
  keywords?: string;
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
    sku?: string;
    gtin?: string;
    category?: string;
  };
  breadcrumbs?: { name: string; url: string }[];
  faq?: { question: string; answer: string }[];
  itemList?: { name: string; url: string; image?: string }[];
  article?: {
    datePublished?: string;
    dateModified?: string;
    author?: string;
  };
}

const SITE_NAME = 'LOF Professional';
const SITE_URL = 'https://lof.com.br';
const DEFAULT_IMAGE = `${SITE_URL}/favicon.png`;

export function useSEO({ title, description, canonical, type = 'website', image, keywords, product, breadcrumbs, faq, itemList, article }: SEOProps) {
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

    // Basic meta
    setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);
    setMeta('author', 'LOF Professional');
    setMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // Open Graph
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:type', type === 'product' ? 'product' : 'website', true);
    setMeta('og:site_name', SITE_NAME, true);
    setMeta('og:locale', 'pt_BR', true);
    setMeta('og:image', image || DEFAULT_IMAGE, true);
    setMeta('og:image:width', '1200', true);
    setMeta('og:image:height', '630', true);

    const pageUrl = canonical || `${SITE_URL}${window.location.pathname}`;
    setMeta('og:url', pageUrl, true);

    // Canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = pageUrl;

    // Twitter
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image || DEFAULT_IMAGE);

    // GEO / AI optimization meta
    setMeta('application-name', SITE_NAME);
    setMeta('theme-color', '#1a1a1a');

    // Clean up existing LD+JSON
    document.querySelectorAll('script[data-seo-ld]').forEach(el => el.remove());

    const addLdJson = (data: Record<string, unknown>) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-ld', 'true');
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    };

    // WebSite schema (for sitelinks search box)
    if (type === 'website' && window.location.pathname === '/') {
      addLdJson({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        description: 'Cosméticos capilares profissionais com ingredientes naturais e tecnologia de ponta.',
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          logo: { '@type': 'ImageObject', url: DEFAULT_IMAGE },
        },
        inLanguage: 'pt-BR',
      });
    }

    // Product schema
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
          seller: { '@type': 'Organization', name: SITE_NAME },
          url: pageUrl,
          priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        },
      };
      if (product.image) ld.image = product.image;
      if (product.sku) ld.sku = product.sku;
      if (product.gtin) ld.gtin13 = product.gtin;
      if (product.category) ld.category = product.category;
      if (product.rating && product.rating.count > 0) {
        ld.aggregateRating = {
          '@type': 'AggregateRating',
          ratingValue: product.rating.value,
          reviewCount: product.rating.count,
        };
      }
      addLdJson(ld);
    }

    // BreadcrumbList schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      addLdJson({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((bc, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: bc.name,
          item: bc.url.startsWith('http') ? bc.url : `${SITE_URL}${bc.url}`,
        })),
      });
    }

    // FAQPage schema (great for GEO / AI snippets)
    if (faq && faq.length > 0) {
      addLdJson({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map(f => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      });
    }

    // ItemList schema (for collection / listing pages)
    if (itemList && itemList.length > 0) {
      addLdJson({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: itemList.map((it, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: it.name,
          url: it.url.startsWith('http') ? it.url : `${SITE_URL}${it.url}`,
          ...(it.image ? { image: it.image } : {}),
        })),
      });
    }

    return () => {
      document.querySelectorAll('script[data-seo-ld]').forEach(el => el.remove());
    };
  }, [title, description, canonical, type, image, keywords, product, breadcrumbs, faq, itemList, article]);
}
