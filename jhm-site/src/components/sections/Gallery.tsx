import { dict, site } from '@/lib/site';
import { DeferredPhoto } from '../Photo';
import { Section, SectionTitle } from '../ui';

export function Gallery() {
  if (!site.images.gallery.length) return null;
  return (
    <Section labelledBy="gallery-title">
      <SectionTitle id="gallery-title">{dict.gallery.title}</SectionTitle>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-10 md:gap-5">
        {site.images.gallery.map((photo) => (
          <li key={photo.src + photo.alt.ar} className="relative aspect-[4/3] overflow-hidden rounded-card">
            <DeferredPhoto
              photo={photo}
              sizes="(min-width: 1152px) 540px, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
