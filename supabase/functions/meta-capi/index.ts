/**
 * Supabase Edge Function: meta-capi
 *
 * Aceita dois formatos de entrada:
 *   1. Payload do frontend Lovable (metaCapi.ts) — eventos de navegação/funil
 *   2. Webhook do Shopify (orders/create) — evento Purchase server-side
 *
 * Variáveis de ambiente:
 *   META_PIXEL_ID          — opcional; default 1482726736448904
 *   META_ACCESS_TOKEN ou META_CONVERSIONS_API_TOKEN — token CAPI
 *   SHOPIFY_WEBHOOK_SECRET — secret HMAC do webhook Shopify orders/create
 */

const PIXEL_ID       = Deno.env.get("META_PIXEL_ID") || "1482726736448904";
const ACCESS_TOKEN   = Deno.env.get("META_ACCESS_TOKEN") || Deno.env.get("META_CONVERSIONS_API_TOKEN") || "";
const WEBHOOK_SECRET = Deno.env.get("SHOPIFY_WEBHOOK_SECRET") || "";
const META_API_URL   = `https://graph.facebook.com/v21.0/${PIXEL_ID}/events`;

const CORS_ORIGIN = "*";
const corsHeaders = {
  "Access-Control-Allow-Origin": CORS_ORIGIN,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-shopify-hmac-sha256, x-shopify-topic",
};

// ─── helpers ────────────────────────────────────────────────────────────────

async function sha256hex(value: string): Promise<string> {
  const normalized = value.trim().toLowerCase();
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(normalized));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function getClientIp(req: Request): string | undefined {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    undefined
  );
}

async function verifyShopifyHmac(req: Request, body: string): Promise<boolean> {
  const hmacHeader = req.headers.get("x-shopify-hmac-sha256");
  if (!hmacHeader || !WEBHOOK_SECRET) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(WEBHOOK_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
  const computed = btoa(String.fromCharCode(...new Uint8Array(sig)));
  return computed === hmacHeader;
}

async function sendToMeta(events: Record<string, unknown>[]) {
  return await fetch(`${META_API_URL}?access_token=${ACCESS_TOKEN}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: events }),
  });
}

// ─── handler do webhook Shopify (orders/create) ─────────────────────────────

async function handleShopifyWebhook(req: Request, body: string): Promise<Response> {
  const valid = await verifyShopifyHmac(req, body);
  if (!valid) {
    return new Response("Unauthorized", { status: 401, headers: corsHeaders });
  }

  const order = JSON.parse(body);

  const userData: Record<string, string> = {};
  if (order.email)                       userData.em = await sha256hex(order.email);
  if (order.phone)                       userData.ph = await sha256hex(String(order.phone).replace(/\D/g, ""));
  if (order.billing_address?.first_name) userData.fn = await sha256hex(order.billing_address.first_name);
  if (order.billing_address?.last_name)  userData.ln = await sha256hex(order.billing_address.last_name);
  if (order.billing_address?.city)       userData.ct = await sha256hex(order.billing_address.city);
  if (order.billing_address?.zip)        userData.zp = await sha256hex(String(order.billing_address.zip).replace(/\D/g, ""));

  const contents = (order.line_items || []).map((item: Record<string, unknown>) => ({
    id: String(item.variant_id || item.product_id),
    quantity: item.quantity as number,
    item_price: parseFloat(String(item.price)),
  }));

  const contentIds = contents.map((c: { id: string }) => c.id);
  const numItems   = contents.reduce((s: number, i: { quantity: number }) => s + i.quantity, 0);
  const value      = parseFloat(order.total_price || "0");

  const event = {
    event_name:       "Purchase",
    event_time:       Math.floor(Date.now() / 1000),
    event_id:         `shopify_${order.id}`,
    event_source_url: `https://lof.com.br/`,
    action_source:    "website",
    user_data:        userData,
    custom_data: {
      currency:    (order.currency || "BRL").toUpperCase(),
      value,
      content_ids: contentIds,
      contents,
      content_type: "product",
      num_items:   numItems,
      order_id:    String(order.id),
    },
  };

  const metaRes = await sendToMeta([event]);
  const metaBody = await metaRes.text();
  console.log("Shopify webhook → Meta CAPI:", metaRes.status, metaBody);

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

// ─── handler do frontend Lovable (metaCapi.ts) ──────────────────────────────

async function handleFrontendEvent(req: Request, body: string): Promise<Response> {
  const payload = JSON.parse(body);
  const clientIp = getClientIp(req);

  const userData: Record<string, string> = {};
  if (payload.user_data?.em) userData.em = payload.user_data.em;
  if (payload.user_data?.ph) userData.ph = payload.user_data.ph;
  if (payload.fbc)           userData.fbc = payload.fbc;
  if (payload.fbp)           userData.fbp = payload.fbp;
  if (clientIp)              userData.client_ip_address = clientIp;
  if (payload.user_agent)    userData.client_user_agent = payload.user_agent;

  const event: Record<string, unknown> = {
    event_name:       payload.event_name,
    event_time:       Math.floor(Date.now() / 1000),
    action_source:    "website",
    event_source_url: payload.event_source_url || "https://lof.com.br/",
    user_data:        userData,
  };

  if (payload.event_id) event.event_id = payload.event_id;

  const customData: Record<string, unknown> = {};
  if (payload.value !== undefined)     customData.value        = payload.value;
  if (payload.currency)                customData.currency     = payload.currency;
  if (payload.content_ids)             customData.content_ids  = payload.content_ids;
  if (payload.content_name)            customData.content_name = payload.content_name;
  if (payload.content_type)            customData.content_type = payload.content_type;
  if (payload.contents)                customData.contents     = payload.contents;
  if (payload.num_items !== undefined) customData.num_items    = payload.num_items;
  if (payload.order_id)                customData.order_id     = payload.order_id;

  if (Object.keys(customData).length > 0) event.custom_data = customData;

  const metaRes = await sendToMeta([event]);
  const metaBody = await metaRes.text();
  console.log("Frontend event → Meta CAPI:", payload.event_name, metaRes.status, metaBody);

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

// ─── entry point ────────────────────────────────────────────────────────────

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
  }

  if (!ACCESS_TOKEN) {
    console.error("Meta access token not configured");
    return new Response(JSON.stringify({ error: "Server configuration error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const body = await req.text();
  const isShopifyWebhook = req.headers.has("x-shopify-hmac-sha256");

  try {
    if (isShopifyWebhook) {
      return await handleShopifyWebhook(req, body);
    } else {
      return await handleFrontendEvent(req, body);
    }
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});