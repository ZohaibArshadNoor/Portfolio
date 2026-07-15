"use client";

import { useRef } from "react";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import gsap from "gsap";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);

  useScrollTrigger(() => {
    if (!ref.current) return;
    gsap.from(ref.current.children, {
      opacity: 0,
      y: 40,
      duration: 0.9,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
      },
    });
  }, []);

  return (
    <div
      ref={ref}
      className={`mb-12 md:mb-16 ${align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-3xl"} ${className}`}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
          {eyebrow}
        </p>
      )}
      <h2 className="heading-display text-3xl text-text md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-text-muted md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
