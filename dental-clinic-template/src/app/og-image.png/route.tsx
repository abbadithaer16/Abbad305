import { ImageResponse } from 'next/og';
import { OgCard, ogFonts } from '@/lib/og';

export const dynamic = 'force-static';

/** /og-image.png — social share image, generated at build time from clinic.config.ts. */
export async function GET() {
  return new ImageResponse(<OgCard />, { width: 1200, height: 630, fonts: await ogFonts() });
}
