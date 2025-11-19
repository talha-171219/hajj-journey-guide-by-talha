export interface Module {
  id: string;
  icon: string;
  duration: string;
  color: string;
  hasTask?: boolean;
  hasQuiz?: boolean;
  videoThumbnail?: string;
  videoUrl?: string;
}

export const modules: Module[] = [
  {
    id: 'intro',
    icon: '📖',
    duration: '5 min',
    color: 'from-emerald-500 to-teal-600',
    hasTask: true,
    hasQuiz: true,
    videoThumbnail: '/src/assets/kaaba-hero.jpg'
  },
  {
    id: 'ihram',
    icon: '👔',
    duration: '8 min',
    color: 'from-amber-500 to-orange-600',
    hasTask: true,
    hasQuiz: true,
    videoThumbnail: '/src/assets/ihram.jpg'
  },
  {
    id: 'tawaf',
    icon: '🕋',
    duration: '10 min',
    color: 'from-purple-500 to-pink-600',
    hasTask: true,
    hasQuiz: true,
    videoThumbnail: '/src/assets/kaaba-hero.jpg',
    videoUrl: '/assets/videos/kaaba_sim.mp4'
  },
  {
    id: 'sai',
    icon: '🚶',
    duration: '7 min',
    color: 'from-blue-500 to-cyan-600',
    hasTask: true,
    hasQuiz: true,
    videoThumbnail: '/src/assets/kaaba-hero.jpg'
  },
  {
    id: 'arafat',
    icon: '⛰️',
    duration: '12 min',
    color: 'from-rose-500 to-red-600',
    hasTask: true,
    hasQuiz: true,
    videoThumbnail: '/src/assets/arafat.jpg'
  },
  {
    id: 'muzdalifah',
    icon: '🪨',
    duration: '9 min',
    color: 'from-indigo-500 to-purple-600',
    hasTask: true,
    hasQuiz: true,
    videoThumbnail: '/src/assets/rami.jpg'
  },
  {
    id: 'completion',
    icon: '✅',
    duration: '6 min',
    color: 'from-green-500 to-emerald-600',
    hasTask: true,
    hasQuiz: true,
    videoThumbnail: '/src/assets/kaaba-hero.jpg'
  },
];
