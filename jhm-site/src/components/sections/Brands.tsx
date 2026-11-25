import { dict, site, t } from '@/lib/site';
import { Section, SectionTitle } from '../ui';

export function Brands() {
  return (
    <Section labelledBy="brands-title" className="py-14 md:py-20">
      <div className="flex flex-col gap-6">
        <SectionTitle id="brands-title" className="text-2xl md:text-3xl">
          {dict.brands.title}
        </SectionTitle>
        <ul className="flex flex-wrap gap-2.5">
          {site.brands.map((brand) => (
            <li key={brand.ar} className="rounded-full border border-line px-5 py-2 text-base font-semibold text-fg md:text-lg">
              {t(brand)}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
