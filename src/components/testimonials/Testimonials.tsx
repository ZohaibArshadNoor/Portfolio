"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { testimonials } from "@/data/experience";
import { FaQuoteLeft } from "react-icons/fa";

export function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <div className="container-grid">
        <SectionHeading
          eyebrow="Testimonials"
          title="What collaborators say"
          description="Sample feedback shaped around real projects — swap in live recommendations anytime via @EDIT TESTIMONIALS."
          align="center"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <GlassCard key={t.id} className="relative flex flex-col">
              {t.placeholder && (
                <span className="absolute right-4 top-4 rounded-md border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-300">
                  Sample
                </span>
              )}
              <FaQuoteLeft className="mb-4 text-cyan/40" size={20} />
              <p className="flex-1 text-sm leading-relaxed text-text-muted">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 border-t border-border pt-4">
                <p className="font-semibold text-text">{t.name}</p>
                <p className="text-xs text-text-muted">
                  {t.role} · {t.company}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
