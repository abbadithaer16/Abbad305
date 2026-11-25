import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static HTML export: `npm run build` writes the whole site to ./out
  output: 'export',
  // Every page becomes a folder with index.html (/ar/cars/toyota-prius/) so it
  // works on any static host (Vercel, Netlify, GitHub Pages, cPanel...).
  trailingSlash: true,
  images: {
    // No image server in a static export: photos are served as-is.
    // Run `npm run photos` to resize them first (see README).
    unoptimized: true,
  },
  experimental: {
    globalNotFound: true,
  },
  // This folder is a self-contained project (ignore lockfiles in parent folders).
  turbopack: { root: path.join(__dirname) },
  poweredByHeader: false,
};

export default nextConfig;
