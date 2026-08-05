"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

import Ground from "./ground";

export default function Scene() {
  return (
    <div className="absolute inset-0 z-0">

      <Canvas
        camera={{
          position: [0, 8, 15],
          fov: 45,
        }}
      >

        <color attach="background" args={["#020617"]} />

        <fog attach="fog" args={["#020617", 15, 40]} />

        <ambientLight intensity={0.6} />

        <directionalLight
          position={[10, 10, 5]}
          intensity={2}
          color="#00eaff"
        />

        <pointLight
          position={[0, 5, 0]}
          intensity={3}
          color="#00ffff"
        />

        <Stars
          radius={100}
          depth={60}
          count={2000}
          factor={5}
          saturation={0}
          fade
        />

        <Ground />

        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.25}
          maxPolarAngle={1.4}
          minPolarAngle={0.9}
        />

      </Canvas>

    </div>
  );
}