'use client';

import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { ChevronsLeftRight, ShieldCheck } from 'lucide-react';
import type { Lang, Photo } from '@/lib/types';
import { cn } from './ui';
import { ImageSlot } from './ImageSlot';

type Case = { title: string; before: Photo; after: Photo };

type Labels = {
  before: string;
  after: string;
  slider: string;
  chooseCase: string;
  consent: string;
  beforePhoto: string;
  afterPhoto: string;
};

const clamp = (n: number) => Math.min(100, Math.max(0, n));

/**
 * Before/after comparison. "Before" is always on the reading-start side
 * (left in English, right in Arabic). Drag anywhere on the image, or focus
 * the handle and use the arrow keys.
 */
export function BeforeAfter({ lang, cases, labels }: { lang: Lang; cases: Case[]; labels: Labels }) {
  const rtl = lang === 'ar';
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(50);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromPointer = useCallback(
    (clientX: number) => {
      const rect = frame.current?.getBoundingClientRect();
      if (!rect || rect.width === 0) return;
      const fromLeft = ((clientX - rect.left) / rect.width) * 100;
      setPos(clamp(rtl ? 100 - fromLeft : fromLeft));
    },
    [rtl],
  );

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromPointer(e.clientX);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) setFromPointer(e.clientX);
  };
  const stop = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    // Arrow pointing toward the reading end reveals more "before".
    const toEnd = rtl ? 'ArrowLeft' : 'ArrowRight';
    const toStart = rtl ? 'ArrowRight' : 'ArrowLeft';
    const step = e.shiftKey ? 10 : 5;
    let next: number | null = null;
    if (e.key === toEnd || e.key === 'ArrowUp') next = pos + step;
    else if (e.key === toStart || e.key === 'ArrowDown') next = pos - step;
    else if (e.key === 'PageUp') next = pos + 10;
    else if (e.key === 'PageDown') next = pos - 10;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = 100;
    if (next === null) return;
    e.preventDefault();
    setPos(clamp(next));
  };

  const current = cases[active];
  if (!current) return null;

  // Clip the "before" layer to the start side of the divider.
  const hidden = `${100 - pos}%`;
  const clipPath = rtl ? `inset(0 0 0 ${hidden})` : `inset(0 ${hidden} 0 0)`;

  return (
    <div className="mx-auto max-w-4xl">
      <div
        ref={frame}
        className="relative aspect-[4/3] cursor-ew-resize touch-pan-y overflow-hidden rounded-2xl border border-line shadow-soft select-none sm:aspect-[16/10]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stop}
        onPointerCancel={stop}
        onLostPointerCapture={stop}
      >
        <div className="absolute inset-0">
          <ImageSlot
            photo={current.after}
            lang={lang}
            subject={labels.afterPhoto}
            size="1600 × 1000 px"
            sizes="(min-width: 896px) 896px, 100vw"
            alt
            align="end"
            className="size-full"
          />
        </div>
        <div className="absolute inset-0" style={{ clipPath }}>
          <ImageSlot
            photo={current.before}
            lang={lang}
            subject={labels.beforePhoto}
            size="1600 × 1000 px"
            sizes="(min-width: 896px) 896px, 100vw"
            align="start"
            className="size-full"
          />
        </div>

        <span className="pointer-events-none absolute start-3 top-3 rounded-full bg-ink/75 px-3 py-1 text-sm font-medium text-white">
          {labels.before}
        </span>
        <span className="pointer-events-none absolute end-3 top-3 rounded-full bg-ink/75 px-3 py-1 text-sm font-medium text-white">
          {labels.after}
        </span>

        {/* Divider + handle (positioned with logical inset so RTL mirrors automatically) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.08)]"
          style={{ insetInlineStart: `${pos}%`, marginInlineStart: '-1px' }}
        />
        <div
          role="slider"
          tabIndex={0}
          aria-label={labels.slider}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${labels.before} ${Math.round(pos)}%`}
          onKeyDown={onKeyDown}
          className="absolute top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-card text-ink shadow-lift"
          style={{ insetInlineStart: `${pos}%`, marginInlineStart: '-1.5rem' }}
        >
          <ChevronsLeftRight className="size-5" strokeWidth={2} aria-hidden="true" />
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center gap-1 text-center">
        <p className="font-semibold text-ink">{current.title}</p>
        <p className="flex items-center gap-1.5 text-sm text-muted">
          <ShieldCheck className="size-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
          {labels.consent}
        </p>
      </div>

      {cases.length > 1 ? (
        <div className="mt-8">
          <p id="cases-label" className="sr-only">
            {labels.chooseCase}
          </p>
          <ul aria-labelledby="cases-label" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {cases.map((c, i) => (
              <li key={c.title}>
                <button
                  type="button"
                  aria-pressed={i === active}
                  onClick={() => {
                    setActive(i);
                    setPos(50);
                  }}
                  className={cn(
                    'lift group flex w-full flex-col gap-2 rounded-2xl border bg-card p-2 text-start',
                    i === active ? 'border-primary ring-2 ring-primary/25' : 'border-line hover:border-primary/40',
                  )}
                >
                  <span aria-hidden="true" className="grid grid-cols-2 gap-1 overflow-hidden rounded-xl">
                    <ImageSlot
                      photo={c.before}
                      lang={lang}
                      subject={labels.beforePhoto}
                      size=""
                      sizes="120px"
                      compact
                      className="aspect-square"
                    />
                    <ImageSlot
                      photo={c.after}
                      lang={lang}
                      subject={labels.afterPhoto}
                      size=""
                      sizes="120px"
                      compact
                      alt
                      className="aspect-square"
                    />
                  </span>
                  <span className="px-1 pb-1 text-[0.95rem] font-medium text-ink">{c.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
