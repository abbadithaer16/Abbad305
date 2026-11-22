'use client';

import { useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { CircleAlert, CircleCheck, ChevronDown } from 'lucide-react';
import { buttonClass, cn } from './ui';
import { WhatsAppIcon } from './BrandIcons';

type Option = { value: string; label: string };

export type BookingLabels = {
  name: string;
  phone: string;
  phonePlaceholder: string;
  service: string;
  day: string;
  time: string;
  required: string;
  submit: string;
  privacy: string;
  errName: string;
  errPhone: string;
  sent: string;
  sentFallback: string;
  sentLink: string;
  msg: { greeting: string; name: string; phone: string; service: string; day: string; time: string };
};

/** Converts Arabic-Indic / Persian digits to Latin and strips separators. */
function normalizePhone(raw: string) {
  return raw
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[\s\-().‎‏]/g, '')
    .replace(/^00/, '+');
}

const isValidPhone = (raw: string) => /^\+?\d{8,15}$/.test(normalizePhone(raw));

export function BookingForm({
  whatsappNumber,
  services,
  days,
  times,
  labels,
}: {
  whatsappNumber: string;
  services: Option[];
  days: Option[];
  times: Option[];
  labels: BookingLabels;
}) {
  const id = useId();
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState({
    name: '',
    phone: '',
    service: services[0]?.value ?? '',
    day: days[0]?.value ?? '',
    time: times[0]?.value ?? '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  const errors = {
    name: values.name.trim().length < 2 ? labels.errName : null,
    phone: !isValidPhone(values.phone) ? labels.errPhone : null,
  };
  const show = (field: keyof typeof errors) => (submitted ? errors[field] : null);

  const update = (field: keyof typeof values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setSentUrl(null);
  };

  const labelOf = (opts: Option[], value: string) => opts.find((o) => o.value === value)?.label ?? value;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (errors.name) return nameRef.current?.focus();
    if (errors.phone) return phoneRef.current?.focus();

    const m = labels.msg;
    const message = [
      m.greeting,
      '',
      `${m.name}: ${values.name.trim()}`,
      `${m.phone}: ${normalizePhone(values.phone)}`,
      `${m.service}: ${labelOf(services, values.service)}`,
      `${m.day}: ${labelOf(days, values.day)}`,
      `${m.time}: ${labelOf(times, values.time)}`,
    ].join('\n');

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSentUrl(url);
  };

  const field =
    'block h-12 w-full rounded-xl border bg-card px-4 text-base text-ink placeholder:text-muted/80 focus:ring-4 focus:ring-primary/15 focus:outline-none focus-visible:outline-none';
  const ok = 'border-line focus:border-primary';
  const bad = 'border-danger focus:border-danger focus:ring-danger/15';

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-5">
      <Field id={`${id}-name`} label={labels.name} required={labels.required} error={show('name')}>
        <input
          ref={nameRef}
          id={`${id}-name`}
          name="name"
          type="text"
          autoComplete="name"
          required
          value={values.name}
          onChange={update('name')}
          aria-invalid={!!show('name')}
          aria-describedby={show('name') ? `${id}-name-err` : undefined}
          className={cn(field, show('name') ? bad : ok)}
        />
      </Field>

      <Field id={`${id}-phone`} label={labels.phone} required={labels.required} error={show('phone')}>
        <input
          ref={phoneRef}
          id={`${id}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          dir="ltr"
          required
          placeholder={labels.phonePlaceholder}
          value={values.phone}
          onChange={update('phone')}
          aria-invalid={!!show('phone')}
          aria-describedby={show('phone') ? `${id}-phone-err` : undefined}
          // Numbers are typed left-to-right but should line up with the other fields in Arabic.
          className={cn(field, 'rtl:text-right', show('phone') ? bad : ok)}
        />
      </Field>

      <Field id={`${id}-service`} label={labels.service}>
        <Select id={`${id}-service`} value={values.service} onChange={update('service')} options={services} className={cn(field, ok)} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${id}-day`} label={labels.day}>
          <Select id={`${id}-day`} value={values.day} onChange={update('day')} options={days} className={cn(field, ok)} />
        </Field>
        <Field id={`${id}-time`} label={labels.time}>
          <Select id={`${id}-time`} value={values.time} onChange={update('time')} options={times} className={cn(field, ok)} />
        </Field>
      </div>

      <button type="submit" className={buttonClass('primary', 'lg', 'mt-1 w-full')}>
        <WhatsAppIcon className="size-5" />
        {labels.submit}
      </button>

      <div aria-live="polite">
        {sentUrl ? (
          <p className="flex items-start gap-2 rounded-xl bg-primary-soft px-4 py-3 text-[0.95rem] text-ink">
            <CircleCheck className="mt-0.5 size-5 shrink-0 text-primary-ink" strokeWidth={1.75} aria-hidden="true" />
            <span>
              {labels.sent} {labels.sentFallback}{' '}
              <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary-ink underline underline-offset-4">
                {labels.sentLink}
              </a>
              .
            </span>
          </p>
        ) : (
          <p className="text-center text-sm text-muted">{labels.privacy}</p>
        )}
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: string;
  error?: string | null;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[0.95rem] font-medium text-ink">
        {label}
        {required ? (
          <>
            <span aria-hidden="true" className="text-danger">
              {' '}*
            </span>
            <span className="sr-only"> ({required})</span>
          </>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-err`} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-danger">
          <CircleAlert className="size-4 shrink-0" strokeWidth={2} aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Select({
  id,
  value,
  onChange,
  options,
  className,
}: {
  id: string;
  value: string;
  onChange: (e: { target: { value: string } }) => void;
  options: Option[];
  className: string;
}) {
  return (
    <div className="relative">
      <select id={id} value={value} onChange={onChange} className={cn(className, 'appearance-none pe-11')}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute end-4 top-1/2 size-4 -translate-y-1/2 text-muted"
        strokeWidth={2}
        aria-hidden="true"
      />
    </div>
  );
}
