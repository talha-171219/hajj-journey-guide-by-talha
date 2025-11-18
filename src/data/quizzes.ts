export interface QuizQuestion {
  id: string;
  question: {
    en: string;
    bn: string;
    ar: string;
  };
  options: {
    en: string[];
    bn: string[];
    ar: string[];
  };
  correctAnswer: number;
  explanation: {
    en: string;
    bn: string;
    ar: string;
  };
}

export interface ModuleQuiz {
  moduleId: string;
  questions: QuizQuestion[];
}

export const quizzes: ModuleQuiz[] = [
  {
    moduleId: 'intro',
    questions: [
      {
        id: 'intro_q1',
        question: {
          en: 'What is the fifth pillar of Islam?',
          bn: 'ইসলামের পঞ্চম স্তম্ভ কি?',
          ar: 'ما هو الركن الخامس من أركان الإسلام؟'
        },
        options: {
          en: ['Prayer', 'Fasting', 'Hajj', 'Zakat'],
          bn: ['নামাজ', 'রোজা', 'হজ্জ', 'যাকাত'],
          ar: ['الصلاة', 'الصيام', 'الحج', 'الزكاة']
        },
        correctAnswer: 2,
        explanation: {
          en: 'Hajj is the fifth pillar of Islam, mandatory once in a lifetime for those who are physically and financially able.',
          bn: 'হজ্জ ইসলামের পঞ্চম স্তম্ভ, যারা শারীরিক ও আর্থিকভাবে সক্ষম তাদের জীবনে একবার বাধ্যতামূলক।',
          ar: 'الحج هو الركن الخامس من أركان الإسلام، وهو واجب مرة واحدة في العمر لمن استطاع إليه سبيلاً.'
        }
      },
      {
        id: 'intro_q2',
        question: {
          en: 'When is Hajj performed?',
          bn: 'হজ্জ কখন সম্পাদন করা হয়?',
          ar: 'متى يؤدى الحج؟'
        },
        options: {
          en: ['Ramadan', 'Dhul Hijjah', 'Muharram', 'Rajab'],
          bn: ['রমজান', 'জিলহজ্জ', 'মহররম', 'রজব'],
          ar: ['رمضان', 'ذو الحجة', 'محرم', 'رجب']
        },
        correctAnswer: 1,
        explanation: {
          en: 'Hajj is performed in the Islamic month of Dhul Hijjah, specifically from the 8th to 12th.',
          bn: 'হজ্জ ইসলামিক মাস জিলহজ্জে সম্পাদন করা হয়, বিশেষত ৮ থেকে ১২ তারিখে।',
          ar: 'يؤدى الحج في شهر ذي الحجة، وتحديداً من 8 إلى 12.'
        }
      }
    ]
  },
  {
    moduleId: 'ihram',
    questions: [
      {
        id: 'ihram_q1',
        question: {
          en: 'How many pieces of cloth are used for men\'s Ihram?',
          bn: 'পুরুষদের ইহরামের জন্য কতটি কাপড় ব্যবহার করা হয়?',
          ar: 'كم قطعة قماش تستخدم لإحرام الرجال؟'
        },
        options: {
          en: ['One', 'Two', 'Three', 'Four'],
          bn: ['একটি', 'দুটি', 'তিনটি', 'চারটি'],
          ar: ['واحدة', 'اثنتان', 'ثلاث', 'أربع']
        },
        correctAnswer: 1,
        explanation: {
          en: 'Men wear two pieces of white unsewn cloth - one wrapped around the waist (Izar) and one over the shoulder (Rida).',
          bn: 'পুরুষরা দুটি সাদা সেলাইবিহীন কাপড় পরেন - একটি কোমরে জড়ানো (ইজার) এবং একটি কাঁধের উপর (রিদা)।',
          ar: 'يرتدي الرجال قطعتين من القماش الأبيض غير المخيط - واحدة ملفوفة حول الخصر (الإزار) وواحدة فوق الكتف (الرداء).'
        }
      }
    ]
  },
  {
    moduleId: 'tawaf',
    questions: [
      {
        id: 'tawaf_q1',
        question: {
          en: 'How many times must you circle the Kaaba during Tawaf?',
          bn: 'তাওয়াফের সময় আপনাকে কতবার কাবা প্রদক্ষিণ করতে হবে?',
          ar: 'كم مرة يجب أن تطوف حول الكعبة؟'
        },
        options: {
          en: ['5 times', '7 times', '9 times', '10 times'],
          bn: ['৫ বার', '৭ বার', '৯ বার', '১০ বার'],
          ar: ['5 مرات', '7 مرات', '9 مرات', '10 مرات']
        },
        correctAnswer: 1,
        explanation: {
          en: 'Tawaf consists of circling the Kaaba seven times in a counter-clockwise direction, starting from the Black Stone.',
          bn: 'তাওয়াফ হাজরে আসওয়াদ থেকে শুরু করে ঘড়ির কাঁটার বিপরীত দিকে সাতবার কাবা প্রদক্ষিণ করা।',
          ar: 'يتكون الطواف من الدوران حول الكعبة سبع مرات عكس اتجاه عقارب الساعة، بدءاً من الحجر الأسود.'
        }
      }
    ]
  },
  {
    moduleId: 'sai',
    questions: [
      {
        id: 'sai_q1',
        question: {
          en: 'How many times do you walk between Safa and Marwa?',
          bn: 'সাফা ও মারওয়ার মধ্যে আপনি কতবার হাঁটবেন?',
          ar: 'كم مرة تمشي بين الصفا والمروة؟'
        },
        options: {
          en: ['5 times', '7 times', '9 times', '11 times'],
          bn: ['৫ বার', '৭ বার', '৯ বার', '১১ বার'],
          ar: ['5 مرات', '7 مرات', '9 مرات', '11 مرة']
        },
        correctAnswer: 1,
        explanation: {
          en: 'Sa\'i consists of walking between Safa and Marwa seven times, commemorating Hajar\'s search for water.',
          bn: 'সাঈ হল সাফা ও মারওয়ার মধ্যে সাতবার হাঁটা, হাজেরার পানি খোঁজার স্মরণে।',
          ar: 'يتكون السعي من المشي بين الصفا والمروة سبع مرات، إحياءً لذكرى بحث هاجر عن الماء.'
        }
      }
    ]
  },
  {
    moduleId: 'arafat',
    questions: [
      {
        id: 'arafat_q1',
        question: {
          en: 'What is the most important day of Hajj?',
          bn: 'হজ্জের সবচেয়ে গুরুত্বপূর্ণ দিন কোনটি?',
          ar: 'ما هو أهم يوم في الحج؟'
        },
        options: {
          en: ['Day of Tarwiyah', 'Day of Arafat', 'Day of Eid', 'Day of Tashriq'],
          bn: ['তারবিয়ার দিন', 'আরাফাতের দিন', 'ঈদের দিন', 'তাশরিকের দিন'],
          ar: ['يوم التروية', 'يوم عرفة', 'يوم العيد', 'أيام التشريق']
        },
        correctAnswer: 1,
        explanation: {
          en: 'The Day of Arafat (9th Dhul Hijjah) is the most important day of Hajj. The Prophet said "Hajj is Arafat".',
          bn: 'আরাফাতের দিন (৯ জিলহজ্জ) হজ্জের সবচেয়ে গুরুত্বপূর্ণ দিন। নবী বলেছেন "হজ্জ হল আরাফাত"।',
          ar: 'يوم عرفة (9 ذو الحجة) هو أهم يوم في الحج. قال النبي "الحج عرفة".'
        }
      }
    ]
  }
];
