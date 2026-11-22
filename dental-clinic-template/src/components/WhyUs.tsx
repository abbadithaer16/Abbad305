import clinic from '@clinic';
import type { Lang } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import { Icon } from '@/lib/icons';
import { Section, type Tone } from './ui';

export function WhyUs({ lang, tone }: { lang: Lang; tone: Tone }) {
  const t = getDictionary(lang);
  return (
    <Section id="why" tone={tone} eyebrow={t.why.eyebrow} title={t.why.title}>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {clinic.whyUs.map((item) => (
          <li key={item.title.en} className="card lift flex gap-4 rounded-2xl border border-line bg-card p-5 shadow-soft sm:block sm:p-6">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary-ink sm:mb-5">
              <Icon name={item.icon} className="size-6" />
            </span>
            <div>
              <h3 className="text-lg">{item.title[lang]}</h3>
              <p className="mt-1 text-[0.975rem] text-muted sm:mt-2">{item.text[lang]}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
