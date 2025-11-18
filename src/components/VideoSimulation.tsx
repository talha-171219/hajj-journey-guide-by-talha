import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

interface VideoScene {
  time: number;
  icon: string;
  title: { en: string; bn: string; ar: string };
  description: { en: string; bn: string; ar: string };
}

interface VideoSimulationProps {
  moduleId: string;
  progress: number;
}

const videoScenes: Record<string, VideoScene[]> = {
  intro: [
    {
      time: 0,
      icon: '🕋',
      title: { en: 'The Holy Kaaba', bn: 'পবিত্র কাবা', ar: 'الكعبة المشرفة' },
      description: { en: 'The sacred house of Allah', bn: 'আল্লাহর পবিত্র ঘর', ar: 'بيت الله الحرام' }
    },
    {
      time: 25,
      icon: '📖',
      title: { en: 'Fifth Pillar of Islam', bn: 'ইসলামের পঞ্চম স্তম্ভ', ar: 'الركن الخامس' },
      description: { en: 'Hajj is mandatory once in lifetime', bn: 'হজ্জ জীবনে একবার ফরজ', ar: 'الحج واجب مرة واحدة' }
    },
    {
      time: 50,
      icon: '👥',
      title: { en: 'Unity of Muslims', bn: 'মুসলমানদের ঐক্য', ar: 'وحدة المسلمين' },
      description: { en: 'Millions gather in white Ihram', bn: 'লাখো মানুষ সাদা ইহরামে', ar: 'ملايين في الإحرام الأبيض' }
    },
    {
      time: 75,
      icon: '🤲',
      title: { en: 'Spiritual Journey', bn: 'আধ্যাত্মিক যাত্রা', ar: 'رحلة روحية' },
      description: { en: 'Purification of soul and body', bn: 'আত্মা ও শরীরের পবিত্রতা', ar: 'تطهير الروح والجسد' }
    }
  ],
  ihram: [
    {
      time: 0,
      icon: '🚿',
      title: { en: 'Perform Ghusl', bn: 'গোসল করুন', ar: 'الغسل' },
      description: { en: 'Ritual bath for purification', bn: 'পবিত্রতার জন্য গোসল', ar: 'الاستحمام للتطهير' }
    },
    {
      time: 30,
      icon: '👔',
      title: { en: 'Wear Ihram', bn: 'ইহরাম পরুন', ar: 'ارتداء الإحرام' },
      description: { en: 'Two white unsewn cloths', bn: 'দুটি সাদা কাপড়', ar: 'قطعتان بيضاء' }
    },
    {
      time: 60,
      icon: '🤲',
      title: { en: 'Make Niyyah', bn: 'নিয়ত করুন', ar: 'النية' },
      description: { en: 'Intention for Hajj', bn: 'হজ্জের নিয়ত', ar: 'نية الحج' }
    }
  ],
  tawaf: [
    {
      time: 0,
      icon: '🕋',
      title: { en: 'Face the Kaaba', bn: 'কাবামুখী হন', ar: 'استقبل الكعبة' },
      description: { en: 'Start at Black Stone', bn: 'হাজরে আসওয়াদ থেকে শুরু', ar: 'ابدأ من الحجر الأسود' }
    },
    {
      time: 30,
      icon: '🔄',
      title: { en: 'Circle 7 Times', bn: '৭ বার প্রদক্ষিণ', ar: 'الطواف 7 مرات' },
      description: { en: 'Counter-clockwise movement', bn: 'বাম দিক থেকে ঘুরুন', ar: 'عكس عقارب الساعة' }
    },
    {
      time: 70,
      icon: '🙏',
      title: { en: 'Pray 2 Rakah', bn: '২ রাকাত নামাজ', ar: 'صلاة ركعتين' },
      description: { en: 'At Maqam Ibrahim', bn: 'মাকামে ইব্রাহিমে', ar: 'عند مقام إبراهيم' }
    }
  ]
};

export const VideoSimulation = ({ moduleId, progress }: VideoSimulationProps) => {
  const { language } = useLanguage();
  const [currentScene, setCurrentScene] = useState(0);
  const scenes = videoScenes[moduleId] || videoScenes.intro;

  useEffect(() => {
    const sceneIndex = scenes.findIndex((scene, idx) => {
      const nextScene = scenes[idx + 1];
      return progress >= scene.time && (!nextScene || progress < nextScene.time);
    });
    setCurrentScene(Math.max(0, sceneIndex));
  }, [progress, scenes]);

  const scene = scenes[currentScene];
  const sceneProgress = scenes[currentScene + 1] 
    ? ((progress - scene.time) / (scenes[currentScene + 1].time - scene.time)) * 100
    : 100;

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-islamic-green to-islamic-green-light overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      {/* Scene Content */}
      <div className="relative h-full flex flex-col items-center justify-center p-8 text-primary-foreground">
        {/* Icon */}
        <div className="text-9xl mb-6 animate-float drop-shadow-2xl">
          {scene.icon}
        </div>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center drop-shadow-lg animate-fade-in">
          {scene.title[language as 'en' | 'bn' | 'ar']}
        </h2>

        {/* Description */}
        <p className="text-xl md:text-2xl text-center mb-8 max-w-2xl opacity-90 animate-slide-up">
          {scene.description[language as 'en' | 'bn' | 'ar']}
        </p>

        {/* Scene Progress Dots */}
        <div className="flex items-center gap-3 mb-8">
          {scenes.map((_, idx) => (
            <div
              key={idx}
              className={`h-3 rounded-full transition-all duration-500 ${
                idx === currentScene
                  ? 'w-12 bg-accent'
                  : idx < currentScene
                  ? 'w-3 bg-accent/50'
                  : 'w-3 bg-primary-foreground/30'
              }`}
            />
          ))}
        </div>

        {/* Scene Progress Bar */}
        <div className="w-full max-w-md">
          <div className="h-1.5 bg-primary-foreground/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-300 ease-out"
              style={{ width: `${sceneProgress}%` }}
            />
          </div>
        </div>

        {/* Scene Counter */}
        <div className="mt-6 text-sm opacity-75 flex items-center gap-2">
          <span className="font-mono">{currentScene + 1}</span>
          <span>/</span>
          <span className="font-mono">{scenes.length}</span>
        </div>
      </div>
    </div>
  );
};
