import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import clinic from '@clinic';
import { theme } from './site';
import { formatRating } from './format';

/** Fonts for generated images (Satori needs .woff/.ttf, read from node_modules at build time). */
export async function ogFonts() {
  const dir = join(process.cwd(), 'node_modules/@fontsource/ibm-plex-sans/files');
  const [medium, semibold] = await Promise.all([
    readFile(join(dir, 'ibm-plex-sans-latin-500-normal.woff')),
    readFile(join(dir, 'ibm-plex-sans-latin-600-normal.woff')),
  ]);
  return [
    { name: 'Plex', data: medium, weight: 500 as const, style: 'normal' as const },
    { name: 'Plex', data: semibold, weight: 600 as const, style: 'normal' as const },
  ];
}

/**
 * Social share image (1200×630). Uses the English name: the image renderer
 * cannot shape Arabic script correctly. Replace with a static file if you prefer
 * (README → Share image).
 */
export function OgCard() {
  const { location, rating } = clinic;
  const details = [
    `${location.area.en}, ${location.city.en}`,
    rating ? `Rated ${formatRating(rating.value, 'en')} on Google` : null,
    clinic.contact.phone,
  ].filter(Boolean) as string[];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: theme.surface,
        fontFamily: 'Plex',
        padding: 56,
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: theme.card,
          borderRadius: 32,
          border: `2px solid ${theme.line}`,
          padding: '64px 72px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <div
            style={{
              width: 112,
              height: 112,
              borderRadius: 28,
              background: theme.primary,
              color: theme.onPrimary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 60,
              fontWeight: 600,
            }}
          >
            {clinic.logo.monogram}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 64, fontWeight: 600, color: theme.ink, lineHeight: 1.1 }}>{clinic.name.en}</div>
            <div style={{ fontSize: 34, fontWeight: 500, color: theme.muted, marginTop: 12 }}>{clinic.tagline.en}</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {details.map((d) => (
            <div
              key={d}
              style={{
                display: 'flex',
                fontSize: 28,
                fontWeight: 500,
                color: theme.primaryInk,
                background: theme.primarySoft,
                borderRadius: 999,
                padding: '12px 28px',
              }}
            >
              {d}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Favicon / app icon: the monogram on the theme colour. */
export function IconMark({ size, radius }: { size: number; radius: number }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.primary,
        color: theme.onPrimary,
        borderRadius: radius,
        fontFamily: 'Plex',
        fontWeight: 600,
        fontSize: size * 0.56,
      }}
    >
      {clinic.logo.monogram}
    </div>
  );
}
