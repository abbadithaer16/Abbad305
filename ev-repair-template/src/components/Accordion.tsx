'use client';

import { ChevronDown } from 'lucide-react';
import { useId, useState } from 'react';
import { cn } from '@/lib/links';

type Item = { q: string; a: string };

function AccordionItem({ item, id }: { item: Item; id: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-b-0">
      <h3>
        <button
          type="button"
          id={`${id}-button`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-4 py-5 text-start text-lg font-semibold"
        >
          <span>{item.q}</span>
          <ChevronDown
            aria-hidden
            className={cn('size-5 shrink-0 text-accent-text transition-transform duration-300', open && 'rotate-180')}
          />
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        inert={!open}
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-out',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <p className="pb-6 text-base text-muted md:text-[17px]">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export function Accordion({ items }: { items: Item[] }) {
  const baseId = useId();
  return (
    <div className="rounded-card border border-border bg-card px-5 md:px-7">
      {items.map((item, i) => (
        <AccordionItem key={item.q} item={item} id={`${baseId}-${i}`} />
      ))}
    </div>
  );
}
