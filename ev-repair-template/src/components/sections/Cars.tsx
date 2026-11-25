import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { carLabel, carPath, center, whatsappHref } from '@/lib/center';
import { getDictionary } from '@/lib/dictionary';
import { t } from '@/lib/i18n';
import type { CarModel, Lang } from '@/lib/types';
import { Section, SectionHeader } from '../ui';

export function CarChips({ lang, cars }: { lang: Lang; cars: CarModel[] }) {
  const dict = getDictionary(lang);
  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
      {cars.map((car) => (
        <li key={car.slug}>
          <Link
            href={carPath(lang, car.slug)}
            className="lift flex h-full min-h-16 items-center justify-between gap-2 rounded-chip border border-border bg-card px-4 py-3 sm:px-5"
          >
            <span className="min-w-0">
              <span className="block font-semibold leading-snug">{carLabel(car, lang)}</span>
              <span className="block text-sm text-muted">{dict.cars.type[car.type]}</span>
            </span>
            <ChevronRight aria-hidden className="size-5 shrink-0 text-accent-text rtl:-scale-x-100" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Cars({ lang }: { lang: Lang }) {
  const dict = getDictionary(lang);
  return (
    <Section id="cars" tone="surface" labelledBy="cars-title">
      <SectionHeader id="cars-title" title={dict.cars.title} subtitle={dict.cars.subtitle} />
      <div data-reveal>
        <CarChips lang={lang} cars={center.cars} />
        <p className="mt-6 text-base text-muted">
          <a
            href={whatsappHref(t(center.whatsappMessage, lang))}
            target="_blank"
            rel="noopener"
            className="font-semibold text-accent-text underline underline-offset-4"
          >
            {dict.cars.notListed}
          </a>
        </p>
      </div>
    </Section>
  );
}
