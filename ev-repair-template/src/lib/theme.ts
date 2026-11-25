import { center } from './center';

/**
 * A few theme colours for generated images (social preview, favicon).
 * Keep in sync with the presets in src/app/globals.css.
 */
const palette = {
  electric: { band: '#0d1b14', bandFg: '#ffffff', bandMuted: '#b4c4bb', accent: '#22d36e', accentFg: '#05210f' },
  night: { band: '#102b2a', bandFg: '#eef3f4', bandMuted: '#b3c9c6', accent: '#2dd4bf', accentFg: '#032420' },
  classic: { band: '#0f1f47', bandFg: '#ffffff', bandMuted: '#c1cbe2', accent: '#ffffff', accentFg: '#0f1f47' },
} as const;

export const themePalette = palette[center.theme];
