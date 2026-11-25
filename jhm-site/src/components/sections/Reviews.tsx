import { Quote, Star } from 'lucide-react';
import { dict, site } from '@/lib/site';
import { Section, SectionTitle } from '../ui';

export function Reviews() {
  const { items, googleUrl } = site.reviews;
  const hasSamples = items.some((r) => r.sample);
  return (
    <Section labelledBy="reviews-title" surface>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <SectionTitle id="reviews-title">{dict.reviews.title}</SectionTitle>
        <a href={googleUrl} target="_blank" rel="noopener" className="btn btn-line self-start sm:self-auto">
          <Star aria-hidden className="size-5 text-gold" />
          {dict.reviews.google}
        </a>
      </div>
      {hasSamples ? <p className="mt-4 max-w-[60ch] text-base text-muted">{dict.reviews.sampleNote}</p> : null}

      <ul className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3 md:gap-5">
        {items.map((review, i) => (
          <li key={i}>
            <figure className="flex h-full flex-col rounded-card bg-bg p-6 md:p-7">
              <Quote aria-hidden className="size-7 -scale-x-100 text-gold" strokeWidth={1.5} />
              <blockquote className="mt-3 flex-1 text-lg leading-relaxed text-fg">
                <p>{review.text}</p>
              </blockquote>
              <figcaption className="mt-5 flex flex-wrap items-center justify-between gap-2 text-base">
                <span className="font-semibold text-soft">{review.author}</span>
                {review.sample ? (
                  <span className="rounded-full border border-gold/60 px-3 py-0.5 text-sm font-semibold text-gold">
                    {dict.reviews.sample}
                  </span>
                ) : null}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
