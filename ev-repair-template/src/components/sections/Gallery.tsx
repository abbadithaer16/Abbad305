import { center } from '@/lib/center';
import { getDictionary } from '@/lib/dictionary';
import type { Lang } from '@/lib/types';
import { PhotoBox, Section, SectionHeader } from '../ui';

export function Gallery({ lang }: { lang: Lang }) {
  const dict = getDictionary(lang);
  if (!center.gallery.length) return null;
  return (
    <Section id="gallery" labelledBy="gallery-title">
      <SectionHeader id="gallery-title" title={dict.gallery.title} subtitle={dict.gallery.subtitle} />
      <ul data-reveal className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {center.gallery.map((photo, i) => (
          <li key={`${photo.alt.en}-${i}`}>
            <PhotoBox
              photo={photo}
              lang={lang}
              width={1200}
              height={900}
              sizes="(min-width: 768px) 360px, 50vw"
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
