import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { MobileActionBar } from '@/components/MobileActionBar';
import { Booking } from '@/components/sections/Booking';
import { Cars } from '@/components/sections/Cars';
import { Engineer } from '@/components/sections/Engineer';
import { Faq } from '@/components/sections/Faq';
import { Gallery } from '@/components/sections/Gallery';
import { Hero } from '@/components/sections/Hero';
import { Location } from '@/components/sections/Location';
import { Offer } from '@/components/sections/Offer';
import { Reviews } from '@/components/sections/Reviews';
import { Services } from '@/components/sections/Services';
import { Steps } from '@/components/sections/Steps';
import { TrustBar } from '@/components/sections/TrustBar';
import { center, homePath } from '@/lib/center';
import { getDictionary } from '@/lib/dictionary';
import { otherLang, t } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import type { Lang } from '@/lib/types';

type Props = { params: Promise<{ lang: Lang }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata({
    lang,
    pathFor: homePath,
    title: t(center.seo.title, lang),
    description: t(center.seo.description, lang),
  });
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <Header lang={lang} altHref={homePath(otherLang(lang))} />
      <main id="main">
        <Hero lang={lang} />
        <Offer lang={lang} />
        <TrustBar lang={lang} />
        <Services lang={lang} />
        <Cars lang={lang} />
        <Steps lang={lang} />
        <Engineer lang={lang} />
        <Gallery lang={lang} />
        <Reviews lang={lang} />
        <Faq lang={lang} items={center.faq} title={dict.faq.title} />
        <Location lang={lang} />
        <Booking lang={lang} />
      </main>
      <Footer lang={lang} />
      <MobileActionBar lang={lang} whatsappMessage={t(center.whatsappMessage, lang)} />
    </>
  );
}
