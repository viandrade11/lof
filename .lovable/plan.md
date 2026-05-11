## Substituir banner desktop

Trocar a imagem do banner principal (desktop) pela nova arte enviada "Seu cabelo com reparação de salão / Kit Repair + Hit 10x1 — 5% OFF, cupom MAIS5".

### Passos
1. Copiar `user-uploads://DESKTOP.png` para `src/assets/hero-repair-hit-desktop.png`.
2. Em `src/components/MainPromoBanner.tsx`:
   - Substituir o import `heroDiasMaesDesktop` pelo novo asset.
   - Atualizar o `<source media="(min-width: 768px)">` para usar a nova imagem.
   - Atualizar o `alt` para refletir a campanha Repair + Hit 10x1 com 5% OFF (cupom MAIS5).
3. Manter o banner mobile atual inalterado (usuário pediu apenas a substituição do desktop).
4. Manter o link apontando para `/kits`.

### Observações
- Nenhuma mudança de layout/CSS necessária — a imagem usa `w-full h-auto`.
- Não mexer em lógica de negócio nem em outras seções.

### Confirmar
Mantenho o banner mobile como está? Se quiser, também posso gerar uma versão mobile a partir desta nova arte.
