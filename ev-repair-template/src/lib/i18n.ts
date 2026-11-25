import type { Lang, Localized } from './types';

export const langs: Lang[] = ['ar', 'en'];

export function isLang(value: string): value is Lang {
  return value === 'ar' || value === 'en';
}

export function dirOf(lang: Lang): 'rtl' | 'ltr' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}

export function otherLang(lang: Lang): Lang {
  return lang === 'ar' ? 'en' : 'ar';
}

/** Pick the text for the current language. */
export function t(value: Localized, lang: Lang): string {
  return value[lang];
}

// Latin digits in both languages so numbers match phone numbers and prices.
const locales: Record<Lang, string> = { ar: 'ar-JO-u-nu-latn', en: 'en-US' };

export function formatNumber(n: number, lang: Lang): string {
  return new Intl.NumberFormat(locales[lang]).format(n);
}

export function formatRating(n: number, lang: Lang): string {
  return new Intl.NumberFormat(locales[lang], { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(n);
}

/** '08:30' → '8:30 AM' / '8:30 ص' */
export function formatTime(hhmm: string, lang: Lang): string {
  const [h, m] = hhmm.split(':').map(Number);
  const date = new Date(Date.UTC(2024, 0, 1, h, m));
  return new Intl.DateTimeFormat(locales[lang], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  }).format(date);
}
