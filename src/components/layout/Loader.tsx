"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { LOADER_LINES } from "@/data/site";

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const reducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reducedMotion) {
      onComplete();
      setVisible(false);
      return;
    }

    const duration = 2800;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      setLineIndex(
        Math.min(LOADER_LINES.length - 1, Math.floor(t * LOADER_LINES.length))
      );

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
          onComplete();
        }, 400);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion, onComplete]);

  const skip = () => {
    setVisible(false);
    onComplete();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
        >
          {/* Circuit-like particle ring */}
          <div className="relative mb-10 flex h-28 w-28 items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-cyan/20" />
            <div
              className="absolute inset-2 rounded-full border border-purple/30"
              style={{ animation: "spin-slow 8s linear infinite" }}
            />
            <div className="absolute inset-0 rounded-full bg-cyan/10 blur-2xl animate-pulse-glow" />
            <div className="relative h-3 w-3 rounded-full bg-cyan shadow-[0_0_20px_#00E5FF]" />
            {/* Orbiting dots */}
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="absolute h-1.5 w-1.5 rounded-full bg-purple"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${i * 90}deg) translateX(48px) translateY(-50%)`,
                  animation: `spin-slow ${6 + i}s linear infinite`,
                }}
              />
            ))}
          </div>

          <p className="mb-6 font-mono text-sm tracking-wide text-text-muted">
            {LOADER_LINES[lineIndex]}
          </p>

          <div className="h-[2px] w-48 overflow-hidden rounded-full bg-white/10 md:w-64">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan via-purple to-blue"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-3 font-mono text-xs text-text-dim">{progress}%</p>

          <button
            type="button"
            onClick={skip}
            className="absolute bottom-10 text-xs uppercase tracking-[0.2em] text-text-dim transition-colors hover:text-cyan"
            data-cursor="hover"
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
