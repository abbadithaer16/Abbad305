import type { Metadata } from 'next';
import { absoluteUrl, center, homePath, siteUrl } from '@/lib/center';

const target = homePath(center.defaultLang);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: center.name[center.defaultLang],
  robots: { index: false, follow: true },
  alternates: { canonical: absoluteUrl(target) },
  icons: { icon: '/icon.png' },
};

// Static hosts have no server redirects, so "/" forwards with a meta refresh + JS.
export default function RootPage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <script dangerouslySetInnerHTML={{ __html: `location.replace(${JSON.stringify(target)} + location.hash)` }} />
      <p>
        <a href="/ar/" lang="ar">
          العربية
        </a>
        {' · '}
        <a href="/en/" lang="en">
          English
        </a>
      </p>
    </>
  );
}
