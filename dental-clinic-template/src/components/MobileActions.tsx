import { Phone } from 'lucide-react';
import clinic from '@clinic';
import type { Lang } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import { telHref, waLink } from '@/lib/contact';
import { buttonClass } from './ui';
import { WhatsAppIcon } from './BrandIcons';

/** Floating WhatsApp button (all sizes) + Call/WhatsApp bar fixed to the bottom on phones. */
export function MobileActions({ lang }: { lang: Lang }) {
  const t = getDictionary(lang);
  const wa = waLink(t.whatsappMessages.general(clinic.name[lang]));

  return (
    <>
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.floatingWhatsApp}
        className="lift fixed end-4 bottom-[calc(var(--mobile-bar-h)+env(safe-area-inset-bottom)+0.75rem)] z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-lift md:end-6 md:bottom-6"
      >
        <WhatsAppIcon className="size-7" />
      </a>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
        <div className="grid h-[var(--mobile-bar-h)] grid-cols-2 gap-2.5 px-3 py-2.5">
          <a href={telHref()} className={buttonClass('secondary', 'md', 'h-full')}>
            <Phone className="size-5" strokeWidth={1.75} aria-hidden="true" />
            {t.call}
          </a>
          <a href={wa} target="_blank" rel="noopener noreferrer" className={buttonClass('primary', 'md', 'h-full')}>
            <WhatsAppIcon className="size-5" />
            {t.whatsapp}
          </a>
        </div>
      </div>
    </>
  );
}
