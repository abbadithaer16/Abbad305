import { ImageResponse } from 'next/og';
import { center } from '@/lib/center';
import { themePalette as c } from '@/lib/theme';

export const dynamic = 'force-static';

// Social preview (WhatsApp, Facebook, X...). English text only: the image renderer
// can't shape Arabic script. Replace with a photo via `seo.ogImage` in the config.
async function loadFont(weight: 400 | 700): Promise<ArrayBuffer | null> {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@${weight}`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null; // offline build: fall back to the default font
  }
}

export async function GET() {
  const [regular, bold] = await Promise.all([loadFont(400), loadFont(700)]);
  const fonts = [
    regular && { name: 'Plex', data: regular, weight: 400 as const, style: 'normal' as const },
    bold && { name: 'Plex', data: bold, weight: 700 as const, style: 'normal' as const },
  ].filter((f): f is NonNullable<typeof f> => Boolean(f));
  const services = center.services.slice(0, 4).map((s) => s.title.en);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: c.band,
          color: c.bandFg,
          fontFamily: fonts.length ? 'Plex' : undefined,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 20,
              background: c.accent,
              color: c.accentFg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 56,
              fontWeight: 700,
            }}
          >
            {center.logo.monogram}
          </div>
          <div style={{ fontSize: 34, color: c.bandMuted }}>{center.city.en}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>{center.name.en}</div>
          <div style={{ fontSize: 38, color: c.bandMuted }}>{center.hero.headline.en}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: 28 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 28px', color: c.bandMuted, maxWidth: 780 }}>
            {services.map((s) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 10, height: 10, borderRadius: 5, background: c.accent }} />
                {s}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', fontWeight: 700, fontSize: 36 }}>{center.contact.phoneDisplay}</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts: fonts.length ? fonts : undefined },
  );
}
