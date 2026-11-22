import type { DayKey, Lang, OpeningHours } from './types';
import { getDictionary } from './i18n';

/** Latin digits in both languages — the norm for prices, phones and times in Jordan. */
const locale = (lang: Lang) => (lang === 'ar' ? 'ar-JO-u-nu-latn' : 'en-US');

export const formatNumber = (n: number, lang: Lang) => new Intl.NumberFormat(locale(lang)).format(n);

export const formatRating = (n: number, lang: Lang) =>
  new Intl.NumberFormat(locale(lang), { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(n);

export const formatPrice = (amount: number, currency: string, lang: Lang) =>
  lang === 'ar' ? `${formatNumber(amount, lang)} ${currency}` : `${currency} ${formatNumber(amount, lang)}`;

/** "2026-08" → "August 2026" / "أغسطس 2026" */
export function formatMonth(ym: string, lang: Lang) {
  const [y, m] = ym.split('-').map(Number);
  if (!y || !m) return ym;
  return new Intl.DateTimeFormat(locale(lang), { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(Date.UTC(y, m - 1, 1)),
  );
}

/** "20:00" → "8:00 PM" / "8:00 م" */
export function formatTime(hhmm: string, lang: Lang) {
  const [h, m] = hhmm.split(':').map(Number);
  const t = getDictionary(lang);
  const suffix = h < 12 ? t.am : t.pm;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${suffix}`;
}

/** Saturday-first week, as used in Jordan. */
export const WEEK: DayKey[] = ['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri'];

export type HoursGroup = { days: DayKey[]; label: string; value: string; closed: boolean };

/** Groups consecutive days with identical hours: "Saturday – Wednesday · 10:00 AM – 8:00 PM". */
export function groupHours(hours: OpeningHours[], lang: Lang): HoursGroup[] {
  const t = getDictionary(lang);
  const byDay = new Map(hours.map((h) => [h.day, h]));
  const sig = (d: DayKey) => {
    const h = byDay.get(d);
    if (!h || h.closed) return 'closed';
    return `${h.open}-${h.close}`;
  };
  const groups: { days: DayKey[]; sig: string }[] = [];
  for (const day of WEEK) {
    const s = sig(day);
    const last = groups[groups.length - 1];
    if (last && last.sig === s) last.days.push(day);
    else groups.push({ days: [day], sig: s });
  }
  return groups.map(({ days, sig: s }) => {
    const first = t.days[days[0]];
    const lastDay = t.days[days[days.length - 1]];
    const label = days.length === 1 ? first : `${first} – ${lastDay}`;
    if (s === 'closed') return { days, label, value: t.location.closed, closed: true };
    const [open, close] = s.split('-');
    return { days, label, value: `${formatTime(open, lang)} – ${formatTime(close, lang)}`, closed: false };
  });
}

export const openDays = (hours: OpeningHours[]) =>
  WEEK.filter((d) => hours.some((h) => h.day === d && !h.closed));
