import { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';

const WHATSAPP_URL = 'https://api.whatsapp.com/send/?phone=5511952132380&text=Oi%21+Quero+consultoria+especializada+para+comprar+LOF.+&type=phone_number&app_absent=0';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.064 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 21.785h-.003a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.887 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.49-8.413z"/>
    </svg>
  );
}

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed z-40 right-0 bottom-20 md:bottom-24 flex items-center justify-end pointer-events-none">
      {/* Collapsed tab — slides out from right edge */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir atendimento com Especialista LOF"
        className={`pointer-events-auto inline-flex items-center gap-1.5 h-9 pl-2 pr-3 bg-foreground text-background rounded-l-full shadow-lg hover:bg-foreground/90 transition-all duration-300 ${
          open ? 'translate-x-full opacity-0 pointer-events-none' : 'translate-x-0 opacity-100'
        }`}
      >
        <span className="flex items-center justify-center h-6 w-6 rounded-full bg-background text-foreground">
          <WhatsAppIcon className="h-3.5 w-3.5" />
        </span>
        <span className="text-[10px] uppercase tracking-[0.12em] font-medium whitespace-nowrap">
          Especialista LOF
        </span>
      </button>

      {/* Expanded card */}
      <div
        className={`pointer-events-auto absolute right-4 md:right-6 bottom-0 w-[280px] bg-background border border-border rounded-2xl shadow-2xl overflow-hidden origin-bottom-right transition-all duration-300 ${
          open ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 translate-x-4 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="flex items-start gap-3 p-4 bg-foreground text-background">
          <span className="flex items-center justify-center h-10 w-10 rounded-full bg-background text-foreground flex-shrink-0">
            <WhatsAppIcon className="h-5 w-5" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-[0.15em] opacity-70">Atendimento LOF</p>
            <p className="font-display text-base leading-tight mt-0.5">Fale com uma especialista</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fechar"
            className="text-background/70 hover:text-background transition-colors -mr-1 -mt-1 p-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Tire dúvidas sobre as linhas LOF e receba uma indicação personalizada para o seu cabelo.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 w-full h-11 bg-foreground text-background text-[11px] uppercase tracking-[0.15em] font-medium hover:bg-foreground/90 transition-colors rounded-full"
          >
            <MessageCircle className="h-4 w-4" />
            Iniciar conversa no WhatsApp
          </a>
          <p className="text-[10px] text-center text-muted-foreground">
            Resposta em poucos minutos · Seg a Sáb
          </p>
        </div>
      </div>
    </div>
  );
}
