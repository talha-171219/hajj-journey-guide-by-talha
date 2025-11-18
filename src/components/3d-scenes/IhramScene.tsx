import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Cylinder, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export const IhramScene = ({ progress }: { progress: number }) => {
  const fabricRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (fabricRef.current && progress < 50) {
      fabricRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#CFA24F" />

      {/* Person figure (simplified) */}
      <group position={[0, 0, 0]}>
        {/* Head */}
        <Sphere args={[0.5, 16, 16]} position={[0, 2.5, 0]} castShadow>
          <meshStandardMaterial color="#D4A574" />
        </Sphere>

        {/* Body */}
        <Cylinder args={[0.6, 0.7, 2, 16]} position={[0, 1, 0]} castShadow>
          <meshStandardMaterial color="#8B7355" />
        </Cylinder>

        {/* Ihram cloth (upper) */}
        <Box
          args={[1.8, 1.5, 0.1]}
          position={[0, 1.5, 0.6]}
          rotation={[0.2, 0, 0]}
          castShadow
        >
          <meshStandardMaterial
            color="#F6F3E9"
            transparent
            opacity={progress > 30 ? 1 : 0.3}
          />
        </Box>

        {/* Ihram cloth (lower) */}
        <Cylinder
          args={[0.8, 0.8, 1.5, 16, 1, true]}
          position={[0, 0.2, 0]}
          castShadow
        >
          <meshStandardMaterial
            color="#FFFFFF"
            side={THREE.DoubleSide}
            transparent
            opacity={progress > 60 ? 1 : 0.3}
          />
        </Cylinder>
      </group>

      {/* Ihram preparation items */}
      {progress > 20 && (
        <>
          {/* Soap/washing items */}
          <group position={[-3, 0.5, 0]}>
            <Box args={[0.4, 0.6, 0.3]} castShadow>
              <meshStandardMaterial color="#87CEEB" />
            </Box>
            <Cylinder args={[0.2, 0.2, 0.5]} position={[0.7, 0, 0]} castShadow>
              <meshStandardMaterial color="#90EE90" />
            </Cylinder>
          </group>

          {/* Perfume (forbidden after Ihram) */}
          <Cylinder
            args={[0.15, 0.15, 0.7]}
            position={[-3, 0.35, 1.5]}
            castShadow
          >
            <meshStandardMaterial color="#FFD700" />
          </Cylinder>
        </>
      )}

      {/* Prayer mat */}
      {progress > 80 && (
        <Box args={[2, 0.05, 3]} position={[3, 0.03, 0]} receiveShadow>
          <meshStandardMaterial color="#0E3A2F" />
        </Box>
      )}

      {/* Floating fabric animation */}
      <mesh
        ref={fabricRef}
        position={[2, 3, -2]}
        rotation={[0.3, 0, 0.2]}
      >
        <planeGeometry args={[2, 3, 10, 10]} />
        <meshStandardMaterial
          color="#F6F3E9"
          side={THREE.DoubleSide}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Room elements */}
      <Box args={[0.1, 4, 8]} position={[-6, 2, 0]}>
        <meshStandardMaterial color="#D4C7A1" />
      </Box>
      <Box args={[0.1, 4, 8]} position={[6, 2, 0]}>
        <meshStandardMaterial color="#D4C7A1" />
      </Box>

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#8B7355" />
      </mesh>

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={5}
        maxDistance={15}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
};
