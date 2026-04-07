const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PIXEL_ID = "1482726736448904";
const API_VERSION = "v21.0";

interface EventData {
  event_name: string;
  event_time?: number;
  event_source_url?: string;
  user_agent?: string;
  client_ip?: string;
  fbc?: string;
  fbp?: string;
  content_ids?: string[];
  content_name?: string;
  content_type?: string;
  contents?: Array<{ id: string; quantity: number }>;
  value?: number;
  currency?: string;
  num_items?: number;
}

function hashSHA256(value: string): string {
  const encoder = new TextEncoder();
  const data = encoder.encode(value.trim().toLowerCase());
  const hashBuffer = new Uint8Array(
    // deno-lint-ignore no-explicit-any
    (crypto as any).subtle ? [] : []
  );
  // Use Web Crypto API
  return "";
}

async function sha256(value: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(value.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const META_TOKEN = Deno.env.get("META_CONVERSIONS_API_TOKEN");
  if (!META_TOKEN) {
    console.error("META_CONVERSIONS_API_TOKEN not configured");
    return new Response(
      JSON.stringify({ error: "Server configuration error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const body: EventData = await req.json();

    if (!body.event_name) {
      return new Response(
        JSON.stringify({ error: "event_name is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const eventTime = body.event_time || Math.floor(Date.now() / 1000);

    // Build user_data from available info
    const clientIp = body.client_ip || req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "";
    const userAgent = body.user_agent || req.headers.get("user-agent") || "";

    const userData: Record<string, string> = {};
    if (clientIp) userData.client_ip_address = clientIp;
    if (userAgent) userData.client_user_agent = userAgent;
    if (body.fbc) userData.fbc = body.fbc;
    if (body.fbp) userData.fbp = body.fbp;

    // Build custom_data
    const customData: Record<string, unknown> = {};
    if (body.content_ids) customData.content_ids = body.content_ids;
    if (body.content_name) customData.content_name = body.content_name;
    if (body.content_type) customData.content_type = body.content_type;
    if (body.contents) customData.contents = body.contents;
    if (body.value !== undefined) customData.value = body.value;
    if (body.currency) customData.currency = body.currency;
    if (body.num_items !== undefined) customData.num_items = body.num_items;

    const eventPayload = {
      data: [
        {
          event_name: body.event_name,
          event_time: eventTime,
          event_source_url: body.event_source_url || "",
          action_source: "website",
          user_data: userData,
          custom_data: Object.keys(customData).length > 0 ? customData : undefined,
        },
      ],
    };

    const url = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${META_TOKEN}`;

    const metaResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventPayload),
    });

    const metaResult = await metaResponse.json();

    if (!metaResponse.ok) {
      console.error("Meta CAPI error:", JSON.stringify(metaResult));
      return new Response(
        JSON.stringify({ error: "Meta API error", details: metaResult }),
        { status: metaResponse.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, events_received: metaResult.events_received }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("meta-capi error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
