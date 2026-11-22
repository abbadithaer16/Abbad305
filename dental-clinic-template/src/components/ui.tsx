import type { ComponentProps, ReactNode } from 'react';

export const cn = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(' ');

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-[75rem] px-4 sm:px-6 lg:px-8', className)}>{children}</div>;
}

export type Tone = 'bg' | 'surface';

export function Section({
  id,
  tone = 'bg',
  eyebrow,
  title,
  intro,
  children,
  className,
}: {
  id: string;
  tone?: Tone;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn('cv-auto py-16 md:py-24', tone === 'surface' ? 'bg-surface' : 'bg-bg', className)}
    >
      <Container>
        <div data-reveal>
          <SectionHeader id={id} eyebrow={eyebrow} title={title} intro={intro} />
          {children}
        </div>
      </Container>
    </section>
  );
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  intro,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
}) {
  return (
    <header className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
      <p className="mb-3 text-sm font-semibold tracking-wide text-primary-ink">{eyebrow}</p>
      <h2 id={`${id}-title`} className="text-[1.75rem] md:text-4xl">
        {title}
      </h2>
      {intro ? <p className="mt-4 text-muted">{intro}</p> : null}
    </header>
  );
}

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'md' | 'lg';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-on-primary shadow-soft hover:bg-primary-hover',
  secondary: 'border border-line bg-card text-ink hover:border-primary/40 hover:bg-primary-soft',
  ghost: 'text-primary-ink hover:bg-primary-soft',
};
const sizes: Record<ButtonSize, string> = {
  md: 'min-h-11 px-5 text-base',
  lg: 'min-h-13 px-6 text-[1.0625rem]',
};

export function buttonClass(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className?: string) {
  return cn(
    'lift inline-flex items-center justify-center gap-2 rounded-xl font-semibold whitespace-nowrap',
    variants[variant],
    sizes[size],
    className,
  );
}

type ButtonLinkProps = ComponentProps<'a'> & { variant?: ButtonVariant; size?: ButtonSize; external?: boolean };

export function ButtonLink({ variant, size, external, className, children, ...rest }: ButtonLinkProps) {
  const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <a {...ext} {...rest} className={buttonClass(variant, size, className)}>
      {children}
    </a>
  );
}

/** Keeps phone numbers left-to-right inside Arabic text. */
export function Ltr({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span dir="ltr" className={cn('whitespace-nowrap', className)}>
      {children}
    </span>
  );
}
