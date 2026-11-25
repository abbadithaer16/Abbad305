import Image from 'next/image';
import { site, t } from '@/lib/site';
import { CallButton, WhatsAppButton } from '../ui';

export function Hero() {
  const photo = site.images.hero;
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-[calc(100svh-4rem)] items-end overflow-hidden bg-bg md:min-h-[min(calc(100svh-4.5rem),46rem)] md:items-center">
      <Image
        src={photo.src}
        alt={t(photo.alt)}
        fill
        preload
        fetchPriority="high"
        sizes="(max-width: 767px) 85vw, 100vw"
        className="-z-20 object-cover"
        style={{ objectPosition: photo.focus }}
      />
      <div aria-hidden className="hero-scrim absolute inset-0 -z-10" />
      <div className="container-page hero-in pt-40 pb-28 md:py-24 lg:pb-24">
        <div className="max-w-[34rem]">
          <h1 id="hero-title" className="text-[2.35rem] leading-[1.3] font-bold [text-shadow:0_2px_18px_rgb(0_0_0/0.6)] md:text-[3.4rem]">
            {t(site.hero.headline)}
          </h1>
          <p className="mt-5 max-w-[36ch] text-lg text-soft md:text-xl">{t(site.hero.subline)}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton className="min-h-14 px-6 text-lg" />
            <CallButton className="min-h-14 bg-black/30 px-6 text-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
