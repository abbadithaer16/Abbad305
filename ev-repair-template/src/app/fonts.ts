import { IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from 'next/font/google';

// Two weights keep the Arabic download small; `font-semibold` text uses the 700 file.
export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-plex-ar',
  display: 'swap',
});

export const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-plex-en',
  display: 'swap',
});
