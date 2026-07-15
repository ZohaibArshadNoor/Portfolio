"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useMediaQuery";

export function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reducedMotion || isMobile) return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, [data-cursor='hover'], input, textarea"
      );
      setHovering(Boolean(interactive));
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [reducedMotion, isMobile]);

  if (reducedMotion || isMobile) return null;

  return (
    <>
      <div
        className="pointer-events-none fixed z-[9997] mix-blend-difference"
        style={{
          left: pos.x,
          top: pos.y,
          opacity: visible ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${hovering ? 2.2 : 1})`,
          transition: "transform 0.2s ease, opacity 0.2s ease",
        }}
        aria-hidden
      >
        <div
          className={`rounded-full border ${
            hovering
              ? "h-10 w-10 border-cyan bg-cyan/10"
              : "h-3 w-3 border-transparent bg-cyan"
          }`}
          style={{
            boxShadow: hovering ? "0 0 20px rgba(0,229,255,0.4)" : undefined,
            transition: "all 0.2s ease",
          }}
        />
      </div>
      <div
        className="pointer-events-none fixed z-[9996] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20"
        style={{
          left: pos.x,
          top: pos.y,
          opacity: visible ? 0.5 : 0,
          transition: "opacity 0.3s ease, left 0.08s linear, top 0.08s linear",
        }}
        aria-hidden
      />
    </>
  );
}
