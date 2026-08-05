"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Core() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;

    mesh.current.rotation.y += 0.003;
    mesh.current.rotation.x += 0.001;

    const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    mesh.current.scale.set(scale, scale, scale);
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.6, 2]} />

        <meshStandardMaterial
          color="#22d3ee"
          emissive="#2563eb"
          emissiveIntensity={2}
          metalness={1}
          roughness={0.1}
          wireframe
        />
      </mesh>
    </Float>
  );
}

export default function AICore() {
  return (
    <div className="h-[500px] w-full">

      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>

        <ambientLight intensity={1} />

        <pointLight
          position={[5, 5, 5]}
          intensity={20}
          color="#38bdf8"
        />

        <pointLight
          position={[-5, -5, -5]}
          intensity={10}
          color="#2563eb"
        />

        <Core />

      </Canvas>

    </div>
  );
}