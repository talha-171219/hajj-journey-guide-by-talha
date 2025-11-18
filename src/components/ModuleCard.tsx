import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProgress } from '@/contexts/ProgressContext';
import { Module } from '@/data/modules';
import { CheckCircle2, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ModuleCardProps {
  module: Module;
}

export const ModuleCard = ({ module }: ModuleCardProps) => {
  const { t } = useLanguage();
  const { getModuleProgress } = useProgress();
  const navigate = useNavigate();
  const progress = getModuleProgress(module.id);

  const handleClick = () => {
    navigate(`/module/${module.id}`);
  };

  return (
    <Card className="group relative overflow-hidden bg-card hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-accent"
      onClick={handleClick}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
      
      <div className="relative p-6 space-y-4">
        {/* Icon and status */}
        <div className="flex items-start justify-between">
          <div className="text-5xl animate-float">{module.icon}</div>
          {progress?.completed && (
            <CheckCircle2 className="w-6 h-6 text-accent animate-fade-in" />
          )}
        </div>

        {/* Title and description */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
            {t(`module_${module.id}`)}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {t(`desc_${module.id}`)}
          </p>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <PlayCircle className="w-4 h-4" />
          <span>{module.duration}</span>
        </div>

        {/* Progress bar */}
        {progress && progress.progress > 0 && (
          <div className="space-y-1">
            <Progress value={progress.progress} className="h-2" />
            <span className="text-xs text-muted-foreground">
              {progress.progress}% {t('completed')}
            </span>
          </div>
        )}

        {/* Action button */}
        <Button
          variant={progress?.completed ? 'secondary' : 'default'}
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
        >
          {progress?.completed ? t('continue') : t('start')}
        </Button>
      </div>
    </Card>
  );
};
