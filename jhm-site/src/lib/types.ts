/**
 * Types for site.config.ts.
 *
 * Every visible text is a `Text` object: { ar: '...' }. The site is Arabic-only for now;
 * adding English later means adding `en: '...'` next to each `ar` and an English route.
 */
export type Lang = 'ar' | 'en';
export type Text = { ar: string; en?: string };

export type Weekday = 'sat' | 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri';
/** ['09:00', '18:30'] in 24h time, or null when closed. */
export type DayHours = [open: string, close: string] | null;

export type Photo = {
  /** Path inside /public, e.g. '/images/jhm/team.jpg'. */
  src: string;
  alt: Text;
  /** Size of the original file in pixels (used to reserve space while it loads). */
  width: number;
  height: number;
  /** Which part stays visible when the photo is cropped, CSS object-position, e.g. '50% 35%'. */
  focus?: string;
};

export type ServiceIcon = 'battery' | 'scan' | 'chip' | 'parts' | 'oil' | 'wrench' | 'gauge' | 'car';

export type Service = {
  icon: ServiceIcon;
  title: Text;
  /** Optional one-line description under the title. */
  description?: Text;
};

export type Branch = {
  name: Text;
  city: Text;
  /** Local format as printed on the sign: '0792900099'. Used for calls and display. */
  phone: string;
  /** WhatsApp number in international format, digits only. Default: derived from `phone`. */
  whatsapp?: string;
  /** Street address. Leave empty until confirmed; the card then shows only the city. */
  address?: Text;
  /** Exact Google Maps link for this branch. Default: a Maps search for the center name + city. */
  mapsUrl?: string;
};

export type Review = {
  author: string;
  text: string;
  /** Shows a visible "تقييم تجريبي" label. Remove only for real reviews copied from Google. */
  sample?: boolean;
};

export type SiteConfig = {
  /** Public URL without trailing slash, e.g. 'https://jhm.jo'. Empty = detected on Vercel. */
  siteUrl: string;
  lang: Lang;
  name: Text;
  /** Short / Latin name, e.g. 'JHM'. */
  shortName: string;
  /** Name used in Google Maps searches for branch directions. */
  mapsSearchName: string;
  colors: {
    /** Page background */
    background: string;
    /** Slightly lifted surfaces (cards, alternate sections) */
    surface: string;
    /** Borders and dividers */
    border: string;
    /** Headings and strong text */
    text: string;
    /** Body text */
    textSoft: string;
    /** Secondary text */
    textMuted: string;
    /** Buttons, links, icons */
    accent: string;
    /** Text on accent-coloured buttons */
    accentText: string;
    /** Gradient for the shield badges, light → dark */
    accentGradient: [string, string, string];
  };
  images: {
    logo: Photo;
    hero: Photo;
    /**
     * Optional portrait crop of the hero photo for phones (≤ 767px wide), so phones show
     * what matters (entrance, cars) instead of the whole photo squeezed into a tall screen.
     */
    heroMobile?: Photo;
    team: Photo;
    gallery: Photo[];
    /** Social preview image, 1200×630 JPG (shown when the link is shared on WhatsApp etc.). */
    og: string;
    /** Square PNG icons for browser tabs and phone home screens. */
    icon: string;
    appleIcon: string;
  };
  seo: { title: Text; description: Text };
  hero: { headline: Text; subline: Text };
  closingLine: Text;
  stats: { value: string; label: Text }[];
  booking: {
    /** WhatsApp number that receives bookings, international digits: '962792900099'. */
    whatsapp: string;
    /** Number for the main "Call" buttons, local format. */
    phone: string;
    /** Options of the "المشكلة" list in the booking form. */
    problems: Text[];
  };
  services: Service[];
  brands: Text[];
  steps: Text[];
  team: { text: Text };
  reviews: {
    googleUrl: string;
    items: Review[];
  };
  hours: Record<Weekday, DayHours>;
  weekStartsOn: Weekday;
  branches: Branch[];
};
