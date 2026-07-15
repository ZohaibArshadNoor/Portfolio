"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradientBorder?: boolean;
}

export function GlassCard({
  children,
  className = "",
  hover = true,
  gradientBorder = false,
}: GlassCardProps) {
  return (
    <motion.div
      className={`
        glass card-3d rounded-2xl p-6 md:p-8
        ${hover ? "glass-hover" : ""}
        ${gradientBorder ? "gradient-border" : ""}
        ${className}
      `}
      whileHover={
        hover
          ? { y: -6, rotateX: 2, scale: 1.01 }
          : undefined
      }
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}
