import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import type { Lang, Photo } from '@/lib/types';
import { cn } from './ui';

/**
 * Shows a real photo, or a neutral labeled placeholder with the recommended size
 * so the clinic's photo can be dropped in later (see README → Photos).
 */
export function ImageSlot({
  photo,
  lang,
  subject,
  size,
  sizes,
  className,
  priority,
  alt: altTone,
  align = 'center',
  compact,
}: {
  photo: Photo;
  lang: Lang;
  subject: string;
  /** Recommended size, e.g. "1200 × 1000 px" */
  size: string;
  /** next/image `sizes` */
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Use the alternate placeholder tone (e.g. for "after" photos) */
  alt?: boolean;
  /** Where the placeholder label sits (used by the before/after slider) */
  align?: 'start' | 'center' | 'end';
  /** Small slots: show only the icon and size */
  compact?: boolean;
}) {
  if (photo) {
    return (
      <div className={cn('relative overflow-hidden bg-placeholder', className)}>
        <Image
          src={photo.src}
          alt={photo.alt[lang]}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={size ? `${subject} (${size})` : subject}
      className={cn(
        'relative flex items-center overflow-hidden',
        align === 'start' ? 'justify-start' : align === 'end' ? 'justify-end' : 'justify-center',
        altTone ? 'bg-placeholder-alt' : 'bg-placeholder',
        className,
      )}
    >
      <div
        className={cn(
          'pointer-events-none absolute rounded-[inherit] border border-dashed border-muted/35',
          compact ? 'inset-1.5' : 'inset-3',
        )}
      />
      <div
        className={cn(
          'flex flex-col items-center gap-1.5 text-center text-copy',
          compact ? 'px-1' : 'px-4',
          align === 'center' ? '' : 'w-1/2',
        )}
      >
        <ImageIcon className={cn('text-muted', compact ? 'size-5' : 'size-7')} strokeWidth={1.5} aria-hidden="true" />
        {compact ? null : <span className="text-sm font-medium">{subject}</span>}
        {size ? (
          <span dir="ltr" className={cn('tracking-wide', compact ? 'text-[0.6875rem]' : 'text-xs')}>
            {size}
          </span>
        ) : null}
      </div>
    </div>
  );
}
