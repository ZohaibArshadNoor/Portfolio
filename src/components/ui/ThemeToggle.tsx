"use client";

import { motion } from "framer-motion";
import { HiMoon, HiSun } from "react-icons/hi";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = !mounted || theme === "dark";

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle relative flex h-10 w-[4.5rem] items-center rounded-full border border-border bg-bg-surface/80 px-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md transition-colors ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      data-cursor="hover"
      whileTap={{ scale: 0.96 }}
    >
      <span
        className={`absolute top-1 h-8 w-8 rounded-full bg-gradient-to-br from-cyan to-purple shadow-[0_0_16px_rgba(0,229,255,0.45)] transition-all duration-300 ease-out ${
          isDark ? "left-1" : "left-[calc(100%-2.25rem)]"
        }`}
        aria-hidden
      />
      <span className="relative z-10 flex w-full items-center justify-between px-1.5 text-sm">
        <HiMoon
          className={`transition-colors ${isDark ? "text-white" : "text-text-muted"}`}
          size={16}
        />
        <HiSun
          className={`transition-colors ${!isDark ? "text-white" : "text-text-muted"}`}
          size={16}
        />
      </span>
    </motion.button>
  );
}
