import type { ReactNode } from 'react';
import clinic from '@clinic';
import { dirOf, pathFor } from '@/lib/site';

/** "/" only redirects to the default language (static hosting has no server redirects). */
export default function RootRedirectLayout({ children }: { children: ReactNode }) {
  const target = pathFor(clinic.defaultLanguage);
  return (
    <html lang={clinic.defaultLanguage} dir={dirOf(clinic.defaultLanguage)}>
      <head>
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `location.replace(${JSON.stringify(target)}+location.search+location.hash)`,
          }}
        />
      </head>
      <body style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>{children}</body>
    </html>
  );
}
