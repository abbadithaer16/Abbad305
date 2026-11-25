import { Check, Clock, Tag } from 'lucide-react';
import { center, formatPrice } from '@/lib/center';
import { getDictionary } from '@/lib/dictionary';
import { t } from '@/lib/i18n';
import type { Lang } from '@/lib/types';
import { WhatsAppButton } from '../ui';

export function Offer({ lang }: { lang: Lang }) {
  const dict = getDictionary(lang);
  const { offer } = center;

  return (
    <section aria-labelledby="offer-title" className="bg-band text-band-fg">
      <div
        data-reveal
        className="container-page grid gap-8 py-12 md:py-14 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-14"
      >
        <div>
          <p className="text-[15px] font-semibold text-band-accent">{dict.offer.eyebrow}</p>
          <h2 id="offer-title" className="mt-2 text-3xl font-bold md:text-4xl ltr:tracking-tight">
            {t(offer.title, lang)}
          </h2>
          <p className="mt-3 max-w-xl text-lg text-band-muted">{t(offer.description, lang)}</p>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            <li className="flex items-center gap-2">
              <Clock aria-hidden className="size-5 text-band-accent" />
              <span>
                {dict.offer.duration}: <strong className="font-semibold">{t(offer.duration, lang)}</strong>
              </span>
            </li>
            {center.showPrices && offer.priceFrom ? (
              <li className="flex items-center gap-2">
                <Tag aria-hidden className="size-5 text-band-accent" />
                <strong className="font-semibold">{dict.priceFrom(formatPrice(offer.priceFrom, lang))}</strong>
              </li>
            ) : null}
          </ul>
          <WhatsAppButton
            lang={lang}
            variant="band"
            message={t(offer.whatsappMessage, lang)}
            className="mt-7 min-h-14 w-full px-6 text-lg sm:w-auto"
          >
            {dict.offer.cta}
          </WhatsAppButton>
        </div>

        <div className="rounded-card border border-white/15 bg-white/5 p-6 md:p-7">
          <h3 className="text-lg font-semibold">{dict.offer.includes}</h3>
          <ul className="mt-4 grid gap-3">
            {offer.includes.map((item) => (
              <li key={item.en} className="flex items-start gap-3">
                <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-band-accent text-band-accent-fg">
                  <Check aria-hidden className="size-3.5" strokeWidth={3} />
                </span>
                <span>{t(item, lang)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
