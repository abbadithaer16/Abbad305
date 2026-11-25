import { absoluteUrl, carLabel, center, homePath, openingHoursSpecification, siteUrl } from './center';
import { getDictionary } from './dictionary';
import { t } from './i18n';
import type { CarModel, Lang } from './types';

/** schema.org AutoRepair for the center, in the page's language. */
export function autoRepairSchema(lang: Lang) {
  const { google, location, contact } = center;
  const sameAs = Object.values(center.socials).filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    '@id': `${siteUrl()}/#business`,
    name: t(center.name, lang),
    description: t(center.seo.description, lang),
    url: absoluteUrl(homePath(lang)),
    image: absoluteUrl(center.seo.ogImage || '/og.png'),
    logo: center.logo.src ? absoluteUrl(center.logo.src) : undefined,
    telephone: contact.phoneDial,
    email: contact.email || undefined,
    inLanguage: lang,
    address: {
      '@type': 'PostalAddress',
      streetAddress: t(location.address, lang),
      addressLocality: t(center.city, lang),
      addressCountry: location.countryCode,
    },
    geo: { '@type': 'GeoCoordinates', latitude: location.geo.lat, longitude: location.geo.lng },
    hasMap: location.directionsUrl,
    areaServed: t(center.city, lang),
    openingHoursSpecification: openingHoursSpecification(),
    aggregateRating:
      google.rating && google.reviewCount
        ? { '@type': 'AggregateRating', ratingValue: google.rating, reviewCount: google.reviewCount, bestRating: 5 }
        : undefined,
    sameAs: sameAs.length ? sameAs : undefined,
  };
}

export function breadcrumbSchema(lang: Lang, car: CarModel, path: string) {
  const dict = getDictionary(lang);
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: dict.model.home, item: absoluteUrl(homePath(lang)) },
      { '@type': 'ListItem', position: 2, name: dict.model.cars, item: absoluteUrl(`${homePath(lang)}#cars`) },
      { '@type': 'ListItem', position: 3, name: carLabel(car, lang), item: absoluteUrl(path) },
    ],
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here except for "</script>"; escape "<" to be sure.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
