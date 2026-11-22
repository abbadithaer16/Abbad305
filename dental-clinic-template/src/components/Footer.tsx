import { Mail, MapPin, Phone } from 'lucide-react';
import clinic from '@clinic';
import type { Lang } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import { groupHours } from '@/lib/format';
import { telHref, waLink } from '@/lib/contact';
import { Container, Ltr } from './ui';
import { Logo } from './Logo';
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon, YouTubeIcon } from './BrandIcons';

const socialMeta = {
  instagram: { label: 'Instagram', Icon: InstagramIcon },
  facebook: { label: 'Facebook', Icon: FacebookIcon },
  tiktok: { label: 'TikTok', Icon: TikTokIcon },
  youtube: { label: 'YouTube', Icon: YouTubeIcon },
} as const;

export function Footer({ lang }: { lang: Lang }) {
  const t = getDictionary(lang);
  const { contact, location, credit } = clinic;
  const socials = (Object.keys(socialMeta) as (keyof typeof socialMeta)[]).filter((k) => clinic.social[k]);
  const year = new Date().getFullYear();
  const link = 'rounded underline-offset-4 hover:text-white hover:underline';

  return (
    <footer className="bg-ink text-[0.975rem] text-white/75">
      <Container className="grid gap-10 py-14 md:grid-cols-3 md:py-16">
        <div>
          <Logo lang={lang} inverted />
          <p className="mt-4 max-w-xs">{clinic.tagline[lang]}</p>
          {socials.length ? (
            <div className="mt-6">
              <p className="mb-3 font-semibold text-white">{t.footer.follow}</p>
              <ul className="flex gap-2">
                {socials.map((key) => {
                  const { label, Icon } = socialMeta[key];
                  return (
                    <li key={key}>
                      <a
                        href={clinic.social[key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="lift grid size-11 place-items-center rounded-xl bg-white/10 text-white hover:bg-white/20"
                      >
                        <Icon className="size-5" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </div>

        <div>
          <h2 className="mb-4 text-base font-semibold text-white">{t.footer.contact}</h2>
          <ul className="grid gap-3">
            <li className="flex items-center gap-3">
              <Phone className="size-[1.1rem] shrink-0" strokeWidth={1.75} aria-hidden="true" />
              <a href={telHref()} className={link}>
                <Ltr>{contact.phone}</Ltr>
              </a>
            </li>
            <li className="flex items-center gap-3">
              <WhatsAppIcon className="size-[1.1rem] shrink-0" />
              <a href={waLink(t.whatsappMessages.general(clinic.name[lang]))} target="_blank" rel="noopener noreferrer" className={link}>
                <Ltr>{contact.whatsapp}</Ltr>
              </a>
            </li>
            {contact.email ? (
              <li className="flex items-center gap-3">
                <Mail className="size-[1.1rem] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                <a href={`mailto:${contact.email}`} className={link}>
                  {contact.email}
                </a>
              </li>
            ) : null}
            <li className="flex items-start gap-3">
              <MapPin className="mt-1 size-[1.1rem] shrink-0" strokeWidth={1.75} aria-hidden="true" />
              <address className="not-italic">
                {location.address[lang]}
                {lang === 'ar' ? '، ' : ', '}
                {location.area[lang]}
                {lang === 'ar' ? '، ' : ', '}
                {location.city[lang]}
              </address>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-base font-semibold text-white">{t.footer.hours}</h2>
          <dl className="grid gap-2">
            {groupHours(clinic.hours, lang).map((g) => (
              <div key={g.label}>
                <dt className="text-white">{g.label}</dt>
                <dd>{g.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {clinic.name[lang]}. {t.footer.rights}
          </p>
          <p>
            {t.footer.websiteBy}{' '}
            {credit.url ? (
              <a href={credit.url} target="_blank" rel="noopener noreferrer" className={`${link} text-white`}>
                {credit.label}
              </a>
            ) : (
              <span className="text-white">{credit.label}</span>
            )}
          </p>
        </Container>
      </div>
    </footer>
  );
}
