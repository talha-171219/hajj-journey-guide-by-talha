import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProgress } from '@/contexts/ProgressContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { VideoPlayer } from '@/components/VideoPlayer';
import { InteractiveTask } from '@/components/InteractiveTask';
import { Quiz } from '@/components/Quiz';
import { ArrowLeft, Volume2, BookOpen, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { quizzes } from '@/data/quizzes';
import { modules } from '@/data/modules';
import kaabaHero from '@/assets/kaaba-hero.jpg';
import ihramImg from '@/assets/ihram.jpg';
import arafatImg from '@/assets/arafat.jpg';
import ramiImg from '@/assets/rami.jpg';

const ModuleLesson = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { getModuleProgress, updateModuleProgress, completeModule } = useProgress();
  const [currentStep, setCurrentStep] = useState<'video' | 'task' | 'quiz'>('video');
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const progress = getModuleProgress(moduleId || '');
  const moduleQuiz = quizzes.find(q => q.moduleId === moduleId);

  const thumbnails: Record<string, string> = {
    intro: kaabaHero,
    ihram: ihramImg,
    tawaf: kaabaHero,
    sai: kaabaHero,
    arafat: arafatImg,
    muzdalifah: ramiImg,
    completion: kaabaHero,
  };

  const moduleMeta = modules.find((m) => m.id === moduleId);
  const videoSrc = moduleMeta?.videoUrl;

  const handleVideoProgress = (percentage: number) => {
    if (percentage === 100 && moduleId) {
      updateModuleProgress(moduleId, 33);
      toast.success('Video completed!');
      setTimeout(() => setCurrentStep('task'), 1000);
    }
  };

  const handleTaskComplete = () => {
    if (moduleId) {
      updateModuleProgress(moduleId, 66);
      toast.success('Task completed!');
      setCurrentStep('quiz');
    }
  };

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
    if (moduleId) {
      completeModule(moduleId, score);
      toast.success(`Quiz completed! Score: ${score}%`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/')} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            <div className="flex-1 max-w-md mx-8">
              <Progress value={progress?.progress || 0} className="h-2" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              {progress?.progress || 0}% Complete
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">{t(`module_${moduleId}`)}</h1>
              <p className="text-muted-foreground text-lg">{t(`desc_${moduleId}`)}</p>
            </div>

            {currentStep === 'video' && (
              <VideoPlayer
                thumbnailUrl={thumbnails[moduleId || 'intro']}
                title={t(`module_${moduleId}`)}
                videoSrc={videoSrc}
                onProgress={handleVideoProgress}
              />
            )}

            {currentStep === 'task' && moduleId && (
              <InteractiveTask moduleId={moduleId} onComplete={handleTaskComplete} />
            )}

            {currentStep === 'quiz' && moduleQuiz && (
              <>
                {quizScore === null ? (
                  <Quiz questions={moduleQuiz.questions} onComplete={handleQuizComplete} />
                ) : (
                  <Card className="p-8 text-center space-y-6">
                    <div className="text-6xl animate-float">🎉</div>
                    <h2 className="text-3xl font-bold">Module Completed!</h2>
                    <p className="text-xl">Score: <span className="text-primary font-bold">{quizScore}%</span></p>
                    <Button size="lg" onClick={() => navigate('/')}>
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Back to Modules
                    </Button>
                  </Card>
                )}
              </>
            )}
          </div>

          <div className="space-y-6">
            <Card className="p-6 sticky top-24">
              <BookOpen className="w-5 h-5 text-primary mb-4" />
              <h2 className="text-2xl font-bold mb-4">Instructions</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Complete video → interactive task → quiz to finish this module
              </p>
              <div className="pt-4 border-t">
                <h3 className="font-semibold flex items-center gap-2 mb-2">
                  <span>🤲</span>
                  Important Dua
                </h3>
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <Volume2 className="w-4 h-4" />
                  Listen to Audio
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ModuleLesson;
