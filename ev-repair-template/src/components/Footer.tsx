import Link from 'next/link';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { carLabel, carPath, center, telHref, whatsappHref } from '@/lib/center';
import { getDictionary } from '@/lib/dictionary';
import { t } from '@/lib/i18n';
import type { Lang } from '@/lib/types';
import { HoursList } from './sections/Location';
import { PhoneNumber } from './ui';

const socialLabels: Record<keyof typeof center.socials, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  x: 'X',
};

export function Footer({ lang }: { lang: Lang }) {
  const dict = getDictionary(lang);
  const name = t(center.name, lang);
  const socials = (Object.entries(center.socials) as [keyof typeof center.socials, string | undefined][]).filter(
    ([, url]) => Boolean(url),
  );
  const credit = t(center.footerCredit.text, lang);
  const year = new Date().getFullYear();
  const linkClass = 'inline-flex min-h-11 items-center gap-2 underline-offset-4 hover:underline';

  return (
    <footer className="bg-band pb-24 text-band-fg lg:pb-0">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xl font-bold">{name}</p>
          <p className="mt-3 text-base text-band-muted">{t(center.tagline, lang)}</p>
          <p className="mt-4 flex items-start gap-2 text-base text-band-muted">
            <MapPin aria-hidden className="mt-1 size-4 shrink-0" />
            {t(center.location.address, lang)}
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold">{dict.footer.contact}</h2>
          <ul className="mt-3 grid gap-1 text-base text-band-muted">
            <li>
              <a href={telHref()} className={linkClass}>
                <Phone aria-hidden className="size-4" />
                <PhoneNumber />
              </a>
            </li>
            <li>
              <a href={whatsappHref(t(center.whatsappMessage, lang))} target="_blank" rel="noopener" className={linkClass}>
                <MessageCircle aria-hidden className="size-4" />
                {dict.whatsapp}
              </a>
            </li>
            {center.contact.email ? (
              <li>
                <a href={`mailto:${center.contact.email}`} className={linkClass}>
                  <Mail aria-hidden className="size-4" />
                  <span dir="ltr">{center.contact.email}</span>
                </a>
              </li>
            ) : null}
          </ul>
          {socials.length ? (
            <>
              <h2 className="mt-6 text-base font-semibold">{dict.footer.follow}</h2>
              <ul className="mt-2 flex flex-wrap gap-x-5 text-base text-band-muted">
                {socials.map(([key, url]) => (
                  <li key={key}>
                    <a href={url} target="_blank" rel="noopener" className={linkClass}>
                      {socialLabels[key]}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>

        <div>
          <h2 className="text-base font-semibold">{dict.footer.hours}</h2>
          <HoursList lang={lang} className="mt-3 text-base text-band-muted" />
        </div>

        <div>
          <h2 className="text-base font-semibold">{dict.footer.cars}</h2>
          <ul className="mt-3 grid gap-0.5 text-base text-band-muted">
            {center.cars.map((car) => (
              <li key={car.slug}>
                <Link href={carPath(lang, car.slug)} className="inline-flex min-h-9 items-center underline-offset-4 hover:underline">
                  {carLabel(car, lang)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-[15px] text-band-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <span className="ltr-nums">{year}</span> {name}. {dict.footer.rights}
          </p>
          {credit ? (
            <p>
              {center.footerCredit.url ? (
                <a href={center.footerCredit.url} target="_blank" rel="noopener" className="underline-offset-4 hover:underline">
                  {credit}
                </a>
              ) : (
                credit
              )}
            </p>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
