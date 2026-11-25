import { MessageCircle, Navigation, Phone } from 'lucide-react';
import { center, telHref, whatsappHref } from '@/lib/center';
import { getDictionary } from '@/lib/dictionary';
import type { Lang } from '@/lib/types';

/** Always-visible Call / WhatsApp / Directions bar on phones and tablets. */
export function MobileActionBar({ lang, whatsappMessage }: { lang: Lang; whatsappMessage: string }) {
  const dict = getDictionary(lang);
  const itemClass = 'btn min-h-12 gap-1.5 px-2 text-[15px]';
  return (
    <nav
      aria-label={dict.call + ' / ' + dict.whatsapp + ' / ' + dict.directions}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
    >
      <div className="mx-auto grid max-w-xl grid-cols-3 gap-2 p-2">
        <a href={telHref()} className={`${itemClass} btn-secondary`}>
          <Phone aria-hidden className="size-5" />
          {dict.call}
        </a>
        <a href={whatsappHref(whatsappMessage)} target="_blank" rel="noopener" className={`${itemClass} btn-primary`}>
          <MessageCircle aria-hidden className="size-5" />
          {dict.whatsapp}
        </a>
        <a href={center.location.directionsUrl} target="_blank" rel="noopener" className={`${itemClass} btn-secondary`}>
          <Navigation aria-hidden className="size-5" />
          {dict.directions}
        </a>
      </div>
    </nav>
  );
}
