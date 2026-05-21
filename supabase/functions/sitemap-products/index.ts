/**
 * sitemap-products — gera sitemap XML dinâmico com todos os produtos
 * da Shopify Storefront API. Cacheado por 1h.
 *
 * URL pública (após deploy):
 *   https://jslyivpcfokacacpklcl.supabase.co/functions/v1/sitemap-products
 *
 * Submeter no Google Search Console como sitemap adicional.
 */

const SHOPIFY_DOMAIN     = "loja-lof.myshopify.com";
const SHOPIFY_API_VERSION = "2025-07";
const SHOPIFY_URL        = `https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const STOREFRONT_TOKEN   = Deno.env.get("SHOPIFY_STOREFRONT_ACCESS_TOKEN") || "a48d33235fc0858eaeaec6ec3d2f2d6d";
const SITE_URL           = "https://lof.com.br";

const QUERY = `
  query SitemapProducts($cursor: String) {
    products(first: 250, after: $cursor) {
      pageInfo { hasNextPage endCursor }
      edges {
        node {
          handle
          updatedAt
          title
          featuredImage { url }
        }
      }
    }
  }
`;

interface ProductNode {
  handle: string;
  updatedAt: string;
  title: string;
  featuredImage: { url: string } | null;
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function fetchAllProducts(): Promise<ProductNode[]> {
  const all: ProductNode[] = [];
  let cursor: string | null = null;

  for (let i = 0; i < 20; i++) {
    const res = await fetch(SHOPIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query: QUERY, variables: { cursor } }),
    });
    if (!res.ok) throw new Error(`Shopify HTTP ${res.status}`);
    const json = await res.json();
    if (json.errors) throw new Error(JSON.stringify(json.errors));

    const products = json.data.products;
    for (const edge of products.edges) all.push(edge.node);
    if (!products.pageInfo.hasNextPage) break;
    cursor = products.pageInfo.endCursor;
  }
  return all;
}

Deno.serve(async () => {
  try {
    const products = await fetchAllProducts();

    const urls = products.map((p) => {
      const loc = `${SITE_URL}/products/${p.handle}`;
      const lastmod = (p.updatedAt || "").split("T")[0];
      const img = p.featuredImage?.url
        ? `\n    <image:image>\n      <image:loc>${escapeXml(p.featuredImage.url)}</image:loc>\n      <image:title>${escapeXml(p.title)}</image:title>\n    </image:image>`
        : "";
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>${img}\n  </url>`;
    }).join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;

    return new Response(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    console.error("sitemap-products error:", err);
    return new Response(`<!-- error: ${String(err)} -->`, {
      status: 500,
      headers: { "Content-Type": "application/xml" },
    });
  }
});