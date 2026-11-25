import type { Lang, Weekday } from './types';

/**
 * Interface text (buttons, labels, headings, form messages).
 * Business content is in site.config.ts. To add English later, add an `en` object
 * with the same keys (TypeScript will list anything missing).
 */
const ar = {
  skip: 'انتقل إلى المحتوى',
  nav: { services: 'الخدمات', branches: 'الفروع', team: 'فريقنا', contact: 'تواصل' },
  mainNav: 'القائمة الرئيسية',
  menu: 'فتح القائمة',
  closeMenu: 'إغلاق القائمة',
  book: 'احجز موعد',
  bookShort: 'احجز',
  bookWhatsApp: 'احجز على واتساب',
  callNow: 'اتصل الآن',
  call: 'اتصال',
  whatsapp: 'واتساب',
  directions: 'الاتجاهات',
  branches: 'الفروع',
  quickContact: 'تواصل سريع',
  generalMessage: 'مرحباً، أود حجز موعد لسيارتي.',
  serviceMessage: (service: string) => `مرحباً، أود الاستفسار عن: ${service}`,
  branchMessage: (branch: string) => `مرحباً، أود حجز موعد في ${branch}.`,
  stats: 'أرقامنا',
  services: { title: 'خدماتنا', ask: 'اسأل على واتساب' },
  brands: { title: 'الماركات التي نخدمها' },
  steps: { title: 'كيف نشتغل' },
  team: { title: 'فريقنا' },
  gallery: { title: 'من موقعنا' },
  reviews: {
    title: 'آراء زبائننا',
    google: 'شوف تقييماتنا على جوجل',
    sample: 'تقييم تجريبي',
    sampleNote: 'التقييمات المعروضة هنا تجريبية، وسيتم استبدالها بتقييمات حقيقية من جوجل.',
  },
  branchesSection: {
    title: 'فروعنا',
    hours: 'ساعات الدوام',
    hoursNote: 'نفس ساعات الدوام في جميع الفروع.',
    closed: 'مغلق',
    callBranch: (branch: string) => `اتصال مع ${branch}`,
    whatsappBranch: (branch: string) => `واتساب ${branch}`,
    directionsBranch: (branch: string) => `الاتجاهات إلى ${branch}`,
  },
  booking: {
    title: 'احجز موعدك',
    intro: 'عبّئ البيانات، وسيفتح واتساب برسالة جاهزة تصل مباشرة لفريقنا.',
    name: 'الاسم',
    phone: 'رقم الهاتف',
    phonePlaceholder: '07XXXXXXXX',
    car: 'نوع السيارة',
    carPlaceholder: 'مثال: تويوتا بريوس',
    year: 'سنة الصنع',
    yearPlaceholder: 'مثال: 2016',
    optional: 'اختياري',
    problem: 'المشكلة',
    branch: 'الفرع',
    choose: 'اختر',
    submit: 'أرسل على واتساب',
    privacy: 'تُرسل بياناتك مباشرة على واتساب، ولا يُحفظ أي شيء على الموقع.',
    sent: 'سيفتح واتساب الآن برسالتك. إذا لم يفتح، اضغط على الرابط:',
    openAgain: 'افتح واتساب',
    errors: {
      name: 'اكتب اسمك من فضلك.',
      phoneEmpty: 'اكتب رقم هاتفك من فضلك.',
      phone: 'رقم الهاتف غير صحيح. اكتبه بهذا الشكل: 0791234567',
      car: 'اكتب نوع سيارتك من فضلك.',
      year: (max: number) => `سنة الصنع يجب أن تكون بين 1990 و${max}.`,
      problem: 'اختر المشكلة من القائمة.',
      branch: 'اختر الفرع الأقرب لك.',
      summary: 'بعض الحقول بحاجة لتعديل، راجع الملاحظات تحت كل حقل.',
    },
    message: {
      hello: 'مرحباً، أود حجز موعد.',
      name: 'الاسم',
      phone: 'رقم الهاتف',
      car: 'السيارة',
      year: 'سنة الصنع',
      problem: 'المشكلة',
      branch: 'الفرع',
    },
  },
  footer: { hours: 'ساعات الدوام', phones: 'أرقام الفروع' },
  notFound: { title: 'الصفحة غير موجودة', text: 'الرابط الذي فتحته غير صحيح أو تم نقله.', home: 'العودة إلى الصفحة الرئيسية' },
  weekdays: {
    sat: 'السبت',
    sun: 'الأحد',
    mon: 'الاثنين',
    tue: 'الثلاثاء',
    wed: 'الأربعاء',
    thu: 'الخميس',
    fri: 'الجمعة',
  } satisfies Record<Weekday, string>,
};

export type Dictionary = typeof ar;

const dictionaries: Partial<Record<Lang, Dictionary>> = { ar };

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang] ?? ar;
}
