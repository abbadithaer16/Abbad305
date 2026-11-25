import { ExternalLink, Info } from 'lucide-react';
import { center } from '@/lib/center';
import { getDictionary } from '@/lib/dictionary';
import { dirOf, formatNumber, formatRating } from '@/lib/i18n';
import type { Lang } from '@/lib/types';
import { Section, Stars } from '../ui';

export function Reviews({ lang }: { lang: Lang }) {
  const dict = getDictionary(lang);
  const { google, reviews } = center;
  if (!reviews.length && !google.rating) return null;
  const hasSamples = reviews.some((r) => r.sample);

  return (
    <Section id="reviews" tone="surface" labelledBy="reviews-title">
      <div data-reveal className="mb-10 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 id="reviews-title" className="text-3xl font-bold md:text-4xl ltr:tracking-tight">
            {dict.reviews.title}
          </h2>
          {google.rating ? (
            <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-lg">
              <strong className="text-2xl font-bold">{formatRating(google.rating, lang)}</strong>
              <Stars rating={google.rating} label={dict.reviews.stars(google.rating)} className="[&_svg]:size-5" />
              {google.reviewCount ? (
                <span className="text-muted">{dict.reviews.basedOn(formatNumber(google.reviewCount, lang))}</span>
              ) : null}
            </p>
          ) : null}
        </div>
        {google.reviewsUrl ? (
          <a
            href={google.reviewsUrl}
            target="_blank"
            rel="noopener"
            className="btn btn-secondary self-start md:self-auto"
          >
            {dict.reviews.readAll}
            <ExternalLink aria-hidden className="size-4" />
          </a>
        ) : null}
      </div>

      {hasSamples ? (
        <p className="mb-6 flex items-start gap-2 rounded-chip border border-border bg-card px-4 py-3 text-base text-muted">
          <Info aria-hidden className="mt-1 size-4 shrink-0" />
          {dict.reviews.sampleNote}
        </p>
      ) : null}

      <ul data-reveal className="grid gap-5 md:grid-cols-3">
        {reviews.map((review, i) => (
          <li key={`${review.author}-${i}`}>
            <figure className="flex h-full flex-col rounded-card border border-border bg-card p-6">
              <div className="flex items-center justify-between gap-3">
                <Stars rating={review.rating} label={dict.reviews.stars(review.rating)} />
                {review.sample ? (
                  <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-[13px] font-semibold text-muted">
                    {dict.reviews.sample}
                  </span>
                ) : null}
              </div>
              <blockquote lang={review.lang} dir={dirOf(review.lang)} className="mt-4 flex-1 text-base">
                <p>{review.text}</p>
              </blockquote>
              <figcaption lang={review.lang} dir={dirOf(review.lang)} className="mt-5 text-[15px]">
                <span className="font-semibold">{review.author}</span>
                {review.car || review.date ? (
                  <span className="block text-muted">
                    <bdi>{[review.car, review.date].filter(Boolean).join(' · ')}</bdi>
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
