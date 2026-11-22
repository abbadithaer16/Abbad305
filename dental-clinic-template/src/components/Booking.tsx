import { Phone } from 'lucide-react';
import clinic from '@clinic';
import type { Lang } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import { openDays } from '@/lib/format';
import { telHref } from '@/lib/contact';
import { cn, Container, Ltr, type Tone } from './ui';
import { BookingForm } from './BookingForm';

export function Booking({ lang, tone }: { lang: Lang; tone: Tone }) {
  const t = getDictionary(lang);
  const b = t.booking;
  const name = clinic.name[lang];

  const services = [
    { value: 'general', label: b.serviceGeneral },
    ...clinic.services.items.map((s) => ({ value: s.id, label: s.title[lang] })),
  ];
  const days = [{ value: 'any', label: b.anyDay }, ...openDays(clinic.hours).map((d) => ({ value: d, label: t.days[d] }))];
  const times = (['any', 'morning', 'afternoon', 'evening'] as const).map((k) => ({ value: k, label: b.times[k] }));
  const m = t.whatsappMessages.booking;

  return (
    <section
      id="booking"
      aria-labelledby="booking-title"
      className={cn('cv-auto py-16 md:py-24', tone === 'surface' ? 'bg-surface' : 'bg-bg')}
    >
      <Container>
        <div data-reveal className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5 lg:pt-4">
            <p className="mb-3 text-sm font-semibold tracking-wide text-primary-ink">{b.eyebrow}</p>
            <h2 id="booking-title" className="text-[1.75rem] md:text-4xl">
              {b.title}
            </h2>
            <p className="mt-4 text-muted">{b.intro}</p>

            <div className="mt-8 border-t border-line pt-8">
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary-ink">
                  <Phone className="size-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[0.95rem] text-muted">{b.preferCall}</p>
                  <a href={telHref()} className="text-lg font-semibold text-ink underline-offset-4 hover:underline">
                    <Ltr>{clinic.contact.phone}</Ltr>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-card p-6 shadow-lift sm:p-8 lg:col-span-7">
            <BookingForm
              whatsappNumber={clinic.contact.whatsapp.replace(/\D/g, '')}
              services={services}
              days={days}
              times={times}
              labels={{
                name: b.name,
                phone: b.phone,
                phonePlaceholder: b.phonePlaceholder,
                service: b.service,
                day: b.day,
                time: b.time,
                required: b.required,
                submit: b.submit,
                privacy: b.privacy,
                errName: b.errName,
                errPhone: b.errPhone,
                sent: b.sent,
                sentFallback: b.sentFallback,
                sentLink: b.sentLink,
                msg: {
                  greeting: m.greeting(name),
                  name: m.name,
                  phone: m.phone,
                  service: m.service,
                  day: m.day,
                  time: m.time,
                },
              }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
