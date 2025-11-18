import { useLanguage } from '@/contexts/LanguageContext';
import { useProgress } from '@/contexts/ProgressContext';
import { ModuleCard } from '@/components/ModuleCard';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ProgressRing } from '@/components/ProgressRing';
import { modules } from '@/data/modules';
import { Button } from '@/components/ui/button';
import { Settings, BookOpen, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { t } = useLanguage();
  const { getTotalProgress, modules: progressModules } = useProgress();
  const navigate = useNavigate();
  const totalProgress = getTotalProgress();

  const lastAccessedModule = progressModules
    .filter(m => m.lastAccessed)
    .sort((a, b) => 
      (b.lastAccessed?.getTime() || 0) - (a.lastAccessed?.getTime() || 0)
    )[0];

  return (
    <div className="min-h-screen bg-background pattern-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🕋</div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {t('app_title')}
                </h1>
                <p className="text-sm text-muted-foreground">{t('app_subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSelector />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/settings')}
                className="rounded-full"
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Progress Overview */}
        <section className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 shadow-lg border-2 border-primary/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">{t('progress')}</h2>
              </div>
              <p className="text-muted-foreground text-lg">
                Continue your spiritual journey toward understanding the sacred pilgrimage
              </p>
              {lastAccessedModule && (
                <Button
                  size="lg"
                  onClick={() => navigate(`/module/${lastAccessedModule.id}`)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                >
                  {t('continue_learning')}
                </Button>
              )}
            </div>
            <div className="animate-float">
              <ProgressRing progress={totalProgress} size={160} strokeWidth={12} />
            </div>
          </div>
        </section>

        {/* Modules Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">{t('modules')}</h2>
            <Button
              variant="outline"
              onClick={() => navigate('/certificate')}
              className="gap-2"
            >
              <Award className="w-4 h-4" />
              {t('certificate')}
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </section>

        {/* Info Banner */}
        <section className="bg-card rounded-2xl p-6 shadow-md border">
          <div className="flex items-start gap-4">
            <div className="text-3xl">💡</div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Learn at Your Own Pace</h3>
              <p className="text-sm text-muted-foreground">
                Each module includes interactive simulations, detailed explanations, and quizzes
                to ensure you understand every aspect of Hajj. Your progress is automatically saved.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t bg-card/50">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>May Allah accept your efforts in learning about Hajj 🤲</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
