"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE, NAV_LINKS } from "@/data/site";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "navbar-scrolled" : "bg-transparent"
      }`}
    >
      <nav
        className="container-grid flex h-14 items-center justify-between gap-3 sm:h-16 md:h-20"
        aria-label="Primary"
      >
        <a
          href="#hero"
          className="heading-display shrink-0 text-lg tracking-tight text-text transition-colors hover:text-cyan sm:text-xl"
          data-cursor="hover"
        >
          <span className="text-gradient">{SITE.shortName}</span>
        </a>

        <ul className="hidden items-center gap-5 lg:flex xl:gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-text-muted transition-colors hover:text-cyan"
                data-cursor="hover"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
          <li>
            <a
              href="#contact"
              className="rounded-xl border border-cyan/40 bg-cyan/10 px-4 py-2 text-sm font-semibold text-cyan transition-all hover:bg-cyan/20"
              data-cursor="hover"
            >
              Hire Me
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-text"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            data-cursor="hover"
          >
            {open ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 top-14 z-40 bg-bg/96 backdrop-blur-xl sm:top-16 lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="flex flex-col gap-1 p-4 sm:p-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block rounded-xl px-4 py-3 text-base text-text-muted hover:bg-bg-surface hover:text-cyan sm:text-lg"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-3 px-4">
                <a
                  href="#contact"
                  className="inline-flex rounded-xl border border-cyan/40 bg-cyan/10 px-4 py-2 text-sm font-semibold text-cyan"
                  onClick={() => setOpen(false)}
                >
                  Hire Me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
