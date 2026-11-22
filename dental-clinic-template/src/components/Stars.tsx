import { Star } from 'lucide-react';
import { cn } from './ui';

/** Decorative star row; always pair it with the rating in text. */
export function Stars({ value, className }: { value: number; className?: string }) {
  const full = Math.round(value);
  return (
    <span className={cn('inline-flex items-center gap-0.5', className)} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn('size-[1.1em]', i < full ? 'fill-star text-star' : 'fill-line text-line')}
          strokeWidth={1.5}
        />
      ))}
    </span>
  );
}
