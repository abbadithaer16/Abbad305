import config from '@center';
import { getDictionary } from './dictionary';
import { formatNumber, formatTime, t } from './i18n';
import { waLink } from './links';
import type { CarModel, CenterConfig, FaqItem, Lang, Localized, Service, Weekday } from './types';

export const center: CenterConfig = config;

/* ------------------------------------------------------------------------- */
/* Config checks: fail the build with a clear message instead of a broken page */
/* ------------------------------------------------------------------------- */

function validate(c: CenterConfig) {
  const problems: string[] = [];
  const serviceIds = new Set(c.services.map((s) => s.id));
  if (serviceIds.size !== c.services.length) problems.push('services: two services share the same id.');

  const slugs = new Set<string>();
  c.cars.forEach((car, i) => {
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(car.slug)) {
      problems.push(`cars[${i}].slug "${car.slug}" must be lowercase letters, numbers and dashes.`);
    }
    if (slugs.has(car.slug)) problems.push(`cars[${i}].slug "${car.slug}" is used twice.`);
    slugs.add(car.slug);
    car.services.forEach((id) => {
      if (!serviceIds.has(id)) problems.push(`cars[${i}] (${car.slug}) lists unknown service id "${id}".`);
    });
  });

  if (!/^\d{8,15}$/.test(c.contact.whatsapp)) {
    problems.push('contact.whatsapp must be digits only in international format, e.g. 962790000000.');
  }
  if (!/^\+?\d{6,15}$/.test(c.contact.phoneDial)) {
    problems.push('contact.phoneDial must look like +962790000000 (no spaces).');
  }
  if (c.siteUrl && !/^https?:\/\/[^/]+$/.test(c.siteUrl)) {
    problems.push('siteUrl must be like https://example.com (no trailing slash, no path).');
  }
  (Object.entries(c.hours) as [Weekday, CenterConfig['hours'][Weekday]][]).forEach(([day, h]) => {
    if (h && !h.every((v) => /^([01]\d|2[0-3]):[0-5]\d$/.test(v))) {
      problems.push(`hours.${day} must be ['HH:MM', 'HH:MM'] in 24h time, or null when closed.`);
    }
  });

  if (problems.length) {
    throw new Error(`\n\ncenter.config.ts has ${problems.length} problem(s):\n  - ${problems.join('\n  - ')}\n`);
  }
}

validate(center);

/* ------------------------------------------------------------------------- */
/* URLs                                                                       */
/* ------------------------------------------------------------------------- */

/** Public site URL without trailing slash. Falls back to the host's build env vars. */
export function siteUrl(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
    process.env.URL || // Netlify
    '';
  return (center.siteUrl || fromEnv || 'http://localhost:3000').replace(/\/$/, '');
}

export function homePath(lang: Lang): string {
  return `/${lang}/`;
}

export function carPath(lang: Lang, slug: string): string {
  return `/${lang}/cars/${slug}/`;
}

export function absoluteUrl(path: string): string {
  return `${siteUrl()}${path}`;
}

export function telHref(): string {
  return `tel:${center.contact.phoneDial}`;
}

export function whatsappHref(message?: string): string {
  return waLink(center.contact.whatsapp, message);
}

/* ------------------------------------------------------------------------- */
/* Content helpers                                                            */
/* ------------------------------------------------------------------------- */

export function carLabel(car: CarModel, lang: Lang): string {
  return car.label ? t(car.label, lang) : `${t(car.make, lang)} ${t(car.model, lang)}`;
}

const typeWordPattern = /hybrid|electric|\bev\b|هايبرد|هجين|كهربائ/i;

export function carH1(car: CarModel, lang: Lang): string {
  if (car.h1) return t(car.h1, lang);
  const dict = getDictionary(lang);
  const label = carLabel(car, lang);
  // Don't repeat the type when the name already says it ("Camry Hybrid", "Kona Electric").
  const typeWord = typeWordPattern.test(label) ? '' : dict.model.typeWord[car.type];
  return dict.model.h1(label, typeWord, t(center.city, lang)).replace(/\s+/g, ' ');
}

export function carMetaDescription(car: CarModel, lang: Lang): string {
  if (car.metaDescription) return t(car.metaDescription, lang);
  const dict = getDictionary(lang);
  const issues = car.commonIssues
    .slice(0, 2)
    .map((i) => t(i.title, lang))
    .join(lang === 'ar' ? '، ' : ', ');
  return dict.model.metaDescription(carLabel(car, lang), t(center.city, lang), issues);
}

export function findCar(slug: string): CarModel | undefined {
  return center.cars.find((c) => c.slug === slug);
}

export function servicesById(ids: string[]): Service[] {
  return ids.map((id) => center.services.find((s) => s.id === id)).filter((s): s is Service => Boolean(s));
}

export function visibleFaq(items: FaqItem[]): FaqItem[] {
  return items.filter((item) => !item.onlyIfPickup || center.pickup.enabled);
}

export function formatPrice(amount: number, lang: Lang): string {
  return `${formatNumber(amount, lang)} ${t(center.currency, lang)}`;
}

/** Unique makes for the booking form: makes from `cars`, then `booking.otherMakes`. */
export function bookingMakes(): Localized[] {
  const seen = new Set<string>();
  const list: Localized[] = [];
  for (const make of [...center.cars.map((c) => c.make), ...center.booking.otherMakes]) {
    if (seen.has(make.en)) continue;
    seen.add(make.en);
    list.push(make);
  }
  return list;
}

/* ------------------------------------------------------------------------- */
/* Opening hours                                                              */
/* ------------------------------------------------------------------------- */

const weekOrder: Weekday[] = ['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri'];

export function orderedWeek(): Weekday[] {
  const start = weekOrder.indexOf(center.weekStartsOn);
  return [...weekOrder.slice(start), ...weekOrder.slice(0, start)];
}

export function openDays(): Weekday[] {
  return orderedWeek().filter((d) => center.hours[d]);
}

export type HoursRow = { days: string; hours: string; closed: boolean };

/** Groups consecutive days with the same hours: "Saturday – Thursday · 8:30 AM – 6:00 PM". */
export function hoursRows(lang: Lang): HoursRow[] {
  const dict = getDictionary(lang);
  const days = orderedWeek();
  const rows: { from: Weekday; to: Weekday; value: string }[] = [];
  for (const day of days) {
    const h = center.hours[day];
    const value = h ? `${h[0]}-${h[1]}` : 'closed';
    const last = rows[rows.length - 1];
    if (last && last.value === value) last.to = day;
    else rows.push({ from: day, to: day, value });
  }
  return rows.map(({ from, to, value }) => {
    const h = center.hours[from];
    const dayText = from === to ? dict.weekdays[from] : `${dict.weekdays[from]} – ${dict.weekdays[to]}`;
    return {
      days: dayText,
      hours: h ? `${formatTime(h[0], lang)} – ${formatTime(h[1], lang)}` : dict.location.closed,
      closed: value === 'closed',
    };
  });
}

const schemaDays: Record<Weekday, string> = {
  sat: 'Saturday',
  sun: 'Sunday',
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
};

export function openingHoursSpecification() {
  return orderedWeek()
    .filter((d) => center.hours[d])
    .map((d) => {
      const [opens, closes] = center.hours[d]!;
      return { '@type': 'OpeningHoursSpecification', dayOfWeek: schemaDays[d], opens, closes };
    });
}
