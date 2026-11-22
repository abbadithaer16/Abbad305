'use client';

import { useEffect, useId, useState, type ReactNode } from 'react';
import { CalendarCheck, Languages, Menu, X } from 'lucide-react';
import type { Lang } from '@/lib/types';
import { buttonClass, cn, Container } from './ui';

export type NavItem = { href: string; label: string };

export function Header({
  lang,
  logo,
  nav,
  labels,
}: {
  lang: Lang;
  logo: ReactNode;
  nav: NavItem[];
  labels: {
    book: string;
    menuOpen: string;
    menuClose: string;
    switchTo: string;
    switchToShort: string;
    switchToLabel: string;
    skip: string;
    nav: string;
  };
}) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const other: Lang = lang === 'ar' ? 'en' : 'ar';
  const otherHref = `/${other}/`;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  // Keep the reader on the same section when switching language.
  const switchLanguage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!window.location.hash) return;
    e.preventDefault();
    window.location.href = otherHref + window.location.hash;
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-lg bg-card px-4 py-2 font-semibold text-ink shadow-lift focus:not-sr-only focus:fixed focus:start-4 focus:top-3"
      >
        {labels.skip}
      </a>
      <header className="sticky top-0 z-50 border-b border-line bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/85">
        <Container className="flex h-[var(--header-h)] items-center gap-3">
          <a href="#top" className="me-auto flex min-w-0 items-center rounded-lg">
            {logo}
          </a>

          <nav aria-label={labels.nav} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="rounded-lg px-3 py-2 text-[0.95rem] font-medium text-copy transition-colors hover:bg-primary-soft hover:text-primary-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={otherHref}
            hrefLang={other}
            lang={other}
            onClick={switchLanguage}
            aria-label={labels.switchToLabel}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2.5 text-[0.95rem] font-medium text-copy transition-colors hover:bg-primary-soft hover:text-primary-ink"
          >
            <Languages className="size-[1.15rem]" strokeWidth={1.75} aria-hidden="true" />
            <span className="sm:hidden">{labels.switchToShort}</span>
            <span className="hidden sm:inline">{labels.switchTo}</span>
          </a>

          <div className="hidden sm:block">
            <a href="#booking" className={buttonClass('primary', 'md')}>
              <CalendarCheck className="size-[1.15rem]" strokeWidth={1.75} aria-hidden="true" />
              {labels.book}
            </a>
          </div>

          <button
            type="button"
            className="inline-grid size-11 place-items-center rounded-lg text-ink transition-colors hover:bg-primary-soft lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? labels.menuClose : labels.menuOpen}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </Container>

        <div
          id={menuId}
          hidden={!open}
          className={cn('border-t border-line bg-card shadow-lift lg:hidden')}
        >
          <Container className="py-3">
            <nav aria-label={labels.nav}>
              <ul className="grid gap-1">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-12 items-center rounded-lg px-3 font-medium text-ink hover:bg-primary-soft"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-3 mb-1 sm:hidden">
              <a href="#booking" onClick={() => setOpen(false)} className={buttonClass('primary', 'lg', 'w-full')}>
                <CalendarCheck className="size-5" strokeWidth={1.75} aria-hidden="true" />
                {labels.book}
              </a>
            </div>
          </Container>
        </div>
      </header>
    </>
  );
}
