import type { MetadataRoute } from 'next';
import clinic from '@clinic';
import { LANGS, pathFor, siteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const languages = {
    ar: `${base}${pathFor('ar')}`,
    en: `${base}${pathFor('en')}`,
    'x-default': `${base}${pathFor(clinic.defaultLanguage)}`,
  };
  return LANGS.map((lang) => ({
    url: `${base}${pathFor(lang)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: lang === clinic.defaultLanguage ? 1 : 0.9,
    alternates: { languages },
  }));
}
