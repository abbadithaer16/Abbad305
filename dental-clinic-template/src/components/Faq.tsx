import clinic from '@clinic';
import type { Lang } from '@/lib/types';
import { getDictionary } from '@/lib/i18n';
import { waLink } from '@/lib/contact';
import { ButtonLink, Section, type Tone } from './ui';
import { FaqList } from './FaqList';
import { WhatsAppIcon } from './BrandIcons';

export function Faq({ lang, tone }: { lang: Lang; tone: Tone }) {
  const t = getDictionary(lang);
  return (
    <Section id="faq" tone={tone} eyebrow={t.faq.eyebrow} title={t.faq.title}>
      <div className="mx-auto max-w-3xl">
        <FaqList items={clinic.faq.map((f) => ({ q: f.q[lang], a: f.a[lang] }))} />
        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <p className="font-medium text-ink">{t.faq.more}</p>
          <ButtonLink href={waLink(t.whatsappMessages.faq(clinic.name[lang]))} external variant="secondary">
            <WhatsAppIcon className="size-[1.1rem] text-whatsapp" />
            {t.faq.ask}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
