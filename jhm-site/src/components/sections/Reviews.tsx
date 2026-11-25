import { Quote, Star } from 'lucide-react';
import { dict, site } from '@/lib/site';
import { Section, SectionTitle } from '../ui';

function Stars({ rating }: { rating: number }) {
  return (
    <span role="img" aria-label={dict.reviews.stars(rating)} className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          aria-hidden
          strokeWidth={1.5}
          className={i <= rating ? 'size-4 fill-gold text-gold' : 'size-4 text-line'}
        />
      ))}
    </span>
  );
}

export function Reviews() {
  const { items, googleUrl } = site.reviews;
  if (!items.length) return null;
  const hasSamples = items.some((r) => r.sample);
  return (
    <Section labelledBy="reviews-title" surface>
      <SectionTitle id="reviews-title">{dict.reviews.title}</SectionTitle>
      {hasSamples ? <p className="mt-4 max-w-[60ch] text-base text-muted">{dict.reviews.sampleNote}</p> : null}

      <ul className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3 md:gap-5">
        {items.map((review, i) => (
          <li key={i}>
            <figure className="flex h-full flex-col rounded-card bg-bg p-6 md:p-7">
              <Quote aria-hidden className="size-7 -scale-x-100 text-gold" strokeWidth={1.5} />
              <blockquote className="mt-3 flex-1 text-lg leading-relaxed whitespace-pre-line text-fg">
                <p>{review.text}</p>
              </blockquote>
              <figcaption className="mt-5 border-t border-line pt-4">
                <span className="block font-semibold text-soft">
                  <bdi>{review.author}</bdi>
                </span>
                {review.sample ? (
                  <span className="mt-2 inline-block rounded-full border border-gold/60 px-3 py-0.5 text-sm font-semibold text-gold">
                    {dict.reviews.sample}
                  </span>
                ) : (
                  <span className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.95rem] text-muted">
                    {review.rating ? <Stars rating={review.rating} /> : null}
                    {dict.reviews.fromGoogle}
                  </span>
                )}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <a href={googleUrl} target="_blank" rel="noopener" className="btn btn-line mt-8">
        <Star aria-hidden className="size-5 fill-gold text-gold" strokeWidth={1.5} />
        {dict.reviews.google}
      </a>
    </Section>
  );
}
