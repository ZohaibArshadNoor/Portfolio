"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { AICore } from "./AICore";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { SceneErrorBoundary } from "./SceneErrorBoundary";
import { ClientOnly3D } from "./ClientOnly3D";
import { disposeObject3D } from "@/lib/three-manager";
import * as THREE from "three";

function SceneContent({
  pointer,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const root = useRef<THREE.Group>(null);

  useEffect(() => {
    const group = root.current;
    return () => {
      if (group) disposeObject3D(group);
    };
  }, []);

  return (
    <group ref={root}>
      <fog attach="fog" args={["#050816", 10, 24]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 4, 4]} intensity={1.4} color="#00E5FF" />
      <pointLight position={[-4, -2, -3]} intensity={1} color="#8B5CF6" />
      <spotLight
        position={[0, 6, 2]}
        angle={0.4}
        penumbra={0.6}
        intensity={1.2}
        color="#3B82F6"
      />
      <Stars radius={70} depth={50} count={1800} factor={3.5} saturation={0} fade speed={0.6} />
      <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.45}>
        <AICore pointer={pointer} />
      </Float>
    </group>
  );
}

function FallbackAtmosphere() {
  return (
    <div
      className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,229,255,0.14)_0%,_transparent_55%),radial-gradient(ellipse_at_70%_35%,_rgba(139,92,246,0.2)_0%,_transparent_50%)]"
      aria-hidden
    >
      <div className="perspective-floor absolute inset-x-0 bottom-0 h-1/2 opacity-30" />
      <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/25 bg-cyan/5 blur-sm animate-pulse-glow md:h-72 md:w-72" />
    </div>
  );
}

export function HeroScene() {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const pointer = useRef({ x: 0, y: 0 });
  const [webglOk, setWebglOk] = useState(true);

  useEffect(() => {
    if (reducedMotion || isMobile) return;
    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reducedMotion, isMobile]);

  const show3D = useMemo(
    () => webglOk && !reducedMotion && !isMobile,
    [webglOk, reducedMotion, isMobile]
  );

  if (!show3D) {
    return <FallbackAtmosphere />;
  }

  return (
    <div className="absolute inset-0" aria-hidden>
      <div className="perspective-floor absolute inset-x-0 bottom-0 h-1/2 opacity-25" />
      <SceneErrorBoundary fallback={<FallbackAtmosphere />}>
        <ClientOnly3D fallback={<FallbackAtmosphere />} delay={80}>
          <Canvas
            dpr={[1, 1.35]}
            camera={{ position: [0, 0.2, 6.8], fov: 42 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
              failIfMajorPerformanceCaveat: false,
            }}
            onCreated={({ gl }) => {
              gl.setClearColor(0x050816, 0);
              const canvas = gl.domElement;
              canvas.addEventListener("webglcontextlost", (e) => {
                e.preventDefault();
                setWebglOk(false);
              });
            }}
          >
            <Suspense fallback={null}>
              <SceneContent pointer={pointer} />
            </Suspense>
          </Canvas>
        </ClientOnly3D>
      </SceneErrorBoundary>
    </div>
  );
}
