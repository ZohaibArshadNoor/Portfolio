import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function ensureGsapPlugins() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export const EASE = {
  cinematic: "power3.out",
  smooth: "power2.inOut",
  snap: "back.out(1.4)",
  expo: "expo.out",
} as const;

/**
 * Safe character split — skips if already split (prevents Strict Mode / remount crashes).
 */
export function splitTextToChars(element: HTMLElement): HTMLSpanElement[] {
  const existing = element.querySelectorAll<HTMLSpanElement>(":scope > span[data-char]");
  if (existing.length > 0) {
    return Array.from(existing);
  }

  const text =
    element.getAttribute("data-split-text") ??
    element.getAttribute("aria-label") ??
    element.textContent ??
    "";

  element.setAttribute("data-split-text", text);
  element.setAttribute("aria-label", text);
  element.textContent = "";

  const chars: HTMLSpanElement[] = [];
  [...text].forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.display = "inline-block";
    span.setAttribute("aria-hidden", "true");
    span.setAttribute("data-char", "true");
    element.appendChild(span);
    chars.push(span);
  });

  return chars;
}
