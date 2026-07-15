"use client";

import { useCallback, useState } from "react";
import { useLenis } from "@/hooks/useLenis";
import { ThemeProvider } from "@/hooks/useTheme";
import { Loader } from "./Loader";
import { Navbar } from "./Navbar";
import { CustomCursor } from "./CustomCursor";
import { Footer } from "./Footer";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  useLenis(ready);

  const onLoaderComplete = useCallback(() => setReady(true), []);

  return (
    <ThemeProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Loader onComplete={onLoaderComplete} />
      <CustomCursor />
      <div className="noise-overlay" aria-hidden />
      <Navbar />
      <main
        id="main"
        className={`transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
      >
        {children}
      </main>
      <Footer />
    </ThemeProvider>
  );
}
