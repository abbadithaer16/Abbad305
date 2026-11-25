import { dict, site, t, telHref } from '@/lib/site';
import { HoursList } from './sections/Hours';
import { Logo, PhoneText } from './ui';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-bg pb-24 lg:pb-0">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr] md:gap-12">
        <div>
          <Logo className="w-36" sizes="144px" />
          <p className="mt-5 font-display text-2xl leading-snug font-bold text-fg">{t(site.closingLine)}</p>
        </div>
        <div>
          <h2 className="text-lg font-bold">{dict.footer.hours}</h2>
          <HoursList className="mt-3 text-base" />
        </div>
        <div>
          <h2 className="text-lg font-bold">{dict.footer.phones}</h2>
          <ul className="mt-3 grid gap-1 text-base">
            {site.branches.map((b) => (
              <li key={b.phone} className="flex flex-wrap justify-between gap-x-6">
                <span>{t(b.name)}</span>
                <a href={telHref(b.phone)} className="font-semibold text-fg underline-offset-4 hover:text-gold hover:underline">
                  <PhoneText number={b.phone} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="container-page py-6 text-[0.95rem] text-muted">
          © <span dir="ltr">{year}</span> {t(site.name)}
        </p>
      </div>
    </footer>
  );
}
