"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import type { Project } from "@/types";
import { GlassCard } from "@/components/ui/GlassCard";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientY - rect.top) / rect.height - 0.5;
    const y = (e.clientX - rect.left) / rect.width - 0.5;
    setTilt({ x: x * -14, y: y * 14 });
  };

  const onLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
        transition: "transform 0.15s ease-out",
        transformStyle: "preserve-3d",
      }}
      layout
    >
      <GlassCard gradientBorder className="flex h-full flex-col !p-0 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
        <div
          className="relative h-48 bg-gradient-to-br from-bg-surface via-purple/25 to-cyan/15"
          style={{
            backgroundImage: `linear-gradient(145deg, rgba(5,8,22,0.45), rgba(0,229,255,0.12), rgba(139,92,246,0.28)), url(${project.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-bg-elevated to-transparent p-4">
            <div className="flex flex-wrap gap-1.5">
              {project.category.map((c) => (
                <span
                  key={c}
                  className="rounded-md bg-cyan/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="heading-display text-xl text-text">{project.title}</h3>
          {project.subtitle && (
            <p className="mt-1 text-xs text-purple">{project.subtitle}</p>
          )}
          <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">
            {project.shortDescription}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 5).map((t) => (
              <span
                key={t}
                className="rounded-md border border-border px-2 py-0.5 text-[10px] text-text-muted"
              >
                {t}
              </span>
            ))}
            {project.tech.length > 5 && (
              <span className="text-[10px] text-text-muted">
                +{project.tech.length - 5}
              </span>
            )}
          </div>

          <div className="mt-5 flex items-center gap-3">
            <Link
              href={`/projects/${project.slug}`}
              className="text-sm font-semibold text-cyan transition-colors hover:text-text"
              data-cursor="hover"
            >
              Case Study →
            </Link>
            <div className="ml-auto flex gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-muted hover:border-cyan/40 hover:text-cyan"
                  aria-label={`${project.title} GitHub`}
                  data-cursor="hover"
                >
                  <FaGithub size={14} />
                </a>
              )}
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-muted hover:border-cyan/40 hover:text-cyan"
                  aria-label={`${project.title} live demo`}
                  data-cursor="hover"
                >
                  <FaExternalLinkAlt size={12} />
                </a>
              )}
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
