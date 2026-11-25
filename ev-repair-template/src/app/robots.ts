import type { MetadataRoute } from 'next';
import { absoluteUrl, center } from '@/lib/center';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  if (!center.allowIndexing) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
