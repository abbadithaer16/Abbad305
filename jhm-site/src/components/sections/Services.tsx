import { BatteryCharging, Car, Cog, Cpu, Droplet, Gauge, MessageCircle, ScanSearch, Wrench, type LucideIcon } from 'lucide-react';
import { bookingWhatsApp, dict, site, t } from '@/lib/site';
import type { ServiceIcon } from '@/lib/types';
import { HexFrame } from '../Hex';
import { Section, SectionTitle } from '../ui';

const icons: Record<ServiceIcon, LucideIcon> = {
  battery: BatteryCharging,
  scan: ScanSearch,
  chip: Cpu,
  parts: Cog,
  oil: Droplet,
  wrench: Wrench,
  gauge: Gauge,
  car: Car,
};

export function Services() {
  return (
    <Section id="services" labelledBy="services-title" surface>
      <SectionTitle id="services-title">{dict.services.title}</SectionTitle>
      <ul className="mt-8 grid gap-x-10 sm:grid-cols-2 md:mt-10 lg:grid-cols-3">
        {site.services.map((service) => {
          const Icon = icons[service.icon];
          const title = t(service.title);
          return (
            <li key={title} className="flex items-center gap-4 border-t border-line py-6">
              <HexFrame thin className="w-[4.5rem]">
                <Icon aria-hidden className="size-6 text-gold" strokeWidth={1.75} />
              </HexFrame>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold md:text-xl">{title}</h3>
                {service.description ? <p className="mt-1 text-base text-muted">{t(service.description)}</p> : null}
                <a
                  href={bookingWhatsApp(dict.serviceMessage(title))}
                  target="_blank"
                  rel="noopener"
                  className="mt-1.5 inline-flex min-h-10 items-center gap-1.5 text-base font-semibold text-gold underline-offset-4 hover:underline"
                >
                  <MessageCircle aria-hidden className="size-4" />
                  {dict.services.ask}
                  <span className="sr-only">: {title}</span>
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
