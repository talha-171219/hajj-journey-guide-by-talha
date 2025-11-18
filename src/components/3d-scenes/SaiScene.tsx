import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Cone, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export const SaiScene = ({ progress }: { progress: number }) => {
  const pilgrimRef = useRef<THREE.Mesh>(null);

  const pilgrimPosition = progress / 100;
  const xPosition = (pilgrimPosition - 0.5) * 20;

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
      <directionalLight position={[-5, 10, -5]} intensity={0.5} />

      {/* Safa Hill (Green) */}
      <group position={[-10, 0, 0]}>
        <Cone args={[2, 3, 8]} position={[0, 1.5, 0]} castShadow>
          <meshStandardMaterial color="#0E3A2F" />
        </Cone>
        <Box args={[0.5, 1, 0.5]} position={[0, 3.5, 0]}>
          <meshStandardMaterial color="#CFA24F" metalness={0.8} roughness={0.2} />
        </Box>
      </group>

      {/* Marwa Hill (Green) */}
      <group position={[10, 0, 0]}>
        <Cone args={[2, 3, 8]} position={[0, 1.5, 0]} castShadow>
          <meshStandardMaterial color="#0E3A2F" />
        </Cone>
        <Box args={[0.5, 1, 0.5]} position={[0, 3.5, 0]}>
          <meshStandardMaterial color="#CFA24F" metalness={0.8} roughness={0.2} />
        </Box>
      </group>

      {/* Path between Safa and Marwa */}
      <Box args={[22, 0.1, 3]} position={[0, 0.05, 0]}>
        <meshStandardMaterial color="#D4C7A1" />
      </Box>

      {/* Green section (running area) */}
      <Box args={[4, 0.12, 3]} position={[0, 0.06, 0]}>
        <meshStandardMaterial color="#2d5a3d" />
      </Box>

      {/* Moving pilgrim */}
      <Sphere
        ref={pilgrimRef}
        args={[0.4, 16, 16]}
        position={[xPosition, 0.4, 0]}
        castShadow
      >
        <meshStandardMaterial color="#F6F3E9" />
      </Sphere>

      {/* Static pilgrims along the path */}
      {[-8, -5, -2, 2, 5, 8].map((x, i) => (
        <Sphere
          key={i}
          args={[0.3, 12, 12]}
          position={[x, 0.3, 1]}
          castShadow
        >
          <meshStandardMaterial color="#E8E4D8" />
        </Sphere>
      ))}

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#1a3a2f" />
      </mesh>

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={15}
        maxDistance={30}
        maxPolarAngle={Math.PI / 2.2}
      />
    </>
  );
};
