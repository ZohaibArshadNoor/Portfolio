"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiX } from "react-icons/hi";
import type { ReactNode } from "react";

interface CategoryPopupProps {
  open: boolean;
  title: string;
  accent?: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
}

export function CategoryPopup({
  open,
  title,
  accent = "#00E5FF",
  subtitle,
  onClose,
  children,
}: CategoryPopupProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-bg/70 backdrop-blur-md"
            aria-label="Close popup"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="category-popup-title"
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-bg-elevated/95 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            style={{
              boxShadow: `0 30px 80px rgba(0,0,0,0.4), 0 0 60px ${accent}33`,
            }}
            initial={{ opacity: 0, y: 40, scale: 0.88, rotateX: 12 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 24, scale: 0.92, rotateX: 8 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-1"
              style={{
                background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
              }}
              aria-hidden
            />

            <div className="flex items-start justify-between gap-4 border-b border-border p-5 sm:p-6">
              <div>
                <p
                  className="mb-1 text-[10px] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: accent }}
                >
                  Category
                </p>
                <h3
                  id="category-popup-title"
                  className="heading-display text-2xl text-text sm:text-3xl"
                >
                  {title}
                </h3>
                {subtitle && (
                  <p className="mt-1 text-sm text-text-muted">{subtitle}</p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-cyan/40 hover:text-cyan"
                aria-label="Close"
                data-cursor="hover"
              >
                <HiX size={18} />
              </button>
            </div>

            <div className="max-h-[min(60vh,480px)] overflow-y-auto p-5 sm:p-6">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
