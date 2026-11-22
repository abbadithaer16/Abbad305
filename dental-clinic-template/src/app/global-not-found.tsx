import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import clinic from '@clinic';
import './globals.css';
import { plex, plexArabic } from '@/lib/fonts';
import { getDictionary } from '@/lib/i18n';
import { dirOf, siteIcons, theme } from '@/lib/site';
import { themeStyle } from '@/lib/themes';

export const metadata: Metadata = {
  title: `404 · ${clinic.name.en}`,
  robots: { index: false },
  icons: siteIcons,
};

/** Bilingual 404 page. */
export default function GlobalNotFound() {
  const lang = clinic.defaultLanguage;
  const order = lang === 'ar' ? (['ar', 'en'] as const) : (['en', 'ar'] as const);
  return (
    <html
      lang={lang}
      dir={dirOf(lang)}
      style={themeStyle(theme) as CSSProperties}
      className={`${plex.variable} ${plexArabic.variable}`}
    >
      <body>
        <main className="grid min-h-dvh place-items-center bg-surface px-4 py-16 text-center">
          <div className="grid gap-8">
            <p className="text-6xl font-semibold text-primary-ink">404</p>
            {order.map((l) => {
              const t = getDictionary(l);
              return (
                <div key={l} lang={l} dir={dirOf(l)} className="grid gap-2">
                  <h1 className="text-2xl">{t.notFound.title}</h1>
                  <p className="text-muted">{t.notFound.text}</p>
                  <a href={`/${l}/`} className="font-semibold text-primary-ink underline underline-offset-4">
                    {t.notFound.home}
                  </a>
                </div>
              );
            })}
          </div>
        </main>
      </body>
    </html>
  );
}
