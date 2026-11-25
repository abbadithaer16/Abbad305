import type { ServiceIcon } from './icons';

export type Lang = 'ar' | 'en';

/** Every piece of visible text exists in Arabic and English. */
export type Localized = { ar: string; en: string };

export type ThemePreset = 'electric' | 'night' | 'classic';

export type Weekday = 'sat' | 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri';

/** Opening and closing time in 24h format, e.g. ['08:30', '18:00']. `null` = closed. */
export type DayHours = [open: string, close: string] | null;

/**
 * A photo slot. Leave `src` empty to show a labelled placeholder block
 * (it shows the subject and the recommended size), or set it to a file in /public,
 * e.g. '/photos/hero.webp'.
 */
export type Photo = {
  src?: string;
  /** Describes the photo. Also shown on the placeholder until a real photo is added. */
  alt: Localized;
};

export type FaqItem = {
  q: Localized;
  a: Localized;
  /** Only shown when `pickup.enabled` is true. */
  onlyIfPickup?: boolean;
};

export type Service = {
  /** Short unique id, used by car pages to link services (`services: ['hybrid-battery']`). */
  id: string;
  icon: ServiceIcon;
  title: Localized;
  description: Localized;
  /** "Starting from" price in the local currency. Shown only when `showPrices` is true. */
  priceFrom?: number;
};

export type CarType = 'hybrid' | 'phev' | 'ev' | 'mixed';

export type CarModel = {
  /** URL of the model page: /ar/cars/<slug>/ and /en/cars/<slug>/. Lowercase, dashes only. */
  slug: string;
  make: Localized;
  /** What is sent in the WhatsApp booking message, e.g. "Prius". */
  model: Localized;
  /** Name on chips and page titles. Defaults to "<make> <model>". */
  label?: Localized;
  type: CarType;
  /** Optional, e.g. "2010–2023". Shown on the model page. */
  years?: string;
  /** Optional H1 override. Default: "Toyota Prius hybrid repair in Amman". */
  h1?: Localized;
  /** Optional meta description override (keep it under ~155 characters). */
  metaDescription?: Localized;
  /** One or two sentences under the H1. */
  intro: Localized;
  commonIssues: { title: Localized; text: Localized }[];
  /** Service ids from `services` that are relevant to this model. */
  services: string[];
  faq: FaqItem[];
};

export type Review = {
  /** Paste real Google reviews exactly as written. Do not translate or edit them. */
  author: string;
  text: string;
  /** Language the review was written in (sets text direction). */
  lang: Lang;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Free text, e.g. "March 2026". */
  date?: string;
  car?: string;
  /** Shows a visible "Sample review" label. Remove it only for real reviews. */
  sample?: boolean;
};

export type CenterConfig = {
  name: Localized;
  /** One line describing the center (footer, social previews). */
  tagline: Localized;
  logo: {
    /** Path in /public, e.g. '/brand/logo.svg'. Empty = text logo with monogram. */
    src?: string;
    width?: number;
    height?: number;
    /** 1–2 letters shown in the square badge when there is no logo file. */
    monogram: string;
  };
  theme: ThemePreset;
  defaultLang: Lang;
  /**
   * Public URL of the site, without trailing slash. Used for canonical links,
   * sitemap and social previews. Leave empty on Vercel/Netlify: it is detected.
   */
  siteUrl: string;
  /** false = noindex + robots.txt blocks crawlers (good for pitch demos). */
  allowIndexing: boolean;
  city: Localized;
  contact: {
    /** Number as dialled, international format: '+962790000000'. */
    phoneDial: string;
    /** Number as people read it: '079 000 0000'. */
    phoneDisplay: string;
    /** WhatsApp number, international format, digits only: '962790000000'. */
    whatsapp: string;
    email?: string;
  };
  /** Prefilled text for general "Book on WhatsApp" buttons. */
  whatsappMessage: Localized;
  location: {
    address: Localized;
    /** Google Maps → Share → Embed a map → copy the src="..." URL. */
    mapsEmbedUrl: string;
    /** Google Maps → Share → Copy link (or a maps/dir/?api=1&destination=... URL). */
    directionsUrl: string;
    geo: { lat: number; lng: number };
    /** Two-letter country code for schema.org. */
    countryCode: string;
  };
  hours: Record<Weekday, DayHours>;
  /** First day shown in the opening-hours table. */
  weekStartsOn: Weekday;
  google: {
    /** Real Google rating, e.g. 4.8. Leave undefined to hide it everywhere. */
    rating?: number;
    reviewCount?: number;
    /** Link to the center's reviews on Google Maps. */
    reviewsUrl?: string;
  };
  stats: {
    yearsExperience: number;
    /** Shown as "4,000+". */
    carsServiced: number;
  };
  warranty: {
    /** Short value for the trust bar, e.g. "12 months". */
    short: Localized;
    /** Sentence explaining what the warranty covers. */
    details: Localized;
  };
  pickup: {
    enabled: boolean;
    text: Localized;
  };
  showPrices: boolean;
  currency: Localized;
  seo: {
    title: Localized;
    description: Localized;
    /** Optional custom social preview image in /public (1200×630). Default: generated. */
    ogImage?: string;
  };
  hero: {
    headline: Localized;
    subtext: Localized;
    photo: Photo;
  };
  offer: {
    title: Localized;
    description: Localized;
    includes: Localized[];
    duration: Localized;
    priceFrom?: number;
    whatsappMessage: Localized;
  };
  services: Service[];
  cars: CarModel[];
  /** "How it works" — keep it to 4 steps. */
  steps: { title: Localized; text: Localized }[];
  engineer: {
    name: Localized;
    role: Localized;
    yearsExperience: number;
    specialties: Localized[];
    note: Localized;
    photo: Photo;
  };
  gallery: Photo[];
  reviews: Review[];
  faq: FaqItem[];
  booking: {
    /** Extra makes in the booking form, besides the ones in `cars`. */
    otherMakes: Localized[];
  };
  socials: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    x?: string;
  };
  /** Small credit line in the footer. Leave text empty to hide it. */
  footerCredit: {
    text: Localized;
    url?: string;
  };
};
