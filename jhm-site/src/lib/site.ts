import { existsSync } from 'node:fs';
import path from 'node:path';
import config from '@site';
import { getDictionary } from './dictionary';
import { waHref } from './phone';
import type { Branch, Lang, SiteConfig, Text, Weekday } from './types';

export const site: SiteConfig = config;
export const lang: Lang = site.lang;
export const dict = getDictionary(lang);

/** Text in the site's language (falls back to Arabic). */
export function t(text: Text): string {
  // Keep short titles on the same line as the name: "م. تامر", "د. أحمد", "Eng. Sam"
  return (text[lang] ?? text.ar).replace(/(^|\s)(م|د|أ|Eng|Dr)\.\s/g, '$1$2.\u00a0');
}

/* ── Phone numbers & links ─────────────────────────────────────────────── */

export { internationalDigits, telHref, waHref } from './phone';

export function bookingWhatsApp(message: string = dict.generalMessage): string {
  return waHref(site.booking.whatsapp, message);
}

export function branchWhatsApp(branch: Branch): string {
  return waHref(branch.whatsapp || branch.phone, dict.branchMessage(t(branch.name)));
}

export function directionsUrl(branch: Branch): string {
  if (branch.mapsUrl) return branch.mapsUrl;
  const query = `${site.mapsSearchName} ${t(branch.city)}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/* ── URLs ─────────────────────────────────────────────────────────────────── */

export function siteUrl(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
    '';
  return (site.siteUrl || fromEnv || 'http://localhost:3000').replace(/\/$/, '');
}

export function absoluteUrl(p: string): string {
  return `${siteUrl()}${p}`;
}

/* ── Opening hours ────────────────────────────────────────────────────────── */

const week: Weekday[] = ['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri'];

function orderedWeek(): Weekday[] {
  const i = week.indexOf(site.weekStartsOn);
  return [...week.slice(i), ...week.slice(0, i)];
}

function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  return new Intl.DateTimeFormat(lang === 'ar' ? 'ar-JO-u-nu-latn' : 'en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(2024, 0, 1, h, m)));
}

export type HoursRow = { days: string; hours: string; closed: boolean };

/** Groups consecutive days with the same hours: "السبت – الخميس · 9:00 ص – 6:30 م". */
export function hoursRows(): HoursRow[] {
  const rows: { from: Weekday; to: Weekday; key: string }[] = [];
  for (const day of orderedWeek()) {
    const h = site.hours[day];
    const key = h ? h.join('-') : 'closed';
    const last = rows.at(-1);
    if (last && last.key === key) last.to = day;
    else rows.push({ from: day, to: day, key });
  }
  return rows.map(({ from, to, key }) => {
    const h = site.hours[from];
    return {
      days: from === to ? dict.weekdays[from] : `${dict.weekdays[from]} – ${dict.weekdays[to]}`,
      hours: h ? `${formatTime(h[0])} – ${formatTime(h[1])}` : dict.branchesSection.closed,
      closed: key === 'closed',
    };
  });
}

const schemaDay: Record<Weekday, string> = {
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
    .filter((d) => site.hours[d])
    .map((d) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: schemaDay[d],
      opens: site.hours[d]![0],
      closes: site.hours[d]![1],
    }));
}

/* ── Config checks (stop the build with a clear message) ─────────────────── */

function validate(c: SiteConfig) {
  const problems: string[] = [];
  const phone = /^0\d{8,9}$|^\+?962\d{8,9}$/;
  if (!phone.test(c.booking.phone)) problems.push(`booking.phone "${c.booking.phone}" should look like 0792900099.`);
  if (!/^962\d{8,9}$/.test(c.booking.whatsapp)) {
    problems.push(`booking.whatsapp "${c.booking.whatsapp}" should be digits only, like 962792900099.`);
  }
  c.branches.forEach((b, i) => {
    if (!phone.test(b.phone)) problems.push(`branches[${i}].phone "${b.phone}" should look like 0792900099.`);
  });
  for (const [key, value] of Object.entries(c.colors)) {
    const list = Array.isArray(value) ? value : [value];
    if (!list.every((v) => /^#[0-9a-f]{6}$/i.test(v))) problems.push(`colors.${key} must be a 6-digit hex colour like #c9a24a.`);
  }
  const files = [c.images.logo, c.images.hero, c.images.team, ...c.images.gallery].map((p) => p.src);
  files.push(c.images.og, c.images.icon, c.images.appleIcon);
  for (const f of files) {
    if (!existsSync(path.join(process.cwd(), 'public', f))) problems.push(`Image not found: public${f}`);
  }
  if (problems.length) {
    throw new Error(`\n\nsite.config.ts has ${problems.length} problem(s):\n  - ${problems.join('\n  - ')}\n`);
  }
}

validate(site);
