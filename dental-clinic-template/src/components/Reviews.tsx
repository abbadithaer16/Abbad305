import { ExternalLink, FlaskConical } from 'lucide-react';
import clinic from '@clinic';
import type { Lang } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import { formatMonth, formatNumber, formatRating } from '@/lib/format';
import { Section, type Tone } from './ui';
import { Stars } from './Stars';

export function Reviews({ lang, tone }: { lang: Lang; tone: Tone }) {
  const t = getDictionary(lang);
  const { reviews, rating } = clinic;

  return (
    <Section id="reviews" tone={tone} eyebrow={t.reviews.eyebrow} title={t.reviews.title}>
      {rating ? (
        <div className="-mt-4 mb-10 flex flex-col items-center gap-3 text-center md:-mt-6 md:mb-12">
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <Stars value={rating.value} className="text-lg" />
            <span className="font-medium text-ink">
              {t.reviews.summary(formatRating(rating.value, lang), formatNumber(rating.count, lang))}
            </span>
          </p>
          <a
            href={rating.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg font-semibold text-primary-ink underline-offset-4 hover:underline"
          >
            {t.reviews.readAll}
            <ExternalLink className="size-4" strokeWidth={2} aria-hidden="true" />
            <span className="sr-only">{t.opensInNewTab}</span>
          </a>
        </div>
      ) : null}

      <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {reviews.map((review, i) => (
          <li key={i} className="card lift flex flex-col rounded-2xl border border-line bg-card p-6 shadow-soft">
            <figure className="flex h-full flex-col">
              <div className="mb-4 flex items-center justify-between gap-3">
                <Stars value={review.rating} />
                <span className="sr-only">{t.reviews.stars(review.rating)}</span>
                {review.sample ? (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-dashed border-muted/50 px-2.5 py-0.5 text-xs font-medium whitespace-nowrap text-muted">
                    <FlaskConical className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
                    {t.reviews.sample}
                  </span>
                ) : null}
              </div>
              <blockquote lang={review.lang} dir="auto" className="text-[0.975rem] text-copy">
                {review.text}
              </blockquote>
              <figcaption className="mt-auto pt-5 text-sm">
                <span dir="auto" className="block font-semibold text-ink">
                  {review.author}
                </span>
                <span className="text-muted">
                  Google{review.date ? ` · ${formatMonth(review.date, lang)}` : ''}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
