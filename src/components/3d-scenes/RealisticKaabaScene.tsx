import { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Box, Cylinder, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Pilgrim component with realistic materials
const Pilgrim = ({ position, angleOffset }: { position: [number, number, number]; angleOffset: number }) => {
  const pilgrimRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (pilgrimRef.current) {
      // Walking animation
      const walkCycle = Math.sin(state.clock.elapsedTime * 3 + angleOffset) * 0.1;
      pilgrimRef.current.position.y = 0.3 + Math.abs(walkCycle) * 0.05;
      
      // Slight rotation for natural movement
      pilgrimRef.current.rotation.y = angleOffset + Math.sin(state.clock.elapsedTime * 2 + angleOffset) * 0.05;
    }
  });

  return (
    <group ref={pilgrimRef} position={position}>
      {/* Body - simplified pilgrim in white Ihram */}
      <Cylinder args={[0.15, 0.18, 0.6, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#F6F3E9" roughness={0.8} metalness={0.1} />
      </Cylinder>
      {/* Head */}
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#D4A574" roughness={0.9} />
      </mesh>
      {/* Arms */}
      <Cylinder args={[0.05, 0.05, 0.4, 8]} position={[-0.2, 0, 0]} rotation={[0, 0, 0.3]}>
        <meshStandardMaterial color="#F6F3E9" roughness={0.8} />
      </Cylinder>
      <Cylinder args={[0.05, 0.05, 0.4, 8]} position={[0.2, 0, 0]} rotation={[0, 0, -0.3]}>
        <meshStandardMaterial color="#F6F3E9" roughness={0.8} />
      </Cylinder>
    </group>
  );
};

// Kaaba with realistic materials
const KaabaModel = () => {
  const kaabaRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (kaabaRef.current) {
      // Subtle breathing effect
      const scale = 1 + Math.sin(Date.now() * 0.0005) * 0.002;
      kaabaRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={kaabaRef} position={[0, 1.5, 0]}>
      {/* Main Kaaba structure */}
      <Box args={[2.2, 3, 2.2]} castShadow receiveShadow>
        <meshStandardMaterial 
          color="#0a0a0a" 
          roughness={0.9}
          metalness={0.1}
          envMapIntensity={0.5}
        />
      </Box>
      
      {/* Kiswa (black cloth) detail band */}
      <Box args={[2.25, 0.4, 2.25]} position={[0, 1.2, 0]}>
        <meshStandardMaterial 
          color="#CFA24F" 
          roughness={0.3}
          metalness={0.7}
          emissive="#8B6914"
          emissiveIntensity={0.3}
        />
      </Box>

      {/* Golden door */}
      <Box args={[0.05, 1.4, 0.9]} position={[1.125, -0.3, 0]} castShadow>
        <meshStandardMaterial 
          color="#CFA24F" 
          roughness={0.2}
          metalness={0.9}
          emissive="#8B6914"
          emissiveIntensity={0.4}
        />
      </Box>

      {/* Door handle details */}
      <Cylinder args={[0.03, 0.03, 0.3]} position={[1.15, -0.3, 0.3]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#FFD700" roughness={0.1} metalness={1} />
      </Cylinder>

      {/* Hajar al-Aswad (Black Stone) corner indicator */}
      <Box args={[0.15, 0.15, 0.15]} position={[1.1, -0.8, 1.1]} castShadow>
        <meshStandardMaterial 
          color="#1a1a1a" 
          roughness={0.4}
          metalness={0.3}
          emissive="#CFA24F"
          emissiveIntensity={0.2}
        />
      </Box>
    </group>
  );
};

export const RealisticKaabaScene = ({ progress }: { progress: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame((state) => {
    // Smooth camera orbit animation
    if (groupRef.current) {
      groupRef.current.rotation.y = (progress / 100) * Math.PI * 2;
    }

    // Dynamic camera movement
    const t = state.clock.elapsedTime * 0.3;
    state.camera.position.x = Math.sin(t) * 12;
    state.camera.position.z = Math.cos(t) * 12;
    state.camera.position.y = 6 + Math.sin(t * 0.5) * 2;
    state.camera.lookAt(0, 2, 0);
  });

  // Create circular path of pilgrims
  const pilgrims = [];
  const numPilgrims = 32;
  for (let i = 0; i < numPilgrims; i++) {
    const angle = (i / numPilgrims) * Math.PI * 2;
    const radius = 5;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    pilgrims.push(
      <Pilgrim 
        key={i} 
        position={[x, 0, z]} 
        angleOffset={angle}
      />
    );
  }

  return (
    <>
      {/* Advanced Lighting Setup */}
      <ambientLight intensity={0.6} color="#e8e4d0" />
      
      {/* Sun light */}
      <directionalLight
        position={[20, 30, 15]}
        intensity={1.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        color="#fff9e6"
      />

      {/* Accent lighting from different angles */}
      <pointLight position={[0, 8, 0]} intensity={1.2} color="#CFA24F" distance={20} />
      <pointLight position={[10, 5, 10]} intensity={0.8} color="#ffffff" distance={15} />
      <pointLight position={[-10, 5, -10]} intensity={0.8} color="#ffffff" distance={15} />

      {/* Hemisphere light for realistic ambient */}
      <hemisphereLight 
        color="#87CEEB" 
        groundColor="#C4A574" 
        intensity={0.6} 
      />

      {/* Environment map for reflections */}
      <Environment preset="sunset" />

      {/* Fog for depth */}
      <fog attach="fog" args={['#C4A574', 20, 50]} />

      <group ref={groupRef}>
        {/* Kaaba */}
        <Suspense fallback={null}>
          <KaabaModel />
        </Suspense>

        {/* Tawaf path - marble floor ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
          <ringGeometry args={[4, 7, 64]} />
          <meshStandardMaterial 
            color="#E8E4D8" 
            roughness={0.2}
            metalness={0.1}
            envMapIntensity={0.5}
          />
        </mesh>

        {/* Inner circle - Mataf */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
          <circleGeometry args={[4, 64]} />
          <meshStandardMaterial 
            color="#F6F3E9" 
            roughness={0.3}
            metalness={0.05}
          />
        </mesh>

        {/* Gold path markers */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
          <ringGeometry args={[4.8, 5, 64]} />
          <meshStandardMaterial 
            color="#CFA24F" 
            roughness={0.2}
            metalness={0.8}
            emissive="#8B6914"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Animated pilgrims */}
        {pilgrims}
      </group>

      {/* Realistic ground - marble tiles */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial 
          color="#C4A574" 
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {/* Contact shadows for realism */}
      <ContactShadows 
        opacity={0.4} 
        scale={50} 
        blur={1} 
        far={10} 
        resolution={256} 
        color="#000000"
      />

      {/* Camera controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={8}
        maxDistance={25}
        maxPolarAngle={Math.PI / 2.2}
        autoRotate={false}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  );
};
