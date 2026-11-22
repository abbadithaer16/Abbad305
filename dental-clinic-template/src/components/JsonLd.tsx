import clinic from '@clinic';
import type { DayKey, Lang } from '@/lib/types';
import { OG_IMAGE, siteUrl } from '@/lib/site';

const schemaDay: Record<DayKey, string> = {
  sat: 'Saturday',
  sun: 'Sunday',
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
};

function openingHours() {
  const groups = new Map<string, string[]>();
  for (const h of clinic.hours) {
    if (h.closed) continue;
    const key = `${h.open}-${h.close}`;
    groups.set(key, [...(groups.get(key) ?? []), schemaDay[h.day]]);
  }
  return [...groups].map(([key, days]) => {
    const [opens, closes] = key.split('-');
    return { '@type': 'OpeningHoursSpecification', dayOfWeek: days, opens, closes };
  });
}

/** schema.org Dentist + FAQPage, in the page's language. */
export function JsonLd({ lang }: { lang: Lang }) {
  const base = siteUrl();
  const url = `${base}/${lang}/`;
  const { contact, location, rating, social, seo } = clinic;

  const dentist = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    '@id': `${base}/#clinic`,
    name: clinic.name[lang],
    alternateName: clinic.name[lang === 'ar' ? 'en' : 'ar'],
    description: seo.description[lang],
    url,
    image: `${base}${OG_IMAGE.url}`,
    logo: clinic.logo.image ? `${base}${clinic.logo.image.src}` : undefined,
    telephone: contact.phone,
    email: contact.email,
    priceRange: seo.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address[lang],
      addressLocality: location.city[lang],
      addressRegion: location.area[lang],
      addressCountry: location.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: location.geo.lat, longitude: location.geo.lng },
    hasMap: location.directionsUrl,
    openingHoursSpecification: openingHours(),
    aggregateRating: rating
      ? { '@type': 'AggregateRating', ratingValue: rating.value, reviewCount: rating.count, bestRating: 5 }
      : undefined,
    sameAs: Object.values(social).filter(Boolean),
    availableLanguage: ['ar', 'en'],
  };

  const faq = clinic.faq.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        inLanguage: lang,
        mainEntity: clinic.faq.map((f) => ({
          '@type': 'Question',
          name: f.q[lang],
          acceptedAnswer: { '@type': 'Answer', text: f.a[lang] },
        })),
      }
    : null;

  const json = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, '\\u003c') });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={json(dentist)} />
      {faq ? <script type="application/ld+json" dangerouslySetInnerHTML={json(faq)} /> : null}
    </>
  );
}
