import { visibleFaq } from '@/lib/center';
import { t } from '@/lib/i18n';
import type { FaqItem, Lang } from '@/lib/types';
import { Accordion } from '../Accordion';
import { Section } from '../ui';

export function Faq({
  lang,
  items,
  title,
  id = 'faq',
  tone = 'default',
}: {
  lang: Lang;
  items: FaqItem[];
  title: string;
  id?: string;
  tone?: 'default' | 'surface';
}) {
  const list = visibleFaq(items);
  if (!list.length) return null;
  return (
    <Section id={id} tone={tone} labelledBy={`${id}-title`}>
      <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-14">
        <h2 id={`${id}-title`} data-reveal className="text-3xl font-bold md:text-4xl ltr:tracking-tight">
          {title}
        </h2>
        <div data-reveal>
          <Accordion items={list.map((item) => ({ q: t(item.q, lang), a: t(item.a, lang) }))} />
        </div>
      </div>
    </Section>
  );
}
