'use client';

import { ChevronDown, MessageCircle } from 'lucide-react';
import { useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { getDictionary } from '@/lib/dictionary';
import { cn, waLink } from '@/lib/links';
import type { Lang } from '@/lib/types';

type Option = { value: string; label: string };

type Props = {
  lang: Lang;
  whatsapp: string;
  makes: Option[];
  /** Model suggestions per make value. */
  models: Record<string, string[]>;
  days: Option[];
  pickupEnabled: boolean;
  defaultMake?: string;
  defaultModel?: string;
};

type Values = {
  name: string;
  phone: string;
  make: string;
  model: string;
  year: string;
  problem: string;
  day: string;
  pickup: boolean;
};

type Field = 'name' | 'phone' | 'make' | 'model' | 'year' | 'problem';
type Errors = Partial<Record<Field, string>>;

const problemKeys = ['warning', 'battery', 'ac', 'noise', 'service', 'other'] as const;
const OTHER = '__other__';

export function BookingForm({ lang, whatsapp, makes, models, days, pickupEnabled, defaultMake, defaultModel }: Props) {
  const dict = getDictionary(lang).booking;
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const maxYear = new Date().getFullYear() + 1;

  const [values, setValues] = useState<Values>({
    name: '',
    phone: '',
    make: defaultMake ?? '',
    model: defaultModel ?? '',
    year: '',
    problem: '',
    day: '',
    pickup: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  function validate(v: Values): Errors {
    const e: Errors = {};
    if (v.name.trim().length < 2) e.name = dict.errors.required;
    const digits = v.phone.replace(/\D/g, '');
    if (!v.phone.trim()) e.phone = dict.errors.required;
    else if (digits.length < 9 || digits.length > 15 || /[^\d\s+\-()]/.test(v.phone)) e.phone = dict.errors.phone;
    if (!v.make) e.make = dict.errors.required;
    if (!v.model.trim()) e.model = dict.errors.required;
    if (v.year.trim()) {
      const y = Number(v.year);
      if (!/^\d{4}$/.test(v.year.trim()) || y < 1995 || y > maxYear) e.year = dict.errors.year(maxYear);
    }
    if (!v.problem) e.problem = dict.errors.required;
    return e;
  }

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    const next = { ...values, [key]: value };
    setValues(next);
    if (submitted) setErrors(validate(next));
  }

  function buildMessage(v: Values): string {
    const m = dict.msg;
    const makeLabel = v.make === OTHER ? '' : (makes.find((o) => o.value === v.make)?.label ?? v.make);
    const car = [makeLabel, v.model.trim()].filter(Boolean).join(' ');
    const dayLabel = days.find((d) => d.value === v.day)?.label ?? dict.asap;
    const lines = [
      m.hello,
      '',
      `${m.name}: ${v.name.trim()}`,
      `${m.phone}: ${v.phone.trim()}`,
      `${m.car}: ${car}`,
      v.year.trim() ? `${m.year}: ${v.year.trim()}` : null,
      `${m.problem}: ${dict.problems[v.problem as (typeof problemKeys)[number]]}`,
      `${m.day}: ${dayLabel}`,
      pickupEnabled && v.pickup ? `${m.pickup}: ${m.yes}` : null,
    ];
    return lines.filter((l): l is string => l !== null).join('\n');
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    const e = validate(values);
    setErrors(e);
    const firstInvalid = (Object.keys(e) as Field[])[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    const url = waLink(whatsapp, buildMessage(values));
    setSentUrl(url);
    const win = window.open(url, '_blank');
    if (win) win.opener = null;
    else window.location.href = url;
  }

  const id = (f: string) => `${uid}-${f}`;
  const describedBy = (f: Field) => (errors[f] ? id(`${f}-error`) : undefined);
  const inputClass = (f?: Field) =>
    cn(
      'block w-full min-h-12 rounded-btn border bg-bg px-3.5 text-base text-fg placeholder:text-muted/80',
      'focus-visible:outline-3 focus-visible:outline-offset-1 focus-visible:outline-accent-text',
      f && errors[f] ? 'border-danger' : 'border-[color-mix(in_srgb,var(--fg)_25%,transparent)]',
    );

  const suggestions = models[values.make] ?? [];
  const errorCount = Object.keys(errors).length;

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <FieldWrap id={id('name')} label={dict.name} error={errors.name}>
        <input
          id={id('name')}
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={(e) => update('name', e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={describedBy('name')}
          required
          className={inputClass('name')}
        />
      </FieldWrap>

      <FieldWrap id={id('phone')} label={dict.phone} error={errors.phone}>
        <input
          id={id('phone')}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          dir="ltr"
          placeholder="07X XXX XXXX"
          value={values.phone}
          onChange={(e) => update('phone', e.target.value)}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={describedBy('phone')}
          required
          className={inputClass('phone')}
        />
      </FieldWrap>

      <FieldWrap id={id('make')} label={dict.make} error={errors.make}>
        <SelectWrap>
          <select
            id={id('make')}
            name="make"
            value={values.make}
            onChange={(e) => update('make', e.target.value)}
            aria-invalid={Boolean(errors.make)}
            aria-describedby={describedBy('make')}
            required
            className={cn(inputClass('make'), 'appearance-none pe-10')}
          >
            <option value="" disabled>
              {dict.choose}
            </option>
            {makes.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
            <option value={OTHER}>{dict.otherMake}</option>
          </select>
        </SelectWrap>
      </FieldWrap>

      <FieldWrap id={id('model')} label={dict.model} error={errors.model}>
        <input
          id={id('model')}
          name="model"
          type="text"
          list={suggestions.length ? id('models') : undefined}
          placeholder={dict.modelPlaceholder}
          value={values.model}
          onChange={(e) => update('model', e.target.value)}
          aria-invalid={Boolean(errors.model)}
          aria-describedby={describedBy('model')}
          required
          className={inputClass('model')}
        />
        {suggestions.length ? (
          <datalist id={id('models')}>
            {suggestions.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
        ) : null}
      </FieldWrap>

      <FieldWrap id={id('year')} label={dict.year} optional={dict.optional} error={errors.year}>
        <input
          id={id('year')}
          name="year"
          type="text"
          inputMode="numeric"
          maxLength={4}
          placeholder={dict.yearPlaceholder}
          value={values.year}
          onChange={(e) => update('year', e.target.value.replace(/[^\d]/g, ''))}
          aria-invalid={Boolean(errors.year)}
          aria-describedby={describedBy('year')}
          className={inputClass('year')}
        />
      </FieldWrap>

      <FieldWrap id={id('problem')} label={dict.problem} error={errors.problem}>
        <SelectWrap>
          <select
            id={id('problem')}
            name="problem"
            value={values.problem}
            onChange={(e) => update('problem', e.target.value)}
            aria-invalid={Boolean(errors.problem)}
            aria-describedby={describedBy('problem')}
            required
            className={cn(inputClass('problem'), 'appearance-none pe-10')}
          >
            <option value="" disabled>
              {dict.choose}
            </option>
            {problemKeys.map((key) => (
              <option key={key} value={key}>
                {dict.problems[key]}
              </option>
            ))}
          </select>
        </SelectWrap>
      </FieldWrap>

      <FieldWrap id={id('day')} label={dict.day}>
        <SelectWrap>
          <select
            id={id('day')}
            name="day"
            value={values.day}
            onChange={(e) => update('day', e.target.value)}
            className={cn(inputClass(), 'appearance-none pe-10')}
          >
            <option value="">{dict.asap}</option>
            {days.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </SelectWrap>
      </FieldWrap>

      {pickupEnabled ? (
        <div className="flex items-center sm:pt-8">
          <label className="flex min-h-12 cursor-pointer items-center gap-3 text-base">
            <input
              type="checkbox"
              name="pickup"
              checked={values.pickup}
              onChange={(e) => update('pickup', e.target.checked)}
              className="size-5 shrink-0 accent-accent-text"
            />
            {dict.pickup}
          </label>
        </div>
      ) : null}

      <div className="sm:col-span-2">
        {submitted && errorCount > 0 ? (
          <p role="alert" className="mb-4 font-semibold text-danger">
            {dict.errors.summary}
          </p>
        ) : null}
        <button type="submit" className="btn btn-primary min-h-14 w-full text-lg">
          <MessageCircle aria-hidden className="size-5" />
          {dict.submit}
        </button>
        <p className="mt-3 text-[15px] text-muted">{dict.privacy}</p>
        {sentUrl ? (
          <div role="status" className="mt-4 rounded-chip border border-border bg-surface p-4 text-base">
            <p>{dict.sent}</p>
            <a
              href={sentUrl}
              target="_blank"
              rel="noopener"
              className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-accent-text underline underline-offset-4"
            >
              <MessageCircle aria-hidden className="size-4" />
              {dict.openAgain}
            </a>
          </div>
        ) : null}
      </div>
    </form>
  );
}

function FieldWrap({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-base font-semibold">
        {label}
        {optional ? <span className="ms-1.5 text-[15px] font-normal text-muted">({optional})</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-[15px] font-semibold text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectWrap({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute end-3 top-1/2 size-5 -translate-y-1/2 text-muted"
      />
    </div>
  );
}
