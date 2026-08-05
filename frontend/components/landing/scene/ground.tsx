"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Ground() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const time = clock.elapsedTime;

    const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
    const position = geometry.attributes.position;

    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);

      const wave =
        Math.sin(x * 0.4 + time) * 0.3 +
        Math.cos(y * 0.5 + time * 1.5) * 0.2;

      position.setZ(i, wave);
    }

    position.needsUpdate = true;

    geometry.computeVertexNormals();
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2.4, 0, 0]}
      position={[0, -2.5, 0]}
    >
      <planeGeometry args={[60, 60, 120, 120]} />

      <meshStandardMaterial
        color="#00d9ff"
        wireframe
        emissive="#00d9ff"
        emissiveIntensity={1}
      />
    </mesh>
  );
}