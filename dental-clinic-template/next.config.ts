import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static HTML export: `npm run build` writes the whole site to ./out
  // (deployable to Vercel, Netlify, or any static host).
  output: 'export',
  // /ar/ and /en/ become ar/index.html and en/index.html — works on every static host.
  trailingSlash: true,
  // Static export has no image server. Run `npm run images` to resize/compress photos instead.
  images: { unoptimized: true },
  // Bilingual 404 page (app/global-not-found.tsx), needed because the root layout is /[lang].
  experimental: { globalNotFound: true },
  // This folder is self-contained; don't let a lockfile in a parent folder confuse Turbopack.
  turbopack: { root: process.cwd() },
};

export default nextConfig;
