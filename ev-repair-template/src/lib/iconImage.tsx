import { ImageResponse } from 'next/og';
import { center } from './center';
import { themePalette as c } from './theme';

/** Monogram favicon in the theme's accent colour. */
export function monogramIcon(size: number) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: c.accent,
          color: c.accentFg,
          borderRadius: Math.round(size * 0.22),
          fontSize: Math.round(size * 0.6),
          fontWeight: 700,
        }}
      >
        {center.logo.monogram}
      </div>
    ),
    { width: size, height: size },
  );
}
