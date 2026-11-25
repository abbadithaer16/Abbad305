import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { RevealObserver } from '@/components/RevealObserver';
import { center, siteUrl } from '@/lib/center';
import { getDictionary } from '@/lib/dictionary';
import { dirOf, isLang, langs } from '@/lib/i18n';
import { autoRepairSchema, JsonLd } from '@/lib/schema';
import { plexArabic, plexSans } from '../fonts';
import '../globals.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

const themeColors = { electric: '#ffffff', night: '#0f1316', classic: '#ffffff' } as const;

export const viewport: Viewport = {
  themeColor: themeColors[center.theme],
  colorScheme: center.theme === 'night' ? 'dark' : 'light',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  robots: center.allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png', sizes: '64x64' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  formatDetection: { telephone: false },
};

export default async function LangLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html
      lang={lang}
      dir={dirOf(lang)}
      data-theme={center.theme}
      className={`${plexArabic.variable} ${plexSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Lets CSS hide [data-reveal] blocks only when JS can reveal them again */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-3 focus:top-3 focus:z-50 focus:rounded-btn focus:bg-card focus:px-4 focus:py-3 focus:font-semibold focus:shadow-card"
        >
          {dict.skipToContent}
        </a>
        {children}
        <RevealObserver />
        <JsonLd data={autoRepairSchema(lang)} />
      </body>
    </html>
  );
}
