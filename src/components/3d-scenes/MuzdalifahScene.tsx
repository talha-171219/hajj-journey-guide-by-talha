import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Box, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

export const MuzdalifahScene = ({ progress }: { progress: number }) => {
  const starsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0002;
    }
  });

  // Render pebbles collection area
  const renderPebbles = () => {
    const pebbles = [];
    for (let i = 0; i < 100; i++) {
      const x = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      pebbles.push(
        <Sphere
          key={i}
          args={[0.1 + Math.random() * 0.1, 8, 8]}
          position={[x, 0.1, z]}
          castShadow
        >
          <meshStandardMaterial color="#8B8B8B" roughness={0.9} />
        </Sphere>
      );
    }
    return pebbles;
  };

  // Render sleeping pilgrims
  const renderPilgrims = () => {
    const pilgrims = [];
    for (let i = 0; i < 30; i++) {
      const x = (Math.random() - 0.5) * 15;
      const z = (Math.random() - 0.5) * 15;
      pilgrims.push(
        <Box
          key={i}
          args={[1.5, 0.3, 0.8]}
          position={[x, 0.15, z]}
          rotation={[0, Math.random() * Math.PI, 0]}
          castShadow
        >
          <meshStandardMaterial color="#F6F3E9" />
        </Box>
      );
    }
    return pilgrims;
  };

  // Night intensity based on progress
  const nightIntensity = 0.8 - (progress / 100) * 0.5;

  return (
    <>
      {/* Night lighting */}
      <ambientLight intensity={0.15} color="#4A5568" />
      <directionalLight
        position={[-10, 5, -10]}
        intensity={0.3}
        color="#B8C5D6"
        castShadow
      />
      <pointLight position={[0, 10, 0]} intensity={0.4} color="#FFD700" />

      {/* Stars */}
      <Stars
        ref={starsRef}
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      {/* Moon */}
      <Sphere args={[2, 32, 32]} position={[-15, 15, -15]}>
        <meshStandardMaterial
          color="#F4F4F4"
          emissive="#FFE6A0"
          emissiveIntensity={0.8}
        />
      </Sphere>

      {/* Ground with pebbles */}
      {renderPebbles()}

      {/* Sleeping pilgrims */}
      {renderPilgrims()}

      {/* Collection area marker */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[2, 2.5, 32]} />
        <meshStandardMaterial color="#CFA24F" emissive="#CFA24F" emissiveIntensity={0.5} />
      </mesh>

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#3A3A3A" />
      </mesh>

      {/* Fog effect */}
      <fog attach="fog" args={['#1A1A1A', 20, 80]} />

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={15}
        maxDistance={40}
        maxPolarAngle={Math.PI / 2.2}
      />
    </>
  );
};
