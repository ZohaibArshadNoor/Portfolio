"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "./useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

type ScrollTriggerConfig = ScrollTrigger.Vars;

export function useScrollTrigger(setup: () => void, deps: unknown[] = []) {
  const reducedMotion = useReducedMotion();
  const setupRef = useRef(setup);
  setupRef.current = setup;

  useEffect(() => {
    if (reducedMotion) return;

    // gsap.context() returns ctx after the callback runs — never pass it into the callback
    const ctx = gsap.context(() => {
      setupRef.current();
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, ...deps]);
}

export function createRevealTrigger(
  targets: gsap.TweenTarget,
  vars?: gsap.TweenVars,
  triggerConfig?: Partial<ScrollTriggerConfig>
) {
  return gsap.from(targets, {
    opacity: 0,
    y: 48,
    duration: 1,
    ease: "power3.out",
    stagger: 0.08,
    ...vars,
    scrollTrigger: {
      trigger: targets as gsap.DOMTarget,
      start: "top 85%",
      toggleActions: "play none none none",
      ...triggerConfig,
    },
  });
}
