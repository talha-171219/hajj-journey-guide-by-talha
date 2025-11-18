import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProgress } from '@/contexts/ProgressContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Download, Share2, Award } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const Certificate = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { getTotalProgress } = useProgress();
  const [userName, setUserName] = useState('');
  const totalProgress = getTotalProgress();
  const isEligible = totalProgress === 100;

  const handleDownload = () => {
    if (!userName.trim()) {
      toast.error('Please enter your name');
      return;
    }
    toast.success('Certificate downloaded successfully!');
  };

  const handleShare = () => {
    if (!userName.trim()) {
      toast.error('Please enter your name');
      return;
    }
    toast.success('Share link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">{t('certificate')}</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {!isEligible ? (
            <Card className="p-8 text-center space-y-4">
              <div className="text-6xl">🔒</div>
              <h2 className="text-2xl font-bold">Certificate Locked</h2>
              <p className="text-muted-foreground">
                Complete all modules to unlock your certificate of completion
              </p>
              <div className="text-4xl font-bold text-primary">{totalProgress}%</div>
              <p className="text-sm text-muted-foreground">
                {100 - totalProgress}% remaining
              </p>
              <Button onClick={() => navigate('/')}>
                Continue Learning
              </Button>
            </Card>
          ) : (
            <>
              {/* Certificate Preview */}
              <Card className="p-12 bg-gradient-to-br from-background to-secondary/20 border-4 border-accent shadow-2xl">
                <div className="space-y-8 text-center">
                  <div className="text-6xl">🕋</div>
                  
                  <div className="space-y-2">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      Certificate of Completion
                    </h2>
                    <p className="text-muted-foreground">Hajj Learning Program</p>
                  </div>

                  <div className="py-8 space-y-4">
                    <p className="text-lg">This certifies that</p>
                    <p className="text-3xl font-bold text-primary">
                      {userName || '[Your Name]'}
                    </p>
                    <p className="text-lg">has successfully completed</p>
                    <p className="text-2xl font-semibold">
                      All 7 Modules of the Hajj Learning Simulator
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-8 pt-8 border-t">
                    <div className="text-center">
                      <div className="flex items-center gap-2 justify-center mb-2">
                        <Award className="w-5 h-5 text-accent" />
                        <span className="font-semibold">Completion Rate</span>
                      </div>
                      <p className="text-2xl font-bold text-accent">100%</p>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold mb-2">Date</div>
                      <p className="text-lg">
                        {new Date().toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground italic pt-4">
                    "And proclaim to the people the Hajj" - Quran 22:27
                  </div>
                </div>
              </Card>

              {/* Actions */}
              <Card className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Enter Your Name</Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    size="lg"
                    onClick={handleDownload}
                    className="gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download PDF
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleShare}
                    className="gap-2"
                  >
                    <Share2 className="w-5 h-5" />
                    Share Certificate
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground text-center">
                  Congratulations on completing your Hajj learning journey! 🎉
                </p>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Certificate;
