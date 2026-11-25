import { dict, site, t } from '@/lib/site';
import { DeferredPhoto } from '../Photo';
import { Section, SectionTitle, WhatsAppButton } from '../ui';

export function Team() {
  const photo = site.images.team;
  return (
    <Section id="team" labelledBy="team-title" surface>
      <div className="grid items-center gap-8 md:grid-cols-[1.25fr_1fr] md:gap-14">
        <div className="relative aspect-[4/3] overflow-hidden rounded-card">
          <DeferredPhoto photo={photo} sizes="(min-width: 768px) 600px, 100vw" className="object-cover" />
        </div>
        <div>
          <SectionTitle id="team-title">{dict.team.title}</SectionTitle>
          <p className="mt-4 max-w-[34ch] text-xl leading-relaxed text-fg md:text-2xl">{t(site.team.text)}</p>
          <WhatsAppButton className="mt-8" />
        </div>
      </div>
    </Section>
  );
}
