"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Float,
} from "@react-three/drei";

function Factory() {
  return (
    <>
      {/* Factory Floor */}

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {/* Building */}

      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[3, 1.6, 3]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      {/* Sensor Node */}

      <Float speed={2}>
        <mesh position={[2.5, 1, 0]}>
          <sphereGeometry args={[0.18]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" />
        </mesh>
      </Float>

      {/* AI Node */}

      <Float speed={3}>
        <mesh position={[-2.5, 1.2, 0]}>
          <sphereGeometry args={[0.22]} />
          <meshStandardMaterial color="#2563eb" emissive="#2563eb" />
        </mesh>
      </Float>

      {/* Smoke Zone */}

      <mesh position={[0, 0.02, -3]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.2]} />
        <meshBasicMaterial
          color="#ef4444"
          transparent
          opacity={0.35}
        />
      </mesh>
    </>
  );
}

export default function DigitalTwin() {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">

      <div className="mb-6">

        <p className="text-sm uppercase tracking-[0.3em] text-sky-400">

          Digital Twin

        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">

          Industrial Environment

        </h2>

      </div>

      <div className="h-[500px] rounded-2xl overflow-hidden">

        <Canvas shadows camera={{ position: [5, 4, 5], fov: 45 }}>

          <ambientLight intensity={1.5} />

          <directionalLight
            position={[4, 6, 4]}
            intensity={2}
            castShadow
          />

          <Factory />

          <Environment preset="city" />

          <OrbitControls />

        </Canvas>

      </div>

    </div>
  );
}