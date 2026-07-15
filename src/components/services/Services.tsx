"use client";

import {
  AiOutlineRobot,
  AiOutlineExperiment,
  AiOutlineApi,
  AiOutlineCode,
  AiOutlineThunderbolt,
  AiOutlineApartment,
} from "react-icons/ai";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { services } from "@/data/experience";

const ICONS = {
  AiOutlineRobot,
  AiOutlineExperiment,
  AiOutlineApi,
  AiOutlineCode,
  AiOutlineThunderbolt,
  AiOutlineApartment,
} as const;

export function Services() {
  return (
    <section id="services" className="section">
      <div className="container-grid">
        <SectionHeading
          eyebrow="Services"
          title="What I can build for you"
          description="From AI integrations to full-stack products — focused on practical, production-ready engineering."
          align="center"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = ICONS[s.icon as keyof typeof ICONS] ?? AiOutlineCode;
            return (
              <GlassCard key={s.title} className="group">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan/20 bg-cyan/10 text-cyan transition-all group-hover:shadow-[0_0_24px_rgba(0,229,255,0.35)]">
                  <Icon size={22} />
                </div>
                <h3 className="heading-display text-lg">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {s.description}
                </p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
