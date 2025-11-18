import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { KaabaScene } from './3d-scenes/KaabaScene';
import { TawafScene } from './3d-scenes/TawafScene';
import { SaiScene } from './3d-scenes/SaiScene';
import { ArafatScene } from './3d-scenes/ArafatScene';
import { IhramScene } from './3d-scenes/IhramScene';
import { MuzdalifahScene } from './3d-scenes/MuzdalifahScene';

interface ThreeSceneProps {
  moduleId: string;
  progress: number;
}

const SceneSelector = ({ moduleId, progress }: ThreeSceneProps) => {
  switch (moduleId) {
    case 'intro':
      return <KaabaScene progress={progress} />;
    case 'ihram':
      return <IhramScene progress={progress} />;
    case 'tawaf':
      return <TawafScene progress={progress} />;
    case 'sai':
      return <SaiScene progress={progress} />;
    case 'arafat':
      return <ArafatScene progress={progress} />;
    case 'muzdalifah':
      return <MuzdalifahScene progress={progress} />;
    case 'completion':
      return <KaabaScene progress={progress} />;
    default:
      return <KaabaScene progress={progress} />;
  }
};

export const ThreeScene = ({ moduleId, progress }: ThreeSceneProps) => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-islamic-green to-islamic-green-light">
      <Canvas
        shadows
        camera={{ position: [0, 5, 15], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense
          fallback={
            <mesh>
              <boxGeometry />
              <meshStandardMaterial color="#0E3A2F" />
            </mesh>
          }
        >
          <SceneSelector moduleId={moduleId} progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  );
};
