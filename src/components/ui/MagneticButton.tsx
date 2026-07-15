"use client";

import { useMagnetic } from "@/hooks/useMagnetic";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  magnetic?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

const variants = {
  primary:
    "bg-cyan text-white hover:shadow-[0_0_32px_rgba(0,229,255,0.45)] border-transparent",
  secondary:
    "bg-transparent text-text border border-border hover:border-cyan/50 hover:text-cyan",
  ghost: "bg-transparent text-text-muted hover:text-cyan border-transparent",
};

export function MagneticButton({
  children,
  variant = "primary",
  className = "",
  magnetic = true,
  href,
  type = "button",
  disabled,
  onClick,
}: MagneticButtonProps) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic<HTMLButtonElement>({
    strength: magnetic ? 0.3 : 0,
  });

  const classes = `
    relative inline-flex items-center justify-center gap-2
    rounded-xl px-6 py-3 text-sm font-semibold tracking-wide
    transition-all duration-300 ease-out border
    disabled:opacity-50 disabled:pointer-events-none
    ${variants[variant]} ${className}
  `;

  if (href) {
    const external = href.startsWith("http") || href.endsWith(".pdf");
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        data-cursor="hover"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      data-cursor="hover"
      style={{ transition: "transform 0.2s ease-out" }}
    >
      {children}
    </motion.button>
  );
}
