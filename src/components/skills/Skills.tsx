"use client";

import { Suspense, useCallback, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryPopup } from "@/components/ui/CategoryPopup";
import { allSkills, skillCategories } from "@/data/skills";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { createSeededRandom } from "@/lib/three-manager";
import { SceneErrorBoundary } from "@/components/three/SceneErrorBoundary";
import { ClientOnly3D } from "@/components/three/ClientOnly3D";
import { useTheme } from "@/hooks/useTheme";

interface SkillNodeProps {
  name: string;
  color: string;
  category: string;
  position: [number, number, number];
  activeCategory: string | null;
  onHover: (category: string | null) => void;
  labelColor: string;
}

function SkillNode({
  name,
  color,
  category,
  position,
  activeCategory,
  onHover,
  labelColor,
}: SkillNodeProps) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const dimmed = activeCategory !== null && activeCategory !== category;
  const highlighted = activeCategory === category;
  const targetScale = useRef(1);
  const targetZ = useRef(0);

  useFrame((state) => {
    if (!group.current || !mesh.current) return;
    const t = state.clock.elapsedTime;

    targetScale.current = highlighted ? 1.75 : dimmed ? 0.65 : 1.05;
    targetZ.current = highlighted ? 1.15 : 0;

    const s = THREE.MathUtils.lerp(mesh.current.scale.x, targetScale.current, 0.12);
    mesh.current.scale.setScalar(s);

    group.current.position.x = position[0];
    group.current.position.y =
      position[1] + Math.sin(t * 0.9 + position[0] * 2) * 0.1;
    group.current.position.z = THREE.MathUtils.lerp(
      group.current.position.z,
      position[2] + targetZ.current,
      0.12
    );

    mesh.current.rotation.x += 0.004;
    mesh.current.rotation.y += 0.008;
  });

  return (
    <group ref={group} position={position}>
      <mesh scale={highlighted ? 1.8 : 1.1}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={highlighted ? 0.22 : 0.06}
          depthWrite={false}
        />
      </mesh>
      <mesh
        ref={mesh}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(category);
        }}
        onPointerOut={() => onHover(null)}
      >
        <icosahedronGeometry args={[0.24, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={highlighted ? 1.6 : dimmed ? 0.12 : 0.55}
          roughness={0.25}
          metalness={0.55}
          transparent
          opacity={dimmed ? 0.28 : 0.95}
        />
      </mesh>
      <Html
        distanceFactor={7.5}
        style={{
          pointerEvents: "none",
          opacity: dimmed ? 0.2 : 1,
          transition: "opacity 0.25s, transform 0.25s",
          whiteSpace: "nowrap",
          fontSize: highlighted ? "13px" : "11px",
          fontWeight: highlighted ? 700 : 500,
          color: labelColor,
          fontFamily: "var(--font-inter), sans-serif",
          textShadow: "0 0 10px rgba(0,0,0,0.55), 0 1px 2px rgba(0,0,0,0.35)",
          transform: highlighted ? "translateY(18px) scale(1.08)" : "translateY(16px)",
        }}
        center
      >
        <span>{name}</span>
      </Html>
    </group>
  );
}

function GalaxyScene({
  activeCategory,
  onHover,
  labelColor,
}: {
  activeCategory: string | null;
  onHover: (c: string | null) => void;
  labelColor: string;
}) {
  const nodes = useMemo(() => {
    const rand = createSeededRandom(99);
    return allSkills.map((skill) => {
      const catIndex = skillCategories.findIndex((c) => c.name === skill.category);
      const angle = (catIndex / skillCategories.length) * Math.PI * 2;
      const clusterR = 2.35;
      const spread = 1;
      const x = Math.cos(angle) * clusterR + (rand() - 0.5) * spread;
      const y = (rand() - 0.5) * 2.4;
      const z = Math.sin(angle) * clusterR + (rand() - 0.5) * spread;
      return { ...skill, position: [x, y, z] as [number, number, number] };
    });
  }, []);

  const lines = useMemo(() => {
    const positions: number[] = [];
    nodes.forEach((a, i) => {
      nodes.forEach((b, j) => {
        if (j <= i) return;
        if (a.category !== b.category) return;
        const dx = a.position[0] - b.position[0];
        const dy = a.position[1] - b.position[1];
        const dz = a.position[2] - b.position[2];
        if (Math.hypot(dx, dy, dz) < 1.45) {
          positions.push(...a.position, ...b.position);
        }
      });
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [nodes]);

  return (
    <>
      <ambientLight intensity={0.45} />
      <pointLight position={[5, 5, 5]} intensity={1.25} color="#00E5FF" />
      <pointLight position={[-5, -3, -4]} intensity={0.85} color="#8B5CF6" />
      <spotLight
        position={[0, 8, 2]}
        intensity={0.7}
        angle={0.5}
        penumbra={0.8}
        color="#3B82F6"
      />
      <Float speed={0.6} floatIntensity={0.25} rotationIntensity={0.1}>
        <mesh>
          <sphereGeometry args={[0.45, 32, 32]} />
          <meshStandardMaterial
            color="#8B5CF6"
            emissive="#00E5FF"
            emissiveIntensity={0.7}
            transparent
            opacity={0.35}
            wireframe
          />
        </mesh>
      </Float>
      <lineSegments geometry={lines}>
        <lineBasicMaterial
          color="#8B5CF6"
          transparent
          opacity={activeCategory ? 0.12 : 0.28}
        />
      </lineSegments>
      {nodes.map((n) => (
        <SkillNode
          key={n.name}
          name={n.name}
          color={n.color}
          category={n.category}
          position={n.position}
          activeCategory={activeCategory}
          onHover={onHover}
          labelColor={labelColor}
        />
      ))}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.35}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 1.55}
      />
    </>
  );
}

function SkillsFallback({
  onOpenCategory,
}: {
  onOpenCategory: (name: string) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {skillCategories.map((cat) => (
        <motion.button
          key={cat.name}
          type="button"
          className="glass rounded-2xl p-5 text-left"
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 280, damping: 20 }}
          onClick={() => onOpenCategory(cat.name)}
          data-cursor="hover"
        >
          <h3
            className="mb-3 text-sm font-semibold uppercase tracking-wider"
            style={{ color: cat.color }}
          >
            {cat.name}
          </h3>
          <div className="flex flex-wrap gap-2">
            {cat.skills.map((s) => (
              <span
                key={s}
                className="rounded-lg border border-border bg-bg-surface/60 px-2.5 py-1 text-xs text-text-muted"
              >
                {s}
              </span>
            ))}
          </div>
        </motion.button>
      ))}
    </div>
  );
}

export function Skills() {
  const [hoverCategory, setHoverCategory] = useState<string | null>(null);
  const [popupCategory, setPopupCategory] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  const use3D = !reducedMotion && !isMobile;
  const labelColor = theme === "light" ? "#0b1220" : "#f1f5f9";

  const activeCategory = popupCategory ?? hoverCategory;
  const selected = skillCategories.find((c) => c.name === popupCategory);

  const openCategory = useCallback((name: string) => {
    setPopupCategory(name);
  }, []);

  const closePopup = useCallback(() => {
    setPopupCategory(null);
  }, []);

  return (
    <section id="skills" className="section overflow-hidden">
      <div className="container-grid">
        <SectionHeading
          eyebrow="Skills"
          title="Interactive skill galaxy"
          description="Click a category label to open its skills in a popup — or hover nodes in the galaxy to highlight a cluster."
          align="center"
        />

        {use3D ? (
          <>
            <div className="relative mx-auto w-full max-w-5xl">
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(0,229,255,0.16)_0%,_rgba(139,92,246,0.1)_40%,_transparent_70%)] blur-2xl"
                aria-hidden
              />
              <motion.div
                className="relative h-[380px] w-full sm:h-[460px] md:h-[540px] lg:h-[580px]"
                initial={{ opacity: 0, rotateX: 12, y: 24 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ perspective: 1200, transformStyle: "preserve-3d" }}
              >
                <SceneErrorBoundary
                  fallback={<SkillsFallback onOpenCategory={openCategory} />}
                >
                  <ClientOnly3D
                    fallback={<SkillsFallback onOpenCategory={openCategory} />}
                    delay={120}
                  >
                    <Canvas
                      dpr={[1, 1.35]}
                      camera={{ position: [0, 0.4, 7.2], fov: 46 }}
                      gl={{
                        antialias: true,
                        alpha: true,
                        powerPreference: "high-performance",
                        failIfMajorPerformanceCaveat: false,
                      }}
                    >
                      <Suspense fallback={null}>
                        <GalaxyScene
                          activeCategory={activeCategory}
                          onHover={(c) => {
                            if (!popupCategory) setHoverCategory(c);
                          }}
                          labelColor={labelColor}
                        />
                      </Suspense>
                    </Canvas>
                  </ClientOnly3D>
                </SceneErrorBoundary>
              </motion.div>
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-2 sm:gap-3">
              {skillCategories.map((cat) => (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() =>
                    setPopupCategory((prev) =>
                      prev === cat.name ? null : cat.name
                    )
                  }
                  onMouseEnter={() => !popupCategory && setHoverCategory(cat.name)}
                  onMouseLeave={() => !popupCategory && setHoverCategory(null)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition-all sm:text-sm ${
                    activeCategory === cat.name
                      ? "scale-105 border-cyan/50 bg-cyan/10 text-cyan shadow-[0_0_20px_rgba(0,229,255,0.25)]"
                      : "border-border text-text-muted hover:border-cyan/30 hover:text-text"
                  }`}
                  data-cursor="hover"
                  aria-pressed={popupCategory === cat.name}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </>
        ) : (
          <SkillsFallback onOpenCategory={openCategory} />
        )}
      </div>

      <CategoryPopup
        open={Boolean(selected)}
        title={selected?.name ?? ""}
        accent={selected?.color}
        subtitle={`${selected?.skills.length ?? 0} skills in this cluster`}
        onClose={closePopup}
      >
        <motion.ul
          className="flex flex-wrap gap-2.5"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.05 } },
          }}
        >
          {selected?.skills.map((skill) => (
            <motion.li
              key={skill}
              variants={{
                hidden: { opacity: 0, y: 18, scale: 0.85 },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 380, damping: 22 },
                },
              }}
              className="rounded-xl border border-border bg-bg-surface/70 px-3.5 py-2 text-sm font-medium text-text shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
              style={{
                boxShadow: `0 8px 24px rgba(0,0,0,0.12), 0 0 0 1px ${selected.color}33`,
              }}
            >
              <span
                className="mr-2 inline-block h-2 w-2 rounded-full"
                style={{
                  background: selected.color,
                  boxShadow: `0 0 10px ${selected.color}`,
                }}
              />
              {skill}
            </motion.li>
          ))}
        </motion.ul>
      </CategoryPopup>
    </section>
  );
}
