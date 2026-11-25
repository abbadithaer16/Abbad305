import { Clock } from 'lucide-react';
import { bookingMakes, center, openDays } from '@/lib/center';
import { getDictionary } from '@/lib/dictionary';
import { t } from '@/lib/i18n';
import type { CarModel, Lang } from '@/lib/types';
import { BookingForm } from '../BookingForm';
import { CallButton, PhoneNumber, Section, WhatsAppButton } from '../ui';
import { HoursList } from './Location';

export function Booking({ lang, car }: { lang: Lang; car?: CarModel }) {
  const dict = getDictionary(lang);
  const makes = bookingMakes().map((m) => ({ value: m.en, label: t(m, lang) }));
  const models: Record<string, string[]> = {};
  for (const c of center.cars) {
    (models[c.make.en] ??= []).push(t(c.model, lang));
  }
  const days = openDays().map((d) => ({ value: d, label: dict.weekdays[d] }));

  return (
    <Section id="book" labelledBy="book-title">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
        <div data-reveal>
          <h2 id="book-title" className="text-3xl font-bold md:text-4xl ltr:tracking-tight">
            {dict.booking.title}
          </h2>
          <p className="mt-3 text-lg text-muted">{dict.booking.intro}</p>

          <div className="mt-8 grid gap-3 sm:max-w-sm">
            <WhatsAppButton lang={lang} variant="secondary" />
            <CallButton lang={lang}>
              {dict.call} <PhoneNumber />
            </CallButton>
          </div>

          <div className="mt-8 rounded-card border border-border bg-surface p-5 sm:max-w-sm">
            <p className="flex items-center gap-2 font-semibold">
              <Clock aria-hidden className="size-5 text-accent-text" />
              {dict.location.hours}
            </p>
            <HoursList lang={lang} className="mt-2 text-[15px]" />
          </div>
        </div>

        <div data-reveal className="rounded-card border border-border bg-card p-5 shadow-card sm:p-7 md:p-8">
          <BookingForm
            lang={lang}
            whatsapp={center.contact.whatsapp}
            makes={makes}
            models={models}
            days={days}
            pickupEnabled={center.pickup.enabled}
            defaultMake={car?.make.en}
            defaultModel={car ? t(car.model, lang) : undefined}
          />
        </div>
      </div>
    </Section>
  );
}
