import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'bn' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<string, Record<Language, string>> = {
  app_title: {
    en: 'Hajj 3D Learning Simulator',
    bn: 'হজ্জ ৩ডি শিক্ষা সিমুলেটর',
    ar: 'محاكي تعلم الحج ثلاثي الأبعاد'
  },
  app_subtitle: {
    en: 'A complete interactive guide to Hajj for beginners',
    bn: 'নতুনদের জন্য হজ্জের সম্পূর্ণ ইন্টারেক্টিভ গাইড',
    ar: 'دليل تفاعلي كامل للحج للمبتدئين'
  },
  continue_learning: {
    en: 'Continue Learning',
    bn: 'শেখা চালিয়ে যান',
    ar: 'متابعة التعلم'
  },
  start: {
    en: 'Start',
    bn: 'শুরু করুন',
    ar: 'ابدأ'
  },
  continue: {
    en: 'Continue',
    bn: 'চালিয়ে যান',
    ar: 'متابعة'
  },
  completed: {
    en: 'Completed',
    bn: 'সম্পন্ন',
    ar: 'مكتمل'
  },
  settings: {
    en: 'Settings',
    bn: 'সেটিংস',
    ar: 'الإعدادات'
  },
  modules: {
    en: 'Learning Modules',
    bn: 'শিক্ষা মডিউল',
    ar: 'وحدات التعلم'
  },
  progress: {
    en: 'Your Progress',
    bn: 'আপনার অগ্রগতি',
    ar: 'تقدمك'
  },
  certificate: {
    en: 'Certificate',
    bn: 'সার্টিফিকেট',
    ar: 'شهادة'
  },
  // Module names
  module_intro: {
    en: 'Introduction to Hajj',
    bn: 'হজ্জের পরিচিতি',
    ar: 'مقدمة للحج'
  },
  module_ihram: {
    en: 'Ihram Preparation',
    bn: 'ইহরামের প্রস্তুতি',
    ar: 'التحضير للإحرام'
  },
  module_tawaf: {
    en: 'Tawaf',
    bn: 'তাওয়াফ',
    ar: 'الطواف'
  },
  module_sai: {
    en: "Sa'i (Safa-Marwa)",
    bn: 'সাঈ (সাফা-মারওয়া)',
    ar: 'السعي (الصفا والمروة)'
  },
  module_arafat: {
    en: 'Day of Arafat',
    bn: 'আরাফাতের দিন',
    ar: 'يوم عرفة'
  },
  module_muzdalifah: {
    en: 'Muzdalifah & Mina',
    bn: 'মুযদালিফা ও মিনা',
    ar: 'المزدلفة ومنى'
  },
  module_completion: {
    en: 'Completion & Farewell',
    bn: 'সমাপ্তি ও বিদায়',
    ar: 'الإكمال والوداع'
  },
  // Module descriptions
  desc_intro: {
    en: 'Learn the basics and significance of Hajj',
    bn: 'হজ্জের মূল বিষয় এবং তাৎপর্য শিখুন',
    ar: 'تعلم أساسيات الحج وأهميته'
  },
  desc_ihram: {
    en: 'Understand Ihram rules and preparation',
    bn: 'ইহরামের নিয়ম এবং প্রস্তুতি বুঝুন',
    ar: 'فهم قواعد الإحرام والتحضير'
  },
  desc_tawaf: {
    en: 'Learn how to perform Tawaf around the Kaaba',
    bn: "কাবা ঘরের চারপাশে তাওয়াফ করার পদ্ধতি শিখুন",
    ar: 'تعلم كيفية أداء الطواف حول الكعبة'
  },
  desc_sai: {
    en: 'Walk between Safa and Marwa hills',
    bn: 'সাফা ও মারওয়া পাহাড়ের মধ্যে হাঁটার পদ্ধতি',
    ar: 'المشي بين جبلي الصفا والمروة'
  },
  desc_arafat: {
    en: 'Experience the most important day of Hajj',
    bn: 'হজ্জের সবচেয়ে গুরুত্বপূর্ণ দিন অনুভব করুন',
    ar: 'اختبر أهم يوم في الحج'
  },
  desc_muzdalifah: {
    en: 'Stone throwing and sacrifice rituals',
    bn: 'পাথর নিক্ষেপ ও কুরবানির রীতি',
    ar: 'رمي الجمرات وطقوس الأضحية'
  },
  desc_completion: {
    en: 'Complete your Hajj journey with farewell Tawaf',
    bn: 'বিদায়ী তাওয়াফের মাধ্যমে হজ্জ সম্পন্ন করুন',
    ar: 'أكمل رحلة الحج بطواف الوداع'
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('hajj_language') as Language;
    if (saved && ['en', 'bn', 'ar'].includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('hajj_language', lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
