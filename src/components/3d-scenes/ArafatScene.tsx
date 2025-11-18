import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cone, Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export const ArafatScene = ({ progress }: { progress: number }) => {
  const cloudsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (cloudsRef.current) {
      cloudsRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 2;
    }
  });

  // Create tent groups
  const renderTents = () => {
    const tents = [];
    for (let x = -15; x < 15; x += 3) {
      for (let z = -10; z < 0; z += 3) {
        tents.push(
          <group key={`${x}-${z}`} position={[x, 0, z]}>
            <Cone args={[0.8, 1.2, 4]} position={[0, 0.6, 0]} castShadow>
              <meshStandardMaterial color="#F6F3E9" />
            </Cone>
          </group>
        );
      }
    }
    return tents;
  };

  // Render pilgrims gathering
  const renderPilgrims = () => {
    const pilgrims = [];
    for (let i = 0; i < 50; i++) {
      const angle = (i / 50) * Math.PI * 2;
      const radius = 5 + Math.random() * 8;
      pilgrims.push(
        <Sphere
          key={i}
          args={[0.3, 12, 12]}
          position={[
            Math.cos(angle) * radius,
            0.3,
            Math.sin(angle) * radius - 5,
          ]}
          castShadow
        >
          <meshStandardMaterial color="#E8E4D8" />
        </Sphere>
      );
    }
    return pilgrims;
  };

  return (
    <>
      {/* Dynamic lighting based on progress (day to evening) */}
      <ambientLight intensity={1.5 + (progress / 100) * 0.3} />
      <directionalLight
        position={[20, 20, 10]}
        intensity={2.5 - (progress / 100) * 0.5}
        castShadow
        color={progress > 70 ? '#ff9966' : '#ffffff'}
      />
      <pointLight position={[0, 15, 0]} intensity={1.5} color="#FFFFFF" />

      {/* Jabal Rahma (Mountain of Mercy) */}
      <group position={[0, 0, 5]}>
        <Cone args={[4, 8, 8]} position={[0, 4, 0]} castShadow>
          <meshStandardMaterial color="#8B7355" roughness={0.9} />
        </Cone>
        {/* Peak marker */}
        <Cone args={[0.3, 1.5, 6]} position={[0, 8.5, 0]}>
          <meshStandardMaterial color="#CFA24F" metalness={0.8} roughness={0.2} />
        </Cone>
      </group>

      {/* Tents */}
      {renderTents()}

      {/* Pilgrims */}
      {renderPilgrims()}

      {/* Clouds */}
      <group ref={cloudsRef} position={[0, 12, 0]}>
        {[0, 1, 2].map((i) => (
          <Sphere
            key={i}
            args={[2, 16, 16]}
            position={[i * 4 - 4, 0, -10]}
          >
            <meshStandardMaterial
              color="#ffffff"
              transparent
              opacity={0.6}
            />
          </Sphere>
        ))}
      </group>

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#C4A574" />
      </mesh>

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={20}
        maxDistance={50}
        maxPolarAngle={Math.PI / 2.2}
      />
    </>
  );
};
