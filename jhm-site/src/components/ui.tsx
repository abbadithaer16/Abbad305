import Image from 'next/image';
import { MessageCircle, Phone } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/phone';
import { bookingWhatsApp, dict, site, t, telHref } from '@/lib/site';

export function Section({
  id,
  labelledBy,
  surface = false,
  className,
  children,
}: {
  id?: string;
  labelledBy: string;
  surface?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('py-16 md:py-24', surface ? 'bg-surface' : 'bg-bg', className)}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionTitle({ id, children, className }: { id: string; children: ReactNode; className?: string }) {
  return (
    <h2 id={id} className={cn('text-[1.75rem] font-bold md:text-4xl', className)}>
      {children}
    </h2>
  );
}

/** The logo, cropped to its shield (the file has wide black margins). */
export function Logo({ className, sizes = '72px', eager = false }: { className?: string; sizes?: string; eager?: boolean }) {
  const logo = site.images.logo;
  return (
    <span className={cn('relative block shrink-0 overflow-hidden', className)} style={{ aspectRatio: '100 / 74' }}>
      <Image src={logo.src} alt={t(logo.alt)} fill sizes={sizes} loading={eager ? 'eager' : 'lazy'} className="object-cover" />
    </span>
  );
}

export function WhatsAppButton({
  message,
  className,
  children,
}: {
  message?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <a href={bookingWhatsApp(message)} target="_blank" rel="noopener" className={cn('btn btn-gold', className)}>
      <MessageCircle aria-hidden className="size-5 shrink-0" />
      {children ?? dict.bookWhatsApp}
    </a>
  );
}

export function CallButton({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <a href={telHref(site.booking.phone)} className={cn('btn btn-line', className)}>
      <Phone aria-hidden className="size-5 shrink-0" />
      {children ?? dict.callNow}
    </a>
  );
}

/** Phone numbers always read left-to-right, even inside Arabic text. */
export function PhoneText({ number, className }: { number: string; className?: string }) {
  return (
    <span dir="ltr" className={cn('inline-block', className)}>
      {number}
    </span>
  );
}
