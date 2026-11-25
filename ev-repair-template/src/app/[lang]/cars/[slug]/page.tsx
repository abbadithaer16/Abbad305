import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Wrench } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { MobileActionBar } from '@/components/MobileActionBar';
import { Booking } from '@/components/sections/Booking';
import { CarChips } from '@/components/sections/Cars';
import { Faq } from '@/components/sections/Faq';
import { ServiceCard } from '@/components/sections/Services';
import { CallButton, Section, SectionHeader, WhatsAppButton } from '@/components/ui';
import {
  carH1,
  carLabel,
  carMetaDescription,
  carPath,
  center,
  findCar,
  homePath,
  servicesById,
} from '@/lib/center';
import { getDictionary } from '@/lib/dictionary';
import { langs, otherLang, t } from '@/lib/i18n';
import { breadcrumbSchema, JsonLd } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';
import type { Lang } from '@/lib/types';

type Props = { params: Promise<{ lang: Lang; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return langs.flatMap((lang) => center.cars.map((car) => ({ lang, slug: car.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const car = findCar(slug);
  if (!car) return {};
  return pageMetadata({
    lang,
    pathFor: (l) => carPath(l, slug),
    title: `${carH1(car, lang)} | ${t(center.name, lang)}`,
    description: carMetaDescription(car, lang),
  });
}

export default async function CarPage({ params }: Props) {
  const { lang, slug } = await params;
  const car = findCar(slug);
  if (!car) notFound();

  const dict = getDictionary(lang);
  const label = carLabel(car, lang);
  const message = dict.model.message(label);
  const services = servicesById(car.services);
  const others = center.cars.filter((c) => c.slug !== car.slug);
  const path = carPath(lang, car.slug);

  return (
    <>
      <Header lang={lang} altHref={carPath(otherLang(lang), car.slug)} />
      <main id="main">
        <section className="border-b border-border bg-surface">
          <div className="container-page py-10 md:py-14 lg:py-16">
            <nav aria-label={dict.model.breadcrumb}>
              <ol className="flex flex-wrap items-center gap-1.5 text-[15px] text-muted">
                <li>
                  <Link href={homePath(lang)} className="underline-offset-4 hover:underline">
                    {dict.model.home}
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="size-4 rtl:-scale-x-100" />
                </li>
                <li>
                  <Link href={`${homePath(lang)}#cars`} className="underline-offset-4 hover:underline">
                    {dict.model.cars}
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="size-4 rtl:-scale-x-100" />
                </li>
                <li aria-current="page" className="font-semibold text-fg">
                  {label}
                </li>
              </ol>
            </nav>

            <div className="mt-8 max-w-3xl">
              <p className="flex flex-wrap items-center gap-2 text-[15px] font-semibold">
                <span className="rounded-full bg-accent-soft px-3 py-1 text-accent-text">{dict.cars.type[car.type]}</span>
                {car.years ? (
                  <span className="text-muted">
                    {dict.model.years}: {car.years}
                  </span>
                ) : null}
              </p>
              <h1 className="mt-4 text-[2rem] font-bold sm:text-5xl ltr:tracking-tight">{carH1(car, lang)}</h1>
              <p className="mt-5 text-lg text-muted md:text-xl">{t(car.intro, lang)}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <WhatsAppButton lang={lang} message={message} className="min-h-14 px-6 text-lg">
                  {dict.model.book(label)}
                </WhatsAppButton>
                <CallButton lang={lang} className="min-h-14 px-6 text-lg" />
              </div>
            </div>
          </div>
        </section>

        <Section labelledBy="issues-title">
          <SectionHeader id="issues-title" title={dict.model.issues(label)} />
          <ul data-reveal className="grid gap-5 md:grid-cols-2">
            {car.commonIssues.map((issue) => (
              <li key={issue.title.en} className="flex gap-4 rounded-card border border-border bg-card p-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-chip bg-accent-soft text-accent-text">
                  <Wrench aria-hidden className="size-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{t(issue.title, lang)}</h3>
                  <p className="mt-1.5 text-base text-muted">{t(issue.text, lang)}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        {services.length ? (
          <Section tone="surface" labelledBy="model-services-title">
            <SectionHeader id="model-services-title" title={dict.model.services(label)} />
            <div data-reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} lang={lang} />
              ))}
            </div>
          </Section>
        ) : null}

        <section aria-labelledby="model-cta-title" className="bg-band text-band-fg">
          <div data-reveal className="container-page flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 id="model-cta-title" className="text-2xl font-bold md:text-3xl">
                {dict.model.ctaTitle}
              </h2>
              <p className="mt-2 text-lg text-band-muted">{dict.model.ctaText}</p>
            </div>
            <WhatsAppButton lang={lang} variant="band" message={message} className="min-h-14 shrink-0 px-6 text-lg">
              {dict.bookWhatsApp}
            </WhatsAppButton>
          </div>
        </section>

        <Faq lang={lang} items={car.faq} title={dict.model.faq(label)} id="model-faq" />

        <Booking lang={lang} car={car} />

        <Section tone="surface" labelledBy="others-title">
          <SectionHeader id="others-title" title={dict.model.others} />
          <div data-reveal>
            <CarChips lang={lang} cars={others} />
          </div>
        </Section>
      </main>
      <Footer lang={lang} />
      <MobileActionBar lang={lang} whatsappMessage={message} />
      <JsonLd data={breadcrumbSchema(lang, car, path)} />
    </>
  );
}
