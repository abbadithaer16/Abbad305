import { dict, site, t } from '@/lib/site';
import { Section, SectionTitle } from '../ui';

export function Steps() {
  return (
    <Section labelledBy="steps-title" className="border-t border-line">
      <SectionTitle id="steps-title">{dict.steps.title}</SectionTitle>
      <ol className="mt-10 grid gap-0 lg:grid-cols-4 lg:gap-6">
        {site.steps.map((step, i) => (
          <li
            key={step.ar}
            className="relative flex items-center gap-4 pb-8 last:pb-0 before:absolute before:start-[1.375rem] before:top-12 before:bottom-1 before:w-px before:bg-line last:before:hidden lg:block lg:pb-0 lg:before:start-14 lg:before:end-0 lg:before:top-[1.375rem] lg:before:bottom-auto lg:before:h-px lg:before:w-auto"
          >
            <span
              aria-hidden
              className="grid size-11 shrink-0 place-items-center rounded-full border border-gold font-display text-lg font-bold text-gold"
            >
              {i + 1}
            </span>
            <h3 className="text-lg font-semibold md:text-xl lg:mt-5">{t(step)}</h3>
          </li>
        ))}
      </ol>
    </Section>
  );
}
