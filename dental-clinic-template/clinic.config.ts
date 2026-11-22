/**
 * ─────────────────────────────────────────────────────────────────────
 *  CLINIC CONFIG — the only file you edit to re-brand the site.
 * ─────────────────────────────────────────────────────────────────────
 *  Every text has { ar, en }. All values below are SAMPLE DATA.
 *  Replace them with the clinic's real details before going live.
 *
 *  Photos: set any `photo`/`image` to null to show a labeled placeholder,
 *  or point it at a file in /public/images (see README → Photos).
 */
import type { ClinicConfig } from './src/lib/types';

const clinic: ClinicConfig = {
  // ── Brand ──────────────────────────────────────────────────────────
  name: { ar: 'عيادة سمايل لطب الأسنان', en: 'Smile Dental Clinic' },
  tagline: { ar: 'رعاية أسنان حديثة في عمّان', en: 'Modern dental care in Amman' },

  /** 'clinical' (white + soft blue) | 'fresh' (white + mint/teal) | 'premium' (warm off-white + soft gold) */
  theme: 'clinical',
  // themeOverrides: { primary: '#1d5fa8', primaryHover: '#174e8c' },

  /** Language for the root URL "/" */
  defaultLanguage: 'ar',
  /** e.g. 'https://smile-dental.vercel.app' — leave '' to auto-detect on Vercel/Netlify */
  siteUrl: '',

  logo: {
    // image: { src: '/images/logo.svg', width: 180, height: 48 },
    image: null,
    monogram: 'S',
  },

  // ── Contact ────────────────────────────────────────────────────────
  contact: {
    phone: '+962 6 500 0000',
    whatsapp: '+962 79 000 0000',
    email: 'hello@example.com',
  },

  location: {
    address: { ar: 'مبنى 10، شارع تجريبي، الطابق الثاني', en: 'Building 10, Sample Street, 2nd floor' },
    area: { ar: 'عبدون', en: 'Abdoun' },
    city: { ar: 'عمّان', en: 'Amman' },
    country: 'JO',
    geo: { lat: 31.9497, lng: 35.8836 },
    mapsEmbedUrl: 'https://maps.google.com/maps?q=31.9497,35.8836&z=15&output=embed',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=31.9497,35.8836',
    parkingNote: {
      ar: 'تتوفر مواقف مجانية أمام المبنى.',
      en: 'Free parking is available in front of the building.',
    },
  },

  hours: [
    { day: 'sat', open: '10:00', close: '20:00' },
    { day: 'sun', open: '10:00', close: '20:00' },
    { day: 'mon', open: '10:00', close: '20:00' },
    { day: 'tue', open: '10:00', close: '20:00' },
    { day: 'wed', open: '10:00', close: '20:00' },
    { day: 'thu', open: '10:00', close: '17:00' },
    { day: 'fri', closed: true },
  ],

  // ── Trust ──────────────────────────────────────────────────────────
  rating: {
    value: 4.9,
    count: 230,
    reviewsUrl: 'https://www.google.com/maps',
  },

  stats: {
    yearsExperience: 15,
    patientsTreated: 12000,
    specialists: 3,
  },

  // ── Hero ───────────────────────────────────────────────────────────
  hero: {
    headline: {
      ar: 'رعاية أسنان لطيفة وحديثة في عمّان',
      en: 'Gentle, modern dental care in Amman',
    },
    subtext: {
      ar: 'أطباء ذوو خبرة، وخطة علاج واضحة، وعيادة هادئة. احجز عبر واتساب خلال دقيقة.',
      en: 'Experienced dentists, clear treatment plans and a calm clinic. Book on WhatsApp in a minute.',
    },
    // image: { src: '/images/hero.webp', alt: { ar: 'استقبال العيادة', en: 'Clinic reception' } },
    image: null,
  },

  // ── Services ───────────────────────────────────────────────────────
  services: {
    /** Show "starting from" prices on the service cards */
    showPrices: true,
    currency: { ar: 'د.أ', en: 'JOD' },
    items: [
      {
        id: 'implants',
        icon: 'implant',
        title: { ar: 'زراعة الأسنان', en: 'Dental implants' },
        description: {
          ar: 'تعويض الأسنان المفقودة بزرعة ثابتة وطبيعية المظهر، بتخطيط دقيق بالأشعة الرقمية.',
          en: 'Replace missing teeth with a fixed, natural-looking implant, planned with digital X-rays.',
        },
        priceFrom: 450,
      },
      {
        id: 'veneers',
        icon: 'veneers',
        title: { ar: 'الفينير وابتسامة هوليوود', en: 'Veneers & Hollywood Smile' },
        description: {
          ar: 'قشور خزفية رقيقة تحسّن شكل الأسنان ولونها وتناسقها.',
          en: 'Thin porcelain veneers that improve the shape, colour and balance of your smile.',
        },
        priceFrom: 150,
      },
      {
        id: 'whitening',
        icon: 'whitening',
        title: { ar: 'تبييض الأسنان', en: 'Teeth whitening' },
        description: {
          ar: 'تبييض احترافي في العيادة لابتسامة أكثر إشراقاً، مع مراعاة حساسية الأسنان.',
          en: 'Professional in-clinic whitening for a brighter smile, with care for sensitive teeth.',
        },
        priceFrom: 120,
      },
      {
        id: 'orthodontics',
        icon: 'orthodontics',
        title: { ar: 'التقويم والتقويم الشفاف', en: 'Orthodontics & clear aligners' },
        description: {
          ar: 'تقويم تقليدي أو شفاف لتصحيح اصطفاف الأسنان في مختلف الأعمار.',
          en: 'Braces or clear aligners to straighten teeth at any age.',
        },
        priceFrom: 900,
      },
      {
        id: 'root-canal',
        icon: 'root-canal',
        title: { ar: 'علاج العصب', en: 'Root canal treatment' },
        description: {
          ar: 'إنقاذ السن الملتهب أو المؤلم بعلاج دقيق تحت التخدير الموضعي.',
          en: 'Save an infected or painful tooth with careful treatment under local anaesthesia.',
        },
        priceFrom: 80,
      },
      {
        id: 'kids',
        icon: 'kids',
        title: { ar: 'طب أسنان الأطفال', en: 'Kids dentistry' },
        description: {
          ar: 'رعاية لطيفة وصبورة تساعد الأطفال على الشعور بالأمان عند طبيب الأسنان.',
          en: 'Friendly, patient care that helps children feel safe at the dentist.',
        },
        priceFrom: 20,
      },
      {
        id: 'cleaning',
        icon: 'cleaning',
        title: { ar: 'التنظيف والفحص الدوري', en: 'Cleaning & checkups' },
        description: {
          ar: 'تنظيف وفحص منتظم للحفاظ على صحة الأسنان واللثة.',
          en: 'Regular cleaning and checkups to keep teeth and gums healthy.',
        },
        priceFrom: 25,
      },
    ],
  },

  // ── Doctors ────────────────────────────────────────────────────────
  doctors: [
    {
      name: { ar: 'د. اسم تجريبي', en: 'Dr. Sample Name' },
      gender: 'male',
      role: { ar: 'أخصائي تجميل وزراعة الأسنان', en: 'Cosmetic & implant dentist' },
      // photo: { src: '/images/doctor.webp', alt: { ar: 'د. اسم تجريبي', en: 'Dr. Sample Name' } },
      photo: null,
      credentials: [
        { ar: 'بكالوريوس طب وجراحة الفم والأسنان', en: 'Doctor of Dental Surgery (DDS)' },
        { ar: 'ماجستير في التركيبات السنية', en: "Master's degree in prosthodontics" },
        { ar: 'شهادة معتمدة في زراعة الأسنان', en: 'Certified in implant dentistry' },
      ],
      university: { ar: 'جامعة تجريبية – كلية طب الأسنان', en: 'Sample University, Faculty of Dentistry' },
      memberships: [
        { ar: 'نقابة أطباء الأسنان الأردنية', en: 'Jordan Dental Association' },
        { ar: 'جمعية دولية تجريبية لزراعة الأسنان', en: 'Sample International Implant Society' },
      ],
      note: {
        ar: 'أؤمن أن طب الأسنان الجيد يبدأ بالإصغاء. سأشرح لك الخيارات بوضوح، وأجيب عن كل أسئلتك، وأحرص على راحتك في كل خطوة.',
        en: "I believe good dentistry starts with listening. I'll explain your options clearly, answer every question, and make sure you feel comfortable at each step.",
      },
    },
    {
      name: { ar: 'د. اسم مثال', en: 'Dr. Example Name' },
      gender: 'female',
      role: { ar: 'أخصائية تقويم الأسنان', en: 'Orthodontist' },
      photo: null,
      credentials: [{ ar: 'اختصاص تقويم الأسنان', en: 'Specialist in orthodontics' }],
    },
    {
      name: { ar: 'د. اسم افتراضي', en: 'Dr. Placeholder Name' },
      gender: 'male',
      role: { ar: 'طبيب أسنان الأطفال', en: 'Paediatric dentist' },
      photo: null,
      credentials: [{ ar: 'اختصاص طب أسنان الأطفال', en: 'Specialist in paediatric dentistry' }],
    },
  ],

  // ── Before & after ─────────────────────────────────────────────────
  beforeAfter: {
    enabled: true,
    cases: [
      { title: { ar: 'فينير', en: 'Veneers' }, before: null, after: null },
      { title: { ar: 'تبييض', en: 'Whitening' }, before: null, after: null },
      { title: { ar: 'تقويم شفاف', en: 'Clear aligners' }, before: null, after: null },
      { title: { ar: 'زراعة', en: 'Implants' }, before: null, after: null },
    ],
  },

  // ── Why patients choose us ─────────────────────────────────────────
  whyUs: [
    {
      icon: 'equipment',
      title: { ar: 'أجهزة حديثة', en: 'Modern equipment' },
      text: {
        ar: 'أشعة رقمية وأدوات حديثة لتشخيص دقيق وعلاج أكثر راحة.',
        en: 'Digital X-rays and up-to-date tools for accurate diagnosis and more comfortable treatment.',
      },
    },
    {
      icon: 'sterilization',
      title: { ar: 'تعقيم صارم', en: 'Strict sterilisation' },
      text: {
        ar: 'نعقّم كل الأدوات ونتابعها وفق معايير مكافحة العدوى المعتمدة.',
        en: 'Every instrument is sterilised and tracked, following recognised infection-control standards.',
      },
    },
    {
      icon: 'payment',
      title: { ar: 'خطط دفع مرنة', en: 'Flexible payment plans' },
      text: {
        ar: 'يمكنك تقسيط تكلفة العلاجات الكبيرة على دفعات شهرية.',
        en: 'Spread the cost of larger treatments over monthly instalments.',
      },
    },
    {
      icon: 'comfort',
      title: { ar: 'راحتك أولاً', en: 'Your comfort first' },
      text: {
        ar: 'عيادة هادئة، ورعاية لطيفة، ووقت كافٍ للإجابة عن أسئلتك.',
        en: 'A calm clinic, gentle care and time to answer your questions.',
      },
    },
  ],

  // ── Reviews ────────────────────────────────────────────────────────
  // Only real Google reviews supplied by the clinic, copied word-for-word.
  // Keep `sample: true` until then — it shows a visible "Sample review" badge.
  reviews: [
    {
      author: 'مراجع تجريبي',
      rating: 5,
      lang: 'ar',
      text: 'شرح لي الطبيب كل خطوة قبل البدء، ولم أشعر بأي استعجال. العيادة نظيفة جداً والاستقبال لطيف.',
      date: '2026-09',
      sample: true,
    },
    {
      author: 'Sample Patient',
      rating: 5,
      lang: 'en',
      text: 'I flew in from abroad for veneers. They planned my appointments around my trip and kept in touch on WhatsApp the whole time.',
      date: '2026-08',
      sample: true,
    },
    {
      author: 'مراجِعة تجريبية',
      rating: 5,
      lang: 'ar',
      text: 'أخذت ابني لأول زيارة عند طبيب الأسنان، وكانوا صبورين ولطيفين معه. أصبح لا يخاف من الموعد القادم.',
      date: '2026-07',
      sample: true,
    },
    {
      author: 'Example Reviewer',
      rating: 5,
      lang: 'en',
      text: 'Clear prices before we started and a payment plan that worked for me. Very professional team.',
      date: '2026-06',
      sample: true,
    },
  ],

  // ── Patients from abroad ───────────────────────────────────────────
  abroad: {
    enabled: true,
    intro: {
      ar: 'نستقبل مرضى من خارج الأردن، ونساعدك في ترتيب العلاج بما يناسب مواعيد سفرك.',
      en: 'We welcome patients from outside Jordan and help you plan treatment around your travel dates.',
    },
    help: [
      { ar: 'تقييم أولي من صورك أو صور الأشعة عبر واتساب', en: 'An initial assessment from your photos or X-rays on WhatsApp' },
      { ar: 'خطة علاج وتكلفة تقديرية مكتوبة قبل سفرك', en: 'A written treatment plan and estimate before you travel' },
      { ar: 'مواعيد مرتّبة حسب تواريخ سفرك', en: 'Appointments arranged around your travel dates' },
      { ar: 'مساعدة في اختيار فندق قريب والمواصلات', en: 'Help choosing a nearby hotel and transport' },
    ],
    timeline: [
      {
        title: { ar: 'قبل السفر', en: 'Before you travel' },
        text: {
          ar: 'أرسل صورك أو صور الأشعة عبر واتساب، وسنقترح خطة العلاج وعدد الأيام التي تحتاجها.',
          en: "Send photos or X-rays on WhatsApp. We'll suggest a plan and how many days you'll need.",
        },
      },
      {
        title: { ar: 'الزيارة الأولى', en: 'First visit' },
        text: {
          ar: 'فحص شامل وأشعة رقمية، ثم خطة نهائية بالتكلفة الكاملة.',
          en: 'A full examination and digital X-rays, then a final plan with the full cost.',
        },
      },
      {
        title: { ar: 'أيام العلاج', en: 'Treatment days' },
        text: {
          ar: 'تحتاج أغلب العلاجات التجميلية من 5 إلى 7 أيام. أما الزراعة فتتطلب عادةً زيارة ثانية بعد 3 إلى 4 أشهر.',
          en: 'Most cosmetic treatments take 5–7 days. Implants usually need a second trip after 3–4 months.',
        },
      },
      {
        title: { ar: 'بعد العودة', en: 'After you leave' },
        text: {
          ar: 'نبقى على تواصل معك عبر واتساب للمتابعة والإجابة عن أي سؤال.',
          en: 'We stay in touch on WhatsApp for follow-up and any questions.',
        },
      },
    ],
    hotels: [
      { name: { ar: 'فندق تجريبي الأول', en: 'Sample Hotel One' }, note: { ar: '5 دقائق بالسيارة', en: '5 minutes by car' } },
      { name: { ar: 'فندق تجريبي الثاني', en: 'Sample Hotel Two' }, note: { ar: '10 دقائق بالسيارة', en: '10 minutes by car' } },
      { name: { ar: 'شقق فندقية تجريبية', en: 'Sample Serviced Apartments' }, note: { ar: 'على بُعد خطوات سيراً', en: 'A short walk away' } },
    ],
  },

  // ── FAQ ────────────────────────────────────────────────────────────
  faq: [
    {
      q: { ar: 'كم تكلفة العلاج؟', en: 'How much does treatment cost?' },
      a: {
        ar: 'تعتمد التكلفة على حالتك. بعد فحص قصير نقدّم لك خطة علاج مكتوبة بالتكلفة الكاملة قبل البدء، دون مفاجآت.',
        en: 'It depends on your case. After a short examination, we give you a written plan with the full cost before we start — no surprises.',
      },
    },
    {
      q: { ar: 'هل يمكن تقسيط تكلفة العلاج؟', en: 'Do you offer payment plans?' },
      a: {
        ar: 'نعم. يمكن تقسيط العلاجات الكبيرة مثل الزراعة والفينير والتقويم على دفعات شهرية. اسألنا عن التفاصيل.',
        en: 'Yes. Larger treatments such as implants, veneers and orthodontics can be paid in monthly instalments. Ask us for details.',
      },
    },
    {
      q: { ar: 'هل تقبلون التأمين الصحي؟', en: 'Do you accept insurance?' },
      a: {
        ar: 'نتعامل مع عدد من شركات التأمين في الأردن. أرسل لنا صورة بطاقة التأمين عبر واتساب وسنتحقق من التغطية.',
        en: "We work with several insurance companies in Jordan. Send us a photo of your insurance card on WhatsApp and we'll check your cover.",
      },
    },
    {
      q: { ar: 'هل العلاج مؤلم؟', en: 'Will it hurt?' },
      a: {
        ar: 'تُجرى أغلب العلاجات تحت التخدير الموضعي، لذلك يكون الإحساس بالألم خفيفاً في العادة. أخبرنا إن كنت تشعر بالقلق، وسنعمل بهدوء ونشرح لك كل خطوة.',
        en: "Most treatments are done under local anaesthesia, so discomfort is usually mild. Tell us if you feel anxious — we'll go slowly and explain each step.",
      },
    },
    {
      q: { ar: 'كم زيارة سأحتاج؟', en: 'How many visits will I need?' },
      a: {
        ar: 'يعتمد ذلك على العلاج. التنظيف والتبييض زيارة واحدة عادةً، وعلاج العصب زيارة أو زيارتان، أما الزراعة فتتم على مراحل خلال بضعة أشهر. نوضح لك الجدول الزمني في الزيارة الأولى.',
        en: "It depends on the treatment. Cleaning and whitening usually take one visit, a root canal one or two, and implants are done in stages over a few months. We'll explain the timeline at your first visit.",
      },
    },
  ],

  // ── Social (leave '' or remove to hide) ────────────────────────────
  social: {
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
    tiktok: '',
    youtube: '',
  },

  // ── SEO ────────────────────────────────────────────────────────────
  seo: {
    title: {
      ar: 'عيادة سمايل لطب الأسنان | طبيب أسنان في عبدون، عمّان',
      en: 'Smile Dental Clinic | Dentist in Abdoun, Amman',
    },
    description: {
      ar: 'رعاية أسنان حديثة ولطيفة في عمّان: زراعة، فينير، تبييض، تقويم وطب أسنان الأطفال. احجز موعدك بسهولة عبر واتساب.',
      en: 'Gentle, modern dental care in Amman: implants, veneers, whitening, orthodontics and kids dentistry. Book easily on WhatsApp.',
    },
    priceRange: '$$',
  },

  credit: {
    label: 'Hyperform',
    // url: 'https://your-studio-site.com',
  },
};

export default clinic;
