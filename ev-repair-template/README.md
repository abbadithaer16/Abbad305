# Hybrid & EV Repair Center — website template

A fast, bilingual (Arabic RTL / English) website for hybrid and electric car repair
workshops in Amman. Its one job: get car owners to **call, WhatsApp, or drive in**.

- Next.js (App Router) + TypeScript + Tailwind CSS, exported as plain static files
- No backend: the booking form opens WhatsApp with a ready-made message
- **Everything about a center lives in one file: [`center.config.ts`](center.config.ts)**

The sample data is a fictional center ("Volt Hybrid Center", "Eng. Sample Name",
phone `079 000 0000`). Replace all of it before showing a demo.

---

## Run it

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /ar/
npm run build      # checks the config, then writes the static site to ./out
npm start          # serves ./out locally, like production
```

---

## Make a demo for a new center (≈ 45 minutes)

### 1. Edit `center.config.ts` (20–30 min)

Work top to bottom. Every text has `ar` and `en`.

| Field | What to put |
|---|---|
| `name`, `tagline` | Center name and one-line description |
| `theme` | `'electric'` (white + green), `'night'` (charcoal + teal), `'classic'` (white + navy) |
| `defaultLang` | Language that opens at `/` (`'ar'` recommended) |
| `allowIndexing` | **`false` while pitching** (Google won't index the demo). `true` when the center goes live |
| `contact` | `phoneDial: '+9627…'`, `phoneDisplay: '079 …'`, `whatsapp: '9627…'` (digits only) |
| `location` | Address, `mapsEmbedUrl`, `directionsUrl`, `geo` (see below) |
| `hours` | `['08:30', '18:00']` per day, `null` = closed |
| `google` | The center's **real** rating, review count and Google Maps reviews link |
| `stats`, `warranty` | Years of experience, cars serviced, warranty wording |
| `pickup.enabled` | Shows/hides pickup & towing everywhere (incl. the FAQ question and form checkbox) |
| `showPrices` | `false` hides every "From … JOD" price |
| `seo` | Homepage title (~60 chars) and description (~150 chars) |
| `hero`, `offer` | Headline, subtext, main offer contents |
| `services` | Title, description, icon, optional `priceFrom` |
| `cars` | One entry per model page (see below) |
| `engineer`, `gallery` | Lead engineer details and workshop photos |
| `reviews` | **Real Google reviews only**, copied word for word (see below) |
| `faq`, `socials`, `footerCredit` | FAQ, social links (empty = hidden), your credit line (empty = hidden) |

**Google Maps links:** on Google Maps open the center → *Share* →
*Embed a map* → copy only the `src="…"` URL into `mapsEmbedUrl`. *Share* → *Copy link* gives
`directionsUrl`. Right-click the pin → the coordinates at the top go in `geo`.

**Reviews:** each sample review has `sample: true`, which shows a visible
"Sample review / مراجعة تجريبية" label plus a note above the list. Paste the center's real
Google reviews **without** `sample`, exactly as written, in the language they were written
(`lang: 'ar'` or `'en'`). Never invent or translate reviews.

> The FAQ answer about warranty and the price FAQ mention "12 months" and "20 JOD" in plain
> text. Update them along with `warranty` and `offer.priceFrom`.

### 2. Logo (2 min)

Put the file in `public/brand/` (SVG or PNG, about 160×40) and set:

```ts
logo: { src: '/brand/logo.svg', width: 160, height: 40, monogram: 'V' },
```

No logo? Leave `src: ''`: the site shows a coloured square with `monogram` next to the name.
The favicon is always generated from `monogram` and the theme colour.

### 3. Photos (10 min)

1. Put the original photos (straight from the phone is fine) in `photos-original/`
2. Run `npm run photos`: they're rotated, resized to max 1600px, converted to WebP and
   stripped of GPS data into `public/photos/`
3. Set the paths in the config, e.g. `photo: { src: '/photos/hero.webp', alt: {…} }`

| Slot | Shape | Good subject |
|---|---|---|
| `hero.photo` | 4:3 (1600×1200) | Technician working on a car or battery |
| `engineer.photo` | 4:5 (800×1000) | Engineer in the workshop, natural light |
| `gallery[]` | 4:3 (1200×900) | Equipment, team, work bays, battery work, reception |

An empty `src` shows a neutral placeholder labelled with the subject and size, so missing
photos are obvious and never broken. Keep `alt` texts accurate: they describe the photo.

### 4. Car model pages (5 min)

Each entry in `cars` creates `/ar/cars/<slug>/` and `/en/cars/<slug>/` with a unique title,
description, common issues, related services, FAQ and a booking form with the model prefilled.
The sitemap, footer links, "Cars we service" grid and booking-form makes update automatically.

- **Add:** copy an existing entry, give it a new `slug` (lowercase-with-dashes), and list
  related `services` by id.
- **Remove:** delete the entry.
- The H1 is generated ("Toyota Prius hybrid repair in Amman" / "صيانة وتصليح تويوتا بريوس
  هايبرد في عمّان"). Override it with `h1` when the name reads oddly (see `lexus-hybrid`).

Mistakes such as an unknown service id, a duplicate slug or a badly formatted phone number stop
`npm run build` with a plain-English message saying what to fix.

### 5. Deploy (5 min)

The site is static files in `out/`. Any host works.

- **Vercel:** *Add New Project* → import the repo → set *Root Directory* to
  `ev-repair-template` → Deploy. Nothing else to configure.
- **Netlify:** *Add new site* → import the repo → *Base directory* `ev-repair-template`
  (build command and publish folder come from `netlify.toml`).
- **Any other host / cPanel:** run `npm run build` and upload the contents of `out/`.

`siteUrl` can stay empty on Vercel and Netlify (the URL is detected at build time). On other
hosts, or once the center has its own domain, set it: `siteUrl: 'https://example.com'`.

### Before you send the demo link

- [ ] No "Volt", "Sample", "تجريبي" or `079 000 0000` left (search the config)
- [ ] Tap Call, WhatsApp and Directions on a phone: right number, right place
- [ ] Reviews are real, or still clearly labelled as samples
- [ ] Google rating matches the center's real rating (or remove `rating`)
- [ ] `allowIndexing: false` for a pitch; switch to `true` when it goes live

---

## Where things are

```
center.config.ts          ← all center content (the only file you normally edit)
src/lib/dictionary.ts     ← interface text: buttons, labels, headings (ar + en)
src/lib/icons.ts          ← icons you can use for services
src/app/globals.css       ← theme colours (3 presets), buttons, motion
src/lib/theme.ts          ← theme colours for generated images (keep in sync with globals.css)
src/components/sections/  ← one file per homepage section
src/app/[lang]/           ← homepage and car model pages
scripts/photos.mjs        ← `npm run photos`
```

To reorder or hide homepage sections, edit `src/app/[lang]/page.tsx`.

## What's built in

- **Arabic & English** at `/ar/` and `/en/`, language switch on every page (goes to the same
  page in the other language). Logical CSS properties throughout, so RTL mirrors correctly.
- **Conversion:** sticky header with "Book a check", always-visible Call / WhatsApp / Directions
  bar on phones and tablets, click-to-call numbers, `wa.me` links with prefilled messages
  (per service, per model, per offer), WhatsApp booking form with simple validation.
- **SEO:** unique title and description per page and language, canonical + hreflang
  (+ x-default), Open Graph and Twitter cards with a generated 1200×630 image
  (`seo.ogImage` to use a photo instead), `sitemap.xml` with every model page,
  `robots.txt`, JSON-LD `AutoRepair` (address, geo, hours, phone, rating) and breadcrumbs.
- **Motion:** only a one-time fade + 16px rise as blocks enter the screen, gentle hover lift,
  smooth FAQ. Everything is switched off for visitors who prefer reduced motion.
- **Accessibility:** WCAG AA contrast in all three themes, skip link, keyboard-friendly menu
  and FAQ, labelled form fields with error messages.

Lighthouse (mobile) on the sample site: Performance 97–99, Accessibility 100,
Best Practices 100, SEO 100 on the homepage and model pages in both languages.
Large unoptimised photos are the usual way to lose that, so always run `npm run photos`.
