/**
 * Resize and compress photos for the site.
 *
 *   1. Put the original photos (JPG / PNG / WebP, straight from the phone is fine)
 *      in ./photos-original
 *   2. Run `npm run photos`
 *   3. Use the results from ./public/photos in center.config.ts, e.g. src: '/photos/hero.webp'
 *
 * Photos are rotated correctly, resized to max 1600px wide, converted to WebP and
 * stripped of metadata (including GPS location).
 */
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.error('sharp is not installed. Run `npm install` first.');
  process.exit(1);
}

const input = path.resolve('photos-original');
const output = path.resolve('public/photos');
const MAX_WIDTH = Number(process.env.MAX_WIDTH || 1600);

const files = (await readdir(input).catch(() => [])).filter((f) => /\.(jpe?g|png|webp|tiff?)$/i.test(f));
if (!files.length) {
  console.log('No photos found. Put JPG/PNG/WebP files in ./photos-original and run again.');
  process.exit(0);
}
await mkdir(output, { recursive: true });

for (const file of files) {
  const name = path.parse(file).name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const target = path.join(output, `${name}.webp`);
  const info = await sharp(path.join(input, file))
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(target);
  const before = (await stat(path.join(input, file))).size;
  console.log(
    `${file} → /photos/${name}.webp  ${info.width}×${info.height}  ${Math.round(before / 1024)} KB → ${Math.round(info.size / 1024)} KB`,
  );
}
