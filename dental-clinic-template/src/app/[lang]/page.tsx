import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import clinic from '@clinic';
import { getDictionary } from '@/lib/i18n';
import { isLang } from '@/lib/site';
import type { Tone } from '@/components/ui';
import { Header, type NavItem } from '@/components/Header';
import { Logo } from '@/components/Logo';
import { Hero } from '@/components/Hero';
import { TrustBar } from '@/components/TrustBar';
import { Services } from '@/components/Services';
import { Doctors } from '@/components/Doctors';
import { BeforeAfter } from '@/components/BeforeAfter';
import { Section } from '@/components/ui';
import { WhyUs } from '@/components/WhyUs';
import { Reviews } from '@/components/Reviews';
import { Abroad } from '@/components/Abroad';
import { Faq } from '@/components/Faq';
import { Location } from '@/components/Location';
import { Booking } from '@/components/Booking';
import { Footer } from '@/components/Footer';
import { MobileActions } from '@/components/MobileActions';
import { RevealObserver } from '@/components/RevealObserver';
import { JsonLd } from '@/components/JsonLd';

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDictionary(lang);

  const showResults = clinic.beforeAfter.enabled && clinic.beforeAfter.cases.length > 0;
  const showReviews = clinic.reviews.length > 0;

  const nav: NavItem[] = [
    { href: '#services', label: t.nav.services },
    { href: '#doctor', label: clinic.doctors.length > 1 ? t.nav.doctors : t.nav.doctor },
    ...(showResults ? [{ href: '#results', label: t.nav.results }] : []),
    ...(showReviews ? [{ href: '#reviews', label: t.nav.reviews }] : []),
    ...(clinic.faq.length ? [{ href: '#faq', label: t.nav.faq }] : []),
    { href: '#location', label: t.nav.location },
  ];

  // Sections in order. Optional ones drop out; backgrounds alternate automatically.
  type Render = (tone: Tone) => ReactNode;
  const candidates: (Render | false)[] = [
    (tone) => <Services key="services" lang={lang} tone={tone} />,
    (tone) => <Doctors key="doctor" lang={lang} tone={tone} />,
    showResults &&
      ((tone: Tone) => (
        <Section key="results" id="results" tone={tone} eyebrow={t.results.eyebrow} title={t.results.title}>
          <BeforeAfter
            lang={lang}
            cases={clinic.beforeAfter.cases.map((c) => ({ title: c.title[lang], before: c.before, after: c.after }))}
            labels={{
              before: t.results.before,
              after: t.results.after,
              slider: t.results.sliderLabel,
              chooseCase: t.results.chooseCase,
              consent: t.results.consent,
              beforePhoto: t.placeholder.before,
              afterPhoto: t.placeholder.after,
            }}
          />
        </Section>
      )),
    clinic.whyUs.length > 0 && ((tone: Tone) => <WhyUs key="why" lang={lang} tone={tone} />),
    showReviews && ((tone: Tone) => <Reviews key="reviews" lang={lang} tone={tone} />),
    clinic.abroad.enabled && ((tone: Tone) => <Abroad key="abroad" lang={lang} tone={tone} />),
    clinic.faq.length > 0 && ((tone: Tone) => <Faq key="faq" lang={lang} tone={tone} />),
    (tone) => <Location key="location" lang={lang} tone={tone} />,
    (tone) => <Booking key="booking" lang={lang} tone={tone} />,
  ];
  const sections = candidates.filter((s): s is Render => typeof s === 'function');

  return (
    <>
      <Header
        lang={lang}
        logo={<Logo lang={lang} />}
        nav={nav}
        labels={{
          book: t.bookAppointment,
          menuOpen: t.menuOpen,
          menuClose: t.menuClose,
          switchTo: t.switchTo,
          switchToShort: t.switchToShort,
          switchToLabel: t.switchToLabel,
          skip: t.skipToContent,
          nav: t.mainNav,
        }}
      />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero lang={lang} />
        <TrustBar lang={lang} />
        {sections.map((render, i) => render(i % 2 === 0 ? 'bg' : 'surface'))}
      </main>
      <Footer lang={lang} />
      <MobileActions lang={lang} />
      <RevealObserver />
      <JsonLd lang={lang} />
    </>
  );
}
