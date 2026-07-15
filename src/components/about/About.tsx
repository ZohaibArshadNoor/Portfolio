"use client";

import { useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { AvatarHologram } from "@/components/ui/AvatarHologram";
import { BIO, SITE, STATS } from "@/data/site";
import { timeline } from "@/data/experience";
import { useGitHubStats } from "@/hooks/useGitHubStats";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import gsap from "gsap";

function AnimatedCounter({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(reducedMotion ? value : 0);

  useScrollTrigger(() => {
    if (reducedMotion || !ref.current) {
      setDisplay(value);
      return;
    }
    const obj = { n: 0 };
    gsap.to(obj, {
      n: value,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
      },
      onUpdate: () => setDisplay(Math.round(obj.n)),
    });
  }, [value, reducedMotion]);

  return (
    <div className="text-center">
      <p className="heading-display text-xl text-cyan sm:text-3xl md:text-4xl">
        <span ref={ref}>{display}</span>
        {suffix}
      </p>
      <p className="mt-1 text-[10px] text-text-muted sm:text-sm">{label}</p>
    </div>
  );
}

export function About() {
  const github = useGitHubStats(SITE.githubUsername);
  const lineRef = useRef<HTMLDivElement>(null);

  useScrollTrigger(() => {
    if (!lineRef.current) return;
    gsap.from(lineRef.current, {
      scaleY: 0,
      transformOrigin: "top",
      duration: 1.4,
      ease: "power2.out",
      scrollTrigger: {
        trigger: lineRef.current,
        start: "top 75%",
      },
    });
  }, []);

  const contributionCount = github.error
    ? STATS[2].value
    : Math.max(github.publicRepos * 12, STATS[2].value);

  return (
    // @EDIT ABOUT_SECTION — bio heading, avatar, counters, journey preview
    <section id="about" className="section">
      <div className="container-grid">
        <SectionHeading
          eyebrow="About"
          title="Building intelligence into software"
          description={BIO}
        />

        <div className="mb-16 flex flex-col items-center gap-8 md:flex-row md:items-center">
          <AvatarHologram />
          <div className="card-3d grid w-full flex-1 grid-cols-3 gap-2 rounded-2xl glass gradient-border p-4 sm:gap-4 sm:p-6 md:gap-6 md:p-10">
            <AnimatedCounter
              value={STATS[0].value}
              suffix={STATS[0].suffix}
              label={STATS[0].label}
            />
            <AnimatedCounter
              value={STATS[1].value}
              suffix={STATS[1].suffix}
              label={STATS[1].label}
            />
            <AnimatedCounter
              value={contributionCount}
              suffix="+"
              label="GitHub Activity Signal"
            />
          </div>
        </div>

        {!github.loading && !github.error && (
          <div className="mb-16 flex flex-wrap gap-6 text-sm text-text-muted">
            <span>
              <strong className="text-cyan">{github.publicRepos}</strong> public repos
            </span>
            <span>
              <strong className="text-purple">{github.totalStars}</strong> stars
            </span>
            <span>
              <strong className="text-blue">{github.followers}</strong> followers
            </span>
          </div>
        )}

        <div className="relative">
          <h3 className="heading-display mb-8 text-2xl md:text-3xl">Journey</h3>
          <div className="relative pl-8 md:pl-12">
            <div
              ref={lineRef}
              className="absolute left-2 top-0 h-full w-px bg-gradient-to-b from-cyan via-purple to-transparent md:left-4"
              aria-hidden
            />
            <ol className="space-y-8">
              {timeline.slice(0, 3).map((item) => (
                <li key={item.id} className="relative">
                  <span className="absolute -left-[1.65rem] top-2 h-3 w-3 rounded-full border-2 border-cyan bg-bg shadow-[0_0_12px_#00E5FF] md:-left-[2.15rem]" />
                  <GlassCard hover={false} className="!p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-cyan">
                      {item.period}
                    </p>
                    <h4 className="mt-1 heading-display text-lg text-text">
                      {item.title}
                    </h4>
                    <p className="text-sm text-text-muted">{item.organization}</p>
                    <ul className="mt-3 space-y-1 text-sm text-text-muted">
                      {item.description.map((d) => (
                        <li key={d}>• {d}</li>
                      ))}
                    </ul>
                  </GlassCard>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
