import type { ReactNode } from 'react';
import { cn } from '@/lib/phone';

/*
 * The shield shape from the JHM logo: shallow peak on top, near-vertical sides,
 * shallow point at the bottom (traced from the logo, 100 × 74 units).
 */
const OUTER = 'M50 2 L97.5 15.5 L90.5 56.5 L50 72 L9.5 56.5 L2.5 15.5 Z';
const INNER = 'M50 8 L91.5 19.8 L85.6 53.2 L50 66.4 L14.4 53.2 L8.5 19.8 Z';

/** Gold gradient used by every shield. Rendered once in the layout. */
export function HexDefs({ stops }: { stops: [string, string, string] }) {
  return (
    <svg aria-hidden width="0" height="0" className="absolute" focusable="false">
      <defs>
        <linearGradient id="hex-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={stops[0]} />
          <stop offset="0.45" stopColor={stops[1]} />
          <stop offset="0.75" stopColor={stops[2]} />
          <stop offset="1" stopColor={stops[1]} />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Content framed by the logo's shield. Width comes from `className`; height follows the shape. */
export function HexFrame({
  children,
  className,
  thin = false,
}: {
  children: ReactNode;
  className?: string;
  /** Lighter outline for small icon badges. */
  thin?: boolean;
}) {
  return (
    <div className={cn('relative grid shrink-0 place-items-center', className)} style={{ aspectRatio: '100 / 74' }}>
      <svg viewBox="0 0 100 74" aria-hidden className="absolute inset-0 size-full overflow-visible">
        <path
          d={OUTER}
          fill="rgb(201 162 74 / 0.07)"
          stroke="url(#hex-gold)"
          strokeWidth={thin ? 1.75 : 2.5}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        {thin ? null : (
          <path
            d={INNER}
            fill="none"
            stroke="url(#hex-gold)"
            strokeOpacity={0.5}
            strokeWidth={1}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>
      <div className="relative">{children}</div>
    </div>
  );
}
