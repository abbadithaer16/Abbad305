import { dict, site, t } from '@/lib/site';
import { MobileMenu } from './MobileMenu';
import { Logo } from './ui';

export function Header() {
  const items = [
    { href: '#services', label: dict.nav.services },
    { href: '#branches', label: dict.nav.branches },
    { href: '#team', label: dict.nav.team },
    { href: '#contact', label: dict.nav.contact },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/92 backdrop-blur-md">
      <div className="container-page relative flex h-16 items-center gap-3 md:h-[4.5rem]">
        <a href="#top" className="flex min-w-0 items-center gap-2.5 rounded-btn">
          <Logo className="w-14 md:w-[4.75rem]" sizes="76px" eager />
          <span className="font-display text-[0.9rem] leading-snug font-semibold text-fg max-sm:max-w-[8.25rem] md:text-lg">
            {t(site.name)}
          </span>
        </a>

        <nav aria-label={dict.mainNav} className="ms-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="rounded-btn px-3.5 py-2 font-semibold text-soft transition-colors hover:text-gold">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ms-auto flex shrink-0 items-center gap-2 lg:ms-3">
          <a href="#contact" className="btn btn-gold min-h-11 px-3.5 text-[0.95rem] sm:px-4">
            {dict.book}
          </a>
          <MobileMenu items={items} openLabel={dict.menu} closeLabel={dict.closeMenu} navLabel={dict.mainNav} />
        </div>
      </div>
    </header>
  );
}
