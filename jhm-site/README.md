# JHM – الأردنية لصيانة الهايبرد

One-page Arabic (RTL) website for JHM – Jordan Hybrid Maintenance. Next.js + TypeScript +
Tailwind, exported as static files. No backend: bookings open WhatsApp with a ready message.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # optimises photos, then writes the static site to ./out
```

Requires Node.js 20.9 or newer.

---

## Edit the content: `site.config.ts`

Everything the site says lives in [`site.config.ts`](site.config.ts): name, headline, stats,
services, brands, steps, team text, reviews, opening hours, branches, phone and WhatsApp
numbers, colours and photo paths. Edit it, save, and the page updates.

- **Phones:** write them as printed on the sign (`'0792900099'`). Call and WhatsApp links are
  built from them automatically. `booking.whatsapp` (`'962792900099'`) receives the booking form.
- **Branches:** fill in `address` and `mapsUrl` when you have them (Google Maps → the branch →
  *Share* → *Copy link*). Until then, "الاتجاهات" opens a Google Maps search for the center
  name + city, and the card shows no address line.
- **Reviews:** the three reviews are samples, each labelled "تقييم تجريبي". Replace them with
  real Google reviews copied word for word, and delete `sample: true` from each one.
- **Hours:** 24-hour times per day; `null` means closed. Consecutive days with the same hours
  are grouped automatically ("السبت – الخميس").
- **Colours:** `colors` (keep enough contrast: light text on dark backgrounds).

Interface text (button labels, form errors, section titles) is in `src/lib/dictionary.ts`.
Every text in the config is `{ ar: '...' }` so English can be added later as
`{ ar: '...', en: '...' }`.

If something in the config is wrong (a malformed phone number, a missing photo), `npm run dev`
and `npm run build` stop with a message saying exactly what to fix.

## Replace the photos

Photos live in `public/images/jhm/`. To swap one, **replace the file with the same name**:

| File | Used for | Best shape |
|---|---|---|
| `logo.jpg` | Header, footer | Square, logo on black |
| `storefront.jpg` | Hero on tablets/desktop + gallery | Portrait or landscape, at least 1200px wide |
| `storefront-mobile.jpg` | Hero on phones | Portrait crop of the storefront photo without the signboard (entrance + cars) |
| `team.jpg` | "فريقنا" | Any; shown cropped to 4:3 |
| `storefront-wide.jpg` | Gallery | Any; shown cropped to 4:3 |

Use a new file name? Update its `src` in `site.config.ts` (`images`). If the new photo has a
different size, update `width` / `height` too, and use `focus` (e.g. `'50% 30%'`) to choose
which part stays visible when it's cropped.

**Hero crops:** on desktop the visible part of `storefront.jpg` is set by `images.hero.focus`
(`'50% 62%'` = the entrance and cars, below the signboard). Phones use `images.heroMobile`, a
separate portrait crop, because a tall phone screen shows the whole photo otherwise. If you
replace the storefront photo, crop a new `storefront-mobile.jpg` (about 640×1000, starting just
below the sign) or delete `heroMobile` from the config to use the main photo on phones too.
The hero photo is shown slightly desaturated (`saturate-[.7]` in `src/components/sections/Hero.tsx`)
so its colours don't compete with the black and gold.

You don't need to resize anything: every build creates small WebP versions of each photo
automatically (`public/images/_generated`, not committed), and phones download the small ones.

After changing the logo or the main storefront photo, run:

```bash
npm run social-images
```

This rebuilds `og.jpg` (the preview shown when the link is shared on WhatsApp or Facebook)
and the browser and phone icons. Commit the results.

## Deploy

### Netlify (current host)

Connect the site to GitHub once, and every change merged to `main` goes live by itself:

1. Merge this work into `main` on GitHub.
2. Netlify → the site → **Site configuration → Build & deploy → Continuous deployment →
   Link repository** → GitHub → this repository.
3. **Base directory:** `jhm-site`. Build command and publish folder come from
   [`netlify.toml`](netlify.toml) (`npm run build`, `out`).
4. **Production branch:** `main`. Save, then **Deploys → Trigger deploy → Deploy site**.

The site address used in Google and WhatsApp previews is taken from Netlify automatically.
When JHM gets its own domain, add it in Netlify (**Domain management**) and set
`siteUrl: 'https://your-domain'` in `site.config.ts`.

A site uploaded by drag and drop (no GitHub link) never updates on its own: run
`npm run build` and drag the new `out` folder onto **Deploys**. In that case set `siteUrl` in
`site.config.ts` to the Netlify address first; the build prints a warning when it is missing.

### Vercel

**Add New… → Project** → import the repository → **Root Directory** `jhm-site` → **Deploy**.
The site address is detected automatically.

## Checked before delivery

- Screenshots at 375px and 1440px reviewed; no horizontal overflow; RTL throughout.
- Lighthouse (mobile): Performance 92–96, Accessibility 100, Best Practices 100, SEO 100.
- SEO: Arabic title/description, Open Graph image, `sitemap.xml`, `robots.txt`, and JSON-LD
  with one `AutoRepair` entry per branch.
- Motion: only the hero text fades in once on load; turned off for visitors who prefer
  reduced motion.
