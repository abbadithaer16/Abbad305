import { ArrowRight } from 'lucide-react';
import { center, formatPrice, whatsappHref } from '@/lib/center';
import { getDictionary } from '@/lib/dictionary';
import { t } from '@/lib/i18n';
import { serviceIcons } from '@/lib/icons';
import type { Lang, Service } from '@/lib/types';
import { Section, SectionHeader } from '../ui';

export function ServiceCard({ service, lang, headingLevel = 3 }: { service: Service; lang: Lang; headingLevel?: 2 | 3 }) {
  const dict = getDictionary(lang);
  const Icon = serviceIcons[service.icon];
  const title = t(service.title, lang);
  const Heading = headingLevel === 2 ? 'h2' : 'h3';

  return (
    <article className="lift flex flex-col rounded-card border border-border bg-card p-5 sm:p-6">
      <span className="grid size-12 place-items-center rounded-chip bg-accent-soft text-accent-text">
        <Icon aria-hidden className="size-6" />
      </span>
      <Heading className="mt-4 text-lg font-semibold sm:mt-5">{title}</Heading>
      <p className="mt-2 flex-1 text-base text-muted">{t(service.description, lang)}</p>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4">
        {center.showPrices && service.priceFrom ? (
          <p className="text-base font-semibold">{dict.priceFrom(formatPrice(service.priceFrom, lang))}</p>
        ) : null}
        <a
          href={whatsappHref(dict.services.message(title))}
          target="_blank"
          rel="noopener"
          className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-accent-text underline-offset-4 hover:underline"
        >
          {dict.services.askShort}
          <span className="sr-only">: {title}</span>
          <ArrowRight aria-hidden className="size-4 rtl:-scale-x-100" />
        </a>
      </div>
    </article>
  );
}

export function Services({ lang }: { lang: Lang }) {
  const dict = getDictionary(lang);
  return (
    <Section id="services" labelledBy="services-title">
      <SectionHeader id="services-title" title={dict.services.title} subtitle={dict.services.subtitle} />
      <div data-reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {center.services.map((service) => (
          <ServiceCard key={service.id} service={service} lang={lang} />
        ))}
      </div>
    </Section>
  );
}
