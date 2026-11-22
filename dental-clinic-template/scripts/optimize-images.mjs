/**
 * npm run images
 *
 * Resizes and compresses the clinic's photos for the web.
 * Put originals (JPG/PNG/HEIC-converted/WebP, any size) in ./photos-src,
 * then run this. Optimised WebP files are written to ./public/images.
 *
 * The output width depends on the file name prefix:
 *   hero*            → 1600 px   (clinic or doctor photo in the hero)
 *   doctor*          → 1000 px   (lead doctor portrait, 4:5)
 *   team*            →  600 px   (other doctors)
 *   before*, after*  → 1600 px   (before/after cases)
 *   logo*            →  copied as-is if SVG, otherwise 600 px
 *   anything else    → 1600 px
 *
 * Metadata (EXIF, including GPS location from phones) is removed.
 */
import { copyFile, mkdir, readdir, stat } from 'node:fs/promises';
import { extname, basename, join } from 'node:path';
import sharp from 'sharp';

const SRC = 'photos-src';
const OUT = join('public', 'images');
const widths = [
  [/^hero/i, 1600],
  [/^doctor/i, 1000],
  [/^team/i, 600],
  [/^(before|after)/i, 1600],
  [/^logo/i, 600],
];
const exts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff']);

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => !f.startsWith('.') && f !== 'README.md');
if (!files.length) {
  console.log(`No photos found in ./${SRC}. Add the clinic's photos there and run again.`);
  process.exit(0);
}

for (const file of files) {
  const input = join(SRC, file);
  const ext = extname(file).toLowerCase();
  const name = basename(file, extname(file)).toLowerCase().replace(/[^a-z0-9-]+/g, '-');

  if (ext === '.svg') {
    await copyFile(input, join(OUT, `${name}.svg`));
    console.log(`copied     ${file} → /images/${name}.svg`);
    continue;
  }
  if (!exts.has(ext)) {
    console.log(`skipped    ${file} (unsupported type)`);
    continue;
  }

  const width = widths.find(([re]) => re.test(name))?.[1] ?? 1600;
  const output = join(OUT, `${name}.webp`);
  await sharp(input)
    .rotate() // respect phone orientation, then drop EXIF
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(output);
  const [before, after] = await Promise.all([stat(input), stat(output)]);
  console.log(
    `optimised  ${file} (${Math.round(before.size / 1024)} KB) → /images/${name}.webp (${Math.round(after.size / 1024)} KB, max ${width}px wide)`,
  );
}
console.log('\nNow point clinic.config.ts at these files, e.g. image: { src: "/images/hero.webp", alt: {...} }');
