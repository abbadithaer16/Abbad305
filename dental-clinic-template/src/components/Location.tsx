import { CircleParking, Clock, MapPin, Navigation, Phone } from 'lucide-react';
import clinic from '@clinic';
import type { Lang } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import { groupHours } from '@/lib/format';
import { telHref, waLink } from '@/lib/contact';
import { ButtonLink, cn, Ltr, Section, type Tone } from './ui';
import { WhatsAppIcon } from './BrandIcons';

export function Location({ lang, tone }: { lang: Lang; tone: Tone }) {
  const t = getDictionary(lang);
  const { location, contact } = clinic;
  const hours = groupHours(clinic.hours, lang);

  return (
    <Section id="location" tone={tone} eyebrow={t.location.eyebrow} title={t.location.title}>
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-placeholder shadow-soft sm:aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:min-h-[28rem]">
          <iframe
            src={location.mapsEmbedUrl}
            title={t.location.mapTitle}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
        </div>

        <div className="flex flex-col gap-7 rounded-2xl border border-line bg-card p-6 shadow-soft md:p-8 lg:col-span-5">
          <div>
            <h3 className="mb-2 flex items-center gap-2.5 text-lg">
              <MapPin className="size-5 text-primary-ink" strokeWidth={1.75} aria-hidden="true" />
              {t.location.address}
            </h3>
            <address className="not-italic">
              {location.address[lang]}
              <br />
              {location.area[lang]}
              {lang === 'ar' ? '، ' : ', '}
              {location.city[lang]}
            </address>
            <a
              href={location.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex min-h-11 items-center gap-1.5 rounded-lg font-semibold text-primary-ink underline-offset-4 hover:underline"
            >
              <Navigation className="size-4 rtl:-scale-x-100" strokeWidth={2} aria-hidden="true" />
              {t.location.directions}
            </a>
          </div>

          <div>
            <h3 className="mb-3 flex items-center gap-2.5 text-lg">
              <Clock className="size-5 text-primary-ink" strokeWidth={1.75} aria-hidden="true" />
              {t.location.hours}
            </h3>
            <dl className="grid gap-2">
              {hours.map((g) => (
                <div key={g.label} className="flex flex-wrap justify-between gap-x-4 border-b border-line pb-2 last:border-0 last:pb-0">
                  <dt className="font-medium text-ink">{g.label}</dt>
                  <dd className={cn(g.closed ? 'text-muted' : 'text-copy')}>{g.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {location.parkingNote ? (
            <div>
              <h3 className="mb-2 flex items-center gap-2.5 text-lg">
                <CircleParking className="size-5 text-primary-ink" strokeWidth={1.75} aria-hidden="true" />
                {t.location.parking}
              </h3>
              <p>{location.parkingNote[lang]}</p>
            </div>
          ) : null}

          <div className="mt-auto grid gap-3 sm:grid-cols-2">
            <ButtonLink href={telHref()} variant="secondary">
              <Phone className="size-[1.1rem]" strokeWidth={1.75} aria-hidden="true" />
              <Ltr>{contact.phone}</Ltr>
            </ButtonLink>
            <ButtonLink href={waLink(t.whatsappMessages.general(clinic.name[lang]))} external>
              <WhatsAppIcon className="size-[1.1rem]" />
              {t.whatsapp}
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
