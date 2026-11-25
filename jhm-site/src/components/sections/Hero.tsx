import { getImageProps } from 'next/image';
import type { CSSProperties } from 'react';
import { site, t } from '@/lib/site';
import { CallButton, WhatsAppButton } from '../ui';

/**
 * Full-width photo behind the headline. Phones get their own portrait crop
 * (images.heroMobile) through <picture>; larger screens get images.hero.
 */
export function Hero() {
  const desktop = site.images.hero;
  const mobile = site.images.heroMobile ?? desktop;
  const alt = t(desktop.alt);

  const { props: desktopProps } = getImageProps({ src: desktop.src, alt, fill: true, sizes: '100vw' });
  // The phone crop is wider than a phone screen and gets cropped at the sides (object-fit: cover),
  // so it is drawn ~1.2× the screen width.
  const { props: mobileProps } = getImageProps({ src: mobile.src, alt, fill: true, sizes: '120vw' });

  const positions = {
    '--pos-mobile': mobile.focus ?? '50% 50%',
    '--pos-desktop': desktop.focus ?? '50% 50%',
  } as CSSProperties;

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100svh-4rem)] items-end overflow-hidden bg-bg md:min-h-[min(calc(100svh-4.5rem),46rem)] md:items-center"
    >
      <picture>
        <source media="(min-width: 768px)" srcSet={desktopProps.srcSet} sizes={desktopProps.sizes} />
        <img
          {...mobileProps}
          alt={alt}
          fetchPriority="high"
          loading="eager"
          className="-z-20 object-cover [object-position:var(--pos-mobile)] saturate-[.7] md:[object-position:var(--pos-desktop)]"
          style={{ ...mobileProps.style, ...positions }}
        />
      </picture>
      <div aria-hidden className="hero-scrim absolute inset-0 -z-10" />
      <div className="container-page hero-in pt-48 pb-24 md:py-24">
        <div className="max-w-[34rem]">
          <h1
            id="hero-title"
            className="text-[2.15rem] leading-[1.3] font-bold [text-shadow:0_2px_18px_rgb(0_0_0/0.6)] min-[400px]:text-[2.35rem] md:text-[3.4rem]"
          >
            {t(site.hero.headline)}
          </h1>
          <p className="mt-4 max-w-[36ch] text-lg text-soft md:mt-5 md:text-xl">{t(site.hero.subline)}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row md:mt-8">
            <WhatsAppButton className="min-h-14 px-6 text-lg" />
            <CallButton className="min-h-14 bg-black/30 px-6 text-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
