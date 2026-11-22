import { ImageResponse } from 'next/og';
import { IconMark, ogFonts } from '@/lib/og';

export const dynamic = 'force-static';

/** /apple-touch-icon.png — home-screen icon (iOS rounds the corners itself). */
export async function GET() {
  return new ImageResponse(<IconMark size={180} radius={0} />, { width: 180, height: 180, fonts: await ogFonts() });
}
