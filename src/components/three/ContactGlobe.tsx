"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { createSeededRandom } from "@/lib/three-manager";
import { SceneErrorBoundary } from "./SceneErrorBoundary";
import { ClientOnly3D } from "./ClientOnly3D";

/** Approximate Karachi lat/lon → sphere UV */
function latLonToVec3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function Earth() {
  const group = useRef<THREE.Group>(null);
  const markerPos = useMemo(() => latLonToVec3(24.86, 67.0, 1.52), []);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={group}>
      <Sphere args={[1.4, 48, 48]}>
        <meshStandardMaterial
          color="#0a1a3a"
          emissive="#0d2244"
          emissiveIntensity={0.35}
          roughness={0.75}
          metalness={0.35}
        />
      </Sphere>
      <Sphere args={[1.42, 28, 28]}>
        <meshBasicMaterial color="#00E5FF" wireframe transparent opacity={0.18} />
      </Sphere>
      <Sphere args={[1.55, 28, 28]}>
        <meshBasicMaterial
          color="#3B82F6"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
      <mesh position={markerPos}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={2} />
      </mesh>
      <mesh position={markerPos}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.22} />
      </mesh>
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 2, 4]} intensity={1.2} color="#00E5FF" />
      <pointLight position={[-3, -2, -3]} intensity={0.5} color="#8B5CF6" />
    </group>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const rand = createSeededRandom(77);
    const arr = new Float32Array(220 * 3);
    for (let i = 0; i < 220; i++) {
      const r = 2.2 + rand() * 2;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.05;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial size={0.02} color="#8B5CF6" transparent opacity={0.65} depthWrite={false} />
    </points>
  );
}

function StaticGlobe() {
  return (
    <div className="flex h-64 items-center justify-center md:h-80">
      <div className="static-globe relative h-40 w-40">
        {/* Orbit rings */}
        <span
          className="pointer-events-none absolute -inset-3 rounded-full border border-cyan/25"
          style={{ animation: "spin-slow 16s linear infinite" }}
          aria-hidden
        />
        <span
          className="pointer-events-none absolute -inset-6 rounded-full border border-dashed border-purple/20"
          style={{ animation: "spin-slow 28s linear infinite reverse" }}
          aria-hidden
        />

        {/* Soft outer aura */}
        <span
          className="pointer-events-none absolute inset-0 rounded-full bg-cyan/15 blur-xl animate-pulse-glow"
          aria-hidden
        />

        {/* Sphere */}
        <div className="static-globe-sphere relative h-full w-full overflow-hidden rounded-full border border-cyan/30 bg-[radial-gradient(circle_at_30%_30%,_#1a3a6a,_#050816)] shadow-[0_0_60px_rgba(0,229,255,0.25)]">
          {/* Sweeping highlight */}
          <span className="static-globe-sheen pointer-events-none absolute inset-0" aria-hidden />

          {/* Karachi marker + ripple */}
          <span className="absolute right-[28%] top-[42%]">
            <span className="static-globe-ping absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/30" />
            <span className="static-globe-ping static-globe-ping-delay absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/20" />
            <span className="relative z-10 block h-2.5 w-2.5 rounded-full bg-cyan shadow-[0_0_14px_#00E5FF] animate-pulse-glow" />
          </span>
        </div>

        <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-text-dim">
          Karachi, Pakistan
        </p>
      </div>
    </div>
  );
}

export function ContactGlobe() {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  if (reducedMotion || isMobile) {
    return <StaticGlobe />;
  }

  return (
    <div className="h-72 w-full md:h-96">
      <SceneErrorBoundary fallback={<StaticGlobe />}>
        <ClientOnly3D fallback={<StaticGlobe />} delay={200}>
          <Canvas
            dpr={[1, 1.25]}
            camera={{ position: [0, 0, 4.5], fov: 45 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
              failIfMajorPerformanceCaveat: false,
            }}
          >
            <Suspense fallback={null}>
              <Earth />
              <Particles />
            </Suspense>
          </Canvas>
        </ClientOnly3D>
      </SceneErrorBoundary>
    </div>
  );
}
