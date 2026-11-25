import { Car, Clock, ShieldCheck, Star } from 'lucide-react';
import { center } from '@/lib/center';
import { getDictionary } from '@/lib/dictionary';
import { formatNumber, formatRating, t } from '@/lib/i18n';
import type { Lang } from '@/lib/types';

export function TrustBar({ lang }: { lang: Lang }) {
  const dict = getDictionary(lang);
  const items = [
    { icon: Clock, value: `${formatNumber(center.stats.yearsExperience, lang)}+`, label: dict.trust.years },
    { icon: Car, value: `${formatNumber(center.stats.carsServiced, lang)}+`, label: dict.trust.cars },
    center.google.rating
      ? { icon: Star, value: dict.ratingOutOf5(formatRating(center.google.rating, lang)), label: dict.trust.rating }
      : null,
    { icon: ShieldCheck, value: t(center.warranty.short, lang), label: dict.trust.warranty },
  ].filter((i): i is NonNullable<typeof i> => Boolean(i));

  return (
    <section aria-label={dict.trust.title} className="border-b border-border bg-bg">
      <ul
        data-reveal
        className="container-page grid grid-cols-2 gap-x-4 gap-y-6 py-8 md:py-10 lg:grid-cols-4"
      >
        {items.map(({ icon: Icon, value, label }) => (
          <li key={label} className="flex items-center gap-3 sm:gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-text sm:size-12">
              <Icon aria-hidden className="size-5 sm:size-6" />
            </span>
            <p className="flex min-w-0 flex-col">
              <strong className="text-xl font-bold sm:text-2xl">{value}</strong>
              <span className="text-[15px] leading-snug text-muted">{label}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
