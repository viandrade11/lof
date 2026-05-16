/**
 * Adiciona transformações de imagem ao CDN do Shopify.
 * O CDN serve automaticamente WebP/AVIF conforme o Accept header do navegador.
 * Docs: https://shopify.dev/docs/api/liquid/filters/image_url
 */
export function shopifyImg(url: string | undefined | null, width: number): string | undefined {
  if (!url) return undefined;
  if (!url.includes('cdn.shopify.com') && !url.includes('shopify.com')) return url;
  try {
    const u = new URL(url);
    u.searchParams.set('width', String(width));
    return u.toString();
  } catch {
    return url;
  }
}