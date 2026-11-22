import type { ThemePreset, ThemeTokens } from './types';

/**
 * Colour presets. All text/background pairs below pass WCAG AA (4.5:1).
 * Pick one with `theme` in clinic.config.ts; tweak with `themeOverrides`.
 */
export const themes: Record<ThemePreset, ThemeTokens> = {
  // White + soft blue
  clinical: {
    bg: '#ffffff',
    surface: '#f3f7fc',
    card: '#ffffff',
    ink: '#0f2540',
    copy: '#34465c',
    muted: '#56677d',
    line: '#dce5ef',
    primary: '#1d5fa8',
    primaryHover: '#174e8c',
    primarySoft: '#e7f0fa',
    primaryInk: '#1a5596',
    onPrimary: '#ffffff',
    placeholder: '#e3eaf2',
    placeholderAlt: '#eef3f8',
  },
  // White + mint/teal
  fresh: {
    bg: '#ffffff',
    surface: '#f1f9f7',
    card: '#ffffff',
    ink: '#0e2e2a',
    copy: '#2f4d48',
    muted: '#4f6863',
    line: '#d5e9e4',
    primary: '#0b7568',
    primaryHover: '#095f55',
    primarySoft: '#e0f3ee',
    primaryInk: '#096a5e',
    onPrimary: '#ffffff',
    placeholder: '#dcebe7',
    placeholderAlt: '#ebf5f2',
  },
  // Warm off-white + soft gold/beige (cosmetic clinics)
  premium: {
    bg: '#fbf8f3',
    surface: '#f3ece1',
    card: '#ffffff',
    ink: '#2a2218',
    copy: '#4a3f31',
    muted: '#66594a',
    line: '#e6dccb',
    primary: '#85662f',
    primaryHover: '#6e5426',
    primarySoft: '#f0e6d4',
    primaryInk: '#74592a',
    onPrimary: '#ffffff',
    placeholder: '#ebe2d3',
    placeholderAlt: '#f4eee4',
  },
};

const cssVarName: Record<keyof ThemeTokens, string> = {
  bg: '--bg',
  surface: '--surface',
  card: '--card',
  ink: '--ink',
  copy: '--copy',
  muted: '--muted',
  line: '--line',
  primary: '--primary',
  primaryHover: '--primary-hover',
  primarySoft: '--primary-soft',
  primaryInk: '--primary-ink',
  onPrimary: '--on-primary',
  placeholder: '--placeholder',
  placeholderAlt: '--placeholder-alt',
};

export function resolveTheme(preset: ThemePreset, overrides?: Partial<ThemeTokens>): ThemeTokens {
  return { ...themes[preset], ...overrides };
}

/** Theme tokens as CSS custom properties, applied on <html>. */
export function themeStyle(tokens: ThemeTokens): Record<string, string> {
  const style: Record<string, string> = {};
  for (const key of Object.keys(cssVarName) as (keyof ThemeTokens)[]) {
    style[cssVarName[key]] = tokens[key];
  }
  return style;
}
