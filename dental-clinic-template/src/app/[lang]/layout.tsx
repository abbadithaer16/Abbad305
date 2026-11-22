import type { Metadata, Viewport } from 'next';
import type { CSSProperties, ReactNode } from 'react';
import { notFound } from 'next/navigation';
import clinic from '@clinic';
import '../globals.css';
import { plex, plexArabic } from '@/lib/fonts';
import { dirOf, isLang, LANGS, OG_IMAGE, pathFor, siteIcons, siteUrl, theme } from '@/lib/site';
import { themeStyle } from '@/lib/themes';

type Params = { params: Promise<{ lang: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => LANGS.map((lang) => ({ lang }));

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const title = clinic.seo.title[lang];
  const description = clinic.seo.description[lang];

  return {
    metadataBase: new URL(siteUrl()),
    title,
    description,
    applicationName: clinic.name[lang],
    alternates: {
      canonical: pathFor(lang),
      languages: {
        ar: pathFor('ar'),
        en: pathFor('en'),
        'x-default': pathFor(clinic.defaultLanguage),
      },
    },
    openGraph: {
      type: 'website',
      url: pathFor(lang),
      siteName: clinic.name[lang],
      title,
      description,
      locale: lang === 'ar' ? 'ar_JO' : 'en_US',
      alternateLocale: lang === 'ar' ? ['en_US'] : ['ar_JO'],
      images: [{ ...OG_IMAGE, alt: clinic.name[lang] }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE.url] },
    icons: siteIcons,
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: theme.card,
};

export default async function LangLayout({ children, params }: Params & { children: ReactNode }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <html
      lang={lang}
      dir={dirOf(lang)}
      data-theme={clinic.theme}
      style={themeStyle(theme) as CSSProperties}
      className={`${plex.variable} ${plexArabic.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Visits that open at a #section render the full page so the browser lands exactly on it. */}
        <script dangerouslySetInnerHTML={{ __html: "if(location.hash)document.documentElement.classList.add('no-cv')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
