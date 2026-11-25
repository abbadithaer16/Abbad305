import { Clock, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';
import { branchWhatsApp, dict, directionsUrl, site, t, telHref } from '@/lib/site';
import { PhoneText, Section, SectionTitle } from '../ui';
import { HoursList } from './Hours';

export function Branches() {
  const s = dict.branchesSection;
  return (
    <Section id="branches" labelledBy="branches-title">
      <SectionTitle id="branches-title">{s.title}</SectionTitle>
      <div className="mt-6 flex flex-col gap-3 rounded-card border border-gold/40 px-5 py-4 sm:flex-row sm:items-center sm:gap-8 md:px-6">
        <h3 className="flex shrink-0 items-center gap-2 text-lg font-bold">
          <Clock aria-hidden className="size-5 text-gold" />
          {s.hours}
        </h3>
        <HoursList className="text-base sm:flex sm:flex-wrap sm:gap-x-10" inline />
      </div>

      <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:gap-5">
        {site.branches.map((branch) => {
          const name = t(branch.name);
          const address = branch.address ? t(branch.address) : '';
          return (
            <li key={branch.phone} className="flex flex-col rounded-card border border-line bg-surface p-5 md:p-6">
              <h3 className="text-xl font-bold">{name}</h3>
              {address ? (
                <p className="mt-1 flex items-start gap-1.5 text-base text-muted">
                  <MapPin aria-hidden className="mt-1.5 size-4 shrink-0" />
                  {address}
                </p>
              ) : null}
              <a href={telHref(branch.phone)} className="mt-2 self-start font-display text-2xl font-bold text-fg hover:text-gold">
                <PhoneText number={branch.phone} />
              </a>
              <div className="mt-5 grid grid-cols-3 gap-2">
                <a href={telHref(branch.phone)} className="btn btn-line min-h-11 gap-1.5 px-2 text-[0.95rem]">
                  <Phone aria-hidden className="size-4 shrink-0" />
                  {dict.call}
                  <span className="sr-only"> – {name}</span>
                </a>
                <a href={branchWhatsApp(branch)} target="_blank" rel="noopener" className="btn btn-gold min-h-11 gap-1.5 px-2 text-[0.95rem]">
                  <MessageCircle aria-hidden className="size-4 shrink-0" />
                  {dict.whatsapp}
                  <span className="sr-only"> – {name}</span>
                </a>
                <a href={directionsUrl(branch)} target="_blank" rel="noopener" className="btn btn-line min-h-11 gap-1.5 px-2 text-[0.95rem]">
                  <Navigation aria-hidden className="size-4 shrink-0" />
                  {dict.directions}
                  <span className="sr-only"> – {name}</span>
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
