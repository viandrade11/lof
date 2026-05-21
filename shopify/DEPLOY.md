# Deploy — Rastreamento Purchase LOF
## Três passos, nenhuma nova infraestrutura

---

## PASSO 1 — Atualizar a Edge Function no Supabase

### No terminal (com Supabase CLI instalado):
```bash
# Na raiz do projeto
supabase functions deploy meta-capi
```

### Ou pelo painel Supabase:
1. Acessar https://supabase.com → seu projeto → Edge Functions
2. Selecionar `meta-capi`
3. Substituir o código pelo arquivo `supabase/functions/meta-capi/index.ts`
4. Clicar em Deploy

### Adicionar variável de ambiente nova:
No painel Supabase → Project Settings → Edge Function Secrets:
```
SHOPIFY_WEBHOOK_SECRET = (gerado no passo 2)
```
As variáveis `META_PIXEL_ID` e `META_ACCESS_TOKEN` já devem existir — confirmar.

---

## PASSO 2 — Registrar o Webhook no Shopify

### No painel Shopify:
1. Configurações → Notificações → Webhooks
2. Clicar em "Criar webhook"
3. Preencher:
   - **Evento:** Criação de pedido (`orders/create`)
   - **Formato:** JSON
   - **URL:** `https://SEU_PROJECT_ID.supabase.co/functions/v1/meta-capi`
   - **Versão API:** 2024-01 (ou a mais recente disponível)
4. Salvar
5. Copiar o **Segredo de assinatura** que aparece após salvar
6. Colar esse segredo como `SHOPIFY_WEBHOOK_SECRET` no Supabase (passo 1)

### Testar o webhook:
No mesmo painel, clicar em "Enviar notificação de teste" e verificar nos logs
da edge function no Supabase se chegou com status 200.

---

## PASSO 3 — Configurar o Customer Event no Shopify

### No painel Shopify:
1. Configurações → Customer events
2. Clicar em "Adicionar pixel customizado"
3. Nome: `LOF Purchase Tracking`
4. Colar todo o conteúdo do arquivo `shopify/customer-event-pixel.js`
5. Salvar e **Ativar**

### Permissões necessárias (marcar no painel):
- [x] Analisar dados do cliente
- [x] Dados de pedido

---

## PASSO 4 — Validação (fazer após os 3 passos acima)

### Meta Pixel:
1. Instalar extensão [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/) no Chrome
2. Fazer um pedido de teste
3. Verificar se `Purchase` aparece na extensão na página de confirmação do Shopify

### Meta Events Manager:
1. Acessar business.facebook.com → Events Manager → seu pixel
2. Na aba "Test Events", verificar se `Purchase` chega via:
   - **Browser** (Pixel — Customer Event)
   - **Server** (CAPI — webhook Shopify)
3. Confirmar que ambos têm o mesmo `event_id` (prefixo `shopify_ORDER_ID`)
   — isso garante a deduplicação e evita dupla contagem

### GA4:
1. Abrir o site → F12 → Console
2. Digitar: `window.dataLayer.filter(e => e.event === 'purchase')`
3. Confirmar que o objeto aparece com `transaction_id`, `value` e `items`

---

## Resumo do fluxo após deploy

```
Usuário finaliza compra no checkout Shopify
         │
         ├──► Customer Event (browser)
         │         └──► fbq('Purchase') → Meta Pixel
         │         └──► dataLayer.push('purchase') → GTM → GA4
         │
         └──► Webhook orders/create (server)
                   └──► Edge Function meta-capi
                             └──► Meta CAPI com user_data hasheado
                                  (email, telefone, nome, cidade, CEP)
```

**Deduplicação:** ambos os caminhos usam `event_id = "shopify_ORDER_ID"`,
então a Meta conta como um único evento Purchase — sem dupla contagem no ROAS.

---

## O que muda nos dados após o deploy

| Métrica | Antes | Depois |
|---|---|---|
| Purchase no Meta Pixel | ❌ Zero | ✅ 100% dos pedidos |
| Purchase na CAPI | ❌ Zero | ✅ 100% server-side |
| Match rate CAPI | ~25% (sem user_data) | ~75–85% (com email/telefone) |
| ROAS reportado | Subestimado | Correto |
| Otimização do algoritmo Meta | Sem sinal de conversão | Com sinal completo |
| Purchase no GA4 | ❌ Zero | ✅ Via GTM |
