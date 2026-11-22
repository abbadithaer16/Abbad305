import Image from 'next/image';
import clinic from '@clinic';
import type { Lang } from '@/lib/types';
import { cn } from './ui';

/** Image logo from config, or a calm text logo (monogram + clinic name). */
export function Logo({ lang, className, inverted }: { lang: Lang; className?: string; inverted?: boolean }) {
  const { image, monogram } = clinic.logo;
  if (image) {
    return (
      <Image
        src={image.src}
        width={image.width}
        height={image.height}
        alt={clinic.name[lang]}
        priority
        className={cn('h-10 w-auto', className)}
      />
    );
  }
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <span
        aria-hidden="true"
        className={cn(
          'grid size-10 shrink-0 place-items-center rounded-xl text-lg font-semibold',
          inverted ? 'bg-white/10 text-white' : 'bg-primary text-on-primary',
        )}
      >
        {monogram}
      </span>
      <span
        className={cn(
          'text-[0.95rem] leading-tight font-semibold sm:text-base',
          inverted ? 'text-white' : 'text-ink',
        )}
      >
        {clinic.name[lang]}
      </span>
    </span>
  );
}
