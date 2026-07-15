"use client";

import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { timeline, targetRoles } from "@/data/experience";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import gsap from "gsap";

export function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useScrollTrigger(() => {
    if (lineRef.current) {
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: { trigger: lineRef.current, start: "top 75%" },
      });
    }
    if (listRef.current) {
      gsap.from(listRef.current.children, {
        opacity: 0,
        x: -30,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: listRef.current, start: "top 75%" },
      });
    }
  }, []);

  return (
    <section id="experience" className="section">
      <div className="container-grid">
        <SectionHeading
          eyebrow="Experience & Education"
          title="Path so far"
          description="Academic foundation, self-directed AI engineering, and backend work — targeting internship roles in software, AI/ML, and ASP.NET Core."
        />

        <div className="relative pl-8 md:pl-12">
          <div
            ref={lineRef}
            className="absolute left-2 top-0 h-full w-px bg-gradient-to-b from-cyan via-purple to-blue/20 md:left-4"
            aria-hidden
          />
          <div ref={listRef} className="space-y-6">
            {timeline.map((item) => (
              <div key={item.id} className="relative">
                <span className="absolute -left-[1.65rem] top-5 h-3 w-3 rounded-full border-2 border-purple bg-bg shadow-[0_0_12px_#8B5CF6] md:-left-[2.15rem]" />
                <GlassCard className="!p-5 md:!p-6">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-cyan">
                        {item.type}
                      </p>
                      <h3 className="heading-display mt-1 text-lg md:text-xl">
                        {item.title}
                      </h3>
                      <p className="text-sm text-text-muted">{item.organization}</p>
                    </div>
                    <span className="rounded-lg border border-border px-2.5 py-1 text-xs text-text-muted">
                      {item.period}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-1.5 text-sm text-text-muted">
                    {item.description.map((d) => (
                      <li key={d}>• {d}</li>
                    ))}
                  </ul>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">
            Actively targeting
          </p>
          <div className="flex flex-wrap gap-2">
            {targetRoles.map((role) => (
              <span
                key={role}
                className="rounded-xl border border-cyan/20 bg-cyan/5 px-4 py-2 text-sm text-cyan"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
