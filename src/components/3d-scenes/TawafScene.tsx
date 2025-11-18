import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export const TawafScene = ({ progress }: { progress: number }) => {
  const pilgrimsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (pilgrimsRef.current) {
      pilgrimsRef.current.rotation.y += 0.005;
    }
  });

  // Create multiple circles of pilgrims
  const renderPilgrims = () => {
    const pilgrims = [];
    const circles = [4, 5, 6, 7];
    const colors = ['#F6F3E9', '#E8E4D8', '#D4C7A1', '#FFFFFF'];

    circles.forEach((radius, circleIndex) => {
      const count = radius * 4;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const offsetAngle = (progress / 100) * Math.PI * 0.5;
        pilgrims.push(
          <Sphere
            key={`${circleIndex}-${i}`}
            args={[0.25, 12, 12]}
            position={[
              Math.cos(angle + offsetAngle) * radius,
              0.25,
              Math.sin(angle + offsetAngle) * radius,
            ]}
            castShadow
          >
            <meshStandardMaterial color={colors[circleIndex]} />
          </Sphere>
        );
      }
    });

    return pilgrims;
  };

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 15, 5]} intensity={2.5} castShadow />
      <pointLight position={[0, 10, 0]} intensity={1.5} color="#CFA24F" />
      <pointLight position={[15, 8, 15]} intensity={1.2} color="#FFFFFF" />

      {/* Kaaba at center */}
      <Box args={[2, 3, 2]} position={[0, 1.5, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#1a1a1a" />
      </Box>

      {/* Golden door */}
      <Box args={[0.05, 1.2, 0.8]} position={[1.01, 1.2, 0]} castShadow>
        <meshStandardMaterial color="#CFA24F" metalness={0.9} roughness={0.1} />
      </Box>

      {/* Tawaf path markers */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[3.5, 3.7, 64]} />
        <meshStandardMaterial color="#CFA24F" />
      </mesh>

      {/* Animated pilgrims */}
      <group ref={pilgrimsRef}>{renderPilgrims()}</group>

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#C4A574" />
      </mesh>

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={10}
        maxDistance={25}
        maxPolarAngle={Math.PI / 2.2}
      />
    </>
  );
};
