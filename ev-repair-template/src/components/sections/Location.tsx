import { Clock, MapPin, Navigation, Truck } from 'lucide-react';
import { center, hoursRows } from '@/lib/center';
import { getDictionary } from '@/lib/dictionary';
import { t } from '@/lib/i18n';
import { cn } from '@/lib/links';
import type { Lang } from '@/lib/types';
import { CallButton, Section, SectionHeader, WhatsAppButton } from '../ui';

export function HoursList({ lang, className }: { lang: Lang; className?: string }) {
  return (
    <dl className={cn('grid gap-1.5', className)}>
      {hoursRows(lang).map((row) => (
        <div key={row.days} className="flex flex-wrap justify-between gap-x-4">
          <dt>{row.days}</dt>
          <dd className={cn('font-semibold', row.closed && 'opacity-80')}>{row.hours}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Location({ lang }: { lang: Lang }) {
  const dict = getDictionary(lang);
  const name = t(center.name, lang);

  return (
    <Section id="location" tone="surface" labelledBy="location-title">
      <SectionHeader id="location-title" title={dict.location.title} />
      <div data-reveal className="grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:gap-8">
        <div className="relative min-h-[18rem] overflow-hidden rounded-card border border-border bg-placeholder sm:min-h-[22rem]">
          {center.location.mapsEmbedUrl ? (
            <iframe
              src={center.location.mapsEmbedUrl}
              title={dict.location.mapTitle(name)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full border-0"
            />
          ) : null}
        </div>

        <div className="rounded-card border border-border bg-card p-6 md:p-8">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <MapPin aria-hidden className="size-5 text-accent-text" />
            {dict.location.address}
          </h3>
          <address className="mt-2 text-base not-italic text-muted">{t(center.location.address, lang)}</address>

          <h3 className="mt-6 flex items-center gap-2 text-lg font-semibold">
            <Clock aria-hidden className="size-5 text-accent-text" />
            {dict.location.hours}
          </h3>
          <HoursList lang={lang} className="mt-2 text-base" />

          {center.pickup.enabled ? (
            <>
              <h3 className="mt-6 flex items-center gap-2 text-lg font-semibold">
                <Truck aria-hidden className="size-5 text-accent-text" />
                {dict.location.pickup}
              </h3>
              <p className="mt-2 text-base text-muted">{t(center.pickup.text, lang)}</p>
            </>
          ) : null}

          <div className="mt-7 grid gap-3">
            <a
              href={center.location.directionsUrl}
              target="_blank"
              rel="noopener"
              className="btn btn-primary"
            >
              <Navigation aria-hidden className="size-5" />
              {dict.getDirections}
            </a>
            <div className="grid grid-cols-2 gap-3">
              <CallButton lang={lang}>{dict.call}</CallButton>
              <WhatsAppButton lang={lang} variant="secondary">
                {dict.whatsapp}
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
