import type { Metadata } from 'next';
import { absoluteUrl, center } from './center';
import { langs } from './i18n';
import type { Lang } from './types';

/**
 * Metadata for one page in one language: unique title/description, canonical URL,
 * hreflang alternates for both languages + x-default, Open Graph and Twitter cards.
 * `pathFor` returns the same page's path in a given language.
 */
export function pageMetadata({
  lang,
  pathFor,
  title,
  description,
}: {
  lang: Lang;
  pathFor: (lang: Lang) => string;
  title: string;
  description: string;
}): Metadata {
  const url = absoluteUrl(pathFor(lang));
  const image = center.seo.ogImage || '/og.png';
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(langs.map((l) => [l, absoluteUrl(pathFor(l))])),
        'x-default': absoluteUrl(pathFor(center.defaultLang)),
      },
    },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: center.name[lang],
      locale: lang === 'ar' ? 'ar_JO' : 'en_US',
      alternateLocale: lang === 'ar' ? ['en_US'] : ['ar_JO'],
      images: [{ url: image, width: 1200, height: 630, alt: center.name[lang] }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}
