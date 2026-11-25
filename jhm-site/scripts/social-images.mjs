/**
 * Creates the social preview image (og.jpg, 1200×630) and the browser / phone icons
 * from the logo and a photo. Run after changing the logo or the main photo:
 *
 *   npm run social-images
 *   node scripts/social-images.mjs <logo> <photo> <output folder>   (other paths)
 *
 * The logo is expected on a black background, like the JHM logo.
 */
import path from 'node:path';
import sharp from 'sharp';

const [logo = 'public/images/jhm/logo.jpg', photo = 'public/images/jhm/storefront.jpg', outDir = 'public/images/jhm'] =
  process.argv.slice(2);

// Icons: square crop around the badge, on black.
const logoMeta = await sharp(logo).metadata();
const side = Math.round(Math.min(logoMeta.width, logoMeta.height) * 0.96);
const square = await sharp(logo)
  .extract({
    left: Math.round((logoMeta.width - side) / 2),
    top: Math.round((logoMeta.height - side) / 2),
    width: side,
    height: side,
  })
  .toBuffer();
await sharp(square).resize(192, 192).png({ palette: true, quality: 90, effort: 10 }).toFile(path.join(outDir, 'icon.png'));
await sharp(square).resize(180, 180).png({ palette: true, quality: 90, effort: 10 }).toFile(path.join(outDir, 'apple-touch-icon.png'));

// Social image: photo on the left, darkened, logo on the right (Arabic layout reads right first).
const W = 1200;
const H = 630;
const bg = await sharp(photo).rotate().resize(W, H, { fit: 'cover', position: 'north' }).toBuffer();
const shade = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="1" y1="0" x2="0" y2="0">
    <stop offset="0" stop-color="#000" stop-opacity="1"/>
    <stop offset="0.48" stop-color="#000" stop-opacity="1"/>
    <stop offset="0.78" stop-color="#000" stop-opacity="0.45"/>
    <stop offset="1" stop-color="#000" stop-opacity="0.2"/>
  </linearGradient></defs>
  <rect width="100%" height="100%" fill="url(#g)"/></svg>`);
const badge = await sharp(logo).resize(470, 470).toBuffer();
await sharp(bg)
  .composite([
    { input: shade, top: 0, left: 0 },
    { input: badge, top: Math.round((H - 470) / 2), left: W - 470 - 40, blend: 'lighten' },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(outDir, 'og.jpg'));

console.log(`Wrote og.jpg, icon.png and apple-touch-icon.png to ${outDir}`);
