import { ArrowRight, Info, MessageCircleQuestion } from 'lucide-react';
import clinic from '@clinic';
import type { Lang } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import { formatPrice } from '@/lib/format';
import { waLink } from '@/lib/contact';
import { Icon } from '@/lib/icons';
import { ButtonLink, Section, type Tone } from './ui';
import { WhatsAppIcon } from './BrandIcons';

export function Services({ lang, tone }: { lang: Lang; tone: Tone }) {
  const t = getDictionary(lang);
  const { items, showPrices, currency } = clinic.services;
  const name = clinic.name[lang];
  const anyPrice = showPrices && items.some((s) => s.priceFrom != null);

  return (
    <Section id="services" tone={tone} eyebrow={t.services.eyebrow} title={t.services.title} intro={t.services.intro}>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((service) => {
          const title = service.title[lang];
          return (
            <li key={service.id} className="card lift flex flex-col rounded-2xl border border-line bg-card p-5 shadow-soft sm:p-6">
              <div className="flex items-center gap-4 sm:block">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary-ink sm:mb-5">
                  <Icon name={service.icon} className="size-6" />
                </span>
                <h3 className="text-lg">{title}</h3>
              </div>
              <p className="mt-3 text-[0.975rem] text-muted sm:mt-2">{service.description[lang]}</p>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-1 pt-4 sm:flex-col sm:items-start sm:pt-5">
                {showPrices && service.priceFrom != null ? (
                  <p className="text-[0.975rem] font-semibold text-ink">
                    {t.services.from(formatPrice(service.priceFrom, currency[lang], lang))}
                  </p>
                ) : null}
                <a
                  href={waLink(t.whatsappMessages.service(name, title))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 self-start rounded-lg text-[0.975rem] font-semibold text-primary-ink underline-offset-4 hover:underline"
                >
                  {t.services.ask}
                  <span className="sr-only">: {title}</span>
                  <ArrowRight className="size-4 rtl:-scale-x-100" strokeWidth={2} aria-hidden="true" />
                </a>
              </div>
            </li>
          );
        })}

        <li className="flex flex-col rounded-2xl bg-primary-soft p-5 sm:p-6">
          <div className="flex items-center gap-4 sm:block">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-card text-primary-ink sm:mb-5">
              <MessageCircleQuestion className="size-6" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <h3 className="text-lg">{t.services.notSureTitle}</h3>
          </div>
          <p className="mt-3 text-[0.975rem] text-copy sm:mt-2">{t.services.notSureText}</p>
          <div className="mt-auto pt-5">
            <ButtonLink href={waLink(t.whatsappMessages.notSure(name))} external>
              <WhatsAppIcon className="size-[1.1rem]" />
              {t.services.notSureCta}
            </ButtonLink>
          </div>
        </li>
      </ul>

      {anyPrice ? (
        <p className="mx-auto mt-8 flex max-w-3xl items-start justify-center gap-2 text-center text-sm text-muted">
          <Info className="mt-0.5 size-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
          {t.services.priceNote}
        </p>
      ) : null}
    </Section>
  );
}
