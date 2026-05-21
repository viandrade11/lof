/**
 * LOF Professional — Customer Event (Shopify)
 * Configurações → Customer events → Adicionar pixel customizado
 *
 * Este script roda no sandbox do checkout Shopify e captura o evento
 * Purchase tanto para o Meta Pixel quanto para o GA4 via dataLayer.
 *
 * Cole o conteúdo abaixo no campo "Pixel code" do painel de Customer Events.
 */

// ─── Meta Pixel ──────────────────────────────────────────────────────────────
const META_PIXEL_ID = '1482726736448904';

!(function (f, b, e, v, n, t, s) {
  if (f.fbq) return;
  n = f.fbq = function () {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  };
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = !0;
  n.version = '2.0';
  n.queue = [];
  t = b.createElement(e);
  t.async = !0;
  t.src = v;
  s = b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t, s);
})(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

fbq('init', META_PIXEL_ID);
fbq('track', 'PageView');

// ─── GA4 via dataLayer ───────────────────────────────────────────────────────
window.dataLayer = window.dataLayer || [];

// ─── Evento Purchase ao confirmar pedido ─────────────────────────────────────
analytics.subscribe('checkout_completed', (event) => {
  const checkout = event.data.checkout;
  if (!checkout) return;

  const orderId    = String(checkout.order?.id || checkout.token || '');
  const currency   = checkout.currencyCode || 'BRL';
  const value      = parseFloat(checkout.totalPrice?.amount || '0');

  const items = (checkout.lineItems || []).map((item, index) => ({
    item_id:       item.variant?.id   || item.id,
    item_name:     item.title,
    item_brand:    'LOF Professional',
    item_category: item.variant?.product?.productType || '',
    price:         parseFloat(item.variant?.price?.amount || '0'),
    quantity:      item.quantity,
    index,
  }));

  const contentIds = items.map(i => String(i.item_id));
  const contents   = items.map(i => ({ id: String(i.item_id), quantity: i.quantity }));
  const numItems   = items.reduce((s, i) => s + i.quantity, 0);

  // Gerar event_id único para deduplicação com CAPI
  // Prefixo "shopify_" espelha o event_id gerado pela edge function
  const eventId = `shopify_${checkout.order?.id || checkout.token}`;

  // Meta Pixel — Purchase
  fbq('track', 'Purchase', {
    value,
    currency,
    content_ids:  contentIds,
    contents,
    content_type: 'product',
    num_items:    numItems,
  }, { eventID: eventId });

  // GA4 — purchase (via dataLayer → GTM)
  window.dataLayer.push({ ecommerce: null }); // limpar objeto anterior
  window.dataLayer.push({
    event: 'purchase',
    ecommerce: {
      transaction_id: orderId,
      value,
      currency,
      items,
    },
  });
});

// ─── Evento AddPaymentInfo (opcional mas valioso para otimização) ─────────────
analytics.subscribe('payment_info_submitted', (event) => {
  const checkout = event.data.checkout;
  if (!checkout) return;

  const currency = checkout.currencyCode || 'BRL';
  const value    = parseFloat(checkout.totalPrice?.amount || '0');
  const contentIds = (checkout.lineItems || []).map(i => String(i.variant?.id || i.id));

  fbq('track', 'AddPaymentInfo', {
    value,
    currency,
    content_ids:  contentIds,
    content_type: 'product',
  });
});
