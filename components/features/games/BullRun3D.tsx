'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useProgress } from '@react-three/drei';
import { useLoading } from '@/components/shared/contexts/LoadingContext';
import { useEffect } from 'react';

function BullRunScene() {
  const { startLoading, updateProgress, stopLoading } = useLoading();
  const { progress, active } = useProgress();

  // Track 3D model and texture loading progress
  useEffect(() => {
    if (active) {
      startLoading("INITIALIZING 3D ENVIRONMENT");
    }
  }, [active, startLoading]);

  useEffect(() => {
    if (!active && progress === 100) {
      updateProgress(100);
      setTimeout(stopLoading, 300);
    } else if (active) {
      updateProgress(progress);
    }
  }, [progress, active, updateProgress, stopLoading]);
  
  return (
    <>
      {/* Basic scene elements */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Test objects */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      
      <mesh position={[2, 0, 0]} castShadow>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="green" />
      </mesh>
      
      <Environment preset="sunset" />
      <OrbitControls />
    </>
  );
}

export default function BullRun3D() {
  return (
    <div className="w-full h-[400px] bg-gradient-to-b from-amber-100 to-amber-200 rounded-xl border-2 border-amber-400/30">
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        {/* Basic scene elements */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {/* Test objects */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
        </mesh>
        
        <mesh position={[2, 0, 0]} castShadow>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
        
        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="green" />
        </mesh>
        
        <Environment preset="sunset" />
        <OrbitControls />
      </Canvas>
      
      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
        🎮 Three.js React Test - Drag to rotate
      </div>
    </div>
  );
}