import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';

interface VideoPlayerProps {
  thumbnailUrl: string;
  title: string;
  onProgress?: (percentage: number) => void;
}

export const VideoPlayer = ({ thumbnailUrl, title, onProgress }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handlePlayPause = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      // Simulate video progress
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          const newProgress = Math.min(prev + 1, 100);
          onProgress?.(newProgress);
          if (newProgress === 100) {
            setIsPlaying(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
          }
          return newProgress;
        });
      }, 200); // Simulates ~20 second video
    } else {
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  const handleRestart = () => {
    setProgress(0);
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleVolumeToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleProgressChange = (value: number[]) => {
    setProgress(value[0]);
    onProgress?.(value[0]);
  };

  return (
    <Card className="relative overflow-hidden group">
      {/* Video/Thumbnail Display */}
      <div
        className="relative aspect-video bg-cover bg-center"
        style={{ backgroundImage: `url(${thumbnailUrl})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Play Button (Center) */}
        {!isPlaying && progress === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              size="lg"
              onClick={handlePlayPause}
              className="w-20 h-20 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-2xl animate-float"
            >
              <Play className="w-10 h-10 ml-1" />
            </Button>
          </div>
        )}

        {/* Playing Indicator */}
        {isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white space-y-4 p-8">
              <div className="text-7xl animate-float">🕋</div>
              <p className="text-2xl font-bold drop-shadow-lg">{title}</p>
              <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          </div>
        )}

        {/* Controls Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="space-y-3">
            {/* Progress Bar */}
            <div className="px-1">
              <Slider
                value={[progress]}
                onValueChange={handleProgressChange}
                max={100}
                step={1}
                className="cursor-pointer"
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                variant="ghost"
                onClick={handlePlayPause}
                className="text-white hover:text-white hover:bg-white/20"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </Button>

              <Button
                size="sm"
                variant="ghost"
                onClick={handleRestart}
                className="text-white hover:text-white hover:bg-white/20"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>

              <div className="flex items-center gap-2 flex-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleVolumeToggle}
                  className="text-white hover:text-white hover:bg-white/20"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </Button>
                <div className="w-20">
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    onValueChange={(val) => {
                      setVolume(val[0]);
                      if (val[0] === 0) setIsMuted(true);
                      else setIsMuted(false);
                    }}
                    max={100}
                    step={1}
                    className="cursor-pointer"
                  />
                </div>
              </div>

              <span className="text-white text-sm font-medium">
                {Math.floor(progress)}%
              </span>

              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:text-white hover:bg-white/20"
              >
                <Maximize className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
