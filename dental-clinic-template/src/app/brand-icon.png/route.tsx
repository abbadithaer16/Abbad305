import { ImageResponse } from 'next/og';
import { IconMark, ogFonts } from '@/lib/og';

export const dynamic = 'force-static';

/** /brand-icon.png — favicon from the monogram and theme colour. */
export async function GET() {
  return new ImageResponse(<IconMark size={64} radius={14} />, { width: 64, height: 64, fonts: await ogFonts() });
}
