"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Html, Center, Grid } from "@react-three/drei";
import Link from "next/link";
import { ArrowLeft, RotateCcw, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import * as THREE from "three";

// ─── GLB Model ───────────────────────────────────────────────────────────────
function RevostepModel() {
  const { scene } = useGLTF("/revostep.glb");

  // Compute bounding box and centre/scale the model automatically
  const box = new THREE.Box3().setFromObject(scene);
  const size = box.getSize(new THREE.Vector3());
  const centre = box.getCenter(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const scaleFactor = 4 / maxDim;

  scene.position.set(
    -centre.x * scaleFactor,
    -centre.y * scaleFactor,
    -centre.z * scaleFactor
  );
  scene.scale.setScalar(scaleFactor);

  // Improve materials: smooth normals + better shading
  scene.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const mesh = obj as THREE.Mesh;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((m) => {
          const mat = m as THREE.MeshStandardMaterial;
          mat.roughness = 0.45;
          mat.metalness = 0.65;
          mat.envMapIntensity = 1.2;
        });
      } else {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.roughness = 0.45;
        mat.metalness = 0.65;
        mat.envMapIntensity = 1.2;
      }
    }
  });

  return <primitive object={scene} />;
}

// ─── Loading spinner ──────────────────────────────────────────────────────────
function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4">
        <div className="relative size-12">
          <div className="absolute inset-0 rounded-full border-2 border-[#14b8a6]/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#14b8a6] animate-spin" />
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#14b8a6]">
          Loading Revostep 3.0
        </span>
      </div>
    </Html>
  );
}

// ─── Hint overlay ─────────────────────────────────────────────────────────────
function ControlsHint() {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 pointer-events-none">
      {[
        { icon: "⟳", label: "Drag to rotate" },
        { icon: "⇕", label: "Scroll to zoom" },
        { icon: "⇔", label: "Right-drag to pan" },
      ].map(({ icon, label }) => (
        <div key={label} className="flex flex-col items-center gap-1">
          <span className="text-white/30 text-sm">{icon}</span>
          <span className="font-mono text-[9px] uppercase tracking-wider text-white/25">{label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main viewer page ─────────────────────────────────────────────────────────
export default function RevostepModelPage() {
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <div className="relative w-screen h-screen bg-[#050a0f] overflow-hidden">

      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#14b8a6]/[0.04] blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#f97316]/[0.03] blur-[80px]" />
      </div>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4">
        {/* Back button */}
        <Link
          href="/revostep"
          className="group flex items-center gap-2 rounded-full border border-white/10 bg-black/50 backdrop-blur-md px-4 py-2 text-sm font-medium text-white/70 transition-all hover:border-[#14b8a6]/40 hover:text-white hover:bg-black/70"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          Back
        </Link>

        {/* Title badge */}
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/50 backdrop-blur-md px-5 py-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#14b8a6] opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-[#14b8a6]" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
            Revostep 3.0 — Interactive Model
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoRotate((v) => !v)}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-mono uppercase tracking-wider backdrop-blur-md transition-all ${
              autoRotate
                ? "border-[#14b8a6]/40 bg-[#14b8a6]/10 text-[#14b8a6]"
                : "border-white/10 bg-black/50 text-white/50 hover:text-white"
            }`}
          >
            <RotateCcw className="size-3" />
            {autoRotate ? "Auto-rotate on" : "Auto-rotate off"}
          </button>
        </div>
      </div>

      {/* 3D Canvas — full screen */}
      <Canvas
        shadows
        camera={{ fov: 40, near: 0.01, far: 500, position: [0, 1, 8] }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: "transparent" }}
      >
        <color attach="background" args={["#050a0f"]} />

        <Suspense fallback={<Loader />}>
          <Center>
            <RevostepModel />
          </Center>

          <Environment preset="studio" />

          {/* Ground grid for depth reference */}
          <Grid
            position={[0, -2.5, 0]}
            args={[20, 20]}
            cellSize={0.5}
            cellThickness={0.5}
            cellColor="#14b8a6"
            sectionSize={2}
            sectionThickness={1}
            sectionColor="#14b8a6"
            fadeDistance={15}
            fadeStrength={2}
            infiniteGrid
          />
        </Suspense>

        {/* Lights */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#14b8a6" />
        <pointLight position={[0, -3, 4]} intensity={1} color="#f97316" decay={2} />

        {/* Orbit controls */}
        <OrbitControls
          autoRotate={autoRotate}
          autoRotateSpeed={0.6}
          enableDamping
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={20}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>

      {/* Control hints */}
      <ControlsHint />

      {/* Watermark */}
      <div className="absolute bottom-6 right-6 pointer-events-none">
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/15">
          LimbRise · Revostep MVP
        </span>
      </div>
    </div>
  );
}
