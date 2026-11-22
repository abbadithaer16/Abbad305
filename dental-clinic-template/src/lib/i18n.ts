/**
 * Interface text that is the same for every clinic (buttons, labels, section titles).
 * Clinic-specific content lives in clinic.config.ts — you rarely need to touch this file.
 */
import type { DayKey, Lang } from './types';

const en = {
  skipToContent: 'Skip to main content',
  mainNav: 'Main navigation',
  nav: {
    services: 'Services',
    doctor: 'Doctor',
    doctors: 'Doctors',
    results: 'Results',
    reviews: 'Reviews',
    faq: 'FAQ',
    location: 'Location',
  },
  menuOpen: 'Open menu',
  menuClose: 'Close menu',
  switchTo: 'العربية',
  switchToShort: 'عربي',
  switchToLabel: 'اقرأ الموقع بالعربية',
  bookAppointment: 'Book appointment',
  bookOnWhatsApp: 'Book on WhatsApp',
  callNow: 'Call now',
  call: 'Call',
  whatsapp: 'WhatsApp',
  floatingWhatsApp: 'Chat with us on WhatsApp',
  opensInNewTab: '(opens in a new tab)',

  hero: {
    googleRating: (r: string) => `${r} on Google`,
    reviewsCount: (n: string) => `(${n} reviews)`,
    years: (n: number) => `${n}+ years of experience`,
  },

  stats: {
    years: (_n: number) => 'Years of experience',
    patients: (_n: number) => 'Patients treated',
    rating: 'Google rating',
    specialists: (n: number): string => (n === 1 ? 'Specialist' : 'Specialists'),
  },

  services: {
    eyebrow: 'Our services',
    title: 'Care for every smile in the family',
    intro: 'Clear options, explained simply. Ask us anything on WhatsApp before you book.',
    from: (price: string) => `From ${price}`,
    ask: 'Ask on WhatsApp',
    priceNote:
      'Starting prices are a guide. Your final price depends on your case and is confirmed after an examination.',
    notSureTitle: 'Not sure what you need?',
    notSureText: "Tell us what's bothering you and we'll suggest the right first step.",
    notSureCta: 'Message us',
  },

  doctor: {
    eyebrow: (count: number, _gender: 'male' | 'female'): string => (count > 1 ? 'Meet our doctors' : 'Meet the doctor'),
    credentials: 'Qualifications',
    university: 'University',
    memberships: 'Memberships',
    team: 'Our team',
  },

  results: {
    eyebrow: 'Before & after',
    title: 'Results from our patients',
    before: 'Before',
    after: 'After',
    sliderLabel: 'Comparison slider: drag or use arrow keys to compare before and after',
    chooseCase: 'Choose a case',
    consent: 'Shared with patient consent. Results vary from person to person.',
  },

  why: {
    eyebrow: 'Why patients choose us',
    title: 'Careful, calm and clear',
  },

  reviews: {
    eyebrow: 'Patient reviews',
    title: 'What patients say on Google',
    summary: (r: string, n: string) => `${r} out of 5 · ${n} Google reviews`,
    readAll: 'Read all reviews on Google',
    sample: 'Sample review',
    stars: (n: number) => `${n} out of 5 stars`,
  },

  abroad: {
    eyebrow: 'Patients from abroad',
    title: 'Visiting Amman for treatment?',
    help: 'How we help',
    timeline: 'What to expect',
    hotels: 'Places to stay nearby',
    cta: 'Plan your visit on WhatsApp',
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Answers to common questions',
    more: 'Still have a question?',
    ask: 'Ask us on WhatsApp',
  },

  location: {
    eyebrow: 'Visit us',
    title: 'Location & opening hours',
    address: 'Address',
    hours: 'Opening hours',
    parking: 'Parking',
    directions: 'Get directions',
    closed: 'Closed',
    mapTitle: 'Map showing the clinic location',
  },

  booking: {
    eyebrow: 'Book an appointment',
    title: 'Request your appointment',
    intro:
      "Fill in the form and WhatsApp will open with your request ready to send. We'll reply to confirm your time.",
    preferCall: 'Prefer to call?',
    name: 'Full name',
    phone: 'Phone number',
    phonePlaceholder: '07X XXX XXXX',
    service: 'Service',
    serviceGeneral: 'Not sure / general checkup',
    day: 'Preferred day',
    anyDay: 'Any day',
    time: 'Preferred time',
    times: { any: 'Any time', morning: 'Morning', afternoon: 'Afternoon', evening: 'Evening' },
    required: 'required',
    submit: 'Send on WhatsApp',
    privacy: 'We only use your details to arrange your appointment.',
    errName: 'Please enter your name.',
    errPhone: 'Please enter a valid phone number.',
    errSummary: 'Please check the highlighted fields.',
    sent: 'WhatsApp opened with your request. Just press send.',
    sentFallback: "If WhatsApp didn't open,",
    sentLink: 'tap here',
  },

  footer: {
    contact: 'Contact',
    hours: 'Opening hours',
    follow: 'Follow us',
    rights: 'All rights reserved.',
    websiteBy: 'Website by',
  },

  placeholder: {
    photo: 'Photo',
    hero: 'Clinic or doctor photo',
    doctor: 'Doctor portrait',
    team: 'Team member photo',
    before: 'Before photo',
    after: 'After photo',
  },

  whatsappMessages: {
    general: (clinic: string) => `Hello ${clinic}, I'd like to book an appointment.`,
    service: (clinic: string, service: string) => `Hello ${clinic}, I'd like to ask about ${service}.`,
    notSure: (clinic: string) => `Hello ${clinic}, I'm not sure which treatment I need. Can you help?`,
    faq: (clinic: string) => `Hello ${clinic}, I have a question.`,
    abroad: (clinic: string) =>
      `Hello ${clinic}, I'm planning to visit Amman for treatment and would like help arranging it.`,
    booking: {
      greeting: (clinic: string) => `Hello ${clinic}, I'd like to book an appointment.`,
      name: 'Name',
      phone: 'Phone',
      service: 'Service',
      day: 'Preferred day',
      time: 'Preferred time',
    },
  },

  days: {
    sat: 'Saturday',
    sun: 'Sunday',
    mon: 'Monday',
    tue: 'Tuesday',
    wed: 'Wednesday',
    thu: 'Thursday',
    fri: 'Friday',
  } as Record<DayKey, string>,
  am: 'AM',
  pm: 'PM',

  notFound: {
    title: 'Page not found',
    text: "The page you're looking for doesn't exist.",
    home: 'Go to the homepage',
  },
};

export type Dictionary = typeof en;

/** Arabic plural category helper (0, 1, 2, 3–10, 11–99, 100+) */
const arPlural = new Intl.PluralRules('ar');
const pick = (n: number, forms: { one: string; two: string; few: string; many: string; other: string }) => {
  const cat = arPlural.select(n);
  return forms[(cat === 'zero' ? 'other' : cat) as keyof typeof forms];
};

const ar: Dictionary = {
  skipToContent: 'انتقل إلى المحتوى الرئيسي',
  mainNav: 'القائمة الرئيسية',
  nav: {
    services: 'الخدمات',
    doctor: 'الطبيب',
    doctors: 'الأطباء',
    results: 'النتائج',
    reviews: 'آراء المرضى',
    faq: 'الأسئلة الشائعة',
    location: 'الموقع',
  },
  menuOpen: 'فتح القائمة',
  menuClose: 'إغلاق القائمة',
  switchTo: 'English',
  switchToShort: 'EN',
  switchToLabel: 'View this site in English',
  bookAppointment: 'احجز موعداً',
  bookOnWhatsApp: 'احجز عبر واتساب',
  callNow: 'اتصل الآن',
  call: 'اتصال',
  whatsapp: 'واتساب',
  floatingWhatsApp: 'تواصل معنا عبر واتساب',
  opensInNewTab: '(يفتح في نافذة جديدة)',

  hero: {
    googleRating: (r) => `${r} على Google`,
    reviewsCount: (n) => `(${n} مراجعة)`,
    years: (n) =>
      `أكثر من ${n} ${pick(n, { one: 'سنة', two: 'سنة', few: 'سنوات', many: 'سنة', other: 'سنة' })} من الخبرة`,
  },

  stats: {
    years: (n) =>
      pick(n, { one: 'سنة من الخبرة', two: 'سنة من الخبرة', few: 'سنوات من الخبرة', many: 'سنة من الخبرة', other: 'سنة من الخبرة' }),
    patients: (n) =>
      pick(n, { one: 'مريض عالجناه', two: 'مريض عالجناهم', few: 'مرضى عالجناهم', many: 'مريضاً عالجناهم', other: 'مريض عالجناهم' }),
    rating: 'تقييم Google',
    specialists: (n) =>
      pick(n, { one: 'طبيب مختص', two: 'طبيبان مختصان', few: 'أطباء مختصين', many: 'طبيباً مختصاً', other: 'طبيب مختص' }),
  },

  services: {
    eyebrow: 'خدماتنا',
    title: 'رعاية لكل ابتسامة في العائلة',
    intro: 'خيارات واضحة نشرحها لك ببساطة. اسألنا عن أي شيء عبر واتساب قبل الحجز.',
    from: (price) => `تبدأ من ${price}`,
    ask: 'استفسر عبر واتساب',
    priceNote: 'الأسعار المذكورة أسعار تقريبية للبداية، ويُحدَّد السعر النهائي بعد الفحص وحسب حالتك.',
    notSureTitle: 'لست متأكداً مما تحتاجه؟',
    notSureText: 'أخبرنا بما يزعجك، وسنقترح عليك الخطوة الأولى المناسبة.',
    notSureCta: 'راسلنا',
  },

  doctor: {
    eyebrow: (count, gender) => (count > 1 ? 'تعرّف على أطبائنا' : gender === 'female' ? 'تعرّف على الطبيبة' : 'تعرّف على الطبيب'),
    credentials: 'المؤهلات',
    university: 'الجامعة',
    memberships: 'العضويات',
    team: 'فريقنا',
  },

  results: {
    eyebrow: 'قبل وبعد',
    title: 'نتائج من مرضانا',
    before: 'قبل',
    after: 'بعد',
    sliderLabel: 'شريط المقارنة: اسحب أو استخدم مفاتيح الأسهم للمقارنة بين قبل وبعد',
    chooseCase: 'اختر حالة',
    consent: 'تُعرض بموافقة المرضى. تختلف النتائج من شخص لآخر.',
  },

  why: {
    eyebrow: 'لماذا يختارنا المرضى',
    title: 'رعاية دقيقة وهادئة وواضحة',
  },

  reviews: {
    eyebrow: 'آراء المرضى',
    title: 'ماذا يقول مرضانا على Google',
    summary: (r, n) => `${r} من 5 · ${n} مراجعة على Google`,
    readAll: 'اقرأ جميع المراجعات على Google',
    sample: 'مراجعة تجريبية',
    stars: (n) => `${n} من 5 نجوم`,
  },

  abroad: {
    eyebrow: 'للمرضى من خارج الأردن',
    title: 'تزور عمّان للعلاج؟',
    help: 'كيف نساعدك',
    timeline: 'ماذا تتوقع',
    hotels: 'أماكن إقامة قريبة',
    cta: 'خطّط لزيارتك عبر واتساب',
  },

  faq: {
    eyebrow: 'الأسئلة الشائعة',
    title: 'إجابات عن أكثر الأسئلة شيوعاً',
    more: 'لديك سؤال آخر؟',
    ask: 'اسألنا عبر واتساب',
  },

  location: {
    eyebrow: 'زورونا',
    title: 'الموقع وساعات العمل',
    address: 'العنوان',
    hours: 'ساعات العمل',
    parking: 'مواقف السيارات',
    directions: 'احصل على الاتجاهات',
    closed: 'مغلق',
    mapTitle: 'خريطة توضّح موقع العيادة',
  },

  booking: {
    eyebrow: 'احجز موعدك',
    title: 'اطلب موعدك الآن',
    intro: 'املأ النموذج وسيفتح واتساب برسالة جاهزة للإرسال، ثم نرد عليك لتأكيد الموعد.',
    preferCall: 'تفضّل الاتصال؟',
    name: 'الاسم الكامل',
    phone: 'رقم الهاتف',
    phonePlaceholder: '07X XXX XXXX',
    service: 'الخدمة',
    serviceGeneral: 'غير متأكد / فحص عام',
    day: 'اليوم المفضّل',
    anyDay: 'أي يوم',
    time: 'الوقت المفضّل',
    times: { any: 'أي وقت', morning: 'صباحاً', afternoon: 'بعد الظهر', evening: 'مساءً' },
    required: 'مطلوب',
    submit: 'أرسل عبر واتساب',
    privacy: 'نستخدم بياناتك فقط لترتيب موعدك.',
    errName: 'يرجى إدخال اسمك.',
    errPhone: 'يرجى إدخال رقم هاتف صحيح.',
    errSummary: 'يرجى مراجعة الحقول المظلّلة.',
    sent: 'فُتح واتساب برسالتك. اضغط إرسال فقط.',
    sentFallback: 'إذا لم يُفتح واتساب،',
    sentLink: 'اضغط هنا',
  },

  footer: {
    contact: 'تواصل معنا',
    hours: 'ساعات العمل',
    follow: 'تابعنا',
    rights: 'جميع الحقوق محفوظة.',
    websiteBy: 'تصميم الموقع:',
  },

  placeholder: {
    photo: 'صورة',
    hero: 'صورة العيادة أو الطبيب',
    doctor: 'صورة الطبيب',
    team: 'صورة عضو الفريق',
    before: 'صورة قبل',
    after: 'صورة بعد',
  },

  whatsappMessages: {
    general: (clinic) => `مرحباً ${clinic}، أودّ حجز موعد.`,
    service: (clinic, service) => `مرحباً ${clinic}، أودّ الاستفسار عن ${service}.`,
    notSure: (clinic) => `مرحباً ${clinic}، لست متأكداً من العلاج الذي أحتاجه. هل يمكنكم مساعدتي؟`,
    faq: (clinic) => `مرحباً ${clinic}، لدي سؤال.`,
    abroad: (clinic) => `مرحباً ${clinic}، أخطط لزيارة عمّان للعلاج وأودّ المساعدة في ترتيب ذلك.`,
    booking: {
      greeting: (clinic) => `مرحباً ${clinic}، أودّ حجز موعد.`,
      name: 'الاسم',
      phone: 'رقم الهاتف',
      service: 'الخدمة',
      day: 'اليوم المفضّل',
      time: 'الوقت المفضّل',
    },
  },

  days: {
    sat: 'السبت',
    sun: 'الأحد',
    mon: 'الاثنين',
    tue: 'الثلاثاء',
    wed: 'الأربعاء',
    thu: 'الخميس',
    fri: 'الجمعة',
  },
  am: 'ص',
  pm: 'م',

  notFound: {
    title: 'الصفحة غير موجودة',
    text: 'الصفحة التي تبحث عنها غير موجودة.',
    home: 'العودة إلى الصفحة الرئيسية',
  },
};

const dictionaries: Record<Lang, Dictionary> = { ar, en };

export const getDictionary = (lang: Lang): Dictionary => dictionaries[lang];
