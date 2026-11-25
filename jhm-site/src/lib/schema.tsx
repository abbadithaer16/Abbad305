import { absoluteUrl, directionsUrl, internationalDigits, openingHoursSpecification, site, siteUrl, t } from './site';

/** One AutoRepair per branch, all linked to the same organization. */
export function siteSchema() {
  const url = absoluteUrl('/');
  const orgId = `${siteUrl()}/#organization`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': orgId,
        name: t(site.name),
        alternateName: site.shortName,
        url,
        logo: absoluteUrl(site.images.logo.src),
        telephone: `+${internationalDigits(site.booking.phone)}`,
      },
      ...site.branches.map((branch, i) => {
        const address = branch.address ? t(branch.address) : '';
        return {
          '@type': 'AutoRepair',
          '@id': `${siteUrl()}/#branch-${i + 1}`,
          name: `${t(site.name)} – ${t(branch.name)}`,
          url,
          image: absoluteUrl(site.images.og),
          telephone: `+${internationalDigits(branch.phone)}`,
          address: {
            '@type': 'PostalAddress',
            ...(address ? { streetAddress: address } : {}),
            addressLocality: t(branch.city),
            addressCountry: 'JO',
          },
          hasMap: directionsUrl(branch),
          openingHoursSpecification: openingHoursSpecification(),
          parentOrganization: { '@id': orgId },
        };
      }),
    ],
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
