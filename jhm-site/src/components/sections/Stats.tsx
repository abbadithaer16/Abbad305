import { dict, site, t } from '@/lib/site';
import { HexFrame } from '../Hex';

export function Stats() {
  return (
    <section aria-label={dict.stats} className="border-b border-line bg-bg pt-4 pb-12 md:py-16">
      <ul className="container-page grid grid-cols-3 gap-3 sm:gap-8">
        {site.stats.map((stat) => (
          <li key={stat.label.ar} className="flex flex-col items-center text-center">
            <HexFrame className="w-full max-w-[7.25rem] md:max-w-[11rem]">
              <span dir="ltr" className="font-display text-[1.9rem] leading-none font-bold text-fg md:text-5xl">
                {stat.value}
              </span>
            </HexFrame>
            <span className="mt-3 text-[0.95rem] leading-snug font-semibold text-soft md:mt-4 md:text-lg">{t(stat.label)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
