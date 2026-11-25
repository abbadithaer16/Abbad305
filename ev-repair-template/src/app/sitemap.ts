import type { MetadataRoute } from 'next';
import { absoluteUrl, carPath, center, homePath } from '@/lib/center';
import { langs } from '@/lib/i18n';
import type { Lang } from '@/lib/types';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { pathFor: (lang: Lang) => string; priority: number }[] = [
    { pathFor: homePath, priority: 1 },
    ...center.cars.map((car) => ({ pathFor: (lang: Lang) => carPath(lang, car.slug), priority: 0.8 })),
  ];
  const lastModified = new Date();

  return pages.flatMap(({ pathFor, priority }) =>
    langs.map((lang) => ({
      url: absoluteUrl(pathFor(lang)),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority,
      alternates: {
        languages: {
          ...Object.fromEntries(langs.map((l) => [l, absoluteUrl(pathFor(l))])),
          'x-default': absoluteUrl(pathFor(center.defaultLang)),
        },
      },
    })),
  );
}
