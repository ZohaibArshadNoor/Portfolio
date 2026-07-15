"use client";

import { SITE, MARQUEE_ITEMS } from "@/data/site";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { HiArrowUp } from "react-icons/hi";

export function Footer() {
  const year = new Date().getFullYear();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-bg-elevated">
      {/* Infinite marquee */}
      <div className="overflow-hidden border-b border-white/5 py-4">
        <div className="animate-marquee flex w-max gap-8 whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="heading-display text-sm uppercase tracking-[0.25em] text-text-muted"
            >
              {item}
              <span className="ml-8 text-cyan/40">◆</span>
            </span>
          ))}
        </div>
      </div>

      <div className="container-grid flex flex-col items-center justify-between gap-8 py-12 md:flex-row">
        <div>
          <p className="heading-display text-2xl">
            <span className="text-gradient">{SITE.shortName}</span>
          </p>
          <p className="mt-2 text-sm text-text-muted">
            © {year} {SITE.name}. Built with Next.js & Three.js.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-muted transition-all hover:border-cyan/40 hover:text-cyan"
            aria-label="GitHub"
            data-cursor="hover"
          >
            <FaGithub size={18} />
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-muted transition-all hover:border-cyan/40 hover:text-cyan"
            aria-label="LinkedIn"
            data-cursor="hover"
          >
            <FaLinkedin size={18} />
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-muted transition-all hover:border-cyan/40 hover:text-cyan"
            aria-label="Email"
            data-cursor="hover"
          >
            <FaEnvelope size={18} />
          </a>
          <button
            type="button"
            onClick={scrollTop}
            className="ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-cyan/30 bg-cyan/10 text-cyan transition-all hover:bg-cyan/20"
            aria-label="Back to top"
            data-cursor="hover"
          >
            <HiArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
