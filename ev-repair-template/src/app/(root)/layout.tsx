import type { ReactNode } from 'react';
import { center } from '@/lib/center';
import { dirOf } from '@/lib/i18n';

// Minimal root layout for "/", which only forwards visitors to the default language.
export default function RootRedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={center.defaultLang} dir={dirOf(center.defaultLang)}>
      <body style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>{children}</body>
    </html>
  );
}
