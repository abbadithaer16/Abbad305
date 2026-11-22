import { IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from 'next/font/google';

// Self-hosted at build time by next/font (no requests to Google from the visitor's browser).
export const plex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex',
  display: 'swap',
});

export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-arabic',
  display: 'swap',
});
