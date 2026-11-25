import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { MobileBar } from '@/components/MobileBar';
import { Booking } from '@/components/sections/Booking';
import { Branches } from '@/components/sections/Branches';
import { Brands } from '@/components/sections/Brands';
import { Gallery } from '@/components/sections/Gallery';
import { Hero } from '@/components/sections/Hero';
import { Reviews } from '@/components/sections/Reviews';
import { Services } from '@/components/sections/Services';
import { Stats } from '@/components/sections/Stats';
import { Steps } from '@/components/sections/Steps';
import { Team } from '@/components/sections/Team';
import { JsonLd, siteSchema } from '@/lib/schema';

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Stats />
        <Services />
        <Brands />
        <Steps />
        <Team />
        <Gallery />
        <Reviews />
        <Branches />
        <Booking />
      </main>
      <Footer />
      <MobileBar />
      <JsonLd data={siteSchema()} />
    </>
  );
}
