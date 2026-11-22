'use client';

import { useEffect } from 'react';

/**
 * One-time fade + 16px rise for sections as they enter the viewport.
 * Only sections that start below the fold are hidden (so nothing flashes on load),
 * content stays visible without JavaScript, and reduced-motion users get no animation.
 * Positions come from IntersectionObserver, so no layout is forced during start-up.
 */
export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    // Observe the <section> (it keeps a real box even while content-visibility skips
    // rendering its children) and animate its [data-reveal] content.
    const contentOf = new Map<Element, HTMLElement>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting, boundingClientRect } of entries) {
          const el = contentOf.get(target);
          if (!el) continue;
          if (isIntersecting) {
            if (el.classList.contains('reveal-pending')) el.classList.add('is-revealed');
            observer.unobserve(target); // on screen at load: leave it alone
          } else if (boundingClientRect.top > 0) {
            el.classList.add('reveal-pending'); // below the fold: hide until it scrolls in
          } else {
            observer.unobserve(target); // above the fold (e.g. opened at #booking)
          }
        }
      },
      { threshold: 0 },
    );

    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      const target = el.closest('section') ?? el;
      contentOf.set(target, el);
      observer.observe(target);
    });
    return () => observer.disconnect();
  }, []);

  return null;
}
