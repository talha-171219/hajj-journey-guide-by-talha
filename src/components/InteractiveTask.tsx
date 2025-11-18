import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TaskStep {
  id: string;
  label: {
    en: string;
    bn: string;
    ar: string;
  };
  completed: boolean;
}

interface InteractiveTaskProps {
  moduleId: string;
  onComplete: () => void;
}

export const InteractiveTask = ({ moduleId, onComplete }: InteractiveTaskProps) => {
  const { language } = useLanguage();

  const taskConfigs: Record<string, TaskStep[]> = {
    ihram: [
      {
        id: '1',
        label: {
          en: 'Perform Ghusl (ritual bath)',
          bn: 'গোসল করুন (ধর্মীয় স্নান)',
          ar: 'أداء الغسل (الاستحمام الطقوسي)'
        },
        completed: false
      },
      {
        id: '2',
        label: {
          en: 'Wear the Ihram clothing',
          bn: 'ইহরামের পোশাক পরুন',
          ar: 'ارتداء ملابس الإحرام'
        },
        completed: false
      },
      {
        id: '3',
        label: {
          en: 'Make intention (Niyyah) for Hajj',
          bn: 'হজ্জের নিয়ত করুন',
          ar: 'النية للحج'
        },
        completed: false
      },
      {
        id: '4',
        label: {
          en: 'Recite Talbiyah',
          bn: 'তালবিয়া পাঠ করুন',
          ar: 'تلاوة التلبية'
        },
        completed: false
      }
    ],
    tawaf: [
      {
        id: '1',
        label: {
          en: 'Start at the Black Stone',
          bn: 'হাজরে আসওয়াদ থেকে শুরু করুন',
          ar: 'ابدأ من الحجر الأسود'
        },
        completed: false
      },
      {
        id: '2',
        label: {
          en: 'Circle counter-clockwise',
          bn: 'ঘড়ির কাঁটার বিপরীতে প্রদক্ষিণ করুন',
          ar: 'الطواف عكس اتجاه عقارب الساعة'
        },
        completed: false
      },
      {
        id: '3',
        label: {
          en: 'Complete 7 circuits',
          bn: '৭ টি চক্কর সম্পূর্ণ করুন',
          ar: 'إكمال 7 أشواط'
        },
        completed: false
      },
      {
        id: '4',
        label: {
          en: 'Pray 2 Rakah at Maqam Ibrahim',
          bn: 'মাকামে ইব্রাহিমে ২ রাকাত নামাজ পড়ুন',
          ar: 'صلاة ركعتين عند مقام إبراهيم'
        },
        completed: false
      }
    ],
    muzdalifah: [
      {
        id: '1',
        label: {
          en: 'Collect 49 pebbles',
          bn: '৪৯টি পাথর সংগ্রহ করুন',
          ar: 'جمع 49 حصاة'
        },
        completed: false
      },
      {
        id: '2',
        label: {
          en: 'Throw 7 pebbles at Jamrat Al-Aqaba',
          bn: 'জামরাত আল-আকাবাতে ৭টি পাথর নিক্ষেপ করুন',
          ar: 'رمي 7 حصيات على جمرة العقبة'
        },
        completed: false
      },
      {
        id: '3',
        label: {
          en: 'Perform animal sacrifice',
          bn: 'পশু কুরবানি করুন',
          ar: 'أداء الأضحية'
        },
        completed: false
      },
      {
        id: '4',
        label: {
          en: 'Shave or trim hair',
          bn: 'চুল কামান বা ছোট করুন',
          ar: 'حلق أو تقصير الشعر'
        },
        completed: false
      }
    ]
  };

  const [steps, setSteps] = useState<TaskStep[]>(
    taskConfigs[moduleId] || taskConfigs.ihram
  );

  const handleStepClick = (stepId: string) => {
    setSteps(
      steps.map((step) =>
        step.id === stepId ? { ...step, completed: !step.completed } : step
      )
    );
  };

  const allCompleted = steps.every((step) => step.completed);
  const completedCount = steps.filter((step) => step.completed).length;

  return (
    <Card className="p-6 bg-gradient-to-br from-accent/10 to-secondary/10 border-2 border-accent/20">
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <Target className="w-6 h-6 text-accent" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Interactive Task</h3>
            <p className="text-muted-foreground mb-4">
              Complete all steps to proceed. Tap each step to mark as done.
            </p>
            <div className="text-sm font-medium text-accent">
              {completedCount} of {steps.length} completed
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => handleStepClick(step.id)}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                step.completed
                  ? 'border-green-500 bg-green-50 dark:bg-green-950'
                  : 'border-border hover:border-accent/50 hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    step.completed
                      ? 'bg-green-500 text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step.completed ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                </div>
                <span className="flex-1 font-medium">{step.label[language as 'en' | 'bn' | 'ar']}</span>
              </div>
            </button>
          ))}
        </div>

        {allCompleted && (
          <Button onClick={onComplete} size="lg" className="w-full animate-fade-in">
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Task Completed - Continue
          </Button>
        )}
      </div>
    </Card>
  );
};
