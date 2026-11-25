import { dict, lang, site, t } from '@/lib/site';
import { BookingForm } from '../BookingForm';
import { CallButton, PhoneText, Section, SectionTitle } from '../ui';

export function Booking() {
  return (
    <Section id="contact" labelledBy="contact-title" surface>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div>
          <SectionTitle id="contact-title">{dict.booking.title}</SectionTitle>
          <p className="mt-4 max-w-[40ch] text-lg">{dict.booking.intro}</p>
          <CallButton className="mt-8">
            {dict.callNow}
            <PhoneText number={site.booking.phone} className="font-display" />
          </CallButton>
        </div>
        <div className="rounded-card border border-line bg-bg p-5 sm:p-8">
          <BookingForm
            lang={lang}
            whatsapp={site.booking.whatsapp}
            problems={site.booking.problems.map(t)}
            branches={site.branches.map((b) => t(b.name))}
            brands={site.brands.map(t)}
          />
        </div>
      </div>
    </Section>
  );
}
