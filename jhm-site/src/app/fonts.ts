import { Alexandria, IBM_Plex_Sans_Arabic } from 'next/font/google';

/** Headings and all bold / semibold text (buttons, labels, names). */
export const alexandria = Alexandria({
  subsets: ['arabic', 'latin'],
  weight: ['600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

/** Body text */
/** Body text, regular weight only (bold text uses Alexandria). */
export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400'],
  variable: '--font-body',
  display: 'swap',
});
