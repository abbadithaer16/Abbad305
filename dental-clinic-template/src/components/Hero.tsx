import { Award, Phone } from 'lucide-react';
import clinic from '@clinic';
import type { Lang } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import { formatNumber, formatRating } from '@/lib/format';
import { telHref, waLink } from '@/lib/contact';
import { ButtonLink, Container } from './ui';
import { ImageSlot } from './ImageSlot';
import { Stars } from './Stars';
import { WhatsAppIcon } from './BrandIcons';

export function Hero({ lang }: { lang: Lang }) {
  const t = getDictionary(lang);
  const { hero, rating, stats } = clinic;
  const name = clinic.name[lang];

  return (
    <section id="top" aria-labelledby="hero-title" className="bg-surface pt-10 pb-24 md:pt-16 md:pb-32">
      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <h1 id="hero-title" className="text-[2.125rem] md:text-5xl">
            {hero.headline[lang]}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted md:text-xl">{hero.subtext[lang]}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={waLink(t.whatsappMessages.general(name))} external size="lg">
              <WhatsAppIcon className="size-5" />
              {t.bookOnWhatsApp}
            </ButtonLink>
            <ButtonLink href={telHref()} variant="secondary" size="lg">
              <Phone className="size-5" strokeWidth={1.75} aria-hidden="true" />
              {t.callNow}
            </ButtonLink>
          </div>

          <ul className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.95rem] text-muted">
            {rating ? (
              <li className="inline-flex items-center gap-2">
                <Stars value={rating.value} />
                <span>
                  <span className="font-semibold text-ink">{t.hero.googleRating(formatRating(rating.value, lang))}</span>{' '}
                  {t.hero.reviewsCount(formatNumber(rating.count, lang))}
                </span>
              </li>
            ) : null}
            <li className="inline-flex items-center gap-2">
              <Award className="size-[1.1em] text-primary-ink" strokeWidth={1.75} aria-hidden="true" />
              {t.hero.years(stats.yearsExperience)}
            </li>
          </ul>
        </div>

        <div className="lg:col-span-6">
          <ImageSlot
            photo={hero.image}
            lang={lang}
            subject={t.placeholder.hero}
            size="1200 × 1000 px"
            sizes="(min-width: 1200px) 560px, (min-width: 1024px) 46vw, 100vw"
            priority
            className="aspect-[4/3] rounded-2xl shadow-soft md:aspect-[16/9] lg:aspect-[6/5]"
          />
        </div>
      </Container>
    </section>
  );
}
