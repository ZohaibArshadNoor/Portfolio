"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { HeroScene } from "@/components/three/HeroScene";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ROLE_TITLES, SITE } from "@/data/site";
import { splitTextToChars, ensureGsapPlugins, EASE } from "@/lib/animation-manager";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { HiArrowDown } from "react-icons/hi";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);

  // Typing / cycling role titles
  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLE_TITLES.length);
    }, 2800);
    return () => clearInterval(id);
  }, [reducedMotion]);

  // GSAP entrance timeline
  useEffect(() => {
    ensureGsapPlugins();
    if (reducedMotion || !headlineRef.current) return;

    const chars = splitTextToChars(headlineRef.current);
    const tl = gsap.timeline({ delay: 0.3 });

    tl.from(chars, {
      opacity: 0,
      y: 60,
      rotateX: -90,
      stagger: 0.03,
      duration: 0.8,
      ease: EASE.expo,
    })
      .from(
        subRef.current,
        { opacity: 0, y: 30, duration: 0.7, ease: EASE.cinematic },
        "-=0.4"
      )
      .from(
        ctaRef.current?.children ?? [],
        { opacity: 0, y: 20, stagger: 0.1, duration: 0.6, ease: EASE.cinematic },
        "-=0.3"
      );

    return () => {
      tl.kill();
    };
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Atmospheric gradient behind 3D */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,_rgba(10,15,36,0)_0%,_#050816_70%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(139,92,246,0.18), transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(0,229,255,0.12), transparent 45%)",
        }}
        aria-hidden
      />

      <HeroScene />

      <div className="container-grid relative z-10 grid items-center gap-8 pt-24 pb-16 lg:grid-cols-2">
        <div className="hero-copy">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-cyan">
            Portfolio · {SITE.location}
          </p>

          <h1
            ref={headlineRef}
            className="heading-display whitespace-nowrap text-[clamp(1.15rem,3.8vw,4.25rem)] text-text max-[360px]:whitespace-normal"
            data-split-text={SITE.name}
          >
            {SITE.name}
          </h1>

          <div className="mt-4 h-8 overflow-hidden">
            <p
              key={roleIndex}
              className="role-cycle text-lg font-medium text-purple md:text-xl"
            >
              {ROLE_TITLES[roleIndex]}
            </p>
          </div>

          <p
            ref={subRef}
            className="mt-6 max-w-lg text-base leading-relaxed text-text-muted md:text-lg"
          >
            Building practical AI products, intelligent backends, and production-ready
            systems — from LLM applications to scalable APIs.
          </p>

          <div ref={ctaRef} className="mt-8 flex flex-wrap gap-3">
            <MagneticButton href="#projects" variant="primary">
              View Projects
            </MagneticButton>
            <MagneticButton href={SITE.resumePath} variant="secondary">
              Download Résumé
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Contact Me
            </MagneticButton>
          </div>
        </div>

        {/* Spacer for 3D visual on desktop — scene is absolute full-bleed */}
        <div className="hidden h-[50vh] lg:block" aria-hidden />
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-text-dim transition-colors hover:text-cyan"
        data-cursor="hover"
        aria-label="Scroll to about"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <HiArrowDown className="animate-scroll-bounce" size={18} />
      </a>

    </section>
  );
}
