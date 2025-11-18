import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProgress } from '@/contexts/ProgressContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ArrowLeft, Trash2, Volume2, Moon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const Settings = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { resetProgress } = useProgress();
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleResetProgress = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetProgress();
      toast.success('Progress has been reset');
      navigate('/');
    }
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
            <h1 className="text-2xl font-bold">{t('settings')}</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-6">
          {/* Language Settings */}
          <Card className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Language Preferences</h2>
              <p className="text-sm text-muted-foreground">
                Choose your preferred language for the app
              </p>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <Label>Select Language</Label>
              <LanguageSelector />
            </div>
          </Card>

          {/* Audio Settings */}
          <Card className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Audio Settings</h2>
              <p className="text-sm text-muted-foreground">
                Control audio playback and narration
              </p>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-muted-foreground" />
                <Label htmlFor="audio">Enable Audio</Label>
              </div>
              <Switch
                id="audio"
                checked={audioEnabled}
                onCheckedChange={setAudioEnabled}
              />
            </div>
          </Card>

          {/* Display Settings */}
          <Card className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Display Settings</h2>
              <p className="text-sm text-muted-foreground">
                Customize the app appearance
              </p>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-muted-foreground" />
                <Label htmlFor="dark-mode">Dark Mode</Label>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
          </Card>

          {/* Data Management */}
          <Card className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Data Management</h2>
              <p className="text-sm text-muted-foreground">
                Manage your learning progress and data
              </p>
            </div>
            <Separator />
            <div className="space-y-3">
              <Button
                variant="destructive"
                onClick={handleResetProgress}
                className="w-full gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Reset All Progress
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                This will permanently delete all your learning progress
              </p>
            </div>
          </Card>

          {/* App Info */}
          <Card className="p-6 space-y-2 bg-gradient-to-br from-primary/5 to-accent/5">
            <h3 className="font-semibold">About This App</h3>
            <p className="text-sm text-muted-foreground">
              Hajj 3D Learning Simulator v1.0
            </p>
            <p className="text-sm text-muted-foreground">
              An interactive guide to help you understand and prepare for Hajj
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;
