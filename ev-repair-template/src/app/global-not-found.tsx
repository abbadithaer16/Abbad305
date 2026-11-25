import type { Metadata } from 'next';
import { center, homePath } from '@/lib/center';
import { getDictionary } from '@/lib/dictionary';
import { langs } from '@/lib/i18n';
import { plexArabic, plexSans } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: `404 | ${center.name.en}`,
  robots: { index: false },
};

// Served for any URL that doesn't exist (404.html in the static export). Bilingual.
export default function GlobalNotFound() {
  return (
    <html
      lang={center.defaultLang}
      dir={center.defaultLang === 'ar' ? 'rtl' : 'ltr'}
      data-theme={center.theme}
      className={`${plexArabic.variable} ${plexSans.variable}`}
    >
      <body>
        <main className="container-page grid min-h-dvh place-content-center gap-12 py-16 text-center">
          {langs.map((lang) => {
            const dict = getDictionary(lang);
            return (
              <div key={lang} lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                <h1 className="text-3xl font-bold">{dict.notFound.title}</h1>
                <p className="mt-3 text-lg text-muted">{dict.notFound.text}</p>
                <a href={homePath(lang)} className="btn btn-primary mt-6">
                  {dict.notFound.home}
                </a>
              </div>
            );
          })}
        </main>
      </body>
    </html>
  );
}
