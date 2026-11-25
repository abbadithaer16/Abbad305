import Link from 'next/link';
import { homePath } from '@/lib/center';
import { getDictionary } from '@/lib/dictionary';
import { otherLang } from '@/lib/i18n';
import type { Lang } from '@/lib/types';
import { MobileMenu } from './MobileMenu';
import { Logo } from './ui';

export function Header({ lang, altHref }: { lang: Lang; altHref: string }) {
  const dict = getDictionary(lang);
  const home = homePath(lang);
  const items = [
    { href: `${home}#services`, label: dict.nav.services },
    { href: `${home}#cars`, label: dict.nav.cars },
    { href: `${home}#how-it-works`, label: dict.nav.howItWorks },
    { href: `${home}#reviews`, label: dict.nav.reviews },
    { href: `${home}#faq`, label: dict.nav.faq },
    { href: `${home}#location`, label: dict.nav.location },
  ];
  const alt = otherLang(lang);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/95 backdrop-blur supports-[backdrop-filter]:bg-bg/85">
      <div className="container-page relative flex h-16 items-center gap-2 sm:gap-3 md:h-[4.5rem]">
        <Link href={home} className="min-w-0 shrink rounded-btn py-1">
          <Logo lang={lang} />
        </Link>

        <nav aria-label={dict.mainNav} className="ms-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-btn px-3 py-2 text-[15px] font-semibold text-muted transition-colors hover:text-fg"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ms-auto flex shrink-0 items-center gap-2 lg:ms-2">
          <a
            href={altHref}
            hrefLang={alt}
            lang={alt}
            className="grid h-11 place-items-center rounded-btn px-2.5 text-[15px] font-semibold text-fg underline-offset-4 hover:underline sm:px-3"
          >
            <span className="sm:hidden">{dict.switchToShort}</span>
            <span className="hidden sm:inline">{dict.switchTo}</span>
          </a>
          <a href="#book" className="btn btn-primary min-h-11 px-4 text-[15px] sm:px-5">
            <span className="sm:hidden">{dict.bookShort}</span>
            <span className="hidden sm:inline">{dict.bookCheck}</span>
          </a>
          <MobileMenu
            items={items}
            menuLabel={dict.menu}
            closeLabel={dict.closeMenu}
            navLabel={dict.mainNav}
          />
        </div>
      </div>
    </header>
  );
}
