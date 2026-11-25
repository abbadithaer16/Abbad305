import Image from 'next/image';
import { Camera, MessageCircle, Phone, Star } from 'lucide-react';
import type { ReactNode } from 'react';
import { center, telHref, whatsappHref } from '@/lib/center';
import { getDictionary } from '@/lib/dictionary';
import { t } from '@/lib/i18n';
import { cn } from '@/lib/links';
import type { Lang, Photo } from '@/lib/types';

/* ------------------------------------------------------------------------- */

export function Section({
  id,
  tone = 'default',
  className,
  children,
  labelledBy,
}: {
  id?: string;
  tone?: 'default' | 'surface';
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('py-16 md:py-24', tone === 'surface' ? 'bg-surface' : 'bg-bg', className)}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeader({
  id,
  title,
  subtitle,
  className,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div data-reveal className={cn('mb-10 max-w-2xl md:mb-12', className)}>
      <h2 id={id} className="text-3xl font-bold md:text-4xl ltr:tracking-tight">
        {title}
      </h2>
      {subtitle ? <p className="mt-3 text-lg text-muted">{subtitle}</p> : null}
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------------- */

/**
 * A photo slot. With `photo.src` it renders next/image; without, a neutral labelled
 * placeholder that shows the subject and the recommended size.
 */
export function PhotoBox({
  photo,
  lang,
  width,
  height,
  sizes,
  preload = false,
  className,
}: {
  photo: Photo;
  lang: Lang;
  width: number;
  height: number;
  sizes: string;
  preload?: boolean;
  className?: string;
}) {
  const dict = getDictionary(lang);
  const alt = t(photo.alt, lang);
  return (
    <div
      className={cn('relative overflow-hidden rounded-card border border-border bg-placeholder', className)}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {photo.src ? (
        <Image
          src={photo.src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={`${dict.placeholder.label}: ${alt}`}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center text-placeholder-fg"
        >
          <Camera aria-hidden className="size-7 opacity-70" strokeWidth={1.5} />
          <span className="max-w-[22ch] text-[15px] font-semibold leading-snug">{alt}</span>
          <span className="ltr-nums text-[13px] opacity-90">
            {width} × {height}
          </span>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------------- */

export function Stars({ rating, className, label }: { rating: number; className?: string; label: string }) {
  return (
    <span role="img" aria-label={label} className={cn('inline-flex items-center gap-0.5', className)}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          aria-hidden
          className={cn('size-4', i <= Math.round(rating) ? 'fill-[#f5a623] text-[#c27c0e]' : 'text-border')}
          strokeWidth={1.5}
        />
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------------- */

export function Logo({ lang, className }: { lang: Lang; className?: string }) {
  const name = t(center.name, lang);
  if (center.logo.src) {
    return (
      <Image
        src={center.logo.src}
        alt={name}
        width={center.logo.width ?? 160}
        height={center.logo.height ?? 40}
        preload
        className={cn('h-10 w-auto', className)}
      />
    );
  }
  return (
    <span className={cn('flex min-w-0 items-center gap-2.5', className)}>
      <span
        aria-hidden
        className="grid size-10 shrink-0 place-items-center rounded-chip border border-accent-edge bg-accent text-lg font-bold text-accent-fg"
      >
        {center.logo.monogram}
      </span>
      <span className="line-clamp-2 text-[15px] font-bold leading-tight sm:text-base">{name}</span>
    </span>
  );
}

/* ------------------------------------------------------------------------- */

const buttonVariants = { primary: 'btn-primary', secondary: 'btn-secondary', band: 'btn-band' } as const;

export function WhatsAppButton({
  lang,
  message,
  children,
  className,
  variant = 'primary',
}: {
  lang: Lang;
  message?: string;
  children?: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'band';
}) {
  const dict = getDictionary(lang);
  return (
    <a
      href={whatsappHref(message ?? t(center.whatsappMessage, lang))}
      target="_blank"
      rel="noopener"
      className={cn('btn', buttonVariants[variant], className)}
    >
      <MessageCircle aria-hidden className="size-5 shrink-0" />
      <span>{children ?? dict.bookWhatsApp}</span>
    </a>
  );
}

export function CallButton({ lang, className, children }: { lang: Lang; className?: string; children?: ReactNode }) {
  const dict = getDictionary(lang);
  return (
    <a href={telHref()} className={cn('btn btn-secondary', className)}>
      <Phone aria-hidden className="size-5 shrink-0" />
      <span>{children ?? dict.callNow}</span>
    </a>
  );
}

export function PhoneNumber({ className }: { className?: string }) {
  return (
    <span dir="ltr" className={cn('ltr-nums', className)}>
      {center.contact.phoneDisplay}
    </span>
  );
}
