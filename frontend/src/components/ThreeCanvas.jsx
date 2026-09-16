import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

/** Wireframe sphere that tracks mouse position with a subtle lag. */
function AnimatedSphere() {
  const meshRef = useRef();
  const { mouse, viewport } = useThree();

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.08;
    meshRef.current.rotation.y += delta * 0.1;

    const mouseInfluence = 0.03;
    const targetX = (mouse.x * viewport.width) / 20;
    const targetY = (mouse.y * viewport.height) / 20;
    meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * mouseInfluence;
    meshRef.current.rotation.x += (-targetY - meshRef.current.rotation.x) * mouseInfluence;
  });

  return (
    <Sphere ref={meshRef} args={[1.5, 64, 64]}>
      <MeshDistortMaterial
        color="#5f8f80"
        distort={0.25}
        speed={1.2}
        roughness={0.4}
        metalness={0.6}
        wireframe
        transparent
        opacity={0.6}
      />
    </Sphere>
  );
}

/** Atmospheric particle cloud — subtle, not flashy. */
function ParticleSwarm() {
  const isMobile = typeof navigator !== 'undefined' && (navigator.hardwareConcurrency || 4) <= 4;
  const count = isMobile ? 800 : 2000;
  const meshRef = useRef();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2.5 + Math.random() * 3;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [count]);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y -= delta * 0.03;
    meshRef.current.rotation.z += delta * 0.01;
  });

  return (
    <Points ref={meshRef} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8a8580"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  );
}

export default function ThreeCanvas() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden pointer-events-none" style={{ backgroundColor: '#111110' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            console.warn('WebGL context lost');
          });
        }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#5f8f80" />
        <directionalLight position={[-10, -10, -5]} intensity={0.6} color="#3a3a38" />
        <AnimatedSphere />
        <ParticleSwarm />
      </Canvas>
    </div>
  );
}
