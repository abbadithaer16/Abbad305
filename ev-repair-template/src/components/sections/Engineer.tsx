import { BadgeCheck } from 'lucide-react';
import { center } from '@/lib/center';
import { getDictionary } from '@/lib/dictionary';
import { formatNumber, t } from '@/lib/i18n';
import type { Lang } from '@/lib/types';
import { PhotoBox, Section } from '../ui';

export function Engineer({ lang }: { lang: Lang }) {
  const dict = getDictionary(lang);
  const { engineer } = center;

  return (
    <Section id="engineer" tone="surface" labelledBy="engineer-title">
      <div
        data-reveal
        className="grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-center lg:gap-16"
      >
        <PhotoBox
          photo={engineer.photo}
          lang={lang}
          width={800}
          height={1000}
          sizes="(min-width: 768px) 420px, 100vw"
          className="mx-auto w-full max-w-sm md:max-w-none"
        />
        <div>
          <h2 id="engineer-title" className="text-3xl font-bold md:text-4xl ltr:tracking-tight">
            {dict.engineer.title}
          </h2>
          <p className="mt-6 text-2xl font-bold">{t(engineer.name, lang)}</p>
          <p className="mt-1 text-lg text-muted">
            {t(engineer.role, lang)} · {dict.engineer.experience(formatNumber(engineer.yearsExperience, lang))}
          </p>

          <h3 className="mt-7 text-base font-semibold">{dict.engineer.specialties}</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {engineer.specialties.map((s) => (
              <li
                key={s.en}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-[15px] font-semibold"
              >
                <BadgeCheck aria-hidden className="size-4 text-accent-text" />
                {t(s, lang)}
              </li>
            ))}
          </ul>

          <blockquote className="mt-7 border-s-4 border-accent-edge ps-5 text-lg">
            <p>{t(engineer.note, lang)}</p>
          </blockquote>
        </div>
      </div>
    </Section>
  );
}
