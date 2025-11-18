import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { RealisticKaabaScene } from './3d-scenes/RealisticKaabaScene';
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
      return <RealisticKaabaScene progress={progress} />;
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
      return <RealisticKaabaScene progress={progress} />;
    default:
      return <RealisticKaabaScene progress={progress} />;
  }
};

export const ThreeScene = ({ moduleId, progress }: ThreeSceneProps) => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-sky-200 via-amber-50 to-orange-100">
      <Canvas
        shadows
        camera={{ position: [0, 6, 15], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
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
