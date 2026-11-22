import { Award, Star, Stethoscope, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import clinic from '@clinic';
import type { Lang } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import { formatNumber, formatRating } from '@/lib/format';
import { cn, Container } from './ui';

export function TrustBar({ lang }: { lang: Lang }) {
  const t = getDictionary(lang);
  const { stats, rating } = clinic;

  const items: { icon: LucideIcon; value: string; label: string }[] = [
    { icon: Award, value: `${formatNumber(stats.yearsExperience, lang)}+`, label: t.stats.years(stats.yearsExperience) },
    { icon: Users, value: `${formatNumber(stats.patientsTreated, lang)}+`, label: t.stats.patients(stats.patientsTreated) },
    ...(rating ? [{ icon: Star, value: formatRating(rating.value, lang), label: t.stats.rating }] : []),
    { icon: Stethoscope, value: formatNumber(stats.specialists, lang), label: t.stats.specialists(stats.specialists) },
  ];

  return (
    <div className="relative z-10 -mt-14 md:-mt-16">
      <Container>
        <ul
          className={cn(
            'grid gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-soft',
            items.length === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-3',
          )}
        >
          {items.map(({ icon: IconCmp, value, label }) => (
            <li key={label} className="flex flex-col items-center gap-1 bg-card px-3 py-6 text-center md:py-7">
              <IconCmp className="mb-1 size-6 text-primary-ink" strokeWidth={1.75} aria-hidden="true" />
              <span className="text-2xl leading-tight font-semibold text-ink md:text-3xl">{value}</span>
              <span className="text-sm leading-snug text-muted md:text-[0.95rem]">{label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
