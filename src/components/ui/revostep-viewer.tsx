"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Html, OrbitControls, Environment } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Real parts from revostep_3.0.glb — grouped for exploded view
// ---------------------------------------------------------------------------
export interface PartGroup {
  id: string;
  label: string;
  tagline: string;
  detail: string;
  meshNames: string[];             // All node names in this group
  explodeOffset: [number, number, number];
  hotspotOffset: [number, number, number]; // Relative to group center
  accentColor: string;
}

export const PART_GROUPS: PartGroup[] = [
  {
    id: "upper_frame",
    label: "Upper Load Frame",
    tagline: "Transfers weight off the injury — so your knee barely knows you moved.",
    detail: "The CrutchLegHolster, UpperLegSlide, and TC Bridge form a high-rigidity upper assembly that re-routes compressive load from the knee and ankle up to the hip and thigh musculature — reducing intra-articular pressure by up to 60% compared to crutches.",
    meshNames: [
      "CrutchLegHolster-1",
      "UpperLegSlide-1",
      "Mech_LegSupport_TCBridge_V1.3-1",
      "Mech_LegSupport_LegRest_V1.2-1",
    ],
    explodeOffset: [0, 1.6, 0],
    hotspotOffset: [1.2, 0.4, 0],
    accentColor: "#14b8a6",
  },
  {
    id: "knee_joint",
    label: "Adaptive Knee Joint",
    tagline: "Holds you steady — without locking you in place.",
    detail: "The dual-pivot knee joint (inner race, outer race, and locking pin) provides variable-resistance ROM. Clinicians can set flexion/extension limits between 0°–120°, removing the need for manual brace adjustments at each follow-up visit.",
    meshNames: [
      "Knee Joint-1",
      "revostep joint inner-1",
      "revostep joint outer-1",
      "Revostep joint pin-1",
    ],
    explodeOffset: [-1.4, 0.1, 0],
    hotspotOffset: [-0.5, 0.3, 0],
    accentColor: "#14b8a6",
  },
  {
    id: "rod_system",
    label: "Adjustable Rod System",
    tagline: "One device — fits every height. No extra parts needed.",
    detail: "The telescoping rod system (Middle Rod, Lower Rod, Adjustable Rod + Rod Adjuster) allows 22 cm of height adjustment via a tool-free quick-release collar. The Screw anchor point maintains 0° rotational play under 120 kg of axial load.",
    meshNames: [
      "Adjustable Rod-1",
      "Walking Cane - Middle Rod Section-1",
      "Walking Cane - Lower Rod Section-1",
      "Rod Adjuster-1",
      "Screw-1",
    ],
    explodeOffset: [1.4, 0, 0],
    hotspotOffset: [0.5, -0.3, 0],
    accentColor: "#f97316",
  },
  {
    id: "foot_base",
    label: "Gait-Geometry Foot",
    tagline: "Walks like you do — heel to toe, no shuffle.",
    detail: "The rocker-profile FootBase replicates the natural heel-strike → midstance → toe-off gait cycle. A 7° forefoot taper prevents the 'flat-foot' compensation pattern that causes secondary hip and lumbar injuries during crutch-based recovery.",
    meshNames: [
      "Mech_Foot_FootBase-1",
    ],
    explodeOffset: [0, -1.6, 0],
    hotspotOffset: [1.0, -0.4, 0],
    accentColor: "#f97316",
  },
];

// ---------------------------------------------------------------------------
// Single animated group of meshes
// ---------------------------------------------------------------------------
interface AnimatedGroupProps {
  group: PartGroup;
  nodes: Record<string, THREE.Object3D>;
  explodeProgress: number;
  isActive: boolean;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  onClick: () => void;
}

function AnimatedGroup({
  group, nodes, explodeProgress, isActive,
  onPointerEnter, onPointerLeave, onClick,
}: AnimatedGroupProps) {
  const groupRef = useRef<THREE.Group>(null);

  const { pos } = useSpring({
    pos: [
      group.explodeOffset[0] * explodeProgress,
      group.explodeOffset[1] * explodeProgress,
      group.explodeOffset[2] * explodeProgress,
    ] as [number, number, number],
    config: { mass: 1, tension: 100, friction: 24 },
  });

  const targetEmissive = useRef(new THREE.Color(0, 0, 0));
  const accentColor = new THREE.Color(group.accentColor);

  useFrame(() => {
    if (!groupRef.current) return;
    const target = isActive ? accentColor : new THREE.Color(0, 0, 0);
    targetEmissive.current.lerp(target, 0.08);
    groupRef.current.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mat = (obj as THREE.Mesh).material as THREE.MeshStandardMaterial;
        if (mat?.emissive) {
          mat.emissive.copy(targetEmissive.current);
          mat.emissiveIntensity = isActive ? 0.35 : 0;
        }
      }
    });
  });

  const meshes = group.meshNames
    .map((name) => nodes[name])
    .filter(Boolean) as THREE.Mesh[];

  if (meshes.length === 0) return null;

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <a.group ref={groupRef} position={pos as any}>
      {meshes.map((mesh) => (
        <mesh
          key={mesh.uuid}
          geometry={(mesh as THREE.Mesh).geometry}
          material={(mesh as THREE.Mesh).material}
          position={mesh.position}
          rotation={mesh.rotation}
          scale={mesh.scale}
          castShadow
          receiveShadow
          onPointerEnter={(e) => { e.stopPropagation(); onPointerEnter(); }}
          onPointerLeave={onPointerLeave}
          onClick={(e) => { e.stopPropagation(); onClick(); }}
        />
      ))}

      {/* Hotspot card — appears when fully exploded and group is active */}
      {explodeProgress > 0.75 && isActive && (
        <Html
          position={group.hotspotOffset}
          distanceFactor={6}
          occlude={false}
          style={{ pointerEvents: "none", width: "270px" }}
        >
          <HotspotCard group={group} />
        </Html>
      )}
    </a.group>
  );
}

// ---------------------------------------------------------------------------
// Hotspot popup card
// ---------------------------------------------------------------------------
function HotspotCard({ group }: { group: PartGroup }) {
  const [showDetail, setShowDetail] = useState(false);
  return (
    <div
      className="relative rounded-xl border bg-black/85 backdrop-blur-md p-4 shadow-2xl text-white"
      style={{
        pointerEvents: "auto",
        borderColor: group.accentColor + "50",
        boxShadow: `0 0 30px ${group.accentColor}20`,
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[1px] rounded-t-xl"
        style={{ background: `linear-gradient(90deg, transparent, ${group.accentColor}60, transparent)` }}
      />
      <div className="flex items-center gap-2 mb-2">
        <span
          className="inline-block size-2 rounded-full animate-pulse"
          style={{ backgroundColor: group.accentColor }}
        />
        <p
          className="font-mono text-[10px] uppercase tracking-[0.2em]"
          style={{ color: group.accentColor }}
        >
          Component
        </p>
      </div>
      <p className="font-semibold text-sm tracking-tight mb-1 leading-snug">{group.label}</p>
      <p className="text-[12px] text-neutral-400 leading-relaxed mb-3">{group.tagline}</p>
      <button
        onClick={() => setShowDetail((v) => !v)}
        className="text-[10px] font-mono uppercase tracking-wider transition-colors"
        style={{ color: group.accentColor, pointerEvents: "auto" }}
      >
        {showDetail ? "▲ Hide specs" : "▼ Technical specs"}
      </button>
      {showDetail && (
        <p className="mt-2 text-[11px] text-neutral-500 leading-relaxed border-t border-white/5 pt-2">
          {group.detail}
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sensor pulse ring (cosmetic — orbits the knee joint area)
// ---------------------------------------------------------------------------
function SensorPulse({ visible }: { visible: boolean }) {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ringRef.current || !visible) return;
    const t = (clock.getElapsedTime() % 2) / 2;
    ringRef.current.scale.setScalar(1 + t * 2);
    (ringRef.current.material as THREE.MeshBasicMaterial).opacity = (1 - t) * 0.6;
  });
  if (!visible) return null;
  return (
    <mesh ref={ringRef} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.12, 0.17, 32]} />
      <meshBasicMaterial color="#14b8a6" transparent opacity={0.5} side={THREE.DoubleSide} />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// Slow rotation wrapper — stops once exploding begins
// ---------------------------------------------------------------------------
function SlowRotate({ active, children }: { active: boolean; children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current && active) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });
  return <group ref={ref}>{children}</group>;
}

// ---------------------------------------------------------------------------
// Main GLB scene
// ---------------------------------------------------------------------------
interface SceneProps {
  explodeProgress: number;
  activeGroup: string | null;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}

function Scene({ explodeProgress, activeGroup, onHover, onSelect }: SceneProps) {
  const { scene } = useGLTF("/revostep.glb");
  const { camera } = useThree();

  // Flatten all nodes into a name map
  const nodes: Record<string, THREE.Object3D> = {};
  scene.traverse((obj) => {
    nodes[obj.name] = obj;
  });

  // Centre + scale the model
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const centre = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const desiredSize = 3.5;
    const scaleFactor = desiredSize / maxDim;
    scene.scale.setScalar(scaleFactor);
    scene.position.set(
      -centre.x * scaleFactor,
      -centre.y * scaleFactor,
      -centre.z * scaleFactor
    );
    camera.position.set(0, 0.5, 6);
    camera.lookAt(0, 0, 0);
  }, [scene, camera]);

  return (
    <group>
      <SlowRotate active={explodeProgress < 0.05}>
        {PART_GROUPS.map((group) => (
          <AnimatedGroup
            key={group.id}
            group={group}
            nodes={nodes}
            explodeProgress={explodeProgress}
            isActive={activeGroup === group.id}
            onPointerEnter={() => onHover(group.id)}
            onPointerLeave={() => onHover(null)}
            onClick={() => onSelect(group.id)}
          />
        ))}
      </SlowRotate>

      <SensorPulse visible={explodeProgress < 0.1} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 8, 4]} intensity={1.5} castShadow />
      <directionalLight position={[-4, -2, -4]} intensity={0.3} color="#14b8a6" />
      <pointLight position={[0, -3, 3]} intensity={0.8} color="#f97316" />
      <Environment preset="city" />
    </group>
  );
}

// ---------------------------------------------------------------------------
// Loading fallback
// ---------------------------------------------------------------------------
function LoadingFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="size-8 rounded-full border-2 border-[#14b8a6] border-t-transparent animate-spin" />
        <span className="font-mono text-[11px] uppercase tracking-wider text-[#14b8a6]">Loading model…</span>
      </div>
    </Html>
  );
}

// ---------------------------------------------------------------------------
// Public export — receives scroll-driven explodeProgress (0–1)
// ---------------------------------------------------------------------------
interface RevostepViewerProps {
  explodeProgress: number;
}

export function RevostepViewer({ explodeProgress }: RevostepViewerProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelected((prev) => (prev === id ? null : id));
  };

  const activeGroup = selected ?? hovered;

  return (
    <div className="relative w-full h-full">
      <Canvas
        shadows
        camera={{ fov: 42, near: 0.01, far: 200, position: [0, 0.5, 6] }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Scene
            explodeProgress={explodeProgress}
            activeGroup={activeGroup}
            onHover={setHovered}
            onSelect={handleSelect}
          />
        </Suspense>

        {explodeProgress < 0.05 && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.6}
          />
        )}
      </Canvas>

      {/* "Scroll to explore" hint */}
      {explodeProgress < 0.05 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#14b8a6]">Scroll to explore</span>
          <span className="text-white/30 animate-bounce text-lg">↓</span>
        </div>
      )}

      {/* Part label banner */}
      {activeGroup && explodeProgress > 0.5 && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none animate-fade-in">
          <div className="rounded-full border border-[#14b8a6]/30 bg-black/70 backdrop-blur px-5 py-1.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#14b8a6]">
              {PART_GROUPS.find((g) => g.id === activeGroup)?.label}
            </span>
          </div>
        </div>
      )}

      {/* Legend dots — always visible when exploded */}
      {explodeProgress > 0.6 && (
        <div className="absolute bottom-6 right-6 flex flex-col gap-2 pointer-events-none">
          {PART_GROUPS.map((g) => (
            <div key={g.id} className="flex items-center gap-2">
              <span
                className="inline-block size-2 rounded-full"
                style={{ backgroundColor: g.accentColor }}
              />
              <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
                {g.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
