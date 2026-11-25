/**
 * ============================================================================
 *  SITE CONFIG — all business content lives here.
 *  Edit this file (and the photos in /public/images) to update or re-brand the site.
 *  Every text is { ar: '...' } so English can be added later as { ar: '...', en: '...' }.
 * ============================================================================
 */
import type { SiteConfig } from './src/lib/types';

const site: SiteConfig = {
  siteUrl: 'https://jhm-hybrid.netlify.app', // e.g. 'https://jhm.jo' once there is a domain. Empty = detected on Netlify / Vercel
  lang: 'ar',
  name: { ar: 'الأردنية لصيانة الهايبرد' },
  shortName: 'JHM',
  mapsSearchName: 'الأردنية لصيانة الهايبرد',

  /* ── Colours (from the logo) ─────────────────────────────────────────── */
  colors: {
    background: '#000000',
    surface: '#121212',
    border: '#2a2a2a',
    text: '#ffffff',
    textSoft: '#d4d4d4',
    textMuted: '#a3a3a3',
    accent: '#c9a24a',
    accentText: '#000000',
    accentGradient: ['#f3dc9a', '#c9a24a', '#8a6a26'],
  },

  /* ── Photos (files in /public/images/jhm) ────────────────────────────── */
  images: {
    logo: {
      src: '/images/jhm/logo.jpg',
      alt: { ar: 'شعار الأردنية لصيانة الهايبرد JHM' },
      width: 502,
      height: 502,
    },
    hero: {
      src: '/images/jhm/storefront.jpg',
      alt: { ar: 'مدخل الورشة وسيارات الزبائن أمامها' },
      width: 1200,
      height: 1600,
      focus: '50% 62%', // shop entrance and cars, not the signboard
    },
    heroMobile: {
      src: '/images/jhm/storefront-mobile.jpg', // portrait crop of storefront.jpg below the sign
      alt: { ar: 'مدخل الورشة وسيارات الزبائن أمامها' },
      width: 640,
      height: 1000,
      focus: '50% 0%',
    },
    team: {
      src: '/images/jhm/team.jpg',
      alt: { ar: 'فريق الفنيين أمام الورشة' },
      width: 1198,
      height: 1600,
      focus: '50% 40%',
    },
    gallery: [
      {
        src: '/images/jhm/storefront-wide.jpg',
        alt: { ar: 'واجهة الأردنية لصيانة السيارات من الشارع' },
        width: 1004,
        height: 1600,
        focus: '50% 30%',
      },
      {
        src: '/images/jhm/storefront.jpg',
        alt: { ar: 'سيارات الزبائن أمام مداخل الورشة' },
        width: 1200,
        height: 1600,
        focus: '50% 45%',
      },
    ],
    og: '/images/jhm/og.jpg',
    icon: '/images/jhm/icon.png',
    appleIcon: '/images/jhm/apple-touch-icon.png',
  },

  /* ── Search engines & sharing ────────────────────────────────────────── */
  seo: {
    title: { ar: 'الأردنية لصيانة الهايبرد | صيانة هايبرد وبطاريات ليثيوم في عمّان وإربد والسلط' },
    description: {
      ar: '14 سنة في صيانة الهايبرد وجميع السيارات، بأحدث أجهزة الفحص، و4 فروع في المملكة: عمّان وطبربور وإربد والسلط. احجز موعدك على واتساب.',
    },
  },

  /* ── Main texts ──────────────────────────────────────────────────────── */
  hero: {
    headline: { ar: 'خبرة تحكي عنا.. وتميّز يدوم' },
    subline: { ar: '14 سنة في صيانة الهايبرد وجميع السيارات، بأحدث أجهزة الفحص، و4 فروع في المملكة.' },
  },
  closingLine: { ar: 'لأن سيارتك تستحق الأفضل' },

  stats: [
    { value: '14', label: { ar: 'سنة خبرة' } },
    { value: '4', label: { ar: 'فروع' } },
    { value: '+100', label: { ar: 'تقييم على جوجل' } },
  ],

  /* ── Booking ─────────────────────────────────────────────────────────── */
  booking: {
    whatsapp: '962792900099',
    phone: '0792900099',
    problems: [
      { ar: 'بطارية هايبرد' },
      { ar: 'ضوء تحذير' },
      { ar: 'فحص شامل' },
      { ar: 'غيار زيت' },
      { ar: 'أخرى' },
    ],
  },

  /* ── Services ────────────────────────────────────────────────────────── */
  // icon: battery | scan | chip | parts | oil | wrench | gauge | car
  services: [
    { icon: 'battery', title: { ar: 'بطاريات الليثيوم والهايبرد' } },
    { icon: 'scan', title: { ar: 'فحص شامل ومتخصص بأحدث الأجهزة' } },
    { icon: 'chip', title: { ar: 'برمجة' } },
    { icon: 'parts', title: { ar: 'قطع غيار' } },
    { icon: 'oil', title: { ar: 'غيار زيت' } },
    { icon: 'wrench', title: { ar: 'صيانة جميع السيارات' } },
  ],

  brands: [
    { ar: 'تويوتا' },
    { ar: 'هوندا' },
    { ar: 'هيونداي' },
    { ar: 'نيسان' },
    { ar: 'فورد' },
    { ar: 'شيفروليه' },
    { ar: 'أودي' },
  ],

  steps: [
    { ar: 'تواصل معنا' },
    { ar: 'فحص وتشخيص' },
    { ar: 'سعر واضح قبل أي شغل' },
    { ar: 'تصليح واستلام' },
  ],

  team: {
    text: { ar: 'فريق من الفنيين المتخصصين بإشراف م. تامر الزعبي.' },
  },

  /* ── Reviews ─────────────────────────────────────────────────────────── */
  // Real Google reviews, copied word for word (line breaks kept with \n).
  reviews: {
    googleUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJs_55YetgGxURIO7o6JID6Z8',
    items: [
      {
        author: 'Ayman S',
        rating: 5,
        text: [
          'السيارة رجعت وكالة',
          'عزم قوي جداً',
          '٣٢٠ كيلو متر بالتنكة',
          'شكراً الأردنية لصيانة الهايبرد',
        ].join('\n'),
      },
      {
        author: 'Ahmad Alshaqildi',
        rating: 5,
        text: 'شركة رائعه جدا ومهندس تامر مهندس بمعنى الكلمة مشكورين',
      },
      {
        author: 'Abbas Ahmad',
        rating: 5,
        text: 'من ارقى واحسن الورش الي تعاملت معهم، بشكر ادارة المحل على تعاملهم الراقي مع تمنياتي لكم بمزيد من التقدم',
      },
    ],
  },

  /* ── Opening hours (same for all branches) ───────────────────────────── */
  hours: {
    sat: ['09:00', '18:30'],
    sun: ['09:00', '18:30'],
    mon: ['09:00', '18:30'],
    tue: ['09:00', '18:30'],
    wed: ['09:00', '18:30'],
    thu: ['09:00', '18:30'],
    fri: null,
  },
  weekStartsOn: 'sat',

  /* ── Branches ────────────────────────────────────────────────────────── */
  // address / mapsUrl: fill in once confirmed (Google Maps → Share → Copy link).
  branches: [
    {
      name: { ar: 'الإدارة – عمّان' },
      city: { ar: 'عمّان' },
      phone: '0792900099',
      address: { ar: '' },
      mapsUrl: '',
    },
    {
      name: { ar: 'فرع طبربور' },
      city: { ar: 'طبربور' },
      phone: '0792003650',
      address: { ar: '' },
      mapsUrl: '',
    },
    {
      name: { ar: 'فرع إربد' },
      city: { ar: 'إربد' },
      phone: '0796970860',
      address: { ar: '' },
      mapsUrl: '',
    },
    {
      name: { ar: 'فرع السلط' },
      city: { ar: 'السلط' },
      phone: '0799797373',
      address: { ar: '' },
      mapsUrl: '',
    },
  ],
};

export default site;
