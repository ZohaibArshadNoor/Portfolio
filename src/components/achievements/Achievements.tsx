"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { achievements } from "@/data/experience";
import { HiOutlineSparkles } from "react-icons/hi";

export function Achievements() {
  return (
    <section id="achievements" className="section">
      <div className="container-grid">
        <SectionHeading
          eyebrow="Achievements"
          title="Milestones & practice"
          description="Applied AI delivery, production-style backends, and continuous research-oriented learning."
          align="center"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a) => (
            <GlassCard key={a.title} gradientBorder>
              <HiOutlineSparkles className="mb-3 text-cyan" size={22} />
              <h3 className="heading-display text-lg text-text">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {a.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
