import { Clock, ShieldCheck, Star } from 'lucide-react';
import { center } from '@/lib/center';
import { getDictionary } from '@/lib/dictionary';
import { formatNumber, formatRating, t } from '@/lib/i18n';
import type { Lang } from '@/lib/types';
import { CallButton, PhotoBox, WhatsAppButton } from '../ui';

export function Hero({ lang }: { lang: Lang }) {
  const dict = getDictionary(lang);
  const { rating, reviewCount } = center.google;

  return (
    <section className="border-b border-border bg-surface">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-8 md:py-16 lg:gap-14 lg:py-20">
        <div>
          <h1 className="text-[2.15rem] font-bold sm:text-5xl md:text-[2.6rem] lg:text-[3.25rem] ltr:tracking-tight">
            {t(center.hero.headline, lang)}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted md:text-xl">{t(center.hero.subtext, lang)}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <WhatsAppButton lang={lang} className="min-h-14 px-6 text-lg" />
            <CallButton lang={lang} className="min-h-14 px-6 text-lg" />
          </div>

          <ul className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px] text-muted">
            {rating ? (
              <li className="flex items-center gap-1.5">
                <Star aria-hidden className="size-4 fill-[#f5a623] text-[#c27c0e]" strokeWidth={1.5} />
                <span>
                  <strong className="font-semibold text-fg">{formatRating(rating, lang)}</strong> {dict.googleRating}
                  {reviewCount ? ` (${dict.reviewsCount(formatNumber(reviewCount, lang))})` : ''}
                </span>
              </li>
            ) : null}
            <li className="flex items-center gap-1.5">
              <Clock aria-hidden className="size-4 text-accent-text" />
              <span>{dict.yearsExperience(formatNumber(center.stats.yearsExperience, lang))}</span>
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck aria-hidden className="size-4 text-accent-text" />
              <span>{t(center.warranty.short, lang)} · {dict.trust.warranty}</span>
            </li>
          </ul>
        </div>

        <PhotoBox
          photo={center.hero.photo}
          lang={lang}
          width={1600}
          height={1200}
          sizes="(min-width: 1024px) 540px, (min-width: 768px) 45vw, 100vw"
          preload
        />
      </div>
    </section>
  );
}
