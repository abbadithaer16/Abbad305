'use client';

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from './ui';

/** Accordion: one answer open at a time, smooth height transition, answers stay in the HTML for SEO. */
export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();

  return (
    <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card shadow-soft">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q}>
            <h3 className="text-[1.0625rem]">
              <button
                type="button"
                id={`${id}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-start font-semibold text-ink transition-colors hover:bg-primary-soft/50 md:px-7"
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={cn('size-5 shrink-0 text-primary-ink transition-transform duration-300', isOpen && 'rotate-180')}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={`${id}-a${i}`}
              role="region"
              aria-labelledby={`${id}-q${i}`}
              inert={!isOpen}
              className={cn(
                'grid transition-[grid-template-rows] duration-300 ease-out',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-6 text-copy md:px-7">{item.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
