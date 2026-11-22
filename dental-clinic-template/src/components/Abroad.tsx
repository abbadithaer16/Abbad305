import { CircleCheck, Hotel, Plane } from 'lucide-react';
import clinic from '@clinic';
import type { Lang } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import { waLink } from '@/lib/contact';
import { ButtonLink, Section, type Tone } from './ui';
import { WhatsAppIcon } from './BrandIcons';

export function Abroad({ lang, tone }: { lang: Lang; tone: Tone }) {
  const t = getDictionary(lang);
  const { abroad } = clinic;

  return (
    <Section id="abroad" tone={tone} eyebrow={t.abroad.eyebrow} title={t.abroad.title} intro={abroad.intro[lang]}>
      <div className="grid items-start gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-line bg-card p-6 shadow-soft md:p-8">
            <h3 className="mb-5 flex items-center gap-2.5 text-xl">
              <Plane className="size-5 text-primary-ink rtl:-scale-x-100" strokeWidth={1.75} aria-hidden="true" />
              {t.abroad.help}
            </h3>
            <ul className="grid gap-3">
              {abroad.help.map((item) => (
                <li key={item.en} className="flex items-start gap-3">
                  <CircleCheck className="mt-1 size-5 shrink-0 text-primary-ink" strokeWidth={1.75} aria-hidden="true" />
                  <span>{item[lang]}</span>
                </li>
              ))}
            </ul>
            <ButtonLink href={waLink(t.whatsappMessages.abroad(clinic.name[lang]))} external size="lg" className="mt-7 w-full sm:w-auto">
              <WhatsAppIcon className="size-5" />
              {t.abroad.cta}
            </ButtonLink>
          </div>

          {abroad.hotels.length ? (
            <div className="rounded-2xl border border-line bg-card p-6 shadow-soft md:p-8">
              <h3 className="mb-5 flex items-center gap-2.5 text-xl">
                <Hotel className="size-5 text-primary-ink" strokeWidth={1.75} aria-hidden="true" />
                {t.abroad.hotels}
              </h3>
              <ul className="divide-y divide-line">
                {abroad.hotels.map((hotel) => (
                  <li key={hotel.name.en} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3 first:pt-0 last:pb-0">
                    <span className="font-medium text-ink">{hotel.name[lang]}</span>
                    <span className="text-[0.95rem] text-muted">{hotel.note[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="rounded-2xl border border-line bg-card p-6 shadow-soft md:p-8">
          <h3 className="mb-6 text-xl">{t.abroad.timeline}</h3>
          <ol className="grid gap-0">
            {abroad.timeline.map((step, i) => (
              <li key={step.title.en} className="relative flex gap-4 pb-7 last:pb-0">
                {i < abroad.timeline.length - 1 ? (
                  <span aria-hidden="true" className="absolute start-[1.1875rem] top-11 bottom-1 w-px bg-line" />
                ) : null}
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-soft font-semibold text-primary-ink">
                  {i + 1}
                </span>
                <div className="pt-1.5">
                  <p className="font-semibold text-ink">{step.title[lang]}</p>
                  <p className="mt-1 text-[0.975rem] text-muted">{step.text[lang]}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
