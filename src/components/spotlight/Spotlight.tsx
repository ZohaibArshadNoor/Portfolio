"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { SceneErrorBoundary } from "@/components/three/SceneErrorBoundary";
import { ClientOnly3D } from "@/components/three/ClientOnly3D";
import gsap from "gsap";

const LAYERS = [
  { label: "Working Memory", radius: 0.8, color: "#00E5FF" },
  { label: "Episodic Memory", radius: 1.3, color: "#3B82F6" },
  { label: "Semantic Memory", radius: 1.8, color: "#8B5CF6" },
  { label: "Long-term Archive", radius: 2.3, color: "#A78BFA" },
];

const PIPELINE_STEPS = [
  "Ingest",
  "Segment",
  "Embed",
  "Rank",
  "Compress",
  "Retrieve",
  "Optimize",
  "Inject",
  "Generate",
  "Explain",
  "Review",
];

function MemoryRings() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.2;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
  });

  return (
    <Float speed={1} floatIntensity={0.3}>
      <group ref={group}>
        <mesh>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial
            color="#00E5FF"
            emissive="#00E5FF"
            emissiveIntensity={1}
            transparent
            opacity={0.5}
          />
        </mesh>
        {LAYERS.map((layer, i) => (
          <mesh key={layer.label} rotation={[Math.PI / 2.2, i * 0.35, 0]}>
            <torusGeometry args={[layer.radius, 0.025, 12, 64]} />
            <meshStandardMaterial
              color={layer.color}
              emissive={layer.color}
              emissiveIntensity={0.6}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
        {/* Pipeline nodes orbiting */}
        {PIPELINE_STEPS.slice(0, 8).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(a) * 2.6, Math.sin(a * 2) * 0.3, Math.sin(a) * 2.6]}
            >
              <sphereGeometry args={[0.06, 8, 8]} />
              <meshStandardMaterial
                color="#00E5FF"
                emissive="#00E5FF"
                emissiveIntensity={0.8}
              />
            </mesh>
          );
        })}
        <ambientLight intensity={0.4} />
        <pointLight position={[3, 3, 3]} intensity={1} color="#00E5FF" />
        <pointLight position={[-3, -2, -2]} intensity={0.7} color="#8B5CF6" />
      </group>
    </Float>
  );
}

export function Spotlight() {
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  useScrollTrigger(() => {
    if (!contentRef.current) return;
    gsap.from(contentRef.current.querySelectorAll("[data-reveal]"), {
      opacity: 0,
      y: 40,
      stagger: 0.12,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 70%",
      },
    });
  }, []);

  return (
    <section id="spotlight" className="section relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(139,92,246,0.2), transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(0,229,255,0.12), transparent 45%)",
        }}
        aria-hidden
      />

      <div className="container-grid relative">
        <SectionHeading
          eyebrow="Featured · Final Year Project"
          title="PipelineAI / ICMF"
          description="Intelligent Context Management Framework — middleware that fights Context Rotting in long LLM conversations."
        />

        <div
          ref={contentRef}
          className="grid items-center gap-12 lg:grid-cols-2"
        >
          <div
            className="card-3d relative h-[320px] overflow-hidden rounded-3xl border border-purple/20 bg-bg-elevated/30 md:h-[420px]"
            data-reveal
          >
            {!reducedMotion && !isMobile ? (
              <SceneErrorBoundary
                fallback={
                  <div className="flex h-full items-center justify-center">
                    <div className="relative h-48 w-48 rounded-full border border-purple/30 bg-purple/10">
                      {LAYERS.map((l, i) => (
                        <div
                          key={l.label}
                          className="absolute inset-0 rounded-full border"
                          style={{
                            margin: `${i * 14}px`,
                            borderColor: l.color,
                            opacity: 0.5,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                }
              >
                <ClientOnly3D delay={180}>
                  <Canvas
                    dpr={[1, 1.25]}
                    camera={{ position: [0, 0, 6], fov: 45 }}
                    gl={{
                      antialias: true,
                      alpha: true,
                      powerPreference: "high-performance",
                      failIfMajorPerformanceCaveat: false,
                    }}
                  >
                    <Suspense fallback={null}>
                      <MemoryRings />
                    </Suspense>
                  </Canvas>
                </ClientOnly3D>
              </SceneErrorBoundary>
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="relative h-48 w-48 rounded-full border border-purple/30 bg-purple/10">
                  {LAYERS.map((l, i) => (
                    <div
                      key={l.label}
                      className="absolute inset-0 rounded-full border"
                      style={{
                        margin: `${i * 14}px`,
                        borderColor: l.color,
                        opacity: 0.5,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div data-reveal>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-cyan">
                The Problem
              </h3>
              <p className="text-text-muted leading-relaxed">
                Context Rotting — LLMs lose critical information over long conversations
                as context windows fill and older turns are truncated or diluted.
              </p>
            </div>

            <div data-reveal>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-purple">
                Four-Layer Memory
              </h3>
              <ul className="space-y-2">
                {LAYERS.map((l) => (
                  <li key={l.label} className="flex items-center gap-3 text-sm text-text-muted">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: l.color, boxShadow: `0 0 8px ${l.color}` }}
                    />
                    {l.label}
                  </li>
                ))}
              </ul>
            </div>

            <div data-reveal>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue">
                11-Step Pipeline
              </h3>
              <div className="flex flex-wrap gap-2">
                {PIPELINE_STEPS.map((step, i) => (
                  <span
                    key={step}
                    className="rounded-lg border border-border bg-bg-surface/70 px-2.5 py-1 text-xs text-text-muted"
                  >
                    <span className="text-cyan">{i + 1}.</span> {step}
                  </span>
                ))}
              </div>
            </div>

            <div data-reveal className="pt-2">
              <MagneticButton href="/projects/pipelineai" variant="primary">
                Read Full Case Study
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
