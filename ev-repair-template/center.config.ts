/**
 * ============================================================================
 *  CENTER CONFIG: edit this one file to re-brand the whole site.
 * ============================================================================
 *  • Every visible text has an Arabic (`ar`) and English (`en`) version.
 *  • Everything below is SAMPLE DATA for a fictional center ("Volt Hybrid Center").
 *    Replace it with the real center's details before showing the demo.
 *  • Photos: put files in /public/photos and set `src: '/photos/name.webp'`.
 *    Empty `src` shows a labelled placeholder with the recommended size.
 *  • After editing, run `npm run dev` to preview. The build stops with a clear
 *    message if something is wrong (unknown service id, bad phone format...).
 * ============================================================================
 */
import type { CenterConfig } from './src/lib/types';

const center: CenterConfig = {
  /* ── Identity ─────────────────────────────────────────────────────────── */
  name: { ar: 'مركز فولت للهايبرد', en: 'Volt Hybrid Center' },
  tagline: {
    ar: 'متخصصون في صيانة السيارات الهايبرد والكهربائية في عمّان.',
    en: 'Hybrid and electric car specialists in Amman.',
  },
  logo: {
    src: '', // e.g. '/brand/logo.svg'. Empty = monogram + name
    width: 160,
    height: 40,
    monogram: 'V',
  },
  theme: 'electric', // 'electric' | 'night' | 'classic'
  defaultLang: 'ar', // language opened at "/"
  siteUrl: '', // e.g. 'https://volt-hybrid.com'. Empty = auto-detected on Vercel / Netlify
  allowIndexing: true, // set to false while pitching a demo so Google doesn't index it
  city: { ar: 'عمّان', en: 'Amman' },

  /* ── Contact ──────────────────────────────────────────────────────────── */
  contact: {
    phoneDial: '+962790000000',
    phoneDisplay: '079 000 0000',
    whatsapp: '962790000000',
    email: '',
  },
  whatsappMessage: {
    ar: 'مرحباً، أود حجز موعد فحص لسيارتي.',
    en: 'Hello, I’d like to book a check for my car.',
  },

  /* ── Location & hours ─────────────────────────────────────────────────── */
  location: {
    address: {
      ar: 'شارع تجريبي 10، المنطقة الصناعية، عمّان',
      en: '10 Sample Street, Industrial Area, Amman',
    },
    mapsEmbedUrl: 'https://www.google.com/maps?q=31.9539,35.9106&z=15&output=embed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=31.9539,35.9106',
    geo: { lat: 31.9539, lng: 35.9106 },
    countryCode: 'JO',
  },
  hours: {
    sat: ['08:30', '18:00'],
    sun: ['08:30', '18:00'],
    mon: ['08:30', '18:00'],
    tue: ['08:30', '18:00'],
    wed: ['08:30', '18:00'],
    thu: ['08:30', '15:00'],
    fri: null, // closed
  },
  weekStartsOn: 'sat',

  /* ── Trust ────────────────────────────────────────────────────────────── */
  google: {
    rating: 4.8, // use the center's REAL Google rating
    reviewCount: 120,
    reviewsUrl: 'https://www.google.com/maps/search/?api=1&query=Volt+Hybrid+Center+Amman',
  },
  stats: {
    yearsExperience: 12,
    carsServiced: 4000,
  },
  warranty: {
    short: { ar: '12 شهراً', en: '12 months' },
    details: {
      ar: 'كفالة 12 شهراً على إصلاح واستبدال بطاريات الهايبرد، مكتوبة على الفاتورة.',
      en: '12-month warranty on hybrid battery repair and replacement, written on your invoice.',
    },
  },
  pickup: {
    enabled: true,
    text: {
      ar: 'نستلم سيارتك من موقعك داخل عمّان ونعيدها بعد الإصلاح، ونرسل سطحة إذا كانت السيارة لا تتحرك. الرسوم حسب المسافة.',
      en: 'We can collect your car anywhere in Amman and bring it back after the repair, or send a flatbed if it can’t be driven. The fee depends on distance.',
    },
  },

  /* ── Prices ───────────────────────────────────────────────────────────── */
  showPrices: true, // false hides every "From ..." price on the site
  currency: { ar: 'د.أ', en: 'JOD' },

  /* ── SEO (homepage) ───────────────────────────────────────────────────── */
  seo: {
    title: {
      ar: 'مركز فولت للهايبرد | صيانة السيارات الهايبرد والكهربائية في عمّان',
      en: 'Volt Hybrid Center | Hybrid & EV Repair in Amman',
    },
    description: {
      ar: 'فحص وإصلاح بطاريات الهايبرد، وتشخيص السيارات الكهربائية، وصيانة الانفيرتر والمكيّف في عمّان. عرض سعر واضح قبل أي عمل. احجز عبر واتساب.',
      en: 'Hybrid battery testing and repair, EV diagnostics, inverter and A/C service in Amman. Clear quote before any work. Book on WhatsApp.',
    },
    ogImage: '', // optional '/photos/og.jpg' (1200×630). Empty = generated image
  },

  /* ── Hero ─────────────────────────────────────────────────────────────── */
  hero: {
    headline: {
      ar: 'متخصصون في السيارات الهايبرد والكهربائية في عمّان',
      en: 'Hybrid & EV specialists in Amman',
    },
    subtext: {
      ar: 'نفحص البطارية ونحدد العطل الحقيقي، ونعطيك سعراً واضحاً قبل أن نبدأ.',
      en: 'We test your battery, find the real fault and give you a clear price before we start.',
    },
    photo: {
      src: '',
      alt: {
        ar: 'فني يفحص بطارية سيارة هايبرد داخل الورشة',
        en: 'Technician testing a hybrid battery in the workshop',
      },
    },
  },

  /* ── Main offer banner ────────────────────────────────────────────────── */
  offer: {
    title: { ar: 'فحص صحة بطارية الهايبرد', en: 'Hybrid battery health check' },
    description: {
      ar: 'اعرف الحالة الحقيقية لبطاريتك قبل أن تدفع على إصلاح أو استبدال.',
      en: 'Know the real condition of your battery before you pay for a repair or replacement.',
    },
    includes: [
      { ar: 'قياس جهد كل خلية على حدة', en: 'Voltage test of every battery module' },
      { ar: 'قراءة أكواد الأعطال بالكمبيوتر', en: 'Computer scan for fault codes' },
      { ar: 'فحص مروحة وفلتر تبريد البطارية', en: 'Battery cooling fan and filter check' },
      { ar: 'تقرير مكتوب مع توصية واضحة', en: 'Written report with a clear recommendation' },
    ],
    duration: { ar: '45 إلى 60 دقيقة', en: '45–60 minutes' },
    priceFrom: 20,
    whatsappMessage: {
      ar: 'مرحباً، أود حجز فحص صحة بطارية الهايبرد.',
      en: 'Hello, I’d like to book a hybrid battery health check.',
    },
  },

  /* ── Services ─────────────────────────────────────────────────────────── */
  // icon: see src/lib/icons.ts for the list of available icons
  services: [
    {
      id: 'hybrid-battery',
      icon: 'battery',
      title: { ar: 'فحص وإصلاح بطارية الهايبرد', en: 'Hybrid battery testing & repair' },
      description: {
        ar: 'نفحص كل خلية، ونستبدل الضعيفة فقط، ونوازن البطارية لتعمل بكفاءة من جديد.',
        en: 'We test every module, replace only the weak ones and balance the pack so it works properly again.',
      },
      priceFrom: 25,
    },
    {
      id: 'battery-replacement',
      icon: 'batteryReplace',
      title: { ar: 'استبدال بطارية الهايبرد', en: 'Hybrid battery replacement' },
      description: {
        ar: 'بطارية جديدة أو مجدّدة حسب ميزانيتك، مع شرح واضح لفرق السعر والكفالة.',
        en: 'New or reconditioned, to suit your budget, with a clear explanation of the price and warranty difference.',
      },
      priceFrom: 350,
    },
    {
      id: 'inverter',
      icon: 'inverter',
      title: { ar: 'الانفيرتر والنظام الكهربائي', en: 'Inverter & electrical system' },
      description: {
        ar: 'تشخيص وإصلاح الانفيرتر ومضخة تبريده، والأسلاك والوصلات عالية الجهد.',
        en: 'Diagnosis and repair of the inverter, its cooling pump, and high-voltage wiring and connectors.',
      },
      priceFrom: 40,
    },
    {
      id: 'ev-battery',
      icon: 'evBattery',
      title: { ar: 'تشخيص بطاريات السيارات الكهربائية', en: 'EV battery diagnostics' },
      description: {
        ar: 'فحص صحة البطارية (SOH) وتوازن الخلايا ونظام التبريد، ومشاكل الشحن وانخفاض المدى.',
        en: 'Battery state of health (SOH), cell balance and cooling checks, plus charging and range problems.',
      },
      priceFrom: 35,
    },
    {
      id: 'diagnostics',
      icon: 'diagnostics',
      title: { ar: 'فحص كمبيوتر ولمبات التحذير', en: 'Computer diagnostics & warning lights' },
      description: {
        ar: 'نقرأ الأعطال بأجهزة تدعم الهايبرد والكهربائي، ونشرح لك سبب كل لمبة تحذير.',
        en: 'Scan tools made for hybrids and EVs. We explain what each warning light means and what the fix involves.',
      },
      priceFrom: 15,
    },
    {
      id: 'hybrid-ac',
      icon: 'ac',
      title: { ar: 'مكيّف الهايبرد (الكمبروسر الكهربائي)', en: 'Hybrid A/C (electric compressor)' },
      description: {
        ar: 'صيانة الكمبروسر الكهربائي وتعبئة الغاز بالزيت العازل الذي تحتاجه السيارات الهايبرد.',
        en: 'Electric compressor service and refrigerant recharge with the insulating oil hybrids need.',
      },
      priceFrom: 30,
    },
    {
      id: 'brakes',
      icon: 'brakes',
      title: { ar: 'الفرامل', en: 'Brakes' },
      description: {
        ar: 'فحص وتغيير الأقمشة والديسكات، وصيانة نظام الفرامل الإلكتروني في السيارات الهايبرد.',
        en: 'Pads and discs, plus service of the electronic brake system used in hybrids.',
      },
      priceFrom: 25,
    },
    {
      id: 'maintenance',
      icon: 'maintenance',
      title: { ar: 'الصيانة الدورية', en: 'Periodic maintenance' },
      description: {
        ar: 'تغيير الزيت والفلاتر، وفحص سوائل التبريد ونظام الهايبرد حسب جدول الشركة المصنعة.',
        en: 'Oil and filters, coolant checks and a hybrid system check, following the manufacturer’s schedule.',
      },
      priceFrom: 30,
    },
  ],

  /* ── Cars we service (one page per entry: /ar/cars/<slug>/) ──────────── */
  // type: 'hybrid' | 'phev' | 'ev' | 'mixed'
  // services: ids from the services list above
  cars: [
    {
      slug: 'toyota-prius',
      make: { ar: 'تويوتا', en: 'Toyota' },
      model: { ar: 'بريوس', en: 'Prius' },
      type: 'hybrid',
      years: '2004–2023',
      intro: {
        ar: 'بريوس من أكثر السيارات الهايبرد انتشاراً في الأردن. نعرف أعطالها الشائعة جيداً، من بطارية الهايبرد إلى مضخة تبريد الانفيرتر.',
        en: 'The Prius is one of the most common hybrids in Jordan. We know its usual faults well, from the hybrid battery to the inverter coolant pump.',
      },
      commonIssues: [
        {
          title: { ar: 'ضعف بطارية الهايبرد', en: 'Weak hybrid battery' },
          text: {
            ar: 'استهلاك أعلى للبنزين، أو تشغيل المحرك أكثر من المعتاد، أو ظهور المثلث الأحمر. غالباً يكفي استبدال الخلايا الضعيفة وموازنة البطارية.',
            en: 'Higher fuel use, the engine running more than usual, or the red triangle warning. Often fixed by replacing the weak modules and balancing the pack.',
          },
        },
        {
          title: { ar: 'انسداد مروحة تبريد البطارية', en: 'Clogged battery cooling fan' },
          text: {
            ar: 'الغبار يسد فلتر ومروحة تبريد البطارية، فترتفع حرارتها وتضعف أسرع. التنظيف الدوري يطيل عمرها.',
            en: 'Dust blocks the battery fan and filter, so the battery runs hot and ages faster. Regular cleaning extends its life.',
          },
        },
        {
          title: { ar: 'مضخة تبريد الانفيرتر', en: 'Inverter coolant pump' },
          text: {
            ar: 'عند تعطلها ترتفع حرارة الانفيرتر وتظهر لمبات التحذير. نفحص المضخة وسائل التبريد قبل أن يتضرر الانفيرتر.',
            en: 'When it fails, the inverter overheats and warning lights come on. We check the pump and coolant before the inverter is damaged.',
          },
        },
        {
          title: { ar: 'ضعف بطارية 12 فولت', en: 'Weak 12V battery' },
          text: {
            ar: 'السيارة لا تدخل وضع READY أو تظهر أعطال غريبة. بطارية 12 فولت الصغيرة سبب شائع، وفحصها سريع.',
            en: 'The car won’t go into READY or shows strange errors. The small 12V battery is a common cause and quick to test.',
          },
        },
      ],
      services: ['hybrid-battery', 'battery-replacement', 'inverter', 'diagnostics'],
      faq: [
        {
          q: { ar: 'كم يدوم إصلاح بطارية بريوس؟', en: 'How long does a Prius battery repair last?' },
          a: {
            ar: 'يعتمد على حالة باقي الخلايا وعمر البطارية. بعد الفحص نخبرك بصراحة إن كان الإصلاح مجدياً، أو أن الاستبدال أوفر على المدى الطويل.',
            en: 'It depends on the condition of the other modules and the age of the pack. After testing, we tell you honestly whether a repair makes sense or a replacement is better value long term.',
          },
        },
        {
          q: { ar: 'هل تعملون على جميع أجيال بريوس؟', en: 'Do you work on every Prius generation?' },
          a: {
            ar: 'نعم، من الجيل الثاني حتى أحدث الموديلات، بما فيها بريوس C وبريوس V.',
            en: 'Yes, from the second generation to the latest models, including the Prius C and Prius V.',
          },
        },
      ],
    },
    {
      slug: 'toyota-camry-hybrid',
      make: { ar: 'تويوتا', en: 'Toyota' },
      model: { ar: 'كامري هايبرد', en: 'Camry Hybrid' },
      type: 'hybrid',
      years: '2007–2024',
      intro: {
        ar: 'كامري هايبرد تدوم طويلاً إذا اعتنيت بنظام الهايبرد فيها. نفحصها ونصلحها بأجهزة تدعم أنظمة تويوتا.',
        en: 'A Camry Hybrid lasts a long time when its hybrid system is looked after. We test and repair it with Toyota-capable equipment.',
      },
      commonIssues: [
        {
          title: { ar: 'تبريد بطارية الهايبرد', en: 'Hybrid battery cooling' },
          text: {
            ar: 'فتحة تبريد البطارية بجانب المقعد الخلفي تُسد بالغبار، فترتفع حرارة البطارية. نفحصها وننظفها.',
            en: 'The battery air intake next to the rear seat gets blocked with dust, so the battery runs hot. We check and clean it.',
          },
        },
        {
          title: { ar: 'تراجع أداء البطارية', en: 'Hybrid battery wear' },
          text: {
            ar: 'ضعف في التسارع أو استهلاك أعلى للوقود. نقيس كل خلية لنعرف إن كانت البطارية هي السبب فعلاً.',
            en: 'Weaker acceleration or higher fuel use. We test every module to find out whether the battery is really the cause.',
          },
        },
        {
          title: { ar: 'نظام تبريد الانفيرتر', en: 'Inverter cooling' },
          text: {
            ar: 'نقص سائل التبريد أو ضعف المضخة قد يسبب لمبات تحذير وضعفاً في القوة. نفحص الدائرة كاملة.',
            en: 'Low coolant or a weak pump can cause warning lights and loss of power. We check the whole circuit.',
          },
        },
        {
          title: { ar: 'نظام الفرامل الإلكتروني', en: 'Electronic brake system' },
          text: {
            ar: 'صوت مستمر من وحدة الفرامل أو لمبة ABS. نشخّص الوحدة ونشرح لك خيارات الإصلاح.',
            en: 'A buzzing brake unit or an ABS warning light. We diagnose the unit and explain the repair options.',
          },
        },
      ],
      services: ['hybrid-battery', 'battery-replacement', 'inverter', 'brakes'],
      faq: [
        {
          q: {
            ar: 'هل أستطيع القيادة مع ظهور رسالة فحص نظام الهايبرد؟',
            en: 'Can I keep driving with the “Check hybrid system” warning?',
          },
          a: {
            ar: 'لا ننصح بالقيادة لمسافات طويلة. أوقف السيارة بأمان وتواصل معنا، فبعض الأعطال تزداد سوءاً مع القيادة.',
            en: 'We don’t recommend driving far. Stop safely and contact us, as some faults get worse with driving.',
          },
        },
        {
          q: { ar: 'كم يستغرق فحص كامري هايبرد؟', en: 'How long does a Camry Hybrid check take?' },
          a: {
            ar: 'الفحص الأساسي يستغرق حوالي ساعة. إن احتجنا لفحص أعمق نخبرك بالوقت والتكلفة قبل البدء.',
            en: 'A standard check takes about an hour. If we need to look deeper, we tell you the time and cost before starting.',
          },
        },
      ],
    },
    {
      slug: 'hyundai-ioniq',
      make: { ar: 'هيونداي', en: 'Hyundai' },
      model: { ar: 'أيونيك', en: 'Ioniq' },
      type: 'mixed',
      years: '2017–2022',
      intro: {
        ar: 'نخدم أيونيك بجميع أنواعها: الهايبرد، والهايبرد القابلة للشحن، والكهربائية بالكامل.',
        en: 'We service every Ioniq: hybrid, plug-in hybrid and fully electric.',
      },
      commonIssues: [
        {
          title: { ar: 'نفاد بطارية 12 فولت', en: '12V battery running flat' },
          text: {
            ar: 'في أيونيك الهايبرد بطارية 12 فولت من نوع ليثيوم مع زر إعادة تشغيل. نفحصها ونبحث عن سبب التفريغ.',
            en: 'The Ioniq Hybrid has a lithium 12V battery with a reset button. We test it and find out what is draining it.',
          },
        },
        {
          title: { ar: 'مشاكل الشحن', en: 'Charging problems' },
          text: {
            ar: 'السيارة لا تشحن أو يتوقف الشحن فجأة. السبب غالباً في الشاحن الداخلي أو منفذ الشحن، ونحدده بدقة.',
            en: 'The car won’t charge or stops charging. The cause is often the on-board charger or the charge port, and we pinpoint it.',
          },
        },
        {
          title: { ar: 'صحة البطارية الرئيسية', en: 'Main battery health' },
          text: {
            ar: 'نقيس صحة البطارية (SOH) وتوازن الخلايا لنعرف حالتها الحقيقية. هذا مفيد جداً قبل شراء سيارة مستعملة.',
            en: 'We measure battery state of health (SOH) and cell balance. This is especially useful before buying a used car.',
          },
        },
        {
          title: { ar: 'لمبات التحذير', en: 'Warning lights' },
          text: {
            ar: 'نقرأ أعطال أنظمة الهايبرد والكهرباء بجهاز يدعم هيونداي، ونشرح لك معنى كل عطل.',
            en: 'We read hybrid and EV fault codes with Hyundai-capable tools and explain what each one means.',
          },
        },
      ],
      services: ['hybrid-battery', 'ev-battery', 'diagnostics', 'hybrid-ac'],
      faq: [
        {
          q: { ar: 'هل تفحصون أيونيك قبل الشراء؟', en: 'Can you inspect an Ioniq before I buy it?' },
          a: {
            ar: 'نعم. فحص ما قبل الشراء يشمل صحة البطارية وقراءة الأعطال، وتحصل على تقرير مكتوب.',
            en: 'Yes. A pre-purchase check covers battery health and a fault scan, and you get a written report.',
          },
        },
        {
          q: { ar: 'أيونيك الهايبرد لا تعمل، ماذا أفعل؟', en: 'My Ioniq Hybrid won’t start. What should I do?' },
          a: {
            ar: 'جرّب زر 12V BATT RESET في جهة السائق من لوحة القيادة، ثم شغّل السيارة خلال ثوانٍ. إن تكررت المشكلة تواصل معنا لفحص البطارية.',
            en: 'Try the 12V BATT RESET button on the driver’s side of the dashboard, then start the car within a few seconds. If it keeps happening, contact us to test the battery.',
          },
        },
      ],
    },
    {
      slug: 'hyundai-sonata-hybrid',
      make: { ar: 'هيونداي', en: 'Hyundai' },
      model: { ar: 'سوناتا هايبرد', en: 'Sonata Hybrid' },
      type: 'hybrid',
      years: '2011–2023',
      intro: {
        ar: 'سوناتا هايبرد من أكثر السيارات الهايبرد شيوعاً في عمّان. نفحص بطاريتها ونظام الهايبرد بأجهزة تدعم هيونداي.',
        en: 'The Sonata Hybrid is one of the most common hybrids in Amman. We test its battery and hybrid system with Hyundai-capable tools.',
      },
      commonIssues: [
        {
          title: { ar: 'ضعف بطارية الهايبرد', en: 'Weak hybrid battery' },
          text: {
            ar: 'تراجع في الأداء أو ظهور رسالة فحص نظام الهايبرد. نقيس الخلايا ونقترح الإصلاح أو الاستبدال حسب النتيجة.',
            en: 'Weaker performance or a hybrid system warning. We test the cells and recommend repair or replacement based on the results.',
          },
        },
        {
          title: { ar: 'مولّد تشغيل المحرك (HSG)', en: 'Hybrid starter generator (HSG)' },
          text: {
            ar: 'تأخر في تشغيل المحرك أو اهتزاز عند التشغيل. نفحص المولّد ووصلاته وحزامه.',
            en: 'Slow or rough engine starts. We check the starter generator, its connections and its belt.',
          },
        },
        {
          title: { ar: 'قابض المحرك وناقل الحركة', en: 'Engine clutch and gearbox' },
          text: {
            ar: 'ارتجاج أو صوت عند انتقال السيارة بين الكهرباء والبنزين. نفحص القابض وزيت ناقل الحركة.',
            en: 'Judder or noise when the car switches between electric and petrol. We check the engine clutch and gearbox oil.',
          },
        },
        {
          title: { ar: 'تبريد البطارية', en: 'Battery cooling' },
          text: {
            ar: 'فتحة تبريد البطارية خلف المقعد الخلفي تحتاج تنظيفاً دورياً، خاصة في الصيف.',
            en: 'The battery air intake behind the rear seat needs regular cleaning, especially in summer.',
          },
        },
      ],
      services: ['hybrid-battery', 'battery-replacement', 'diagnostics', 'maintenance'],
      faq: [
        {
          q: { ar: 'هل بطارية سوناتا هايبرد قابلة للإصلاح؟', en: 'Can a Sonata Hybrid battery be repaired?' },
          a: {
            ar: 'في كثير من الحالات نعم، حسب حالة الخلايا. نفحصها أولاً، ونعطيك خيار الإصلاح أو الاستبدال مع السعر.',
            en: 'In many cases, yes, depending on the condition of the cells. We test it first and give you the repair or replacement option with a price.',
          },
        },
        {
          q: { ar: 'كم مرة أنظف فلتر تبريد البطارية؟', en: 'How often should the battery cooling intake be cleaned?' },
          a: {
            ar: 'ننصح بفحصه مع كل صيانة دورية، وتنظيفه مرة في السنة على الأقل، أو أكثر إذا كنت تقود في طرق مغبرة.',
            en: 'We suggest checking it at every service and cleaning it at least once a year, or more often if you drive on dusty roads.',
          },
        },
      ],
    },
    {
      slug: 'hyundai-kona-electric',
      make: { ar: 'هيونداي', en: 'Hyundai' },
      model: { ar: 'كونا الكهربائية', en: 'Kona Electric' },
      type: 'ev',
      years: '2019–2024',
      intro: {
        ar: 'كونا الكهربائية منتشرة في عمّان. نفحص البطارية وأنظمة الشحن والتبريد، ونصلح الأعطال الشائعة.',
        en: 'The Kona Electric is common in Amman. We check the battery, charging and cooling systems, and fix the usual faults.',
      },
      commonIssues: [
        {
          title: { ar: 'أعطال الشحن', en: 'Charging faults' },
          text: {
            ar: 'الشحن لا يبدأ أو يتوقف، أو تظهر رسالة خطأ. نفحص الشاحن الداخلي ووحدة التحكم بالشحن ومنفذ الشحن.',
            en: 'Charging won’t start, stops, or shows an error. We check the on-board charger, the charging control unit and the charge port.',
          },
        },
        {
          title: { ar: 'انخفاض المدى', en: 'Reduced range' },
          text: {
            ar: 'نقيس صحة البطارية وتوازن الخلايا لنعرف إن كان انخفاض المدى طبيعياً أم بسبب عطل.',
            en: 'We measure battery health and cell balance to see whether the range loss is normal wear or a fault.',
          },
        },
        {
          title: { ar: 'تبريد البطارية والمحرك', en: 'Battery and motor cooling' },
          text: {
            ar: 'حرارة الصيف في الأردن تضغط على نظام التبريد. نفحص مستوى السائل والمضخة والمروحة.',
            en: 'Jordan’s summer heat puts strain on the cooling system. We check the coolant level, pump and fan.',
          },
        },
        {
          title: { ar: 'تفريغ بطارية 12 فولت', en: '12V battery drain' },
          text: {
            ar: 'السيارة لا تعمل رغم أن البطارية الرئيسية مشحونة. السبب غالباً بطارية 12 فولت.',
            en: 'The car won’t power on even though the main battery is charged. The 12V battery is usually the cause.',
          },
        },
      ],
      services: ['ev-battery', 'diagnostics', 'hybrid-ac', 'maintenance'],
      faq: [
        {
          q: { ar: 'هل تحتاج السيارة الكهربائية إلى صيانة دورية؟', en: 'Does an electric car need regular servicing?' },
          a: {
            ar: 'نعم، لكنها أبسط: فحص سائل تبريد البطارية، والفرامل، والإطارات، وفلتر المكيّف، وقراءة الأعطال.',
            en: 'Yes, but it’s simpler: battery coolant, brakes, tyres, the cabin filter and a fault scan.',
          },
        },
        {
          q: { ar: 'هل تصلحون البطارية أم تستبدلونها؟', en: 'Do you repair the battery or replace it?' },
          a: {
            ar: 'نبدأ دائماً بالتشخيص. بعض الأعطال تُحل بإصلاح جزء محدد، وأحياناً يكون الاستبدال هو الحل. نشرح لك الخيارات والأسعار قبل أي عمل.',
            en: 'We always start with a diagnosis. Some faults are fixed by repairing one part; sometimes replacement is the answer. We explain the options and prices before any work.',
          },
        },
      ],
    },
    {
      slug: 'kia-niro',
      make: { ar: 'كيا', en: 'Kia' },
      model: { ar: 'نيرو', en: 'Niro' },
      type: 'mixed',
      years: '2017–2024',
      intro: {
        ar: 'نيرو متوفرة هايبرد، وهايبرد قابلة للشحن، وكهربائية بالكامل. نتعامل مع الأنواع الثلاثة.',
        en: 'The Niro comes as a hybrid, a plug-in hybrid and a full electric car. We work on all three.',
      },
      commonIssues: [
        {
          title: { ar: 'بطارية الهايبرد', en: 'Hybrid battery' },
          text: {
            ar: 'نفحص الخلايا ونظام التبريد عند ضعف الأداء أو ظهور لمبة التحذير.',
            en: 'We test the modules and the cooling system when performance drops or a warning light comes on.',
          },
        },
        {
          title: { ar: 'مولّد تشغيل المحرك (HSG)', en: 'Hybrid starter generator (HSG)' },
          text: {
            ar: 'تأخر في تشغيل المحرك أو اهتزاز عند التشغيل. نفحص المولّد ووصلاته.',
            en: 'Slow or rough engine starts. We check the starter generator and its connections.',
          },
        },
        {
          title: { ar: 'شحن نيرو الكهربائية', en: 'Niro EV charging' },
          text: {
            ar: 'صعوبة في بدء الشحن أو شحن بطيء. نفحص الشاحن الداخلي ومنفذ الشحن.',
            en: 'Trouble starting a charge or slow charging. We check the on-board charger and the charge port.',
          },
        },
        {
          title: { ar: 'ناقل الحركة', en: 'Gearbox feel' },
          text: {
            ar: 'نيرو الهايبرد تستخدم ناقل حركة مزدوج القابض. نفحص الارتجاج أو التردد عند الانطلاق.',
            en: 'The Niro Hybrid uses a dual-clutch gearbox. We check for judder or hesitation when pulling away.',
          },
        },
      ],
      services: ['hybrid-battery', 'ev-battery', 'diagnostics', 'maintenance'],
      faq: [
        {
          q: { ar: 'هل أستطيع شحن نيرو الكهربائية في المنزل؟', en: 'Can I charge a Niro EV at home?' },
          a: {
            ar: 'نعم. ننصح بشاحن منزلي يركّبه فني كهرباء مختص. إن واجهت مشكلة نفحص كابل الشحن ونظام الشحن في السيارة.',
            en: 'Yes. We recommend a wall charger fitted by a qualified electrician. If you have problems, we check the charging cable and the car’s charging system.',
          },
        },
        {
          q: { ar: 'كم تكلفة فحص نيرو؟', en: 'How much is a Niro check?' },
          a: {
            ar: 'لفحص الكمبيوتر سعر بداية معلن، وتحصل على عرض سعر واضح لأي إصلاح قبل أن نبدأ.',
            en: 'The computer check has a published starting price, and you get a clear quote for any repair before we begin.',
          },
        },
      ],
    },
    {
      slug: 'lexus-hybrid',
      make: { ar: 'لكزس', en: 'Lexus' },
      model: { ar: 'هايبرد', en: 'Hybrid' },
      label: { ar: 'لكزس هايبرد', en: 'Lexus hybrids' },
      h1: { ar: 'صيانة وتصليح سيارات لكزس الهايبرد في عمّان', en: 'Lexus hybrid repair in Amman' },
      type: 'hybrid',
      years: '2006–2024',
      intro: {
        ar: 'نخدم موديلات لكزس الهايبرد مثل CT200h وES300h وRX450h وNX300h. أنظمتها قريبة من أنظمة تويوتا ونعرفها جيداً.',
        en: 'We service Lexus hybrids such as the CT200h, ES300h, RX450h and NX300h. Their systems are close to Toyota’s, and we know them well.',
      },
      commonIssues: [
        {
          title: { ar: 'تراجع بطارية الهايبرد', en: 'Hybrid battery wear' },
          text: {
            ar: 'استهلاك أعلى للوقود أو لمبة تحذير. نفحص كل خلية ونعطيك خيار الإصلاح أو الاستبدال.',
            en: 'Higher fuel use or a warning light. We test every module and give you the repair or replacement option.',
          },
        },
        {
          title: { ar: 'مروحة تبريد البطارية', en: 'Battery cooling fan' },
          text: {
            ar: 'صوت عالٍ من المروحة أو ارتفاع حرارة البطارية. ننظف المروحة والفتحات ونفحص عملها.',
            en: 'A loud fan or a hot battery. We clean the fan and vents and check that it works properly.',
          },
        },
        {
          title: { ar: 'مضخة تبريد الانفيرتر', en: 'Inverter coolant pump' },
          text: {
            ar: 'تعطلها يرفع حرارة الانفيرتر ويُظهر لمبات التحذير. نكتشفها مبكراً في الفحص.',
            en: 'A failed pump makes the inverter overheat and triggers warnings. We catch it early during the check.',
          },
        },
        {
          title: { ar: 'وحدة الفرامل', en: 'Brake actuator' },
          text: {
            ar: 'في بعض الموديلات الأقدم تظهر لمبات الفرامل أو صوت مستمر من وحدة الفرامل. نشخّص الوحدة بدقة.',
            en: 'Some older models show brake warnings or a buzzing brake unit. We diagnose the unit properly.',
          },
        },
      ],
      services: ['hybrid-battery', 'battery-replacement', 'inverter', 'brakes'],
      faq: [
        {
          q: { ar: 'هل قطع لكزس الهايبرد متوفرة؟', en: 'Are Lexus hybrid parts easy to find?' },
          a: {
            ar: 'كثير من قطع نظام الهايبرد مشتركة مع تويوتا، لذلك نوفر قطعاً أصلية أو بديلة موثوقة حسب ميزانيتك.',
            en: 'Many hybrid parts are shared with Toyota, so we can supply original or reliable alternative parts to suit your budget.',
          },
        },
        {
          q: { ar: 'هل تخدمون لكزس RX450h؟', en: 'Do you service the Lexus RX450h?' },
          a: {
            ar: 'نعم، ونفحص فيها البطارية والانفيرتر ونظام الدفع الخلفي الكهربائي في نسخ الدفع الرباعي.',
            en: 'Yes. We check the battery, the inverter and, on AWD versions, the electric rear drive unit.',
          },
        },
      ],
    },
    {
      slug: 'nissan-leaf',
      make: { ar: 'نيسان', en: 'Nissan' },
      model: { ar: 'ليف', en: 'Leaf' },
      type: 'ev',
      years: '2011–2024',
      intro: {
        ar: 'بطارية ليف تُبرَّد بالهواء فقط، لذلك تتأثر بحرارة الصيف في الأردن أكثر من غيرها. نفحصها ونخبرك بحالتها بصدق.',
        en: 'The Leaf’s battery is air-cooled only, so it feels Jordan’s summer heat more than most. We test it and tell you honestly how it’s doing.',
      },
      commonIssues: [
        {
          title: { ar: 'فقدان خطوط سعة البطارية', en: 'Lost battery capacity bars' },
          text: {
            ar: 'نقص الخطوط بجانب مؤشر الشحن يعني تراجع سعة البطارية. نقيس صحتها وتوازن خلاياها لنعرف الخيارات المتاحة.',
            en: 'Missing bars next to the charge gauge mean the battery has lost capacity. We measure its health and cell balance to see what your options are.',
          },
        },
        {
          title: { ar: 'انخفاض المدى في الصيف', en: 'Shorter range in summer' },
          text: {
            ar: 'الحرارة تقلل المدى وتسرّع تراجع البطارية. نفحص البطارية ونعطيك نصائح عملية للاستخدام.',
            en: 'Heat cuts range and speeds up battery wear. We test the battery and give you practical tips.',
          },
        },
        {
          title: { ar: 'مشاكل الشحن', en: 'Charging problems' },
          text: {
            ar: 'الشحن لا يبدأ أو يتوقف. نفحص الشاحن الداخلي ومنفذ الشحن وكابل الشحن.',
            en: 'Charging won’t start or keeps stopping. We check the on-board charger, the charge port and the cable.',
          },
        },
        {
          title: { ar: 'بطارية 12 فولت', en: '12V battery' },
          text: {
            ar: 'ضعفها يسبب رسائل أعطال أو عدم تشغيل السيارة. فحصها سريع ويوفر عليك الكثير.',
            en: 'A weak 12V battery causes error messages or a car that won’t power on. It’s a quick test that can save you a lot.',
          },
        },
      ],
      services: ['ev-battery', 'diagnostics', 'brakes', 'maintenance'],
      faq: [
        {
          q: { ar: 'هل يمكن استبدال بطارية ليف ببطارية أكبر؟', en: 'Can a Leaf battery be upgraded to a bigger one?' },
          a: {
            ar: 'في بعض الحالات نعم، حسب سنة السيارة وتوفر البطارية. نفحص السيارة أولاً ونخبرك بما هو ممكن وبتكلفته.',
            en: 'In some cases, yes, depending on the car’s year and battery availability. We check the car first and tell you what’s possible and what it costs.',
          },
        },
        {
          q: { ar: 'كيف أحافظ على بطارية ليف في الصيف؟', en: 'How do I protect my Leaf battery in summer?' },
          a: {
            ar: 'اركن في الظل قدر الإمكان، وتجنّب الشحن السريع المتكرر في الطقس الحار، ولا تتركها مشحونة 100% لفترات طويلة.',
            en: 'Park in the shade when you can, avoid repeated fast charging in hot weather, and don’t leave it at 100% for long periods.',
          },
        },
      ],
    },
    {
      slug: 'byd',
      make: { ar: 'BYD', en: 'BYD' },
      model: { ar: 'جميع الموديلات', en: 'all models' },
      label: { ar: 'BYD', en: 'BYD' },
      h1: {
        ar: 'صيانة وتصليح سيارات BYD الكهربائية والهايبرد في عمّان',
        en: 'BYD electric & plug-in hybrid repair in Amman',
      },
      type: 'mixed',
      intro: {
        ar: 'سيارات BYD تنتشر بسرعة في الأردن. نفحص أنظمة البطارية والشحن والتبريد في موديلات مثل Atto 3 وDolphin وSeal وSong Plus.',
        en: 'BYD cars are spreading fast in Jordan. We check the battery, charging and thermal systems on models like the Atto 3, Dolphin, Seal and Song Plus.',
      },
      commonIssues: [
        {
          title: { ar: 'صحة البطارية', en: 'Battery health' },
          text: {
            ar: 'نقرأ بيانات البطارية وتوازن الخلايا لنتأكد من حالتها، خاصة قبل شراء سيارة مستعملة.',
            en: 'We read the battery data and cell balance to confirm its condition, especially before you buy a used car.',
          },
        },
        {
          title: { ar: 'أعطال الشحن', en: 'Charging faults' },
          text: {
            ar: 'الشحن لا يبدأ أو يتوقف، أو تظهر رسالة خطأ. نفحص الشاحن الداخلي ومنفذ الشحن.',
            en: 'Charging won’t start, stops, or shows an error. We check the on-board charger and the charge port.',
          },
        },
        {
          title: { ar: 'بطارية 12 فولت', en: '12V battery' },
          text: {
            ar: 'ضعفها يسبب رسائل أعطال أو عدم تشغيل السيارة. فحصها سريع.',
            en: 'A weak 12V battery causes error messages or a car that won’t power on. Testing it is quick.',
          },
        },
        {
          title: { ar: 'المكيّف ونظام التحكم بالحرارة', en: 'A/C and thermal system' },
          text: {
            ar: 'المكيّف في هذه السيارات يساعد في تبريد البطارية أيضاً. نفحص الكمبروسر الكهربائي ونظام التبريد كاملاً.',
            en: 'In these cars the A/C also helps cool the battery. We check the electric compressor and the whole cooling system.',
          },
        },
      ],
      services: ['ev-battery', 'diagnostics', 'hybrid-ac', 'maintenance'],
      faq: [
        {
          q: { ar: 'هل تتعاملون مع موديلات BYD الحديثة؟', en: 'Do you work on newer BYD models?' },
          a: {
            ar: 'نعم، نعمل على معظم موديلات BYD الكهربائية والهايبرد المنتشرة في الأردن. أرسل لنا الموديل والسنة عبر واتساب لنؤكد لك.',
            en: 'Yes, we work on most BYD electric and plug-in hybrid models sold in Jordan. Send us the model and year on WhatsApp and we’ll confirm.',
          },
        },
        {
          q: { ar: 'هل يؤثر الفحص عندكم على كفالة الوكالة؟', en: 'Will servicing with you affect my dealer warranty?' },
          a: {
            ar: 'الفحص وقراءة الأعطال لا يؤثران على الكفالة. إن كانت سيارتك ما زالت في كفالة الوكالة، نخبرك متى يكون الأفضل مراجعة الوكيل.',
            en: 'A check and fault scan don’t affect your warranty. If your car is still under dealer warranty, we’ll tell you when it’s better to go to the dealer.',
          },
        },
      ],
    },
  ],

  /* ── How it works (4 steps) ───────────────────────────────────────────── */
  steps: [
    {
      title: { ar: 'تواصل معنا', en: 'Contact us' },
      text: {
        ar: 'اتصل أو أرسل رسالة واتساب، وأخبرنا عن سيارتك والمشكلة.',
        en: 'Call or send a WhatsApp message. Tell us about your car and the problem.',
      },
    },
    {
      title: { ar: 'التشخيص', en: 'Diagnosis' },
      text: {
        ar: 'نفحص السيارة بالأجهزة المناسبة ونحدد السبب الحقيقي للعطل.',
        en: 'We test the car with the right equipment and find the real cause.',
      },
    },
    {
      title: { ar: 'عرض سعر واضح قبل أي عمل', en: 'Clear quote before any work' },
      text: {
        ar: 'نشرح لك العطل والخيارات والسعر. لا نبدأ قبل موافقتك.',
        en: 'We explain the fault, your options and the price. Nothing starts without your OK.',
      },
    },
    {
      title: { ar: 'الإصلاح والكفالة', en: 'Repair & warranty' },
      text: {
        ar: 'ننجز الإصلاح، ونسلّمك السيارة مع فاتورة وكفالة مكتوبة.',
        en: 'We do the repair and hand back your car with an invoice and a written warranty.',
      },
    },
  ],

  /* ── Lead engineer ────────────────────────────────────────────────────── */
  engineer: {
    name: { ar: 'م. اسم تجريبي', en: 'Eng. Sample Name' },
    role: { ar: 'المهندس المسؤول', en: 'Lead engineer' },
    yearsExperience: 15,
    specialties: [
      { ar: 'بطاريات الهايبرد', en: 'Hybrid batteries' },
      { ar: 'أنظمة الجهد العالي', en: 'High-voltage systems' },
      { ar: 'تشخيص السيارات الكهربائية', en: 'EV diagnostics' },
      { ar: 'أنظمة تويوتا وهيونداي الهايبرد', en: 'Toyota & Hyundai hybrid systems' },
    ],
    note: {
      ar: 'أشرح لكل زبون العطل بلغة بسيطة، وأريه القطعة التالفة عندما يكون ذلك ممكناً. إذا كان الإصلاح غير مجدٍ، أقول ذلك بصراحة.',
      en: 'I explain every fault in plain language and show you the damaged part when I can. If a repair isn’t worth it, I’ll tell you.',
    },
    photo: {
      src: '',
      alt: { ar: 'صورة المهندس المسؤول في الورشة', en: 'The lead engineer in the workshop' },
    },
  },

  /* ── Workshop gallery ─────────────────────────────────────────────────── */
  gallery: [
    { src: '', alt: { ar: 'جهاز فحص خلايا بطارية الهايبرد', en: 'Hybrid battery cell testing equipment' } },
    { src: '', alt: { ar: 'الفريق داخل الورشة', en: 'The team in the workshop' } },
    { src: '', alt: { ar: 'منطقة العمل ورافعات السيارات', en: 'Work bays and car lifts' } },
    { src: '', alt: { ar: 'فحص كمبيوتر لسيارة كهربائية', en: 'Computer diagnosis on an electric car' } },
    { src: '', alt: { ar: 'العمل على بطارية هايبرد', en: 'Work on a hybrid battery pack' } },
    { src: '', alt: { ar: 'منطقة استقبال الزبائن', en: 'Customer reception area' } },
  ],

  /* ── Reviews ──────────────────────────────────────────────────────────── */
  // Use REAL Google reviews supplied by the center, copied exactly as written.
  // `sample: true` shows a visible "Sample review" label. Delete it only for real reviews.
  reviews: [
    {
      author: 'عميل تجريبي',
      lang: 'ar',
      rating: 5,
      text: 'شرحوا لي مشكلة بطارية البريوس بوضوح، واستبدلوا الخلايا الضعيفة فقط. السعر كان مثل ما اتفقنا بالضبط.',
      car: 'Toyota Prius 2014',
      sample: true,
    },
    {
      author: 'Sample Customer',
      lang: 'en',
      rating: 5,
      text: 'Clear diagnosis on my Ioniq and no pressure to replace the battery. They showed me the test results before doing anything.',
      car: 'Hyundai Ioniq 2019',
      sample: true,
    },
    {
      author: 'عميل تجريبي',
      lang: 'ar',
      rating: 5,
      text: 'تعامل محترم ومواعيد دقيقة. المكيّف صار يبرّد ممتاز بعد الصيانة، وأعطوني فاتورة فيها كل التفاصيل.',
      car: 'Toyota Camry Hybrid 2016',
      sample: true,
    },
  ],

  /* ── FAQ (homepage) ───────────────────────────────────────────────────── */
  faq: [
    {
      q: { ar: 'هل أصلح بطارية الهايبرد أم أستبدلها؟', en: 'Should I repair or replace my hybrid battery?' },
      a: {
        ar: 'إذا كانت معظم الخلايا بحالة جيدة، فاستبدال الخلايا الضعيفة وموازنة البطارية أوفر بكثير. إذا كانت البطارية قديمة وأغلب خلاياها ضعيفة، فالاستبدال أفضل على المدى الطويل. نقرر ذلك بعد الفحص ونشرح لك السبب.',
        en: 'If most modules are healthy, replacing the weak ones and balancing the pack costs much less. If the battery is old and most modules are weak, a replacement is better value long term. We decide after testing and explain why.',
      },
    },
    {
      q: { ar: 'كم يستغرق الإصلاح؟', en: 'How long does a repair take?' },
      a: {
        ar: 'فحص البطارية يستغرق حوالي ساعة. إصلاح البطارية يكون غالباً في نفس اليوم أو اليوم التالي، والاستبدال يعتمد على توفر البطارية. نعطيك موعداً واضحاً مع عرض السعر.',
        en: 'A battery test takes about an hour. Battery repairs are usually done the same or the next day; replacements depend on battery availability. You get a clear time with your quote.',
      },
    },
    {
      q: { ar: 'هل يوجد كفالة؟', en: 'Do you give a warranty?' },
      a: {
        ar: 'نعم. كفالة 12 شهراً على إصلاح واستبدال بطاريات الهايبرد، وكفالة على القطع والعمل في باقي الخدمات. تُكتب الكفالة على الفاتورة.',
        en: 'Yes. 12 months on hybrid battery repair and replacement, and a warranty on parts and labour for other work. It’s written on your invoice.',
      },
    },
    {
      q: { ar: 'كم تكلفة إصلاح بطارية الهايبرد تقريباً؟', en: 'Roughly how much does a hybrid battery repair cost?' },
      a: {
        ar: 'يعتمد على نوع السيارة وعدد الخلايا التي تحتاج استبدالاً. الفحص يبدأ من 20 د.أ، والإصلاح عادة أقل بكثير من سعر بطارية جديدة. تعرف السعر النهائي قبل أي عمل.',
        en: 'It depends on the car and how many modules need replacing. Testing starts from 20 JOD, and a repair usually costs far less than a new battery. You get the final price before any work.',
      },
    },
    {
      q: { ar: 'هل تستخدمون قطعاً أصلية أم مجدّدة؟', en: 'Do you use original or reconditioned parts?' },
      a: {
        ar: 'الاثنين، وأنت تختار. القطع الأصلية الجديدة أغلى وكفالتها أطول، والمجدّدة أوفر وتُفحص قبل التركيب. نكتب نوع القطعة على الفاتورة دائماً.',
        en: 'Both, and you choose. New original parts cost more and carry a longer warranty; reconditioned parts cost less and are tested before fitting. The part type is always written on your invoice.',
      },
    },
    {
      q: { ar: 'هل تستلمون السيارة من موقعي؟', en: 'Can you pick up my car?' },
      a: {
        ar: 'نعم، داخل عمّان. نستلم السيارة ونعيدها بعد الإصلاح، ونرسل سطحة إذا كانت السيارة لا تتحرك. الرسوم حسب المسافة.',
        en: 'Yes, within Amman. We collect your car and bring it back after the repair, or send a flatbed if it can’t be driven. The fee depends on distance.',
      },
      onlyIfPickup: true,
    },
  ],

  /* ── Booking form ─────────────────────────────────────────────────────── */
  booking: {
    otherMakes: [
      { ar: 'هوندا', en: 'Honda' },
      { ar: 'فورد', en: 'Ford' },
      { ar: 'فولكس فاجن', en: 'Volkswagen' },
      { ar: 'تسلا', en: 'Tesla' },
      { ar: 'ميتسوبيشي', en: 'Mitsubishi' },
      { ar: 'شيفروليه', en: 'Chevrolet' },
    ],
  },

  /* ── Social links (leave empty to hide) ───────────────────────────────── */
  socials: {
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/',
    tiktok: '',
    youtube: '',
    x: '',
  },

  /* ── Footer credit (empty = hidden) ───────────────────────────────────── */
  footerCredit: {
    text: { ar: '', en: '' }, // e.g. { ar: 'تصميم: اسمك', en: 'Website by Your Name' }
    url: '',
  },
};

export default center;
