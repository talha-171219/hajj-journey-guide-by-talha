import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Text3D, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export const KaabaScene = ({ progress }: { progress: number }) => {
  const kaabaRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Rotate Kaaba based on progress
  useFrame((state) => {
    if (kaabaRef.current) {
      kaabaRef.current.rotation.y += 0.002;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = (progress / 100) * Math.PI * 2;
    }
  });

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[10, 10, 5]} intensity={2} castShadow />
      <pointLight position={[-10, 10, -10]} intensity={1.5} color="#CFA24F" />
      <pointLight position={[10, 5, 10]} intensity={1} color="#FFFFFF" />

      <group ref={groupRef}>
        {/* Kaaba */}
        <Box
          ref={kaabaRef}
          args={[2, 3, 2]}
          position={[0, 1.5, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#1a1a1a" metalness={0.2} roughness={0.8} />
        </Box>

        {/* Golden door */}
        <Box args={[0.05, 1.2, 0.8]} position={[1.01, 1.2, 0]} castShadow>
          <meshStandardMaterial color="#CFA24F" metalness={0.8} roughness={0.2} />
        </Box>

        {/* Circular platform */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <ringGeometry args={[3, 8, 64]} />
          <meshStandardMaterial color="#D4C7A1" side={THREE.DoubleSide} />
        </mesh>

        {/* Animated pilgrims walking around */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i / 8) * Math.PI * 2 + (progress / 100) * Math.PI * 2;
          const radius = 5;
          return (
            <Sphere
              key={i}
              args={[0.3, 16, 16]}
              position={[Math.cos(angle) * radius, 0.3, Math.sin(angle) * radius]}
              castShadow
            >
              <meshStandardMaterial color="#F6F3E9" />
            </Sphere>
          );
        })}
      </group>

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#8B7355" />
      </mesh>

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={8}
        maxDistance={20}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
};
