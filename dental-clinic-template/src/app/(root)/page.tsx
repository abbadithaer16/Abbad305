import type { Metadata } from 'next';
import clinic from '@clinic';
import { pathFor, siteIcons, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: clinic.name[clinic.defaultLanguage],
  alternates: { canonical: pathFor(clinic.defaultLanguage) },
  robots: { index: false, follow: true },
  icons: siteIcons,
};

export default function RootPage() {
  return (
    <p>
      <a href="/ar/" lang="ar">
        {clinic.name.ar}
      </a>
      {' · '}
      <a href="/en/" lang="en">
        {clinic.name.en}
      </a>
    </p>
  );
}
