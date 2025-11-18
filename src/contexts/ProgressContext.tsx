import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ModuleProgress {
  id: string;
  completed: boolean;
  progress: number; // 0-100
  quizScore?: number;
  lastAccessed?: Date;
}

interface ProgressContextType {
  modules: ModuleProgress[];
  updateModuleProgress: (moduleId: string, progress: number) => void;
  completeModule: (moduleId: string, quizScore?: number) => void;
  getTotalProgress: () => number;
  getModuleProgress: (moduleId: string) => ModuleProgress | undefined;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const defaultModules: ModuleProgress[] = [
  { id: 'intro', completed: false, progress: 0 },
  { id: 'ihram', completed: false, progress: 0 },
  { id: 'tawaf', completed: false, progress: 0 },
  { id: 'sai', completed: false, progress: 0 },
  { id: 'arafat', completed: false, progress: 0 },
  { id: 'muzdalifah', completed: false, progress: 0 },
  { id: 'completion', completed: false, progress: 0 },
];

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modules, setModules] = useState<ModuleProgress[]>(defaultModules);

  useEffect(() => {
    const saved = localStorage.getItem('hajj_progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Convert lastAccessed strings back to Date objects
        const modulesWithDates = parsed.map((m: ModuleProgress) => ({
          ...m,
          lastAccessed: m.lastAccessed ? new Date(m.lastAccessed) : undefined,
        }));
        setModules(modulesWithDates);
      } catch (e) {
        console.error('Failed to parse progress data');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('hajj_progress', JSON.stringify(modules));
  }, [modules]);

  const updateModuleProgress = (moduleId: string, progress: number) => {
    setModules(prev =>
      prev.map(m =>
        m.id === moduleId
          ? { ...m, progress: Math.min(100, progress), lastAccessed: new Date() }
          : m
      )
    );
  };

  const completeModule = (moduleId: string, quizScore?: number) => {
    setModules(prev =>
      prev.map(m =>
        m.id === moduleId
          ? { ...m, completed: true, progress: 100, quizScore, lastAccessed: new Date() }
          : m
      )
    );
  };

  const getTotalProgress = () => {
    const total = modules.reduce((sum, m) => sum + m.progress, 0);
    return Math.round(total / modules.length);
  };

  const getModuleProgress = (moduleId: string) => {
    return modules.find(m => m.id === moduleId);
  };

  const resetProgress = () => {
    setModules(defaultModules);
    localStorage.removeItem('hajj_progress');
  };

  return (
    <ProgressContext.Provider
      value={{
        modules,
        updateModuleProgress,
        completeModule,
        getTotalProgress,
        getModuleProgress,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
};
