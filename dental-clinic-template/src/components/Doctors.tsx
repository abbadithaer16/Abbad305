import { Award, Check, GraduationCap, Quote, ScrollText } from 'lucide-react';
import clinic from '@clinic';
import type { Lang } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import { cn, Container, type Tone } from './ui';
import { ImageSlot } from './ImageSlot';

export function Doctors({ lang, tone }: { lang: Lang; tone: Tone }) {
  const t = getDictionary(lang);
  const [lead, ...team] = clinic.doctors;
  if (!lead) return null;

  return (
    <section
      id="doctor"
      aria-labelledby="doctor-title"
      className={cn('cv-auto py-16 md:py-24', tone === 'surface' ? 'bg-surface' : 'bg-bg')}
    >
      <Container>
        <div data-reveal>
          <div className="grid items-start gap-10 md:grid-cols-12 lg:gap-14">
            <ImageSlot
              photo={lead.photo}
              lang={lang}
              subject={t.placeholder.doctor}
              size="1000 × 1250 px"
              sizes="(min-width: 1200px) 460px, (min-width: 768px) 40vw, 100vw"
              className="aspect-[4/5] rounded-2xl shadow-soft md:col-span-5"
            />

            <div className="md:col-span-7">
              <p className="mb-3 text-sm font-semibold tracking-wide text-primary-ink">
                {t.doctor.eyebrow(clinic.doctors.length, lead.gender)}
              </p>
              <h2 id="doctor-title" className="text-[1.75rem] md:text-4xl">
                {lead.name[lang]}
              </h2>
              <p className="mt-2 text-lg font-medium text-primary-ink">{lead.role[lang]}</p>

              {lead.note ? (
                <figure className="mt-7 rounded-2xl border border-line bg-card p-6 shadow-soft">
                  <Quote className="mb-3 size-6 text-primary-ink rtl:-scale-x-100" strokeWidth={1.75} aria-hidden="true" />
                  <blockquote className="text-copy">{lead.note[lang]}</blockquote>
                </figure>
              ) : null}

              <div className="mt-8 grid gap-7 sm:grid-cols-2">
                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-ink md:text-lg">
                    <ScrollText className="size-5 text-primary-ink" strokeWidth={1.75} aria-hidden="true" />
                    {t.doctor.credentials}
                  </h3>
                  <ul className="grid gap-2">
                    {lead.credentials.map((c) => (
                      <li key={c.en} className="flex items-start gap-2 text-[0.975rem]">
                        <Check className="mt-1.5 size-4 shrink-0 text-primary-ink" strokeWidth={2.25} aria-hidden="true" />
                        {c[lang]}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid content-start gap-7">
                  {lead.university ? (
                    <div>
                      <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-ink md:text-lg">
                        <GraduationCap className="size-5 text-primary-ink" strokeWidth={1.75} aria-hidden="true" />
                        {t.doctor.university}
                      </h3>
                      <p className="text-[0.975rem]">{lead.university[lang]}</p>
                    </div>
                  ) : null}

                  {lead.memberships?.length ? (
                    <div>
                      <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-ink md:text-lg">
                        <Award className="size-5 text-primary-ink" strokeWidth={1.75} aria-hidden="true" />
                        {t.doctor.memberships}
                      </h3>
                      <ul className="grid gap-2">
                        {lead.memberships.map((m) => (
                          <li key={m.en} className="flex items-start gap-2 text-[0.975rem]">
                            <Check className="mt-1.5 size-4 shrink-0 text-primary-ink" strokeWidth={2.25} aria-hidden="true" />
                            {m[lang]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {team.length ? (
            <div className="mt-16">
              <h3 className="mb-6 text-center text-xl md:text-2xl">{t.doctor.team}</h3>
              <ul className="flex flex-wrap justify-center gap-4">
                {team.map((doc) => (
                  <li
                    key={doc.name.en}
                    className="flex w-full items-center gap-4 rounded-2xl border border-line bg-card p-4 shadow-soft sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]"
                  >
                    <ImageSlot
                      photo={doc.photo}
                      lang={lang}
                      subject={t.placeholder.team}
                      size="600 × 750"
                      sizes="96px"
                      compact
                      className="aspect-[4/5] w-24 shrink-0 rounded-xl"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-ink">{doc.name[lang]}</p>
                      <p className="text-[0.95rem] text-primary-ink">{doc.role[lang]}</p>
                      {doc.credentials[0] ? <p className="mt-1 text-sm text-muted">{doc.credentials[0][lang]}</p> : null}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
