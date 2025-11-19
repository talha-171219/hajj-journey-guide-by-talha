import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';

interface VideoPlayerProps {
  thumbnailUrl?: string;
  title: string;
  videoSrc?: string; // optional MP4/WebM source
  onProgress?: (percentage: number) => void;
}

export const VideoPlayer = ({ thumbnailUrl, title, videoSrc, onProgress }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlayPause = () => {
    if (videoSrc && videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
      return;
    }

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
    if (videoSrc && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
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
    if (videoRef.current && videoSrc) {
      const time = (value[0] / 100) * videoRef.current.duration || 0;
      videoRef.current.currentTime = time;
    }
  };

  useEffect(() => {
    if (!videoSrc && videoRef.current) return;
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      const pct = v.duration ? (v.currentTime / v.duration) * 100 : 0;
      setProgress(pct);
      onProgress?.(Math.round(pct));
    };
    const onEnded = () => setIsPlaying(false);
    v.addEventListener('timeupdate', onTime);
    v.addEventListener('ended', onEnded);
    return () => {
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('ended', onEnded);
    };
  }, [videoSrc, onProgress]);

  return (
    <Card className="relative overflow-hidden group">
      {/* Video/Thumbnail Display */}
      <div className="relative aspect-video bg-cover bg-center">
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            className="w-full h-full object-cover"
            playsInline
            preload="auto"
            muted={isMuted}
            onClick={() => {
              if (videoRef.current) {
                if (videoRef.current.paused) videoRef.current.play();
                else videoRef.current.pause();
              }
            }}
          />
        ) : (
          <div
            className="w-full h-full"
            style={{ backgroundImage: `url(${thumbnailUrl})` }}
          />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Overlay Card (always visible but non-blocking) */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="text-center text-white space-y-6 p-6 bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10 max-w-xs mx-4 pointer-events-auto">
            <div className="w-20 h-20 mx-auto rounded-lg bg-black/60 flex items-center justify-center shadow-md">
              <div className="text-5xl">🕋</div>
            </div>
            <p className="text-2xl font-bold drop-shadow-sm">{title}</p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-3 h-3 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-3 h-3 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <p className="text-sm text-white/80">3D Simulation Playing...</p>
          </div>
        </div>

        {/* Play Button (Center) - keep on top for clicks when present */}
        {!isPlaying && progress === 0 && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <Button
              size="lg"
              onClick={handlePlayPause}
              className="w-20 h-20 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-2xl animate-float"
            >
              <Play className="w-10 h-10 ml-1" />
            </Button>
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
