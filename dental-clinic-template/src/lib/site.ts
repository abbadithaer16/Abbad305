import clinic from '@clinic';
import type { Lang } from './types';
import { resolveTheme } from './themes';

export const LANGS: readonly Lang[] = ['ar', 'en'] as const;

export const isLang = (value: string): value is Lang => (LANGS as readonly string[]).includes(value);
export const otherLang = (lang: Lang): Lang => (lang === 'ar' ? 'en' : 'ar');
export const dirOf = (lang: Lang) => (lang === 'ar' ? 'rtl' : 'ltr');
export const pathFor = (lang: Lang) => `/${lang}/`;

/** Absolute site URL without trailing slash. Config first, then host env vars. */
export function siteUrl(): string {
  const fromHost =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '') ||
    process.env.URL || // Netlify
    'http://localhost:3000';
  return (clinic.siteUrl || fromHost).replace(/\/+$/, '');
}

export const theme = resolveTheme(clinic.theme, clinic.themeOverrides);

/** Shared <head> assets (generated at build time by the routes in src/app/*.png). */
export const siteIcons = {
  icon: [{ url: '/brand-icon.png', type: 'image/png', sizes: '64x64' }],
  apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
};
export const OG_IMAGE = { url: '/og-image.png', width: 1200, height: 630 };
