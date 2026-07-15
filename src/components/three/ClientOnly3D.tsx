"use client";

import { useEffect, useState, type ReactNode } from "react";

/** Mounts heavy 3D only after hydration + optional delay to avoid WebGL context storms. */
export function ClientOnly3D({
  children,
  fallback = null,
  delay = 0,
}: {
  children: ReactNode;
  fallback?: ReactNode;
  delay?: number;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), delay);
    return () => window.clearTimeout(id);
  }, [delay]);

  if (!ready) return <>{fallback}</>;
  return <>{children}</>;
}
