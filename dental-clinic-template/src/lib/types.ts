/**
 * Types for clinic.config.ts. You normally never edit this file —
 * it only gives you autocomplete and catches typos in the config.
 */

export type Lang = 'ar' | 'en';

/** Every visible text exists in both languages. */
export type LocalizedText = { ar: string; en: string };

export type ThemePreset = 'clinical' | 'fresh' | 'premium';

export type ThemeTokens = {
  /** Page background */
  bg: string;
  /** Alternate section background */
  surface: string;
  /** Card background */
  card: string;
  /** Headings */
  ink: string;
  /** Body text */
  copy: string;
  /** Secondary text (must stay ≥ 4.5:1 on bg and surface) */
  muted: string;
  /** Borders and dividers */
  line: string;
  /** Buttons, links, accents (white text on it must stay ≥ 4.5:1) */
  primary: string;
  primaryHover: string;
  /** Tinted backgrounds (icon circles, highlights) */
  primarySoft: string;
  /** Text/icons placed on primarySoft */
  primaryInk: string;
  /** Text on primary buttons */
  onPrimary: string;
  /** Placeholder blocks */
  placeholder: string;
  placeholderAlt: string;
};

/**
 * A photo in /public. Set to `null` to show a labeled placeholder block
 * (with the recommended size) until the clinic sends the real photo.
 */
export type Photo = {
  /** Path inside /public, e.g. "/images/doctor.webp" */
  src: string;
  alt: LocalizedText;
} | null;

/**
 * Icons you can use in the config. Each name maps to a lucide icon
 * in src/lib/icons.tsx — add more there if you need them.
 */
export type IconName =
  | 'implant'
  | 'veneers'
  | 'whitening'
  | 'orthodontics'
  | 'root-canal'
  | 'kids'
  | 'cleaning'
  | 'crown'
  | 'gum'
  | 'emergency'
  | 'checkup'
  | 'equipment'
  | 'sterilization'
  | 'payment'
  | 'comfort'
  | 'scan'
  | 'award'
  | 'clock'
  | 'languages'
  | 'family';

export type DayKey = 'sat' | 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri';

export type OpeningHours =
  | { day: DayKey; open: string; close: string; closed?: false }
  | { day: DayKey; closed: true };

export type Service = {
  /** Short unique id, used for the booking form */
  id: string;
  icon: IconName;
  title: LocalizedText;
  description: LocalizedText;
  /** "Starting from" price in the clinic's currency. Leave out to hide for this service. */
  priceFrom?: number;
};

export type Doctor = {
  name: LocalizedText;
  /** Used for correct Arabic grammar in headings ("الطبيب" / "الطبيبة"). */
  gender: 'male' | 'female';
  role: LocalizedText;
  photo: Photo;
  credentials: LocalizedText[];
  university?: LocalizedText;
  memberships?: LocalizedText[];
  /** A short, personal note in the doctor's voice (lead doctor only). */
  note?: LocalizedText;
};

export type BeforeAfterCase = {
  title: LocalizedText;
  before: Photo;
  after: Photo;
};

export type Feature = {
  icon: IconName;
  title: LocalizedText;
  text: LocalizedText;
};

export type Review = {
  /** Name exactly as shown on Google */
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Copy the review word-for-word. Do not translate or edit real reviews. */
  text: string;
  /** Language the review is written in */
  lang: Lang;
  /** Optional, "YYYY-MM" */
  date?: string;
  /**
   * true = shows a visible "Sample review" badge.
   * Remove ONLY for real Google reviews supplied by the clinic.
   */
  sample?: boolean;
};

export type FaqItem = { q: LocalizedText; a: LocalizedText };

export type ClinicConfig = {
  name: LocalizedText;
  tagline: LocalizedText;
  theme: ThemePreset;
  /** Optional: override any colour of the chosen preset (e.g. the clinic's brand colour). Re-check contrast if you do. */
  themeOverrides?: Partial<ThemeTokens>;
  defaultLanguage: Lang;
  /** Production URL, e.g. "https://smile-dental.vercel.app". Leave '' to auto-detect on Vercel/Netlify. */
  siteUrl: string;

  logo: {
    /** Image logo in /public. `null` = text logo built from `monogram` + clinic name. */
    image: { src: string; width: number; height: number } | null;
    /** 1–2 characters for the text logo and favicon */
    monogram: string;
  };

  contact: {
    /** Display format, e.g. "+962 6 500 0000". Used for tel: links. */
    phone: string;
    /** WhatsApp number in international format, e.g. "+962 79 000 0000". */
    whatsapp: string;
    email?: string;
  };

  location: {
    address: LocalizedText;
    area: LocalizedText;
    city: LocalizedText;
    /** ISO country code */
    country: string;
    geo: { lat: number; lng: number };
    /** Google Maps → Share → Embed a map → copy the src="…" URL */
    mapsEmbedUrl: string;
    /** Google Maps → Share → copy link */
    directionsUrl: string;
    parkingNote?: LocalizedText;
  };

  /** One entry per day. Order does not matter. */
  hours: OpeningHours[];

  /** Google rating. Set to null if the clinic has no Google reviews yet. */
  rating: {
    value: number;
    count: number;
    /** Link to the clinic's Google reviews */
    reviewsUrl: string;
  } | null;

  stats: {
    yearsExperience: number;
    patientsTreated: number;
    specialists: number;
  };

  hero: {
    headline: LocalizedText;
    subtext: LocalizedText;
    image: Photo;
  };

  services: {
    showPrices: boolean;
    currency: LocalizedText;
    items: Service[];
  };

  /** First doctor is featured. Others appear as "Our team". */
  doctors: Doctor[];

  beforeAfter: {
    enabled: boolean;
    cases: BeforeAfterCase[];
  };

  /** "Why patients choose us" — 4 points work best. */
  whyUs: Feature[];

  reviews: Review[];

  abroad: {
    enabled: boolean;
    intro: LocalizedText;
    help: LocalizedText[];
    timeline: { title: LocalizedText; text: LocalizedText }[];
    hotels: { name: LocalizedText; note: LocalizedText }[];
  };

  faq: FaqItem[];

  social: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    youtube?: string;
  };

  seo: {
    title: LocalizedText;
    description: LocalizedText;
    /** schema.org priceRange, e.g. "$$" */
    priceRange?: string;
  };

  credit: {
    label: string;
    url?: string;
  };
};
