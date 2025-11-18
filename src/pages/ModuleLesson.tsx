import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProgress } from '@/contexts/ProgressContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Play, Volume2, Maximize } from 'lucide-react';
import { useState } from 'react';

const ModuleLesson = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { getModuleProgress, updateModuleProgress } = useProgress();
  const [isPlaying, setIsPlaying] = useState(false);

  const progress = getModuleProgress(moduleId || '');

  const handleComplete = () => {
    if (moduleId) {
      updateModuleProgress(moduleId, 100);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            <div className="flex-1 max-w-md mx-8">
              <Progress value={progress?.progress || 0} className="h-2" />
            </div>
            <span className="text-sm text-muted-foreground">
              {progress?.progress || 0}% Complete
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video/Simulation Area - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">{t(`module_${moduleId}`)}</h1>
              <p className="text-muted-foreground text-lg">{t(`desc_${moduleId}`)}</p>
            </div>

            {/* Video Player Placeholder */}
            <Card className="relative aspect-video bg-gradient-to-br from-islamic-green to-islamic-green-light overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center">
                {!isPlaying ? (
                  <Button
                    size="lg"
                    onClick={() => setIsPlaying(true)}
                    className="w-20 h-20 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-2xl"
                  >
                    <Play className="w-10 h-10" />
                  </Button>
                ) : (
                  <div className="text-center text-primary-foreground space-y-4 p-8">
                    <div className="text-6xl animate-float">🕋</div>
                    <p className="text-xl font-semibold">Video Simulation Playing...</p>
                    <p className="text-sm opacity-80">
                      In the full app, this would show an interactive 3D simulation or video
                    </p>
                  </div>
                )}
              </div>
              
              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-4">
                  <Button size="sm" variant="ghost" className="text-white">
                    <Play className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-white">
                    <Volume2 className="w-4 h-4" />
                  </Button>
                  <div className="flex-1">
                    <Progress value={33} className="h-1" />
                  </div>
                  <Button size="sm" variant="ghost" className="text-white">
                    <Maximize className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Interactive Task Demo */}
            <Card className="p-6 bg-gradient-to-br from-accent/10 to-secondary/10 border-2 border-accent/20">
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <span>🎯</span>
                  Interactive Task
                </h3>
                <p className="text-muted-foreground">
                  Complete this task to proceed to the next section
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 text-lg">
                    Step 1
                  </Button>
                  <Button variant="outline" className="h-20 text-lg">
                    Step 2
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Instructions Panel - Right Side */}
          <div className="space-y-6">
            <Card className="p-6 sticky top-24 space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Instructions</h2>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <span className="text-xl">1️⃣</span>
                    <div className="flex-1">
                      <p className="text-sm">Watch the video carefully to understand the process</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <span className="text-xl">2️⃣</span>
                    <div className="flex-1">
                      <p className="text-sm">Follow the step-by-step guidance provided</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <span className="text-xl">3️⃣</span>
                    <div className="flex-1">
                      <p className="text-sm">Complete the interactive tasks to practice</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <span className="text-xl">4️⃣</span>
                    <div className="flex-1">
                      <p className="text-sm">Take the quiz to test your knowledge</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <h3 className="font-semibold flex items-center gap-2">
                  <span>🤲</span>
                  Important Dua
                </h3>
                <p className="text-sm text-muted-foreground italic">
                  "Bismillah, Allahu Akbar"
                </p>
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <Volume2 className="w-4 h-4" />
                  Listen to Audio
                </Button>
              </div>

              <div className="pt-4 border-t space-y-3">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleComplete}
                >
                  Mark as Complete
                </Button>
                <Button variant="outline" className="w-full" onClick={() => navigate('/')}>
                  Save & Exit
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
