import { center } from '@/lib/center';
import { getDictionary } from '@/lib/dictionary';
import { formatNumber, t } from '@/lib/i18n';
import type { Lang } from '@/lib/types';
import { Section, SectionHeader } from '../ui';

export function Steps({ lang }: { lang: Lang }) {
  const dict = getDictionary(lang);
  return (
    <Section id="how-it-works" labelledBy="steps-title">
      <SectionHeader id="steps-title" title={dict.steps.title} subtitle={dict.steps.subtitle} />
      <ol data-reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {center.steps.map((step, i) => (
          <li key={step.title.en} className="flex gap-4 rounded-card border border-border bg-card p-5 sm:block sm:p-6">
            <span
              aria-hidden
              className="grid size-10 shrink-0 place-items-center rounded-full border border-accent-edge bg-accent text-lg font-bold text-accent-fg"
            >
              {formatNumber(i + 1, lang)}
            </span>
            <div>
              <h3 className="text-lg font-semibold sm:mt-5">{t(step.title, lang)}</h3>
              <p className="mt-1.5 text-base text-muted sm:mt-2">{t(step.text, lang)}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
